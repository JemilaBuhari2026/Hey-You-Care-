import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Send, Leaf, MapPin } from "lucide-react";
import { AppShell, textLink } from "@/components/AppShell";
import { ComingSoonPill } from "@/components/ComingSoon";
import { getHomeOptions, type HomeOptionId } from "@/lib/home-options";
import { en } from "@/content/en";

const t = en.home;

export const Route = createFileRoute("/home")({
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
  component: Home,
});

const LOOK: Record<HomeOptionId, { Icon: typeof Leaf; tint: string; ink: string }> = {
  talk: { Icon: MessageSquare, tint: "bg-lilac", ink: "text-primary" },
  reachForMe: { Icon: Send, tint: "bg-peach", ink: "text-terracotta" },
  littleLighter: { Icon: Leaf, tint: "bg-sage", ink: "text-sage-ink" },
  findSupport: { Icon: MapPin, tint: "bg-lilac", ink: "text-primary" },
};

function Home() {
  return (
    <AppShell showLogo>
      <h1 className="pt-4 text-4xl leading-tight">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <ul className="mt-6 space-y-4">
        {getHomeOptions().map(({ id, to, comingSoon }) => {
          const { Icon, tint, ink } = LOOK[id];
          const copy = t.options[id];
          return (
            <li key={id}>
              <Link
                to={to}
                className="flex items-center gap-5 rounded-3xl border border-border bg-card p-5 transition-colors hover:bg-secondary/40"
              >
                <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${tint} ${ink}`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="flex flex-wrap items-center gap-2 font-display text-xl font-semibold text-ink">
                    {copy.title} {comingSoon && <ComingSoonPill />}
                  </span>
                  <span className="block text-muted-foreground">{copy.desc}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-center text-muted-foreground">{t.footnote}</p>
      <p className="text-center">
        <Link to="/settings" className={`${textLink} inline-flex min-h-11 items-center`}>{t.privacyLink}</Link>
      </p>
    </AppShell>
  );
}
