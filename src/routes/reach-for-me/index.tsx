import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell, Notice } from "@/components/AppShell";
import { REACH_CATEGORIES } from "@/lib/reach-categories";

export const Route = createFileRoute("/reach-for-me/")({
  head: () => ({
    meta: [
      { title: "Reach for me — Hey! You Care" },
      { name: "description", content: "Find the words to ask for practical or emotional support." },
      { property: "og:title", content: "Reach for me — Hey! You Care" },
      { property: "og:description", content: "Find the words to ask for practical or emotional support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReachForMe,
});

function ReachForMe() {
  return (
    <AppShell>
      <h1 className="pt-6 text-3xl font-semibold">Reach for me</h1>
      <p className="mt-2 text-muted-foreground">Asking for help is hard. Let's find the words together. What would help most?</p>
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
        <Notice>Nothing is ever sent for you. You decide whether, when and to whom you share a message.</Notice>
      </div>
    </AppShell>
  );
}
