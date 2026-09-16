import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { formatUsd, getPackage } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/env";
import { confirmStripeSession } from "@/lib/stripe-record";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Purchase confirmed",
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    package?: string;
    mode?: string;
    confirmation?: string;
    session_id?: string;
  }>;
}) {
  const params = await searchParams;
  const lessonPackage = getPackage(params.package);

  if (!lessonPackage && !params.session_id) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <Alert variant="destructive">
          <AlertTitle>Nothing to confirm</AlertTitle>
          <AlertDescription>
            This success page expected a package or a Stripe session. Start from packages if you
            meant to buy hours.
          </AlertDescription>
        </Alert>
        <Link href="/packages" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex h-10 px-4")}>
          View packages
        </Link>
      </div>
    );
  }

  let confirmation = params.confirmation ?? null;
  let storage = isSupabaseConfigured() ? "supabase" : "memory";
  let recordError: string | null = null;

  if (params.mode === "stripe" && params.session_id) {
    try {
      const saved = await confirmStripeSession(params.session_id, params.package);
      confirmation = saved.confirmation;
      storage = saved.source;
    } catch (error) {
      recordError = error instanceof Error ? error.message : "Could not record this Stripe payment.";
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Receipt</p>
      <h1 className="mt-2 text-4xl tracking-tight">You’re on the books.</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        {lessonPackage
          ? `${lessonPackage.name} (${lessonPackage.sessions} sessions, ${formatUsd(lessonPackage.priceCents)}) is paid${
              params.mode === "mock" ? " in the local sandbox" : ""
            }. Next, put the first hour on the calendar.`
          : "Payment landed. Book the first session so the hours do not sit unused."}
      </p>
      {confirmation ? (
        <p className="mt-4 rounded-lg bg-secondary px-3 py-2 font-mono text-sm">
          Confirmation {confirmation}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">
        Record stored in {storage === "supabase" ? "Supabase" : "server memory (Supabase unset)"}.
      </p>
      {recordError ? (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Payment page loaded, record failed</AlertTitle>
          <AlertDescription>{recordError}</AlertDescription>
        </Alert>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
          Book the first lesson
        </Link>
        <Link
          href="/packages"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
        >
          Back to packages
        </Link>
      </div>
    </div>
  );
}
