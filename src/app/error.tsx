"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <Alert variant="destructive">
        <AlertTitle>The studio page hit a snag</AlertTitle>
        <AlertDescription>
          {error.message || "Something in this view failed. Try again, or go back to the homepage."}
        </AlertDescription>
      </Alert>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button className="h-10 px-4" onClick={reset}>
          Try again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
          Home
        </Link>
      </div>
    </div>
  );
}
