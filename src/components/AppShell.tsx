import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import type { ReactNode } from "react";
import { en } from "@/content/en";

/** Shared page frame: brand header, skip link, centred mobile-first column. */
export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {en.nav.skipToContent}
      </a>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl font-semibold text-primary">
          Hey! <span className="text-accent">You</span> Care
        </Link>
        <nav aria-label={en.nav.mainNavLabel} className="flex items-center gap-1 text-sm">
          <Link
            to="/home"
            className="rounded-full px-3 py-2 font-medium hover:bg-secondary"
            activeProps={{ className: "bg-secondary" }}
          >
            {en.nav.home}
          </Link>
          <Link
            to="/settings"
            aria-label={en.nav.settings}
            className="rounded-full p-2 hover:bg-secondary"
            activeProps={{ className: "bg-secondary" }}
          >
            <Settings className="h-5 w-5" aria-hidden />
          </Link>
        </nav>
      </header>
      <main id="main" className={`mx-auto px-5 pb-16 ${wide ? "max-w-3xl" : "max-w-xl"}`}>
        {children}
      </main>
    </div>
  );
}

/** Clearly labels features that are not built yet. */
export function PlannedBadge({ label = en.common.plannedBadge }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/30 bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
      {label}
    </span>
  );
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      role="note"
      className={`rounded-2xl border p-4 text-sm ${
        tone === "warn" ? "border-accent/40 bg-accent/10" : "border-primary/20 bg-secondary/60"
      }`}
    >
      {children}
    </div>
  );
}

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:opacity-50";
export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 font-semibold text-primary transition-colors hover:bg-secondary";
