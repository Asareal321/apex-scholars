import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { FallbackBanner } from "@/components/fallback-banner";
import { DISCLAIMER, getSubject } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Book a Zoom lesson",
  description:
    "Hold a weekly Zoom slot with Apex Scholars. Pay by Interac e-Transfer before the session. 24-hour cancellation policy.",
};

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; tutor?: string }>;
}) {
  const params = await searchParams;
  const subject = getSubject(params.subject);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Book</p>
      <h1 className="mt-2 text-4xl tracking-tight">Book a Zoom lesson</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {subject
          ? `Weekly tutoring for ${subject.name}. Pay by Interac e-Transfer before the session.`
          : "Pick a Western course and a Zoom time. Pay by Interac e-Transfer before the session. 24-hour cancellation policy."}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{DISCLAIMER}</p>
      <div className="mt-8">
        <FallbackBanner supabase />
      </div>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
        <BookingForm initialSubjectId={subject?.id} initialTutorId="asa" />
      </div>
    </div>
  );
}
