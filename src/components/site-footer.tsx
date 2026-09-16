import Link from "next/link";
import { studio } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-[oklch(0.28_0.03_150)] text-[oklch(0.93_0.02_90)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl">Northline Tutors</p>
          <p className="mt-2 max-w-xs text-sm text-[oklch(0.85_0.02_90)]">
            A Fremont studio for SAT, AP sciences, calculus, college essays, and first-year CS.
            Weekday afternoons on Zoom or in person.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.14em] uppercase text-[oklch(0.78_0.03_90)]">Studio</p>
          <p className="mt-2">{studio.address}</p>
          <p className="mt-1">{studio.hours}</p>
          <p className="mt-3">
            <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href={`mailto:${studio.email}`}>
              {studio.email}
            </a>
          </p>
          <p>{studio.phone}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.14em] uppercase text-[oklch(0.78_0.03_90)]">Start</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href="/book">
                Book a diagnostic
              </Link>
            </li>
            <li>
              <Link className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href="/packages">
                Lesson packages
              </Link>
            </li>
            <li>
              <Link className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href="/tutors">
                Meet the tutors
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-[oklch(0.78_0.02_90)] sm:px-6">
          © {new Date().getFullYear()} Northline Tutors. Sessions expire 12 months after purchase.
        </p>
      </div>
    </footer>
  );
}
