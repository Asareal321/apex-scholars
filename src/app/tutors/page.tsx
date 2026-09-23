import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { subjects, tutors } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tutor",
  description:
    "Why Asa Nichols tutors, how he teaches, and his marks in the Western courses he covers.",
};

export default function TutorsPage() {
  const asa = tutors[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Tutor</p>
      <div className="mt-2 flex items-center gap-4">
        <span
          className={cn(
            "inline-flex size-14 shrink-0 items-center justify-center rounded-full text-base font-semibold",
            asa.accent
          )}
        >
          {asa.initials}
        </span>
        <div>
          <h1 className="text-4xl tracking-tight">{asa.name}</h1>
          <p className="mt-1 text-muted-foreground">{asa.bio} Dean’s Honour List.</p>
        </div>
      </div>

      <section id={asa.id} className="mt-10 space-y-4 text-lg leading-8">
        <h2 className="text-2xl tracking-tight">Why I tutor</h2>
        <p>
          In first year I had to make a huge adjustment in my learning style to succeed in courses
          where the lecture halls are big and it’s hard to get 1-on-1 time with the professor.
        </p>
        <p className="text-foreground/80">
          I think peer tutoring works because it’s easier to relate to a tutor, and someone who
          took the course recently gives better advice.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl tracking-tight">How Asa teaches</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          His study methods are unorthodox and built around efficient learning, for students who
          want good grades without giving up the rest of their university experience.
        </p>
        <h2 className="mt-6 text-xl tracking-tight">Experience</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          <li>Tutored math in high school.</li>
          <li>Regularly helps university friends through their math-heavy courses.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl tracking-tight">Marks in the courses he tutors</h2>
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {subjects.map((subject) => (
            <li key={subject.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <Link
                href={`/subjects#${subject.id}`}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {subject.name}
              </Link>
              <span className="text-right text-sm">{subject.proof ?? subject.mark}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "mt-10 h-11 px-5")}>
        Book a session with Asa
      </Link>
    </div>
  );
}
