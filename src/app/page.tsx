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
import { PackageCard } from "@/components/package-card";
import {
  DISCLAIMER,
  faqs,
  packages,
  studio,
  subjects,
  tutors,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const oneOnOne = packages.find((item) => item.id === "one-on-one-60") ?? packages[0];
  const group = packages.find((item) => item.id === "small-group") ?? packages[2];
  const asa = tutors[0];

  return (
    <div>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,oklch(0.28_0.05_255),oklch(0.19_0.045_260)_55%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <p className="text-xs tracking-[0.18em] text-primary uppercase">
              Western University courses · Zoom only
            </p>
            <h1 className="mt-4 max-w-xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {studio.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/80">
              Weekly 1-on-1 and small-group Zoom tutoring for ECON 1021, ECON 1022, MATH 1229,
              CALC 1000, MOS 1023, and BUS 1220.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Book a Zoom lesson
              </Link>
              <Link
                href="/packages"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
              >
                See rates
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{DISCLAIMER}</p>
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
                <dd className="font-heading text-3xl text-primary">$20</dd>
                <p className="mt-1 text-xs text-muted-foreground">per student</p>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Pay by Interac e-Transfer before the session. 24-hour cancellation policy.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">Year-round</p>
        <h2 className="mt-2 max-w-2xl text-3xl tracking-tight">
          Weekly tutoring, not exam-cram only.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
          {studio.tagline} Book a Zoom lesson for the week, then keep the slot. Midterms are the
          hook; the work is weekly.
        </p>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.16em] text-primary uppercase">Courses</p>
              <h2 className="mt-2 text-3xl tracking-tight">The complete list</h2>
            </div>
            <Link href="/subjects" className="text-sm font-medium text-primary hover:underline">
              All six courses
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/book?subject=${subject.id}`}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="text-lg text-primary">{subject.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{subject.blurb}</p>
                {subject.proof ? (
                  <p className="mt-2 text-sm leading-6">{subject.proof}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">Rates</p>
        <h2 className="mt-2 text-3xl tracking-tight">1-on-1 or a small group</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <PackageCard lessonPackage={oneOnOne} />
          <PackageCard lessonPackage={group} compact />
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Tutor</p>
          <h2 className="mt-2 text-3xl tracking-tight">{asa.name}</h2>
          <p className="mt-2 text-muted-foreground">{asa.bio}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6">{asa.credentials}</p>
          <p className="mt-2 max-w-3xl text-sm leading-6">{asa.bus1220Proof}</p>
          <Link
            href="/tutors"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6 h-10 px-4")}
          >
            Full credentials
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-3xl tracking-tight">Before you book</h2>
        </div>
        <Accordion className="mt-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-xl border border-primary/30 bg-secondary/50 p-6">
          <p className="font-heading text-2xl">Book a Zoom lesson</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Pay by Interac e-Transfer before the session. 24-hour cancellation policy.
          </p>
          <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "mt-4 inline-flex h-11 px-5")}>
            Hold a slot
          </Link>
        </div>
      </section>
    </div>
  );
}
