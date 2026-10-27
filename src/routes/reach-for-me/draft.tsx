import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { AppShell, textLink } from "@/components/AppShell";
import { ReachButton } from "@/components/ReachButton";
import { buildReachDraft, useReachDraft, type ReachTone } from "@/lib/reach-draft";
import { AI_DRAFTS_ENABLED } from "@/lib/flags";
import { en } from "@/content/en";

const t = en.reachForMe.draft;

export const Route = createFileRoute("/reach-for-me/draft")({
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

/** Nothing here is ever sent automatically. Copy and Share only act on the user's tap. */
export function Draft() {
  const { visit, update, clear } = useReachDraft();
  const text = visit.hasDraft ? visit.text : buildReachDraft(visit.category, visit.tone, visit.note);
  const [edited, setEdited] = useState(false);
  const [pendingTone, setPendingTone] = useState<ReachTone>();
  const [status, setStatus] = useState<"idle" | "copied" | "copyFail">("idle");
  const [canShare, setCanShare] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyAttempt = useRef(0);
  useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);
  useEffect(() => () => { copyAttempt.current += 1; }, []);
  useEffect(() => { if (pendingTone) dialog.current?.showModal(); }, [pendingTone]);

  function rebuild(tone: ReachTone) {
    copyAttempt.current += 1;
    update({ tone, text: buildReachDraft(visit.category, tone, visit.note), hasDraft: true });
    setEdited(false);
    setStatus("idle");
    setPendingTone(undefined);
  }

  async function copy() {
    const attempt = ++copyAttempt.current;
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(text);
      if (attempt === copyAttempt.current) setStatus("copied");
    } catch {
      if (attempt === copyAttempt.current) setStatus("copyFail");
    }
  }

  async function share() {
    if (!canShare) return;
    try {
      await navigator.share({ text });
    } catch {
      /* user cancelled: nothing to report */
    }
  }

  return (
    <AppShell back={{ to: "/reach-for-me", label: en.nav.back }} onExit={clear}>
      <h1 className="pt-2 text-4xl">{t.heading}</h1>
      <p className="mt-2 text-muted-foreground">{t.subheading}</p>

      <div role="group" aria-label={t.toneLabel} className="mt-5 flex flex-wrap gap-3">
        {t.tones.map((x) => (
          <ReachButton key={x} variant="tone" aria-pressed={visit.tone === x} onClick={() => {
            if (x === visit.tone) return;
            if (edited) setPendingTone(x); else rebuild(x);
          }}>
            {x}
          </ReachButton>
        ))}
      </div>

      <label htmlFor="draft" className="mt-5 block text-sm font-semibold text-sage-ink">{t.messageLabel}</label>
      <textarea
        id="draft"
        rows={7}
        value={text}
        onChange={(e) => {
          copyAttempt.current += 1;
          update({ text: e.target.value, hasDraft: true });
          setEdited(true);
          setStatus("idle");
        }}
        placeholder={t.messagePlaceholder}
        className="mt-1 w-full rounded-2xl border-2 border-input bg-card px-5 py-4 text-lg placeholder:text-muted-foreground"
      />
      {/[\[\]]/.test(text) && <p className="mt-2 text-sm text-muted-foreground">{t.brackets}</p>}

      <div className="mt-4 space-y-3">
        <ReachButton onClick={copy} disabled={!text.trim()}><Copy className="h-5 w-5" aria-hidden />{t.copy}</ReachButton>
        {canShare && <ReachButton variant="secondary" onClick={share} disabled={!text.trim()}><Share2 className="h-5 w-5" aria-hidden />{t.share}</ReachButton>}
      </div>
      <p aria-live="polite" className="mt-2 min-h-6 text-center text-sm font-semibold">
        {status === "copied" && t.copiedOk}
        {status === "copyFail" && t.copiedFail}
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">
        {AI_DRAFTS_ENABLED && <ReachButton variant="tone" disabled>{t.anotherVersion}</ReachButton>}
        <Link to="/reach-for-me" onClick={clear} className={`${textLink} inline-flex min-h-11 items-center`}>{t.cancel}</Link>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">{t.footnote}</p>
      {pendingTone && <dialog ref={dialog} aria-labelledby="replace-title" onCancel={() => setPendingTone(undefined)} className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-lg border border-border bg-card p-6 text-foreground">
        <h2 id="replace-title" className="text-xl">{t.replacePrompt}</h2>
        <div className="mt-5 space-y-3">
          <ReachButton onClick={() => rebuild(pendingTone)}>{t.replace}</ReachButton>
          <ReachButton variant="secondary" autoFocus onClick={() => setPendingTone(undefined)}>{t.keepMine}</ReachButton>
        </div>
      </dialog>}
    </AppShell>
  );
}
