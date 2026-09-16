import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">404</p>
      <h1 className="mt-2 text-4xl tracking-tight">That page is not on the syllabus.</h1>
      <p className="mt-4 text-muted-foreground">
        Check the URL, or start from packages, booking, or the homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
          Home
        </Link>
        <Link href="/book" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}>
          Book a lesson
        </Link>
      </div>
    </div>
  );
}
