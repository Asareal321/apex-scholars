import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { MockCheckoutForm } from "@/components/mock-checkout-form";
import { FallbackBanner } from "@/components/fallback-banner";
import { formatUsd, getPackage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mock checkout",
  description: "Local payment sandbox used when Stripe keys are not configured.",
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
          <AlertTitle>No package selected</AlertTitle>
          <AlertDescription>
            Checkout needs a pack. Pick one from the packages page and try again.
          </AlertDescription>
        </Alert>
        <Link href="/packages" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex h-10 px-4")}>
          Browse packages
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Checkout</p>
      <h1 className="mt-2 text-4xl tracking-tight">Pay for {lessonPackage.name}</h1>
      <p className="mt-3 text-muted-foreground">
        {lessonPackage.sessions} × {lessonPackage.minutes} min · {formatUsd(lessonPackage.priceCents)}
      </p>
      <div className="mt-6">
        <FallbackBanner stripe supabase />
      </div>
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <MockCheckoutForm lessonPackage={lessonPackage} />
      </div>
    </div>
  );
}
