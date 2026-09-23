import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { CANCELLATION_LINE, PAYMENT_LINE, getSubject } from "@/lib/catalog";
import {
  CALENDLY_SESSION_TYPES,
  getCalendlyTypeUrls,
  getCalendlyUrl,
  type CalendlySessionType,
} from "@/lib/env";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Pick a session type and a time with Asa Nichols, and see what to send before your session.",
};

export const dynamic = "force-dynamic";

const afterBooking = [
  {
    title: "Check your invite",
    body: "You get a confirmation by email, and the Google Meet link is in the calendar invite.",
  },
  {
    title: "Pay by e-Transfer",
    body: `${PAYMENT_LINE} For a group, one person pays for everyone and writes the number of students in the message.`,
  },
  {
    title: "Send your materials",
    body: "Bring the course syllabus to your first session. Before every session, share the lecture slides, cases or assignment details you want to cover at least 24 hours ahead.",
  },
  {
    title: "Need to cancel?",
    body: CANCELLATION_LINE,
  },
];

function AfterBooking() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl tracking-tight">After you book</h2>
      <ol className="mt-4 space-y-3">
        {afterBooking.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              "flex gap-4 rounded-lg border px-4 py-3",
              index === 1 ? "border-primary/40 bg-primary/10" : "border-border bg-card"
            )}
          >
            <span className="font-heading text-xl text-primary">{index + 1}</span>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

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
  const linkedTypes = CALENDLY_SESSION_TYPES.filter((item) => typeUrls[item.id]);
  // With a profile page, types without their own event link open the profile instead.
  const availableTypes = linkedTypes.length ? (baseUrl ? CALENDLY_SESSION_TYPES : linkedTypes) : [];
  const requestedType = availableTypes.find((item) => item.id === params.type)?.id;
  const selectedType = requestedType ?? (baseUrl ? undefined : availableTypes[0]?.id);
  const calendlyUrl = (selectedType && typeUrls[selectedType]) || baseUrl;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Book</p>
      <h1 className="mt-2 text-4xl tracking-tight">
        {subject ? `Book ${subject.name}` : "Book a session"}
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {calendlyUrl
          ? "Pick a session type, then a time in the calendar."
          : "Pick your course and a time, and Asa will confirm by email."}
      </p>
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
              {selectedType ? null : (
                <p className="text-sm text-muted-foreground">
                  Or choose any session type in the calendar below.
                </p>
              )}
              {selectedType === "group" ? (
                <p className="text-sm text-muted-foreground">
                  Book once for the whole group of 3 to 5. Arrange your group before the session.
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
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-8">
          <BookingForm initialSubjectId={subject?.id} initialTutorId="asa" />
        </div>
      )}
      <AfterBooking />
    </div>
  );
}
