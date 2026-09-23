"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingForm } from "@/components/booking-form";

// Hex equivalents of --card, --foreground and --primary in globals.css.
const CALENDLY_COLORS = {
  background_color: "111d30",
  text_color: "f7f2e3",
  primary_color: "dbb155",
};

const LOAD_TIMEOUT_MS = 15000;

function subscribeNoop() {
  return () => {};
}

function useEmbedDomain() {
  return useSyncExternalStore(
    subscribeNoop,
    () => window.location.host,
    () => null
  );
}

function buildSrc(url: string, embedDomain: string, courseCode?: string) {
  const src = new URL(url);
  src.searchParams.set("embed_domain", embedDomain);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("hide_gdpr_banner", "1");
  for (const [key, value] of Object.entries(CALENDLY_COLORS)) {
    src.searchParams.set(key, value);
  }
  // Calendly ignores a1 when the event type has no first custom question.
  if (courseCode) src.searchParams.set("a1", courseCode);
  return src.toString();
}

function isCalendlyMessage(event: MessageEvent) {
  return (
    event.origin === "https://calendly.com" &&
    typeof event.data?.event === "string" &&
    event.data.event.startsWith("calendly.")
  );
}

export function CalendlyEmbed({
  url,
  subjectId,
  courseCode,
  tutorId,
}: {
  url: string;
  subjectId?: string;
  courseCode?: string;
  tutorId?: string;
}) {
  const embedDomain = useEmbedDomain();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!embedDomain) return;
    const timer = window.setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);

    function onMessage(event: MessageEvent) {
      if (!isCalendlyMessage(event)) return;
      window.clearTimeout(timer);
      setLoaded(true);
      if (event.data.event === "calendly.page_height") {
        const next = Number.parseInt(String(event.data.payload?.height ?? ""), 10);
        if (Number.isFinite(next) && next > 0) setHeight(next);
      }
    }

    window.addEventListener("message", onMessage);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
    };
  }, [embedDomain]);

  if (failed) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Calendly did not load</AlertTitle>
          <AlertDescription>
            The live calendar is unreachable from this browser. Use the request form below and Asa
            will confirm your Zoom time by email.
          </AlertDescription>
        </Alert>
        <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
          <BookingForm initialSubjectId={subjectId} initialTutorId={tutorId} />
        </div>
      </div>
    );
  }

  const frameHeight = Math.max(height ?? 0, 720);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card"
      style={{ minHeight: 720 }}
    >
      {!loaded ? (
        <div className="absolute inset-0 space-y-4 p-6" aria-live="polite">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => (
              <Skeleton key={index} className="h-12" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Loading the live Calendly calendar…</p>
        </div>
      ) : null}
      {embedDomain ? (
        <iframe
          title="Book a Zoom lesson with Apex Scholars on Calendly"
          src={buildSrc(url, embedDomain, courseCode)}
          className="block w-full"
          style={{ height: frameHeight }}
        />
      ) : null}
    </div>
  );
}
