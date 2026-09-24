import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PackagesCatalog } from "@/components/packages-catalog";
import { AVAILABILITY, CANCELLATION_LINE, GROUP_PAYMENT_LINE, PAYMENT_LINE } from "@/lib/catalog";
import { loadPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "Apex Scholars rates, payment and cancellation policies, how groups work, and when sessions run.",
};

export const dynamic = "force-dynamic";

const policies = [
  { title: "Payment", body: PAYMENT_LINE },
  { title: "Cancellations", body: CANCELLATION_LINE },
  {
    title: "Groups",
    body: `Arrange your own group of 3 to 5 classmates before the session. ${GROUP_PAYMENT_LINE}`,
  },
];

const faqs = [
  {
    q: "When are sessions?",
    a: `${AVAILABILITY.days}. There are currently ${AVAILABILITY.slotsPerWeek} slots a week, and more may be added if there is enough demand.`,
  },
  {
    q: "Can I keep the same time all term?",
    a: "Yes. You can book a weekly recurring session in the same slot.",
  },
  {
    q: "Where do sessions happen?",
    a: "Online only, over Google Meet. The link is in the calendar invite Calendly sends when you book.",
  },
];

export default async function PackagesPage() {
  const { packages } = await loadPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Rates</p>
      <h1 className="mt-2 max-w-2xl text-4xl tracking-tight text-balance">
        $40/hr 1-on-1. $30 per student in a group of 3–5.
      </h1>
      <p className="mt-4 mb-8 max-w-2xl text-lg leading-8 text-muted-foreground">
        Pay per session. Payment, cancellation and group rules are below.
      </p>
      <PackagesCatalog packages={packages} />

      <section className="mt-16">
        <h2 className="text-2xl tracking-tight">Policies</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          {policies.map((policy) => (
            <div key={policy.title} className="rounded-xl border border-border bg-card p-5">
              <dt className="text-xs tracking-[0.16em] text-primary uppercase">{policy.title}</dt>
              <dd className="mt-2 text-sm leading-6">{policy.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="faq" className="mt-16 max-w-3xl">
        <h2 className="text-2xl tracking-tight">Scheduling questions</h2>
        <Accordion className="mt-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
