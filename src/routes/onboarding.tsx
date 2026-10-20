import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Notice, btnPrimary } from "@/components/AppShell";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "How Hey! You Care works" },
      { name: "description", content: "What the Hey! You Care companion can and cannot do, and how you stay in control." },
      { property: "og:title", content: "How Hey! You Care works" },
      { property: "og:description", content: "What the companion can and cannot do, and how you stay in control." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Onboarding,
});

const POINTS = [
  ["It uses AI", "You'll be talking with an AI companion, not a person."],
  ["It offers support and next steps", "Supportive conversation and practical ideas you can choose to try."],
  ["It is not a professional", "It is not a doctor, midwife, therapist or mental health professional, and does not diagnose."],
  ["You control what you share", "Share only what feels right. You can stop at any time."],
  ["Not for emergencies", "If you or your baby are in danger, contact local emergency services or go to the nearest hospital."],
];

function Onboarding() {
  const [understood, setUnderstood] = useState(false);
  return (
    <AppShell>
      <h1 id="how" className="pt-6 text-3xl font-semibold">Before we begin</h1>
      <p className="mt-3 text-muted-foreground">A few honest things about how this works.</p>
      <ol className="mt-6 space-y-4">
        {POINTS.map(([t, d], i) => (
          <li key={t} className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft">
            <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-primary">{i + 1}</span>
            <div>
              <h2 className="font-sans text-base font-semibold">{t}</h2>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <Notice>
          <strong>Privacy notice (placeholder):</strong> the full privacy policy and consent options
          will appear here once our data handling is finalised. Nothing you tick here is saved yet.
        </Notice>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-1 h-5 w-5 accent-primary"
        />
        <span>I understand the companion uses AI and is not a medical or emergency service.</span>
      </label>
      <div className="mt-6">
        {understood ? (
          <Link to="/home" className={btnPrimary}>Continue</Link>
        ) : (
          <button className={btnPrimary} disabled aria-describedby="need-confirm">Continue</button>
        )}
        {!understood && <p id="need-confirm" className="mt-2 text-sm text-muted-foreground">Tick the box above to continue.</p>}
      </div>
    </AppShell>
  );
}
