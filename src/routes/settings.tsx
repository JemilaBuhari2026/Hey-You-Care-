import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell, PlannedBadge } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Privacy and settings — Hey! You Care" },
      { name: "description", content: "How Hey! You Care handles your information, and the limits of the AI companion." },
      { property: "og:title", content: "Privacy and settings — Hey! You Care" },
      { property: "og:description", content: "How we handle your information, and the limits of the AI companion." },
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
      <h1 className="pt-6 text-3xl font-semibold">Privacy and settings</h1>
      <div className="mt-6 space-y-4">
        <Section title="Privacy">
          <p>This early version has no accounts and collects no personal details. A full privacy policy will be published before real use.</p>
        </Section>
        <Section title="What the AI can and can't do">
          <p>The companion uses AI. It can offer supportive conversation and practical ideas. It is not a doctor, midwife, therapist or emergency service, and it does not diagnose or treat any condition. AI can make mistakes.</p>
        </Section>
        <Section title="Your conversations">
          <p>Conversations stay on your screen only and disappear when you end them or leave the page. They are not stored.</p>
        </Section>
        <Section title="Account and data controls" planned>
          <p>Options to manage consent, download or delete your data will appear here once accounts exist.</p>
        </Section>
        <Section title="Language" planned>
          <label htmlFor="lang" className="block font-semibold text-foreground">Language</label>
          <select id="lang" disabled className="w-full rounded-xl border border-input bg-muted px-4 py-3">
            <option>English</option>
          </select>
          <p>Nigerian Pidgin is planned for a later version.</p>
        </Section>
        <Section title="Feedback or report a problem" planned>
          <p>A way to send feedback will be added soon.</p>
        </Section>
      </div>
    </AppShell>
  );
}
