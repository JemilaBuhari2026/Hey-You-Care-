import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";

export const Route = createFileRoute("/little-lighter")({
  head: () => ({
    meta: [
      { title: "Little Lighter — Hey! You Care" },
      { name: "description", content: "Short, optional activities to help lighten the mental load." },
      { property: "og:title", content: "Little Lighter — Hey! You Care" },
      { property: "og:description", content: "Short, optional activities to help lighten the mental load." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LittleLighter,
});

const ACTIVITIES = [
  { title: "Worry-Eating Monster", desc: "Write down a worry and feed it to a friendly monster. Let it hold it for a while.", tint: "bg-success/40", emoji: "👾" },
  { title: "Drama Queen Court", desc: "Put a nagging thought on trial and gently weigh the evidence for and against it.", tint: "bg-accent/15", emoji: "👑" },
];

function LittleLighter() {
  return (
    <AppShell>
      <h1 className="pt-6 text-3xl font-semibold">Little Lighter</h1>
      <p className="mt-2 text-muted-foreground">
        Small, optional moments to reflect, ground yourself, or simply smile. Do as much or as
        little as you like.
      </p>
      <div className="mt-8 space-y-4">
        {ACTIVITIES.map((a) => (
          <article key={a.title} className="rounded-3xl bg-card p-5 shadow-soft">
            <div className={`mb-4 flex h-24 items-center justify-center rounded-2xl text-5xl ${a.tint}`} aria-hidden>{a.emoji}</div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <PlannedBadge label="Coming soon" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Notice>These are wellbeing activities, not clinical treatments.</Notice>
      </div>
    </AppShell>
  );
}
