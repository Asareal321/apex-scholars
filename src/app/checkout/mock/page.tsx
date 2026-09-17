import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { MockCheckoutForm } from "@/components/mock-checkout-form";
import { FallbackBanner } from "@/components/fallback-banner";
import { DISCLAIMER, formatUsd, getPackage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Confirm session",
  description: "Record a Zoom session request. Pay by Interac e-Transfer before the session.",
};

export default async function MockCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const params = await searchParams;
  const lessonPackage = getPackage(params.package);

  if (!lessonPackage) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <Alert variant="destructive">
          <AlertTitle>No session selected</AlertTitle>
          <AlertDescription>
            Pick a 1-on-1 or small-group rate, then confirm the request.
          </AlertDescription>
        </Alert>
        <Link href="/packages" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex h-10 px-4")}>
          See rates
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Confirm</p>
      <h1 className="mt-2 text-4xl tracking-tight">{lessonPackage.name}</h1>
      <p className="mt-3 text-muted-foreground">
        {lessonPackage.minutes} min · {formatUsd(lessonPackage.priceCents)}
        {lessonPackage.groupSize ? " per student" : ""}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{DISCLAIMER}</p>
      <div className="mt-6">
        <FallbackBanner supabase />
      </div>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
        <MockCheckoutForm lessonPackage={lessonPackage} />
      </div>
    </div>
  );
}
