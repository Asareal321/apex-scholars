import "server-only";
import { CALENDLY_SESSION_TYPES, getCalendlyTypeUrls, type CalendlySessionType } from "@/lib/env";

export const AVAILABILITY_TIME_ZONE = "America/Toronto";

const REVALIDATE_SECONDS = 300;
const EVENT_TYPES_REVALIDATE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 8000;
const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const BUCKET_MS = REVALIDATE_SECONDS * 1000;

export type OpenSlot = {
  startTime: string;
  schedulingUrl: string;
};

export type TypeAvailability = {
  id: CalendlySessionType;
  label: string;
  bookingUrl: string;
  slots: OpenSlot[];
};

export type Availability =
  | { status: "ok"; types: TypeAvailability[] }
  | { status: "unavailable" };

type CalendlyEventType = { uri: string; scheduling_url: string; active: boolean };
type CalendlyAvailableTime = { status: string; start_time: string; scheduling_url: string };

class CalendlyError extends Error {}

function getToken() {
  return process.env.CALENDLY_API_TOKEN?.trim() || null;
}

// Local testing only: point the client at a mock server.
function getApiBase() {
  return (process.env.CALENDLY_API_BASE_URL?.trim() || "https://api.calendly.com").replace(/\/+$/, "");
}

function normalizeSchedulingUrl(value: string) {
  try {
    const url = new URL(value);
    return `${url.host.toLowerCase()}${url.pathname.replace(/\/+$/, "").toLowerCase()}`;
  } catch {
    return value.trim().toLowerCase();
  }
}

async function calendlyGet<T>(path: string, params: Record<string, string>, revalidate: number) {
  const url = new URL(`${getApiBase()}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}`, Accept: "application/json" },
    next: { revalidate },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    const retryAfter = response.headers.get("retry-after");
    throw new CalendlyError(
      `Calendly ${path} returned ${response.status}${retryAfter ? ` (retry after ${retryAfter}s)` : ""}`
    );
  }
  return (await response.json()) as T;
}

async function listEventTypes(userUri: string) {
  const eventTypes: CalendlyEventType[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 5; page += 1) {
    const params: Record<string, string> = { user: userUri, count: "100" };
    if (pageToken) params.page_token = pageToken;
    const data = await calendlyGet<{
      collection: CalendlyEventType[];
      pagination?: { next_page_token?: string | null };
    }>("/event_types", params, EVENT_TYPES_REVALIDATE_SECONDS);
    eventTypes.push(...data.collection);
    pageToken = data.pagination?.next_page_token ?? undefined;
    if (!pageToken) break;
  }
  return eventTypes;
}

// Calendly requires a future start and at most a 7-day range. Rounding the start up to
// the cache interval keeps request URLs stable so the fetch cache can reuse them.
function availabilityWindow(now = Date.now()) {
  const start = Math.ceil((now + 60_000) / BUCKET_MS) * BUCKET_MS;
  return {
    start_time: new Date(start).toISOString(),
    end_time: new Date(start + WINDOW_MS - 1000).toISOString(),
  };
}

async function loadAvailability(): Promise<Availability> {
  const typeUrls = getCalendlyTypeUrls();
  const wanted = CALENDLY_SESSION_TYPES.filter((type) => typeUrls[type.id]);
  if (!wanted.length) return { status: "unavailable" };

  const me = await calendlyGet<{ resource: { uri: string } }>(
    "/users/me",
    {},
    EVENT_TYPES_REVALIDATE_SECONDS
  );
  const eventTypes = await listEventTypes(me.resource.uri);
  const byUrl = new Map(
    eventTypes
      .filter((eventType) => eventType.active)
      .map((eventType) => [normalizeSchedulingUrl(eventType.scheduling_url), eventType])
  );

  const window = availabilityWindow();
  const types = await Promise.all(
    wanted.map(async (type): Promise<TypeAvailability | null> => {
      const bookingUrl = typeUrls[type.id]!;
      const eventType = byUrl.get(normalizeSchedulingUrl(bookingUrl));
      if (!eventType) return null;
      const data = await calendlyGet<{ collection: CalendlyAvailableTime[] }>(
        "/event_type_available_times",
        { event_type: eventType.uri, ...window },
        REVALIDATE_SECONDS
      );
      const slots = data.collection
        .filter((slot) => slot.status === "available")
        .map((slot) => ({ startTime: slot.start_time, schedulingUrl: slot.scheduling_url }))
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return { id: type.id, label: type.label, bookingUrl, slots };
    })
  );

  const matched = types.filter((type): type is TypeAvailability => type !== null);
  return matched.length ? { status: "ok", types: matched } : { status: "unavailable" };
}

export async function getAvailability(): Promise<Availability> {
  if (!getToken()) return { status: "unavailable" };
  try {
    return await loadAvailability();
  } catch (error) {
    console.warn("[calendly] availability unavailable:", error instanceof Error ? error.message : error);
    return { status: "unavailable" };
  }
}

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: AVAILABILITY_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dayLabelFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: AVAILABILITY_TIME_ZONE,
  weekday: "long",
  month: "short",
  day: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: AVAILABILITY_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

const shortDateTimeFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: AVAILABILITY_TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatSlotTime(iso: string) {
  return timeFormat.format(new Date(iso));
}

export function formatSlotDateTime(iso: string) {
  return shortDateTimeFormat.format(new Date(iso));
}

export function groupSlotsByDay(slots: OpenSlot[]) {
  const days = new Map<string, { key: string; label: string; slots: OpenSlot[] }>();
  for (const slot of slots) {
    const date = new Date(slot.startTime);
    const key = dayKeyFormat.format(date);
    const day = days.get(key) ?? { key, label: dayLabelFormat.format(date), slots: [] };
    day.slots.push(slot);
    days.set(key, day);
  }
  return [...days.values()];
}
