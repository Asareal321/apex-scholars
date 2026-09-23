import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { subjects } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Courses",
  description: "ECON 1021, ECON 1022, MATH 1229, CALC 1000, MOS 1023, and BUS 1220.",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Courses</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight">Six Western courses.</h1>
      <div className="mt-10 space-y-6">
        {subjects.map((subject) => (
          <article key={subject.id} id={subject.id} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl text-primary">{subject.name}</h2>
            <p className="mt-2 text-sm leading-7">{subject.details}</p>
            <p className="mt-3 text-sm text-muted-foreground">{subject.whoItsFor}</p>
            {subject.proof ? (
              <p className="mt-3 text-sm leading-7">{subject.proof}</p>
            ) : null}
            <Link
              href={`/book?subject=${subject.id}`}
              className={cn(buttonVariants({ size: "lg" }), "mt-5 h-10 px-4")}
            >
              Book {subject.shortName}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
