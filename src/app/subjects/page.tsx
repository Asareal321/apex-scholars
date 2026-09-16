import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getTutor, subjects } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "SAT Math, SAT Reading & Writing, AP Calculus, AP Chemistry, AP Physics 1, college essays, and intro CS.",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Subjects</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight">
        The short list we actually take.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        If the course is not here, we will not invent a tutor for it. Email us anyway — we will
        send you to someone we trust rather than stretch.
      </p>
      <div className="mt-10 space-y-6">
        {subjects.map((subject) => (
          <article key={subject.id} id={subject.id} className="rounded-xl border bg-card p-6">
            <h2 className="text-2xl">{subject.name}</h2>
            <p className="mt-2 text-sm leading-7">{subject.details}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Who it is for: </span>
              {subject.whoItsFor}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tutors:{" "}
              {subject.tutorIds
                .map((id) => getTutor(id)?.name)
                .filter(Boolean)
                .join(", ")}
            </p>
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
