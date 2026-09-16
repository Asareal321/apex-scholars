import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutButton } from "@/components/checkout-button";
import { formatUsd, type LessonPackage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function PackageCard({
  lessonPackage,
  compact = false,
}: {
  lessonPackage: LessonPackage;
  compact?: boolean;
}) {
  return (
    <Card
      className={cn(
        "h-full bg-card/80",
        lessonPackage.featured && "ring-2 ring-primary/70"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="font-heading text-xl">{lessonPackage.name}</CardTitle>
            <CardDescription className="mt-1">{lessonPackage.headline}</CardDescription>
          </div>
          {lessonPackage.featured ? <Badge>Most chosen</Badge> : null}
        </div>
        <p className="pt-3 font-heading text-4xl tracking-tight">
          {formatUsd(lessonPackage.priceCents)}
        </p>
        <p className="text-sm text-muted-foreground">
          {lessonPackage.sessions} × {lessonPackage.minutes} min
          {lessonPackage.sessions > 1
            ? ` · ${formatUsd(lessonPackage.perSessionCents)} per session`
            : null}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact ? (
          <p className="text-sm leading-6 text-foreground/80">{lessonPackage.description}</p>
        ) : null}
        <ul className="space-y-2 text-sm">
          {lessonPackage.includes.slice(0, compact ? 3 : undefined).map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Best for: </span>
          {lessonPackage.bestFor}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row">
        <CheckoutButton packageId={lessonPackage.id} />
        {compact ? (
          <Link
            href="/packages"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 w-full px-4")}
          >
            Compare packs
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
