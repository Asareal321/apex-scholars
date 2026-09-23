import Link from "next/link";
import { DISCLAIMER, studio } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[oklch(0.15_0.04_260)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl text-primary">{studio.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Peer tutoring for Western students, from a tutor who took the same courses.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.14em] text-primary uppercase">Contact</p>
          <a
            className="mt-2 inline-block text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            href={`mailto:${studio.email}`}
          >
            {studio.email}
          </a>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.14em] text-primary uppercase">Start</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary" href="/book">
                Book a session
              </Link>
            </li>
            <li>
              <Link className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary" href="/subjects">
                Courses
              </Link>
            </li>
            <li>
              <Link className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary" href="/packages">
                Rates and policies
              </Link>
            </li>
            <li>
              <Link className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary" href="/tutors">
                Asa Nichols
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {studio.name}. {DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
