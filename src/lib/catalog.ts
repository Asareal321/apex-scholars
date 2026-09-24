export type Subject = {
  id: string;
  name: string;
  shortName: string;
  mark: string;
  proof?: string;
  tutorIds: string[];
};

export type Tutor = {
  id: string;
  name: string;
  role: string;
  bio: string;
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

export const CONTACT_EMAIL = "asanichols07@gmail.com";

export const DISCLAIMER = "Independent service. Not affiliated with Western University.";

export const BUS_1220_LINE = "88 in BUS 1220 ending with 10/10 in participation";

export const PAYMENT_LINE = "1-on-1 sessions: pay by card when you book through Calendly.";

export const GROUP_PAYMENT_LINE = `One person pays for everyone ($30 per student) by Interac e-Transfer to ${CONTACT_EMAIL} and writes the number of students in the message.`;

export const CANCELLATION_LINE =
  "Cancel with at least 12 hours’ notice. Late cancellations are not refunded.";

export const AVAILABILITY = {
  days: "Monday, Wednesday and Friday",
  slotsPerWeek: 12,
};

export const studio = {
  name: "Apex Scholars",
  shortName: "Apex",
  headline: "Midterms Coming? Don't Go In Blind.",
  email: CONTACT_EMAIL,
};

export const subjects: Subject[] = [
  {
    id: "econ-1021",
    name: "ECON 1021",
    shortName: "ECON 1021",
    mark: "100",
    tutorIds: ["asa"],
  },
  {
    id: "econ-1022",
    name: "ECON 1022",
    shortName: "ECON 1022",
    mark: "98",
    tutorIds: ["asa"],
  },
  {
    id: "math-1229",
    name: "MATH 1229",
    shortName: "MATH 1229",
    mark: "100",
    tutorIds: ["asa"],
  },
  {
    id: "calc-1000",
    name: "CALC 1000",
    shortName: "CALC 1000",
    mark: "96",
    tutorIds: ["asa"],
  },
  {
    id: "mos-1023",
    name: "MOS 1023",
    shortName: "MOS 1023",
    mark: "95",
    tutorIds: ["asa"],
  },
  {
    id: "bus-1220",
    name: "BUS 1220",
    shortName: "BUS 1220",
    mark: "88",
    proof: BUS_1220_LINE,
    tutorIds: ["asa"],
  },
];

export const tutors: Tutor[] = [
  {
    id: "asa",
    name: "Asa Nichols",
    role: "Tutor",
    bio: "2nd-year BMOS, Ivey AEO candidate.",
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
    headline: "The standard weekly session.",
    description: "A 60-minute 1-on-1 session on Google Meet.",
    includes: ["60 minutes, 1-on-1", "Keep the same slot every week"],
    bestFor: "Steady weekly help in one course, all term.",
    featured: true,
  },
  {
    id: "one-on-one-30",
    name: "1-on-1 · 30 minutes",
    sessions: 1,
    minutes: 30,
    priceCents: 2000,
    perSessionCents: 4000,
    headline: "Half the time, half the price.",
    description: "A 30-minute 1-on-1 session on Google Meet at the same hourly rate.",
    includes: ["30 minutes, 1-on-1", "Same $40/hr rate as the full hour"],
    bestFor: "A focused check-in when a full hour is more than you need.",
  },
  {
    id: "small-group",
    name: "Small group · 3–5 students",
    sessions: 1,
    minutes: 60,
    priceCents: 3000,
    perSessionCents: 3000,
    headline: "Bring your own study group.",
    description: "A 60-minute session on Google Meet for a group of 3 to 5 students.",
    includes: ["60 minutes, 3 to 5 students", "One person pays for everyone by Interac e-Transfer"],
    bestFor: "Classmates in the same course who want to study together.",
    groupSize: "3–5",
  },
];

export function getPackage(id: string | null | undefined) {
  if (!id) return undefined;
  return packages.find((item) => item.id === id);
}

const packageBookingTypes: Record<string, string> = {
  "one-on-one-60": "60",
  "one-on-one-30": "30",
  "small-group": "group",
};

export function bookingHrefForPackage(id: string) {
  const type = packageBookingTypes[id];
  return type ? `/book?type=${type}` : "/book";
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
