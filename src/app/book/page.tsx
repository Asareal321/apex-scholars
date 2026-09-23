import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { FallbackBanner } from "@/components/fallback-banner";
import { CONTACT_EMAIL, DISCLAIMER, getSubject } from "@/lib/catalog";
import {
  CALENDLY_SESSION_TYPES,
  getCalendlyTypeUrls,
  getCalendlyUrl,
  type CalendlySessionType,
} from "@/lib/env";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a Google Meet lesson",
  description:
    "Hold a weekly Google Meet slot with Apex Scholars. Send an Interac e-Transfer to asanichols07@gmail.com before the session. 24-hour cancellation policy.",
};

export const dynamic = "force-dynamic";

const PAYMENT_LINE = `Send an Interac e-Transfer to ${CONTACT_EMAIL} before the session. 24-hour cancellation policy.`;

function bookHref(type: CalendlySessionType, subjectId?: string) {
  const params = new URLSearchParams({ type });
  if (subjectId) params.set("subject", subjectId);
  return `/book?${params.toString()}`;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; tutor?: string; type?: string }>;
}) {
  const params = await searchParams;
  const subject = getSubject(params.subject);

  const baseUrl = getCalendlyUrl();
  const typeUrls = getCalendlyTypeUrls();
  const availableTypes = CALENDLY_SESSION_TYPES.filter((item) => typeUrls[item.id]);
  const requestedType = availableTypes.find((item) => item.id === params.type)?.id;
  const selectedType = requestedType ?? (baseUrl ? undefined : availableTypes[0]?.id);
  const calendlyUrl = (selectedType && typeUrls[selectedType]) || baseUrl;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Book</p>
      <h1 className="mt-2 text-4xl tracking-tight">Book a Google Meet lesson</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {subject
          ? `Weekly tutoring for ${subject.name}. ${PAYMENT_LINE}`
          : calendlyUrl
            ? `Pick a session type and a Google Meet time. ${PAYMENT_LINE}`
            : `Pick a Western course and a Google Meet time. ${PAYMENT_LINE}`}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{DISCLAIMER}</p>

      {calendlyUrl ? (
        <div className="mt-8 space-y-6">
          {availableTypes.length ? (
            <nav aria-label="Session type" className="space-y-3">
              <p className="text-sm font-medium">Session type</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {availableTypes.map((item) => {
                  const active = item.id === selectedType;
                  return (
                    <Link
                      key={item.id}
                      href={bookHref(item.id, subject?.id)}
                      scroll={false}
                      replace
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-left transition-colors",
                        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card hover:border-primary/60"
                      )}
                    >
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="block text-sm text-muted-foreground">{item.detail}</span>
                    </Link>
                  );
                })}
              </div>
              {!selectedType ? (
                <p className="text-sm text-muted-foreground">
                  Or choose any session type in the calendar below.
                </p>
              ) : null}
            </nav>
          ) : null}
          <CalendlyEmbed
            key={calendlyUrl}
            url={calendlyUrl}
            subjectId={subject?.id}
            courseCode={subject?.name}
            tutorId="asa"
          />
          <p className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
            {PAYMENT_LINE}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <FallbackBanner supabase />
          </div>
          <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
            <BookingForm initialSubjectId={subject?.id} initialTutorId="asa" />
          </div>
        </>
      )}
    </div>
  );
}
