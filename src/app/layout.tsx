import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DISCLAIMER, studio } from "@/lib/catalog";
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
    default: `${studio.name} — weekly Google Meet tutoring for Western courses`,
    template: `%s · ${studio.name}`,
  },
  description: `${studio.headline} Weekly Google Meet tutoring for ECON 1021, ECON 1022, MATH 1229, CALC 1000, MOS 1023, and BUS 1220. ${DISCLAIMER}`,
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
