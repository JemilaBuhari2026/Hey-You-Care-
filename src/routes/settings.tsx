import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";
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

function Section({ title, planned, children }: { title: string; planned?: boolean; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-soft">
      <h2 className="flex items-center gap-2 text-xl font-semibold">{title} {planned && <PlannedBadge />}</h2>
      <div className="mt-2 space-y-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function Settings() {
  return (
    <AppShell>
      <h1 className="pt-6 text-3xl font-semibold">{t.heading}</h1>
      <div className="mt-4">
        <Notice tone="warn">{t.reviewNotice}</Notice>
      </div>
      <div className="mt-6 space-y-4">
        <Section title={t.privacy.title}>
          <p>{t.privacy.body}</p>
        </Section>
        <Section title={en.quickExit.label}>
          <p>{en.quickExit.notErased}</p>
        </Section>
        <Section title={t.aiLimits.title}>
          <p>{t.aiLimits.body}</p>
          <p><strong className="text-foreground">{t.aiLimits.notConnected}</strong></p>
        </Section>
        <Section title={t.conversations.title}>
          <p>{t.conversations.body}</p>
          <p>{t.conversations.limits}</p>
        </Section>
        <Section title={t.accountControls.title} planned>
          <p>{t.accountControls.body}</p>
        </Section>
        <Section title={t.language.title} planned>
          <label htmlFor="lang" className="block font-semibold text-foreground">{t.language.label}</label>
          <select id="lang" disabled className="w-full rounded-xl border border-input bg-muted px-4 py-3">
            <option>{t.language.english}</option>
          </select>
          <p>{t.language.note}</p>
        </Section>
        <Section title={t.feedback.title} planned>
          <p>{t.feedback.body}</p>
        </Section>
      </div>
    </AppShell>
  );
}
