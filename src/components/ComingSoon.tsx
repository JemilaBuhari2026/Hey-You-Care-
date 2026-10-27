import { AppShell } from "@/components/AppShell";
import { en } from "@/content/en";

/** Honest placeholder for a feature that is not built or verified yet. */
export function ComingSoon({ title, body }: { title: string; body: string }) {
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }}>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <h1 className="text-4xl">{title}</h1>
        <ComingSoonPill />
      </div>
      <p className="mt-4 text-lg">{body}</p>
    </AppShell>
  );
}

export function ComingSoonPill() {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">
      {en.home.comingSoon}
    </span>
  );
}
