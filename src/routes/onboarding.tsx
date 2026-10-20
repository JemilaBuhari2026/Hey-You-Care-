import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Notice, btnPrimary } from "@/components/AppShell";
import { en } from "@/content/en";

const t = en.onboarding;

export const Route = createFileRoute("/onboarding")({
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
  component: Onboarding,
});

function Onboarding() {
  const [understood, setUnderstood] = useState(false);
  return (
    <AppShell>
      <h1 id="how" className="pt-6 text-3xl font-semibold">{t.heading}</h1>
      <p className="mt-3 text-muted-foreground">{t.subheading}</p>
      <ol className="mt-6 space-y-4">
        {t.points.map(([title, desc], i) => (
          <li key={title} className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft">
            <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-primary">{i + 1}</span>
            <div>
              <h2 className="font-sans text-base font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <Notice>
          <strong>{t.privacyNotice.split(":")[0]}:</strong>{t.privacyNotice.split(":").slice(1).join(":")}
        </Notice>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-1 h-5 w-5 accent-primary"
        />
        <span>{t.confirmLabel}</span>
      </label>
      <div className="mt-6">
        {understood ? (
          <Link to="/home" className={btnPrimary}>{t.continue}</Link>
        ) : (
          <button className={btnPrimary} disabled aria-describedby="need-confirm">{t.continue}</button>
        )}
        {!understood && <p id="need-confirm" className="mt-2 text-sm text-muted-foreground">{t.continueHint}</p>}
      </div>
    </AppShell>
  );
}
