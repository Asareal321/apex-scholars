import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { tutors } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tutors",
  description: "Meet Elena, Marcus, Amara, and Noah — the Northline Tutors studio.",
};

export default function TutorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Tutors</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight">
        Four specialists. You get the same person next week.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        We do not rotate whoever is free. If the pairing is wrong after the diagnostic, we switch
        — package hours come with you.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {tutors.map((tutor) => (
          <article
            key={tutor.id}
            id={tutor.id}
            className="rounded-xl border bg-card p-6 scroll-mt-24"
          >
            <span
              className={cn(
                "inline-flex size-12 items-center justify-center rounded-full text-sm font-semibold",
                tutor.accent
              )}
            >
              {tutor.initials}
            </span>
            <h2 className="mt-4 text-2xl">{tutor.name}</h2>
            <p className="text-sm text-primary">{tutor.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tutor.focus}</p>
            <p className="mt-4 text-sm leading-6">{tutor.bio}</p>
            <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
              {tutor.credentials}
            </p>
            <Link
              href={`/book?tutor=${tutor.id}`}
              className={cn(buttonVariants({ size: "lg" }), "mt-5 h-10 px-4")}
            >
              Book with {tutor.name.split(" ")[0]}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
