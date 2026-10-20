import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";
import { QuickExit } from "@/components/QuickExit";
import { en } from "@/content/en";

const t = en.littleLighter;

export const Route = createFileRoute("/little-lighter")({
  head: () => ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LittleLighter,
});

const TINTS = ["bg-success/40", "bg-accent/15"] as const;

function LittleLighter() {
  return (
    <AppShell>
      <div className="flex items-center justify-between gap-2 pt-6">
        <h1 className="text-3xl font-semibold">{t.heading}</h1>
        <QuickExit />
      </div>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <div className="mt-8 space-y-4">
        {t.activities.map((a, i) => (
          <article key={a.title} className="rounded-3xl bg-card p-5 shadow-soft">
            <div className={`mb-4 flex h-24 items-center justify-center rounded-2xl text-5xl ${TINTS[i % TINTS.length]}`} aria-hidden>{a.emoji}</div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <PlannedBadge label={en.common.comingSoonBadge} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Notice>{t.notice}</Notice>
      </div>
    </AppShell>
  );
}
