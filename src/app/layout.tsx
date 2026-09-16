import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/lib/catalog";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${studio.name} — SAT, AP, essays, and CS tutoring in Seattle`,
    template: `%s · ${studio.name}`,
  },
  description:
    "Northline Tutors is a Fremont studio for SAT Math, AP Calculus, AP Chemistry, college essays, and intro CS. Buy a lesson pack and book a diagnostic hour.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
