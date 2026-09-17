"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PackageCard } from "@/components/package-card";
import type { LessonPackage } from "@/lib/catalog";

const filters = [
  { id: "all", label: "All rates" },
  { id: "one-on-one", label: "1-on-1" },
  { id: "group", label: "Small group" },
  { id: "in-person", label: "In person" },
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
    if (filter === "one-on-one") return packages.filter((item) => !item.groupSize);
    if (filter === "group") return packages.filter((item) => Boolean(item.groupSize));
    if (filter === "in-person") return [];
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
          Showing the Apex catalog. Connect Supabase and run{" "}
          <code className="font-mono text-xs">supabase/schema.sql</code> to load rates from the
          database.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Rates are loading from your Supabase <code className="font-mono text-xs">packages</code> table.
        </p>
      )}

      {packages.length === 0 ? (
        <Alert className="mt-8">
          <AlertTitle>No rates to show</AlertTitle>
          <AlertDescription>
            The catalog came back empty. Seed supabase/schema.sql or refresh to load the built-in rates.
          </AlertDescription>
        </Alert>
      ) : visible.length === 0 ? (
        <Alert className="mt-8">
          <AlertTitle>No in-person sessions</AlertTitle>
          <AlertDescription>
            Apex Scholars is Zoom only. Choose All rates or 1-on-1 to book a Zoom lesson.
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
        <Badge variant="outline">Interac e-Transfer before the session</Badge>
        <Badge variant="outline">24-hour cancellation</Badge>
        <Badge variant="outline">Zoom only</Badge>
      </div>
    </div>
  );
}
