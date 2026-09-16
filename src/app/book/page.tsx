import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { FallbackBanner } from "@/components/fallback-banner";
import { getSubject, getTutor } from "@/lib/catalog";
import { getCalendlyUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "Book a lesson",
  description: "Schedule a Northline diagnostic or package session on Zoom or in Fremont.",
};

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; tutor?: string }>;
}) {
  const params = await searchParams;
  const calendly = getCalendlyUrl();
  const subject = getSubject(params.subject);
  const tutor = getTutor(params.tutor);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Book</p>
      <h1 className="mt-2 text-4xl tracking-tight">Hold a 50-minute slot</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {subject
          ? `We’ll start with ${subject.name}${tutor ? ` and ${tutor.name}` : ""}.`
          : "Pick a subject, a tutor, and an afternoon. If you already bought a pack, this is how those hours get used."}
      </p>
      <div className="mt-8">
        <FallbackBanner calendly supabase />
      </div>
      {calendly ? (
        <CalendlyEmbed
          url={calendly}
          subjectId={subject?.id}
          tutorId={tutor?.id}
        />
      ) : (
        <div className="rounded-xl border bg-card p-5 sm:p-8">
          <BookingForm initialSubjectId={subject?.id} initialTutorId={tutor?.id} />
        </div>
      )}
    </div>
  );
}
