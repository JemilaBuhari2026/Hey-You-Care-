import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PlannedBadge, btnPrimary, btnSecondary, chip, textLink } from "@/components/AppShell";
import { findCategory } from "@/lib/reach-categories";
import { en } from "@/content/en";

const t = en.reachForMe.draft;

export const Route = createFileRoute("/reach-for-me/draft")({
  validateSearch: (s: Record<string, unknown>): { category?: string } =>
    typeof s.category === "string" && findCategory(s.category) ? { category: s.category } : {},
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
  component: Draft,
});

type Tone = (typeof t.tones)[number];

/** Nothing here is ever sent automatically. Copy and Share only act on the user's tap. */
function Draft() {
  const [tone, setTone] = useState<Tone>(t.tones[0]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "copyFail" | "noShare">("idle");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("copyFail");
    }
  }

  async function share() {
    if (!canShare) return setStatus("noShare");
    try {
      await navigator.share({ text });
    } catch {
      /* user cancelled: nothing to report */
    }
  }

  function clearDraft() {
    setText("");
    setStatus("idle");
  }

  return (
    <AppShell back={{ to: "/reach-for-me", label: en.nav.back }} onExit={clearDraft}>
      <h1 className="pt-2 text-4xl">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>

      <div role="group" aria-label={t.toneLabel} className="mt-5 flex flex-wrap gap-3">
        {t.tones.map((x) => (
          <button key={x} type="button" aria-pressed={tone === x} onClick={() => setTone(x)} className={chip}>
            {x}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t.toneNote}</p>

      <label htmlFor="draft" className="mt-5 block text-sm font-semibold text-sage-ink">{t.messageLabel}</label>
      <textarea
        id="draft"
        rows={7}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setStatus("idle");
        }}
        placeholder={t.messagePlaceholder}
        className="mt-1 w-full rounded-2xl border-2 border-input bg-card px-5 py-4 text-lg placeholder:text-muted-foreground"
      />

      <div className="mt-4 space-y-3">
        <button type="button" onClick={copy} disabled={!text.trim()} className={btnPrimary}>{t.copy}</button>
        <button type="button" onClick={share} disabled={!text.trim()} className={`${btnSecondary} disabled:opacity-50`}>{t.share}</button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-6 text-center text-sm font-semibold">
        {status === "copied" && t.copiedOk}
        {status === "copyFail" && t.copiedFail}
        {status === "noShare" && t.shareUnavailable}
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="inline-flex min-h-11 items-center gap-2 text-muted-foreground">
          <button type="button" disabled className="font-semibold underline underline-offset-4 disabled:cursor-not-allowed">
            {t.anotherVersion}
          </button>
          <PlannedBadge />
        </span>
        <Link to="/reach-for-me" className={`${textLink} inline-flex min-h-11 items-center`}>{t.cancel}</Link>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">{t.footnote}</p>
    </AppShell>
  );
}
