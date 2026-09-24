import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTACT_EMAIL } from "@/lib/catalog";
import {
  formatSlotDateTime,
  formatSlotTime,
  getAvailability,
  groupSlotsByDay,
  type TypeAvailability,
} from "@/lib/calendly-availability";
import type { CalendlySessionType } from "@/lib/env";
import { cn } from "@/lib/utils";

const SHORT_LABELS: Record<CalendlySessionType, string> = {
  "60": "1-on-1 · 60 min",
  "30": "1-on-1 · 30 min",
  group: "Small group",
};

function EmptyWeek({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      No open times this week — email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
        {CONTACT_EMAIL}
      </a>
    </p>
  );
}

export function bookHref(
  type: CalendlySessionType,
  options: { subjectId?: string; at?: string } = {}
) {
  const params = new URLSearchParams({ type });
  if (options.subjectId) params.set("subject", options.subjectId);
  if (options.at) params.set("at", options.at);
  return `/book?${params.toString()}`;
}

export async function WeekAvailabilitySummary() {
  const availability = await getAvailability();

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs tracking-[0.16em] text-primary uppercase">
          <CalendarClock className="size-4" />
          This week
        </p>
        <Link href="/book" className="text-sm font-medium text-primary hover:underline">
          See times
        </Link>
      </div>
      {availability.status === "ok" ? (
        availability.types.some((type) => type.slots.length) ? (
          <ul className="mt-3 divide-y divide-border">
            {availability.types.map((type) => (
              <li key={type.id}>
                <Link
                  href={bookHref(type.id)}
                  className="flex items-baseline justify-between gap-3 py-2.5 text-sm hover:text-primary"
                >
                  <span>
                    <span className="block font-medium">{SHORT_LABELS[type.id]}</span>
                    <span className="block text-xs text-muted-foreground">
                      {type.slots.length
                        ? `Next: ${formatSlotDateTime(type.slots[0].startTime)}`
                        : "Full this week"}
                    </span>
                  </span>
                  <span className="shrink-0 font-heading text-2xl text-primary">
                    {type.slots.length}
                    <span className="ml-1 font-sans text-xs text-muted-foreground">open</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyWeek className="mt-3" />
        )
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Availability coming soon. Open the calendar on the booking page to pick a time.
        </p>
      )}
    </div>
  );
}

export function WeekAvailabilitySummarySkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5" aria-busy="true">
      <Skeleton className="h-4 w-24" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

function TypeSlotList({
  type,
  subjectId,
  selectedAt,
}: {
  type: TypeAvailability;
  subjectId?: string;
  selectedAt?: string;
}) {
  if (!type.slots.length) return <EmptyWeek />;

  return (
    <ol className="space-y-4">
      {groupSlotsByDay(type.slots).map((day) => (
        <li key={day.key}>
          <p className="text-sm font-medium">{day.label}</p>
          <ul className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {day.slots.map((slot) => {
              const active = slot.startTime === selectedAt;
              return (
                <li key={slot.startTime}>
                  <Link
                    href={`${bookHref(type.id, { subjectId, at: slot.startTime })}#calendar`}
                    replace
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "block rounded-md border px-2 py-2 text-center text-sm tabular-nums transition-colors",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/40 hover:border-primary/60"
                    )}
                  >
                    {formatSlotTime(slot.startTime)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export async function BookAvailability({
  selectedType,
  subjectId,
  selectedAt,
}: {
  selectedType?: CalendlySessionType;
  subjectId?: string;
  selectedAt?: string;
}) {
  const availability = await getAvailability();

  if (availability.status !== "ok") {
    return (
      <p className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
        Check the calendar below for open times.
      </p>
    );
  }

  const type = selectedType && availability.types.find((item) => item.id === selectedType);

  return (
    <section
      aria-labelledby="open-times-heading"
      className="rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="open-times-heading" className="text-xl tracking-tight">
          {type ? `Open times · ${SHORT_LABELS[type.id]}` : "Open times this week"}
        </h2>
        <p className="text-xs text-muted-foreground">Next 7 days · Toronto time</p>
      </div>
      <div className="mt-4">
        {type ? (
          <TypeSlotList type={type} subjectId={subjectId} selectedAt={selectedAt} />
        ) : availability.types.some((item) => item.slots.length) ? (
          <ul className="grid gap-2 sm:grid-cols-3">
            {availability.types.map((item) => (
              <li key={item.id}>
                <Link
                  href={bookHref(item.id, { subjectId })}
                  scroll={false}
                  replace
                  className="block rounded-lg border border-border bg-secondary/40 px-4 py-3 transition-colors hover:border-primary/60"
                >
                  <span className="block text-sm font-medium">{SHORT_LABELS[item.id]}</span>
                  <span className="mt-1 block font-heading text-2xl text-primary">
                    {item.slots.length} open
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {item.slots.length
                      ? `Next: ${formatSlotDateTime(item.slots[0].startTime)}`
                      : "Full this week"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyWeek />
        )}
      </div>
      {type?.slots.length ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Pick a time to open it in the calendar below.
        </p>
      ) : null}
    </section>
  );
}

export function BookAvailabilitySkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5" aria-busy="true">
      <Skeleton className="h-6 w-48" />
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-9" />
        ))}
      </div>
    </div>
  );
}
