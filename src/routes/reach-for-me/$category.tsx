import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Notice, PlannedBadge, btnPrimary } from "@/components/AppShell";
import { QuickExit } from "@/components/QuickExit";
import { findCategory } from "@/lib/reach-categories";
import { en } from "@/content/en";

const t = en.reachForMe.draft;

export const Route = createFileRoute("/reach-for-me/$category")({
  loader: ({ params }) => {
    const category = findCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.category.label} — Reach for me` : "Reach for me";
    return {
      meta: [
        { title },
        { name: "description", content: t.description },
        { property: "og:title", content: title },
        { property: "og:description", content: t.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Draft,
});

function Draft() {
  const { category } = Route.useLoaderData();
  const [who, setWho] = useState("");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  }

  function clearDraft() {
    setWho("");
    setText("");
    setCopied("idle");
  }

  return (
    <AppShell>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Link to="/reach-for-me" className="inline-block text-sm text-primary underline underline-offset-4">{t.backLink}</Link>
        <QuickExit onExit={clearDraft} />
      </div>
      <h1 className="mt-3 text-3xl font-semibold">{category.label}</h1>
      <p className="mt-2 text-muted-foreground">{category.hint}</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="who" className="block font-semibold">{t.whoLabel} <span className="font-normal text-muted-foreground">{t.whoOptional}</span></label>
          <input id="who" value={who} onChange={(e) => setWho(e.target.value)} placeholder={t.whoPlaceholder} className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3" />
          <p className="mt-1 text-sm text-muted-foreground">{t.whoHint}</p>
        </div>
        <div>
          <label htmlFor="draft" className="block font-semibold">{t.messageLabel}</label>
          <textarea id="draft" rows={6} value={text} onChange={(e) => { setText(e.target.value); setCopied("idle"); }} placeholder={t.messagePlaceholder} className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3" />
        </div>
        <Notice>
          <span className="flex items-center gap-2"><strong>{t.aiHelpTitle}</strong> <PlannedBadge /></span>
          {t.aiHelpBody}
        </Notice>
        <button onClick={copy} disabled={!text.trim()} className={btnPrimary}>{t.copy}</button>
        <p aria-live="polite" className="text-sm">
          {copied === "ok" && t.copiedOk}
          {copied === "fail" && <span className="text-destructive">{t.copiedFail}</span>}
        </p>
      </div>
    </AppShell>
  );
}
