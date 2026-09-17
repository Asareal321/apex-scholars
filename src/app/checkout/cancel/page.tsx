import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { getPackage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request canceled",
};

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const params = await searchParams;
  const lessonPackage = getPackage(params.package);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <Alert>
        <AlertTitle>Request stopped</AlertTitle>
        <AlertDescription>
          {lessonPackage
            ? `No Interac e-Transfer was requested for ${lessonPackage.name}.`
            : "No Interac e-Transfer was requested."}
        </AlertDescription>
      </Alert>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={lessonPackage ? `/packages#${lessonPackage.id}` : "/packages"}
          className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
        >
          Return to rates
        </Link>
        <Link href="/book" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}>
          Book a Zoom lesson
        </Link>
      </div>
    </div>
  );
}
