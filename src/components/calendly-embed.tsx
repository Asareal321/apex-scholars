"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingForm } from "@/components/booking-form";

export function CalendlyEmbed({
  url,
  subjectId,
  tutorId,
}: {
  url: string;
  subjectId?: string;
  tutorId?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const separator = url.includes("?") ? "&" : "?";
  const src = `${url}${separator}hide_gdpr_banner=1&primary_color=1f4d3a`;

  if (failed) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Calendly did not load</AlertTitle>
          <AlertDescription>
            The live calendar is unreachable from this browser. Use the studio request form
            below and we will confirm by email.
          </AlertDescription>
        </Alert>
        <BookingForm initialSubjectId={subjectId} initialTutorId={tutorId} />
      </div>
    );
  }

  return (
    <div className="relative min-h-[720px] overflow-hidden rounded-xl border bg-card">
      {!loaded ? (
        <div className="absolute inset-0 space-y-4 p-6">
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
      <iframe
        title="Northline Tutors calendar"
        src={src}
        className="h-[720px] w-full"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
