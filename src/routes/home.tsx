import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircleHeart, Feather, HandHeart, MapPin } from "lucide-react";
import { AppShell, PlannedBadge } from "@/components/AppShell";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Hey! You Care" },
      { name: "description", content: "Talk, lighten the load, ask for help, or find support." },
      { property: "og:title", content: "Home — Hey! You Care" },
      { property: "og:description", content: "Talk, lighten the load, ask for help, or find support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const OPTIONS = [
  { to: "/talk", title: "Talk to me", desc: "Say what's on your mind.", Icon: MessageCircleHeart, tint: "bg-secondary" },
  { to: "/little-lighter", title: "Little Lighter", desc: "Short activities to ease the mental load.", Icon: Feather, tint: "bg-success/40" },
  { to: "/reach-for-me", title: "Reach for me", desc: "Find the words to ask for help.", Icon: HandHeart, tint: "bg-accent/15" },
  { to: "/find-support", title: "Find support", desc: "Verified human and professional support.", Icon: MapPin, tint: "bg-muted", planned: true },
] as const;

function Home() {
  return (
    <AppShell>
      <h1 className="pt-6 text-3xl font-semibold">How are you, really?</h1>
      <p className="mt-2 text-muted-foreground">Choose whatever feels right today. There's no wrong place to start.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ to, title, desc, Icon, tint, ...rest }) => (
          <li key={to}>
            <Link to={to} className="flex h-full gap-4 rounded-3xl bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint} text-primary`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span>
                <span className="flex items-center gap-2 font-display text-lg font-semibold">
                  {title} {"planned" in rest && <PlannedBadge />}
                </span>
                <span className="block text-sm text-muted-foreground">{desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
