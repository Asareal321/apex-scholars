export type Subject = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  details: string;
  whoItsFor: string;
  tutorIds: string[];
};

export type Tutor = {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  credentials: string;
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
};

export const studio = {
  name: "Northline Tutors",
  shortName: "Northline",
  tagline: "One-on-one coaching for students who are already working hard — and still stuck.",
  city: "Seattle",
  neighborhood: "Fremont",
  address: "1401 N 45th St, Seattle, WA 98103",
  email: "hello@northlinetutors.com",
  phone: "(206) 555-0148",
  hours: "Mon–Thu 3:30–8:30pm PT · Sat 10am–2pm PT",
};

export const subjects: Subject[] = [
  {
    id: "sat-math",
    name: "SAT Math",
    shortName: "SAT Math",
    blurb: "Desmos, algebra II, and the questions that eat the clock.",
    details:
      "We rebuild the algebra that SAT Math actually tests, then drill the official question types with a timer. Students leave with a Desmos workflow, a missed-question log, and a target score plan — not another stack of random worksheets.",
    whoItsFor: "Juniors and seniors sitting a fall or spring SAT, especially after a 600–700 math score that will not budge.",
    tutorIds: ["elena", "noah"],
  },
  {
    id: "sat-rw",
    name: "SAT Reading & Writing",
    shortName: "SAT R&W",
    blurb: "Grammar that sticks and passages you can actually finish.",
    details:
      "Amara trains the digital SAT’s two-module format: vocabulary in context, transitions, and the rhetorical questions that feel like guesswork. We annotate under time and keep a personal error taxonomy so the same comma rule stops costing points.",
    whoItsFor: "Students who run out of time on Module 2 or who “know grammar” but miss the same conventions every week.",
    tutorIds: ["amara"],
  },
  {
    id: "ap-calc",
    name: "AP Calculus AB / BC",
    shortName: "AP Calc",
    blurb: "Limits through series, taught as a craft instead of a panic.",
    details:
      "Elena reteaches the ideas the class flew past — related rates, FTC, series tests — then we work FRQs the way the exam is scored. Homework is short and surgical: the three problems that expose the hole, not a 40-problem dump.",
    whoItsFor: "Students who survived precalc, then hit a wall in the first six weeks of AP Calc, or who need a 4/5 after a shaky mock.",
    tutorIds: ["elena"],
  },
  {
    id: "ap-chem",
    name: "AP Chemistry",
    shortName: "AP Chem",
    blurb: "Stoichiometry, equilibrium, and labs that finally make sense.",
    details:
      "Marcus draws every mechanism and ICE table. We translate the CED into a weekly map, then practice the FRQ verbs (calculate, explain, justify) so answers match how AP readers award points.",
    whoItsFor: "Students who can memorize formulas but freeze on multi-step equilibrium or electrochemistry questions.",
    tutorIds: ["marcus"],
  },
  {
    id: "ap-physics",
    name: "AP Physics 1",
    shortName: "Physics 1",
    blurb: "Forces, energy, and the diagrams that unlock the FRQ.",
    details:
      "We start on paper: free-body diagrams, energy bar charts, then the algebra. Marcus refuses to let students hide behind calculator muscle memory. If the picture is wrong, we stop and redraw.",
    whoItsFor: "First-year physics students whose homework looks fine until the conceptual multiple choice arrives.",
    tutorIds: ["marcus"],
  },
  {
    id: "essays",
    name: "College essays",
    shortName: "Essays",
    blurb: "Personal statements that sound like the student, not a committee.",
    details:
      "Amara was an admissions reader. She will not let a draft become a résumé in paragraph form. We find the scene, cut the throat-clearing, and produce one Common App essay plus two supplements that actually answer the prompt.",
    whoItsFor: "Seniors drafting between June and November, and juniors who want a summer head start without outsourcing their voice.",
    tutorIds: ["amara"],
  },
  {
    id: "cs",
    name: "Intro CS & AP Computer Science A",
    shortName: "CS / Python",
    blurb: "Java, Python, and the debugging habits schools skip.",
    details:
      "Noah tutors the way he reviews pull requests: name the bug, write a failing case, then fix it. We cover AP CSA (objects, arrays, recursion) or a first Python course for students who want college CS without walking in cold.",
    whoItsFor: "AP CSA students drowning in object design, or rising college freshmen who need a pre-term Python intensive.",
    tutorIds: ["noah"],
  },
];

export const tutors: Tutor[] = [
  {
    id: "elena",
    name: "Elena Voss",
    role: "Math lead",
    focus: "SAT Math · AP Calculus AB/BC",
    bio: "Elena taught calculus discussion sections at the University of Washington before opening a tutoring practice in Fremont. She is the tutor anxious testers ask for: slow voice, sharp diagnostics, zero shame about forgotten algebra.",
    credentials: "M.S. Applied Mathematics, UW · 12 years tutoring",
    initials: "EV",
    accent: "bg-primary text-primary-foreground",
  },
  {
    id: "marcus",
    name: "Marcus Bell",
    role: "Science lead",
    focus: "AP Chemistry · AP Physics 1",
    bio: "Marcus spent four years as a research lab tech, then left to teach full-time. He draws every problem. Students who “get it in class and blank on the quiz” tend to stay with him through the AP exam.",
    credentials: "B.S. Chemistry, Reed College · former lab tech, Fred Hutch",
    initials: "MB",
    accent: "bg-[oklch(0.45_0.08_250)] text-white",
  },
  {
    id: "amara",
    name: "Amara Ibe",
    role: "Writing lead",
    focus: "College essays · SAT Reading & Writing · AP Lang",
    bio: "Amara read first-year applications for a small liberal arts college. She knows what a tired admissions officer actually finishes. Sessions are collaborative edits, not lectures about “hooks.”",
    credentials: "M.F.A. Fiction, University of Oregon · former admissions reader",
    initials: "AI",
    accent: "bg-[oklch(0.48_0.1_40)] text-white",
  },
  {
    id: "noah",
    name: "Noah Park",
    role: "CS lead",
    focus: "AP CSA · Python · intro programming",
    bio: "Noah writes software by day and tutors two evenings a week. He is blunt, kind, and allergic to copied Stack Overflow. If a student cannot explain their own loop, they rewrite it.",
    credentials: "B.S. Computer Science, Georgia Tech · software engineer",
    initials: "NP",
    accent: "bg-[oklch(0.4_0.06_180)] text-white",
  },
];

export const packages: LessonPackage[] = [
  {
    id: "diagnostic",
    name: "Diagnostic hour",
    sessions: 1,
    minutes: 50,
    priceCents: 8500,
    perSessionCents: 8500,
    headline: "Find the actual hole before you buy a pack.",
    description:
      "A 50-minute working session plus a written plan. We watch the student solve, name the gaps, and recommend a package — or tell you tutoring is not the next move.",
    includes: [
      "50-minute Zoom or in-studio session",
      "One-page written plan sent within 24 hours",
      "Package recommendation with a realistic timeline",
      "Credit the $85 toward a Four-week sprint or larger pack within 14 days",
    ],
    bestFor: "Families who are not sure whether the issue is content, timing, or the class itself.",
  },
  {
    id: "sprint",
    name: "Four-week sprint",
    sessions: 4,
    minutes: 50,
    priceCents: 36000,
    perSessionCents: 9000,
    headline: "A unit test, a SAT date, or four weeks to stabilize.",
    description:
      "Four 50-minute sessions over about a month. Tight homework, a shared error log, and a last-session recap you can hand to a parent or counselor.",
    includes: [
      "Four 50-minute sessions with the same tutor",
      "Targeted homework between meetings (20–30 minutes)",
      "Shared error log in a simple Google Doc",
      "End-of-sprint recap with next-step options",
    ],
    bestFor: "A coming unit exam, a SAT 3–5 weeks out, or a student who just transferred into AP.",
  },
  {
    id: "foundation",
    name: "Foundation pack",
    sessions: 8,
    minutes: 50,
    priceCents: 68000,
    perSessionCents: 8500,
    headline: "Weekly rhythm — the pack most families stay on.",
    description:
      "Eight sessions, usually weekly. Mid-pack we send a short parent note so nobody is guessing about progress. This is the default for a full AP unit or a two-month SAT runway.",
    includes: [
      "Eight 50-minute sessions",
      "Weekly homework and a living error log",
      "Mid-pack parent note (email, ~150 words)",
      "Score or quiz check-in using school or official practice material",
    ],
    bestFor: "A semester of AP Calc or Chem, or SAT prep that needs more than a crash course.",
    featured: true,
  },
  {
    id: "semester",
    name: "Semester mentor",
    sessions: 16,
    minutes: 50,
    priceCents: 192000,
    perSessionCents: 12000,
    headline: "A tutor of record for the whole term.",
    description:
      "Sixteen sessions plus two 20-minute parent conferences. We stay on the syllabus, catch slides early, and keep one adult in the loop without turning tutoring into a second homework police.",
    includes: [
      "Sixteen 50-minute sessions across the term",
      "Two 20-minute parent conferences",
      "Syllabus-aligned plan updated monthly",
      "Priority booking for the same weekly slot",
      "Exam-week extra materials (FRQ sets or SAT modules)",
    ],
    bestFor: "A full AP course, a junior-year SAT season, or a student who needs a steady adult besides the classroom teacher.",
  },
];

export const faqs = [
  {
    q: "Do you tutor middle school?",
    a: "Not as a regular offering. Our studio is built for high school and first-year college: SAT/ACT-adjacent math, AP sciences, AP Calc, college essays, and intro CS. If a rising 8th grader is already in algebra II, email us and we will say yes or no quickly.",
  },
  {
    q: "Zoom or in person?",
    a: "Both. In-studio sessions are in Fremont, Seattle, weekday afternoons. Most SAT and essay work happens on Zoom — the whiteboard and the Google Doc travel better than a commute.",
  },
  {
    q: "What happens after I buy a package?",
    a: "You get a receipt and a booking link. Schedule the first lesson on the Book page (Calendly when we have a live calendar, or our request form). Unused sessions expire 12 months after purchase and are transferable to a sibling.",
  },
  {
    q: "Can we switch tutors?",
    a: "Yes, after the diagnostic or any session that clearly is not a fit. We would rather reshuffle than grind through a mismatched pair. Package hours transfer.",
  },
  {
    q: "Do you guarantee a score?",
    a: "No. We will put a target on paper and tell you if it is realistic given the calendar. Guaranteed-score shops are selling you a refund policy, not better calculus.",
  },
  {
    q: "Homework?",
    a: "Yes, 20–40 minutes between sessions. If a student cannot do any work outside the hour, say so in the diagnostic — we will either shorten the plan or tell you tutoring will not move the needle.",
  },
];

export const testimonials = [
  {
    quote:
      "Elena rebuilt SAT math without the pep-talk fog. Four weeks, a missed-question log, and a 640 to 740. My daughter finally believed the Desmos tricks were allowed.",
    name: "Dana R.",
    detail: "Parent · Bellevue · SAT Math sprint",
  },
  {
    quote:
      "Marcus is the first chem tutor who did not re-lecture the textbook. He made my son draw every ICE table. The AP mock went from a 2-feeling to a solid 4 trajectory.",
    name: "Chris P.",
    detail: "Parent · Queen Anne · AP Chemistry",
  },
  {
    quote:
      "Amara treated the personal essay like an editing collaboration. The draft stopped sounding like a student-council speech. Our kid sounded like himself, which was the whole point.",
    name: "Priya S.",
    detail: "Parent · Portland · college essays",
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
