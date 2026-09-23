"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MountainMark } from "@/components/mountain-mark";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { studio } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const links = [
  { href: "/subjects", label: "Courses" },
  { href: "/tutors", label: "Tutor" },
  { href: "/packages", label: "Rates" },
  { href: "/book", label: "Book" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-heading text-lg tracking-tight text-foreground",
        className
      )}
    >
      <MountainMark className="size-8" />
      <span>{studio.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === link.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className={cn(buttonVariants({ size: "lg" }), "hidden h-9 px-3 sm:inline-flex")}
          >
            Book a Google Meet lesson
          </Link>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,90vw)]">
              <SheetHeader>
                <SheetTitle>Apex Scholars</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <SheetTrigger
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm",
                          pathname === link.href
                            ? "bg-secondary"
                            : "hover:bg-secondary/70"
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetTrigger>
                ))}
                <Link
                  href="/book"
                  className={cn(buttonVariants({ size: "lg" }), "mt-3 h-10 justify-center")}
                >
                  Book a Google Meet lesson
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
