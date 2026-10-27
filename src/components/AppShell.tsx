import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { en } from "@/content/en";
import { QuickExit } from "@/components/QuickExit";
import logo from "@/assets/illus-logo.png.asset.json";

type Back = { to: string; label: string; params?: Record<string, string> };

/**
 * Shared page frame: skip link, top bar (logo or back link + Quick exit in the
 * same place on every screen), centred mobile-first column, and a fixed
 * "Need urgent help?" strip at the bottom.
 */
export function AppShell({
  children,
  back,
  showLogo = false,
  onExit,
  showUrgent = true,
}: {
  children: ReactNode;
  back?: Back;
  showLogo?: boolean;
  onExit?: () => void;
  showUrgent?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {en.nav.skipToContent}
      </a>
      <header className="mx-auto flex min-h-20 max-w-xl items-center justify-between gap-3 px-5 pt-4">
        {back ? (
          <Link
            to={back.to}
            params={back.params}
            className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 font-medium text-primary hover:text-plum-hover"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden /> {back.label}
          </Link>
        ) : showLogo ? (
          <Link to="/home" aria-label={en.home.logoAlt} className="inline-flex min-h-11 items-center">
            <img src={logo.url} alt="" className="h-[46px] w-auto" />
          </Link>
        ) : (
          <span />
        )}
        <QuickExit onExit={onExit} />
      </header>
      <main id="main" className={`mx-auto max-w-xl px-5 ${showUrgent ? "pb-28" : "pb-12"}`}>
        {children}
      </main>
      {showUrgent && (
        <nav
          aria-label={en.nav.urgentStripLabel}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card"
        >
          <div className="mx-auto flex max-w-xl justify-center px-5 py-2">
            <Link
              to="/safety-guidance"
              className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 hover:text-plum-hover"
            >
              {en.nav.urgentHelp}
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

/** Clearly labels features that are not built yet. */
export function PlannedBadge({ label = en.common.plannedBadge }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/40 bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
      {label}
    </span>
  );
}

/** Lilac information notice, or the amber "placeholder / draft" notice. */
export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      role="note"
      className={`rounded-2xl p-4 text-sm ${
        tone === "warn"
          ? "border-2 border-placeholder-border bg-placeholder text-placeholder-foreground"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {children}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}

export const btnPrimary =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-plum-hover disabled:cursor-not-allowed disabled:opacity-50";
export const btnSecondary =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3 text-lg font-semibold text-primary transition-colors hover:bg-secondary";
export const chip =
  "inline-flex min-h-11 items-center rounded-full border-2 border-primary bg-card px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary aria-pressed:bg-primary aria-pressed:text-primary-foreground";
export const textLink = "font-semibold text-primary underline underline-offset-4 hover:text-plum-hover";
