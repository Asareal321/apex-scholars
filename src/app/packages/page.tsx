import type { Metadata } from "next";
import { PackagesCatalog } from "@/components/packages-catalog";
import { FallbackBanner } from "@/components/fallback-banner";
import { DISCLAIMER } from "@/lib/catalog";
import { loadPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "1-on-1 Zoom tutoring at $40/hr (60 minutes, optional 30 minutes) and small groups of 3–5 at $20 per student. Interac e-Transfer before the session.",
};

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const { packages, source } = await loadPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Rates</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight text-balance">
        $40/hr 1-on-1. $20 per student in a group of 3–5.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        Pay by Interac e-Transfer before the session. 24-hour cancellation policy. {DISCLAIMER}
      </p>
      <div className="mt-8">
        <FallbackBanner supabase />
      </div>
      <PackagesCatalog packages={packages} source={source} />
    </div>
  );
}
