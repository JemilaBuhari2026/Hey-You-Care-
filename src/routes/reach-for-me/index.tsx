import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ReachButton } from "@/components/ReachButton";
import { buildReachDraft, REACH_NOTE_LIMIT, useReachDraft } from "@/lib/reach-draft";
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

export function ReachForMe() {
  const { visit, update, clear } = useReachDraft();
  const navigate = useNavigate();
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }} onExit={clear}>
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
                checked={visit.category === c.slug}
                onChange={() => update({ category: c.slug })}
                className="h-6 w-6 shrink-0 accent-primary"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="reach-note" className="mt-5 block text-sm font-semibold text-sage-ink">{t.noteLabel}</label>
      <textarea id="reach-note" rows={3} maxLength={REACH_NOTE_LIMIT} value={visit.note} onChange={(event) => update({ note: event.target.value.slice(0, REACH_NOTE_LIMIT) })} className="mt-1 w-full rounded-2xl border-2 border-input bg-card px-5 py-4" />
      <p className="text-right text-sm text-muted-foreground">{visit.note.length}/{REACH_NOTE_LIMIT}</p>
      <ReachButton
        className="mt-5"
        onClick={() => {
          update({ text: buildReachDraft(visit.category, visit.tone, visit.note), hasDraft: true });
          navigate({ to: "/reach-for-me/draft" });
        }}
      >
        {t.continue}
      </ReachButton>
    </AppShell>
  );
}
