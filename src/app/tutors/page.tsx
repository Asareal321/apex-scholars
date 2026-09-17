import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DISCLAIMER, tutors } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tutor",
  description: "Asa Nichols — 2nd-year BMOS, Ivey AEO candidate. Dean's Honour List.",
};

export default function TutorsPage() {
  const asa = tutors[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Tutor</p>
      <h1 className="mt-2 text-4xl tracking-tight">{asa.name}</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{asa.bio}</p>
      <article id={asa.id} className="mt-8 rounded-xl border border-border bg-card p-6">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-full text-sm font-semibold",
            asa.accent
          )}
        >
          {asa.initials}
        </span>
        <p className="mt-4 text-sm text-primary">{asa.focus}</p>
        <p className="mt-4 text-sm leading-7">{asa.credentials}</p>
        <p className="mt-3 text-sm leading-7">{asa.bus1220Proof}</p>
        <p className="mt-4 text-sm text-muted-foreground">{DISCLAIMER}</p>
        <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "mt-5 h-10 px-4")}>
          Book a Zoom lesson
        </Link>
      </article>
    </div>
  );
}
