import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, PencilLine, Timer } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PackageCard } from "@/components/package-card";
import {
  faqs,
  packages,
  studio,
  subjects,
  testimonials,
  tutors,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featured = packages.find((item) => item.featured) ?? packages[2];

  return (
    <div>
      <section className="border-b bg-[linear-gradient(180deg,oklch(0.94_0.03_85),oklch(0.965_0.018_85))]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="text-xs tracking-[0.18em] text-primary uppercase">
              {studio.neighborhood}, {studio.city} · Zoom nationwide
            </p>
            <h1 className="mt-4 max-w-xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Tutoring for the courses that quietly wreck a strong transcript.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/75">
              {studio.tagline} Northline is a four-tutor studio for SAT Math, AP Calc, AP Chem,
              college essays, and intro CS — not a marketplace of whoever is free tonight.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Book a diagnostic hour
              </Link>
              <Link
                href="/packages"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
              >
                See lesson packages
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{studio.hours}</p>
          </div>
          <aside className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">This week</p>
            <h2 className="mt-2 text-2xl">A diagnostic is the honest first hour.</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/75">
              We watch the student work, write a one-page plan, and tell you whether a pack is
              worth it. The $85 credits toward a sprint or foundation pack for 14 days.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-secondary/80 p-4">
                <dt className="text-muted-foreground">Diagnostic</dt>
                <dd className="font-heading text-3xl">$85</dd>
              </div>
              <div className="rounded-xl bg-secondary/80 p-4">
                <dt className="text-muted-foreground">Foundation pack</dt>
                <dd className="font-heading text-3xl">$680</dd>
              </div>
            </dl>
            <Link
              href="/packages#foundation"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Most families start with eight sessions <ArrowRight className="size-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-primary uppercase">Subjects</p>
            <h2 className="mt-2 text-3xl tracking-tight">What we actually tutor</h2>
          </div>
          <Link href="/subjects" className="text-sm font-medium text-primary hover:underline">
            All subjects
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/book?subject=${subject.id}`}
              className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/40"
            >
              <h3 className="text-lg">{subject.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{subject.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Timer,
              title: "Diagnostic, then a plan",
              body: "We do not sell a 16-session pack because a quiz went badly. The first hour is a working session and a written recommendation.",
            },
            {
              icon: PencilLine,
              title: "Homework that is short on purpose",
              body: "Twenty to forty minutes between meetings. If a student cannot do any work outside the hour, we say so instead of collecting payment.",
            },
            {
              icon: MapPin,
              title: "Same tutor, same slot",
              body: "Fremont studio or Zoom. Semester mentors keep a weekly time. Switching tutors is allowed; grinding through a mismatch is not.",
            },
          ].map((step) => (
            <div key={step.title}>
              <step.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-primary uppercase">Packages</p>
            <h2 className="mt-2 text-3xl tracking-tight">Buy hours. Then book them.</h2>
          </div>
          <Link href="/packages" className="text-sm font-medium text-primary hover:underline">
            Compare every pack
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <PackageCard lessonPackage={featured} />
          <div className="grid gap-4">
            {packages
              .filter((item) => item.id !== featured.id)
              .slice(0, 2)
              .map((item) => (
                <PackageCard key={item.id} lessonPackage={item} compact />
              ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-[oklch(0.32_0.04_155)] text-[oklch(0.96_0.02_90)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.16em] text-[oklch(0.82_0.04_90)] uppercase">Tutors</p>
          <h2 className="mt-2 text-3xl tracking-tight text-white">Four people. Not a bench of contractors.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tutors.map((tutor) => (
              <Link
                key={tutor.id}
                href={`/tutors#${tutor.id}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold",
                    tutor.accent
                  )}
                >
                  {tutor.initials}
                </span>
                <h3 className="mt-3 text-lg text-white">{tutor.name}</h3>
                <p className="text-sm text-[oklch(0.84_0.03_90)]">{tutor.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl tracking-tight">What parents actually write us</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-xl border bg-card p-5">
              <p className="text-sm leading-6">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{item.name}</span>
                <br />
                {item.detail}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
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
          <div className="mt-10 rounded-xl border bg-secondary/50 p-6">
            <p className="font-heading text-2xl">Ready for the first honest hour?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Book a diagnostic, or buy a pack if you already know you need the weekly rhythm.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Book a lesson
              </Link>
              <Badge variant="outline" className="h-8 self-start sm:self-center">
                No account required
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
