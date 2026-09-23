export type CalendlySessionType = "60" | "30" | "group";

export const CALENDLY_SESSION_TYPES: { id: CalendlySessionType; label: string; detail: string }[] = [
  { id: "60", label: "1-on-1 · 60 min", detail: "$40" },
  { id: "30", label: "1-on-1 · 30 min", detail: "$20" },
  { id: "group", label: "Small group", detail: "$30 / student" },
];

export const DEFAULT_CALENDLY_URL = "https://calendly.com/asanichols07";
export const DEFAULT_CALENDLY_URL_60 = "https://calendly.com/asanichols07/60min";
export const DEFAULT_CALENDLY_URL_30 = "https://calendly.com/asanichols07/30min";
export const DEFAULT_CALENDLY_URL_GROUP = "https://calendly.com/asanichols07/60min-1";

// Unset or blank uses the fallback; "off" disables that link.
function readCalendlyUrl(value: string | undefined, fallback: string | null = null) {
  const raw = value?.trim();
  if (!raw) return fallback;
  if (raw.toLowerCase() === "off") return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function getCalendlyUrl() {
  return readCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL, DEFAULT_CALENDLY_URL);
}

export function getCalendlyTypeUrls(): Partial<Record<CalendlySessionType, string>> {
  const urls: Partial<Record<CalendlySessionType, string>> = {};
  const url60 = readCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL_60, DEFAULT_CALENDLY_URL_60);
  const url30 = readCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL_30, DEFAULT_CALENDLY_URL_30);
  const urlGroup = readCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL_GROUP, DEFAULT_CALENDLY_URL_GROUP);
  if (url60) urls["60"] = url60;
  if (url30) urls["30"] = url30;
  if (urlGroup) urls.group = urlGroup;
  return urls;
}

export function isCalendlyConfigured() {
  return Boolean(getCalendlyUrl() || Object.keys(getCalendlyTypeUrls()).length);
}

export function getSupabaseUrl() {
  return (
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    null
  );
}

export function getSupabaseKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    null
  );
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

export function getIntegrations() {
  return {
    calendly: isCalendlyConfigured(),
    supabase: isSupabaseConfigured(),
  };
}
