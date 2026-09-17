export type Subject = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
    details: string;
  whoItsFor: string;
  proof?: string;
  tutorIds: string[];
};

export type Tutor = {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  credentials: string;
  bus1220Proof: string;
  initials: string;
  accent: string;
};

export type LessonPackage = {
  id: string;
  name: string;
  sessions: number;
  minutes: number;
  priceCents: number;
  perSessionCents: number;
  headline: string;
  description: string;
  includes: string[];
  bestFor: string;
  featured?: boolean;
  groupSize?: string;
};

export const DISCLAIMER = "Independent service. Not affiliated with Western University.";

export const studio = {
  name: "Apex Scholars",
  shortName: "Apex",
  tagline: "Weekly Zoom tutoring for Western courses — not exam-cram only.",
  headline: "Midterms Coming? Don't Go In Blind.",
  contactNote: "Contact details coming soon.",
};

export const subjects: Subject[] = [
  {
    id: "econ-1021",
    name: "ECON 1021",
    shortName: "ECON 1021",
    blurb: "Weekly Zoom tutoring for Western’s ECON 1021.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking ECON 1021.",
    tutorIds: ["asa"],
  },
  {
    id: "econ-1022",
    name: "ECON 1022",
    shortName: "ECON 1022",
    blurb: "Weekly Zoom tutoring for Western’s ECON 1022.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking ECON 1022.",
    tutorIds: ["asa"],
  },
  {
    id: "math-1229",
    name: "MATH 1229",
    shortName: "MATH 1229",
    blurb: "Weekly Zoom tutoring for Western’s MATH 1229.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking MATH 1229.",
    tutorIds: ["asa"],
  },
  {
    id: "calc-1000",
    name: "CALC 1000",
    shortName: "CALC 1000",
    blurb: "Weekly Zoom tutoring for Western’s CALC 1000.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking CALC 1000.",
    tutorIds: ["asa"],
  },
  {
    id: "mos-1023",
    name: "MOS 1023",
    shortName: "MOS 1023",
    blurb: "Weekly Zoom tutoring for Western’s MOS 1023.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking MOS 1023.",
    tutorIds: ["asa"],
  },
  {
    id: "bus-1220",
    name: "BUS 1220",
    shortName: "BUS 1220",
    blurb: "Weekly Zoom tutoring for Western’s BUS 1220.",
    details:
      "1-on-1 or a small group of 3–5. Sessions are 60 minutes on Zoom, with an optional 30-minute 1-on-1 if you need a shorter slot.",
    whoItsFor: "Western students taking BUS 1220.",
    proof:
      "88 in BUS 1220 ending with 10/10 in participation",
    tutorIds: ["asa"],
  },
];

export const tutors: Tutor[] = [
  {
    id: "asa",
    name: "Asa Nichols",
    role: "Tutor",
    focus: "ECON 1021 · ECON 1022 · MATH 1229 · CALC 1000 · MOS 1023 · BUS 1220",
    bio: "2nd-year BMOS, Ivey AEO candidate.",
    credentials:
      "100 in ECON 1021 · 100 in MATH 1229 · 98 in ECON 1022 · 96 in CALC 1000 · 95 in MOS 1023 · Dean's Honour List",
    bus1220Proof:
      "88 in BUS 1220 ending with 10/10 in participation",
    initials: "AN",
    accent: "bg-primary text-primary-foreground",
  },
];

export const packages: LessonPackage[] = [
  {
    id: "one-on-one-60",
    name: "1-on-1 · 60 minutes",
    sessions: 1,
    minutes: 60,
    priceCents: 4000,
    perSessionCents: 4000,
    headline: "$40/hr on Zoom.",
    description:
      "A 60-minute 1-on-1 Zoom session. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.",
    includes: [
      "60 minutes, 1-on-1",
      "Zoom only",
      "Interac e-Transfer before the session",
      "24-hour cancellation policy",
    ],
    bestFor: "Weekly 1-on-1 in one of the six Western courses Apex tutors.",
    featured: true,
  },
  {
    id: "one-on-one-30",
    name: "1-on-1 · 30 minutes",
    sessions: 1,
    minutes: 30,
    priceCents: 2000,
    perSessionCents: 4000,
    headline: "Same $40/hr rate, shorter slot.",
    description:
      "An optional 30-minute 1-on-1 Zoom session at the same hourly rate. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.",
    includes: [
      "30 minutes, 1-on-1",
      "Same $40/hr rate as the 60-minute session",
      "Zoom only",
      "Interac e-Transfer before the session",
      "24-hour cancellation policy",
    ],
    bestFor: "A shorter weekly check-in when a full hour is more than you need.",
  },
  {
    id: "small-group",
    name: "Small group · 3–5 students",
    sessions: 1,
    minutes: 60,
    priceCents: 2000,
    perSessionCents: 2000,
    headline: "$20 per student.",
    description:
      "A small group of 3 to 5 students on Zoom. Assume 60 minutes. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.",
    includes: [
      "3 to 5 students",
      "$20 per student",
      "Zoom only",
      "Interac e-Transfer before the session",
      "24-hour cancellation policy",
    ],
    bestFor: "Classmates who want a weekly group hour in the same Western course.",
    groupSize: "3–5",
  },
];

export const faqs = [
  {
    q: "Is Apex Scholars part of Western or Ivey?",
    a: DISCLAIMER,
  },
  {
    q: "Which courses?",
    a: "ECON 1021, ECON 1022, MATH 1229, CALC 1000, MOS 1023, and BUS 1220. That is the complete list.",
  },
  {
    q: "Weekly or exam-cram only?",
    a: "Primarily weekly tutoring for everyone, not exam-cram only. The midterm headline is the hook; weekly Zoom sessions are the year-round offer.",
  },
  {
    q: "Zoom or in person?",
    a: "Zoom only.",
  },
  {
    q: "What does it cost?",
    a: "1-on-1 is $40/hr for 60 minutes, with an optional 30-minute session at the same hourly rate. Small group (3 to 5 students) is $20 per student.",
  },
  {
    q: "How do I pay?",
    a: "Pay by Interac e-Transfer before the session. 24-hour cancellation policy.",
  },
];

export function getPackage(id: string | null | undefined) {
  if (!id) return undefined;
  return packages.find((item) => item.id === id);
}

export function getSubject(id: string | null | undefined) {
  if (!id) return undefined;
  return subjects.find((item) => item.id === id);
}

export function getTutor(id: string | null | undefined) {
  if (!id) return undefined;
  return tutors.find((item) => item.id === id);
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
