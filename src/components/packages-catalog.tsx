"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PackageCard } from "@/components/package-card";
import type { LessonPackage } from "@/lib/catalog";

const filters = [
  { id: "all", label: "All packs" },
  { id: "single", label: "Single session" },
  { id: "multi", label: "Multi-session" },
  { id: "middle-school", label: "Middle school" },
] as const;

export function PackagesCatalog({
  packages,
  source,
}: {
  packages: LessonPackage[];
  source: "supabase" | "catalog";
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (filter === "single") return packages.filter((item) => item.sessions === 1);
    if (filter === "multi") return packages.filter((item) => item.sessions > 1);
    if (filter === "middle-school") return [];
    return packages;
  }, [filter, packages]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              filter === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {source === "catalog" ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Showing the studio catalog. Connect Supabase and run{" "}
          <code className="font-mono text-xs">supabase/schema.sql</code> to load packs from the
          database.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Prices and copy are loading from your Supabase <code className="font-mono text-xs">packages</code> table.
        </p>
      )}

      {packages.length === 0 ? (
        <Alert className="mt-8">
          <AlertTitle>No packages to show</AlertTitle>
          <AlertDescription>
            The catalog came back empty. If you pointed this app at Supabase, seed
            supabase/schema.sql — otherwise refresh and the built-in studio packs should load.
          </AlertDescription>
        </Alert>
      ) : visible.length === 0 ? (
        <Alert className="mt-8">
          <AlertTitle>No packs in this filter</AlertTitle>
          <AlertDescription>
            Northline does not run a middle-school track. Choose All packs, or email
            hello@northlinetutors.com if an 8th grader is already in algebra II.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visible.map((item) => (
            <div key={item.id} id={item.id}>
              <PackageCard lessonPackage={item} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        <Badge variant="outline">Sessions expire after 12 months</Badge>
        <Badge variant="outline">Hours transfer to a sibling</Badge>
        <Badge variant="outline">Diagnostic credits toward a pack for 14 days</Badge>
      </div>
    </div>
  );
}
