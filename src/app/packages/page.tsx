import type { Metadata } from "next";
import { PackagesCatalog } from "@/components/packages-catalog";
import { FallbackBanner } from "@/components/fallback-banner";
import { loadPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lesson packages",
  description:
    "Buy a diagnostic hour, four-week sprint, foundation pack, or semester mentor from Northline Tutors.",
};

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const { packages, source } = await loadPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Packages</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight text-balance">
        Pay for the hours. Then put them on the calendar.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        Stripe Checkout runs when keys are present. Without them, you still get a working sandbox
        so you can walk the purchase flow on a laptop.
      </p>
      <div className="mt-8">
        <FallbackBanner stripe supabase />
      </div>
      <PackagesCatalog packages={packages} source={source} />
    </div>
  );
}
