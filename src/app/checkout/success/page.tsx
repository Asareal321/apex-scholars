import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { DISCLAIMER, formatUsd, getPackage } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/env";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request recorded",
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    package?: string;
    mode?: string;
    confirmation?: string;
  }>;
}) {
  const params = await searchParams;
  const lessonPackage = getPackage(params.package);

  if (!lessonPackage) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <Alert variant="destructive">
          <AlertTitle>Nothing to confirm</AlertTitle>
          <AlertDescription>
            Start from rates if you meant to request a Zoom session.
          </AlertDescription>
        </Alert>
        <Link href="/packages" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex h-10 px-4")}>
          See rates
        </Link>
      </div>
    );
  }

  const confirmation = params.confirmation ?? null;
  const storage = isSupabaseConfigured() ? "supabase" : "memory";

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Request</p>
      <h1 className="mt-2 text-4xl tracking-tight">Session request recorded.</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        {lessonPackage.name} ({lessonPackage.minutes} min, {formatUsd(lessonPackage.priceCents)}
        {lessonPackage.groupSize ? " per student" : ""}). Pay by Interac e-Transfer before the
        session. 24-hour cancellation policy.
      </p>
      {confirmation ? (
        <p className="mt-4 rounded-lg bg-secondary px-3 py-2 font-mono text-sm">
          Confirmation {confirmation}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">
        Preview record stored in {storage === "supabase" ? "Supabase" : "server memory"}. {DISCLAIMER}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
          Book the Zoom time
        </Link>
        <Link
          href="/packages"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
        >
          Back to rates
        </Link>
      </div>
    </div>
  );
}
