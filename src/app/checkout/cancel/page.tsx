import type { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { getPackage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout canceled",
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
        <AlertTitle>Checkout stopped</AlertTitle>
        <AlertDescription>
          {lessonPackage
            ? `No charge for ${lessonPackage.name}. The hours are still available if you want them.`
            : "No charge went through. You can pick a pack whenever you’re ready."}
        </AlertDescription>
      </Alert>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={lessonPackage ? `/packages#${lessonPackage.id}` : "/packages"}
          className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
        >
          Return to packages
        </Link>
        <Link href="/book" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}>
          Book a diagnostic first
        </Link>
      </div>
    </div>
  );
}
