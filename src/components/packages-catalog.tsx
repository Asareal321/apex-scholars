"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PackageCard } from "@/components/package-card";
import { CONTACT_EMAIL, type LessonPackage } from "@/lib/catalog";

const filters = [
  { id: "all", label: "All rates", matches: () => true },
  { id: "one-on-one", label: "1-on-1", matches: (item: LessonPackage) => !item.groupSize },
  { id: "group", label: "Small group", matches: (item: LessonPackage) => Boolean(item.groupSize) },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function PackagesCatalog({ packages }: { packages: LessonPackage[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  // Only offer filters that narrow the list without emptying it.
  const availableFilters = useMemo(
    () =>
      filters.filter((item) => {
        const count = packages.filter(item.matches).length;
        return item.id === "all" || (count > 0 && count < packages.length);
      }),
    [packages]
  );

  const visible = useMemo(() => {
    const active = filters.find((item) => item.id === filter) ?? filters[0];
    return packages.filter(active.matches);
  }, [filter, packages]);

  return (
    <div>
      {availableFilters.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((item) => (
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
      ) : null}

      {visible.length === 0 ? (
        <Alert className="mt-8">
          <AlertTitle>Rates are unavailable right now</AlertTitle>
          <AlertDescription>
            Refresh the page, or email {CONTACT_EMAIL} for current rates.
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
        <Badge variant="outline">Online over Google Meet</Badge>
      </div>
    </div>
  );
}
