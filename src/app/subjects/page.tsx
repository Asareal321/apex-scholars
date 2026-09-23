import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { subjects } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "What an Apex Scholars session covers, and Asa Nichols’s mark in each Western course he tutors.",
};

const sessionFlow = [
  {
    title: "Recap",
    body: "You start by walking through what you’ve learned so far and what you want to go over in more depth.",
  },
  {
    title: "Your review list",
    body: "Asa works through everything you marked for review, using your own slides, cases and assignment details.",
  },
  {
    title: "Practice questions",
    body: "The session ends with practice questions on the same material, so it sticks.",
  },
];

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Courses</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight text-balance">
        Courses Asa has already taken at Western.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        The hard part of these courses is often the room, not the material. In a class of 100 to
        500 students, questions go unasked. A session is where you ask them.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        Every course is available 1-on-1 (60 or 30 minutes) or as a group of 3 to 5, on Google
        Meet.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl tracking-tight">How a 60-minute session runs</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {sessionFlow.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card/60 p-5">
              <p className="text-xs tracking-[0.16em] text-primary uppercase">Step {index + 1}</p>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl tracking-tight">Pick your course</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article
              key={subject.id}
              id={subject.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-2xl text-primary">{subject.name}</h3>
              <p className="mt-4 font-heading text-5xl">{subject.mark}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {subject.proof ?? "Asa’s mark"}
              </p>
              <Link
                href={`/book?subject=${subject.id}`}
                className={cn(buttonVariants({ size: "lg" }), "mt-6 h-10 self-start px-4")}
              >
                Book {subject.shortName}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
