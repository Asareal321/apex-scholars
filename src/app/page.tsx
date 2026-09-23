import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { MountainMark } from "@/components/mountain-mark";
import { AVAILABILITY, BUS_1220_LINE, PAYMENT_LINE, studio, subjects } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Pick a time on Calendly",
    body: "Choose 1-on-1 or a group, then pick a slot.",
  },
  {
    title: "Pay ahead",
    body: PAYMENT_LINE,
  },
  {
    title: "Meet on Google Meet",
    body: "The Meet link is in your calendar invite. Share the slides or assignment you want to cover a day ahead.",
  },
];

const homeFaqs = [
  {
    q: "Why not just go to lectures and office hours?",
    a: "In a class of 100 to 500 students it is hard to ask questions or get time with the professor. One-on-one, you can stop on the part you don’t get until it makes sense.",
  },
  {
    q: "Why a student tutor?",
    a: "Asa took these courses recently, so the advice is current, and it is easier to ask a peer the questions you would skip in lecture.",
  },
  {
    q: "Can I come with friends?",
    a: "Yes. Organize 3 to 5 classmates and book a group session at $30 each. The Rates page explains how group payment works.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,oklch(0.28_0.05_255),oklch(0.19_0.045_260)_55%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <p className="text-xs tracking-[0.18em] text-primary uppercase">
              Western University courses · Online
            </p>
            <h1 className="mt-4 max-w-xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {studio.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/80">
              Get unstuck before the exam, not the night before it. Asa Nichols tutors six
              Western courses he scored 88 to 100 in, 1-on-1 or in a small group.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Book a session
              </Link>
              <Link
                href="/subjects"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
              >
                See the courses
              </Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-primary/30 bg-card p-6">
            <MountainMark className="size-12" />
            <p className="mt-4 text-xs tracking-[0.16em] text-primary uppercase">Rates</p>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-secondary p-4">
                <dt className="text-muted-foreground">1-on-1</dt>
                <dd className="font-heading text-3xl text-primary">$40/hr</dd>
                <p className="mt-1 text-xs text-muted-foreground">60 min · optional 30 min</p>
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <dt className="text-muted-foreground">Group 3–5</dt>
                <dd className="font-heading text-3xl text-primary">$30</dd>
                <p className="mt-1 text-xs text-muted-foreground">per student</p>
              </div>
            </dl>
            <Link
              href="/packages"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Policies and group details
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.16em] text-primary uppercase">Courses</p>
              <h2 className="mt-2 text-3xl tracking-tight">Asa’s mark in each course</h2>
            </div>
            <Link href="/subjects" className="text-sm font-medium text-primary hover:underline">
              How sessions work
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/book?subject=${subject.id}`}
                className="flex items-baseline justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="text-lg text-primary">{subject.name}</h3>
                <p className="font-heading text-3xl">{subject.mark}</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {BUS_1220_LINE} · Dean’s Honour List
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">How it works</p>
        <h2 className="mt-2 max-w-2xl text-3xl tracking-tight">
          Weekly tutoring, not exam-cram only.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Book one session before a midterm, or keep the same slot all term.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-5">
              <p className="font-heading text-3xl text-primary">{index + 1}</p>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Your tutor</p>
          <h2 className="mt-2 text-3xl tracking-tight">Asa Nichols</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            2nd-year BMOS and Ivey AEO candidate who had to rethink how he studied to succeed in
            big first-year lecture halls. Now he shares the study methods that worked for him.
          </p>
          <Link
            href="/tutors"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6 h-10 px-4")}
          >
            Meet Asa
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-3xl tracking-tight">Is this for me?</h2>
        </div>
        <Accordion className="mt-6">
          {homeFaqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-xl border border-primary/30 bg-secondary/50 p-6">
          <p className="font-heading text-2xl">
            {AVAILABILITY.slotsPerWeek} slots a week.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {AVAILABILITY.days}. Pick your course and a time.
          </p>
          <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "mt-4 inline-flex h-11 px-5")}>
            See times
          </Link>
        </div>
      </section>
    </div>
  );
}
