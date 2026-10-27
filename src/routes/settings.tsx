import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Notice } from "@/components/AppShell";
import { en } from "@/content/en";

const t = en.settings;

export const Route = createFileRoute("/settings")({
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
  component: Settings,
});

const SECTIONS = [t.keeps, t.handles, t.counts, t.quickExit, t.deletion];

function Settings() {
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }}>
      <h1 className="pt-2 text-4xl">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <div className="mt-4">
        <Notice tone="warn">
          <strong>{t.draftStrong}</strong> {t.draftBody}
        </Notice>
      </div>
      <div className="mt-4 space-y-4">
        {SECTIONS.map((s) => (
          <Card key={s.title}>
            <h2 className="font-sans text-base font-semibold text-sage-ink">{s.title}</h2>
            <p className="mt-1">{s.body}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
