import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell, Card, Notice, PlannedBadge } from "@/components/AppShell";
import { LITTLE_LIGHTER_READY, SHOW_PLANNED_FEATURES } from "@/lib/flags";
import { ComingSoon } from "@/components/ComingSoon";
import { en } from "@/content/en";

const t = en.littleLighter;

export const Route = createFileRoute("/little-lighter")({
  beforeLoad: () => {
    if (!LITTLE_LIGHTER_READY && !SHOW_PLANNED_FEATURES) throw redirect({ to: "/home" });
  },
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

const TINTS = ["bg-sage", "bg-peach"] as const;

function LittleLighter() {
  // One-line switch: flip LITTLE_LIGHTER_READY in src/lib/flags.ts to show the real page.
  if (!LITTLE_LIGHTER_READY) return <ComingSoon title={en.littleLighter.heading} body={en.comingSoon.littleLighter} />;
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }}>
      <h1 className="pt-2 text-4xl">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <div className="mt-6 space-y-4">
        {t.activities.map((a, i) => (
          <Card key={a.title}>
            <div className={`mb-4 flex h-24 items-center justify-center rounded-2xl text-5xl ${TINTS[i % TINTS.length]}`} aria-hidden>{a.emoji}</div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl">{a.title}</h2>
              <PlannedBadge label={en.common.comingSoonBadge} />
            </div>
            <p className="mt-1 text-muted-foreground">{a.desc}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Notice>{t.notice}</Notice>
      </div>
    </AppShell>
  );
}
