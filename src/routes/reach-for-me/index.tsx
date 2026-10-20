import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell, Notice } from "@/components/AppShell";
import { QuickExit } from "@/components/QuickExit";
import { REACH_CATEGORIES } from "@/lib/reach-categories";
import { en } from "@/content/en";

const t = en.reachForMe;

export const Route = createFileRoute("/reach-for-me/")({
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
  component: ReachForMe,
});

function ReachForMe() {
  return (
    <AppShell>
      <div className="flex items-center justify-between gap-2 pt-6">
        <h1 className="text-3xl font-semibold">{t.heading}</h1>
        <QuickExit />
      </div>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <ul className="mt-6 space-y-3">
        {REACH_CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link to="/reach-for-me/$category" params={{ category: c.slug }} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-soft hover:bg-secondary/50">
              <span>
                <span className="block font-semibold">{c.label}</span>
                <span className="block text-sm text-muted-foreground">{c.hint}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Notice>{t.notice}</Notice>
      </div>
    </AppShell>
  );
}
