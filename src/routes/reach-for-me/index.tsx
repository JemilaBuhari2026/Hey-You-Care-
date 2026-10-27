import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, btnPrimary } from "@/components/AppShell";
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
  const [choice, setChoice] = useState<string>();
  const navigate = useNavigate();
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }} onExit={() => setChoice(undefined)}>
      <h1 className="pt-2 text-4xl">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>
      <fieldset className="mt-5">
        <legend className="sr-only">{t.legend}</legend>
        <div className="space-y-3">
          {REACH_CATEGORIES.map((c) => (
            <label
              key={c.slug}
              className="flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card px-5 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary/40"
            >
              <input
                type="radio"
                name="help"
                value={c.slug}
                checked={choice === c.slug}
                onChange={() => setChoice(c.slug)}
                className="h-6 w-6 shrink-0 accent-primary"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        className={`${btnPrimary} mt-5`}
        onClick={() => navigate({ to: "/reach-for-me/draft", search: choice ? { category: choice } : {} })}
      >
        {t.continue}
      </button>
    </AppShell>
  );
}
