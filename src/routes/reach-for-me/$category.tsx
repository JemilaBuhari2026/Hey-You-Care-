import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Notice, PlannedBadge, btnPrimary } from "@/components/AppShell";
import { findCategory } from "@/lib/reach-categories";

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
        { name: "description", content: "Draft a message asking for support, in your own words." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Draft a message asking for support, in your own words." },
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

  return (
    <AppShell>
      <Link to="/reach-for-me" className="mt-4 inline-block text-sm text-primary underline underline-offset-4">← All kinds of help</Link>
      <h1 className="mt-3 text-3xl font-semibold">{category.label}</h1>
      <p className="mt-2 text-muted-foreground">{category.hint}</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="who" className="block font-semibold">Who might you ask? <span className="font-normal text-muted-foreground">(optional)</span></label>
          <input id="who" value={who} onChange={(e) => setWho(e.target.value)} placeholder="e.g. my sister, a neighbour" className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3" />
          <p className="mt-1 text-sm text-muted-foreground">Only choose someone you feel safe with.</p>
        </div>
        <div>
          <label htmlFor="draft" className="block font-semibold">Your message</label>
          <textarea id="draft" rows={6} value={text} onChange={(e) => { setText(e.target.value); setCopied("idle"); }} placeholder="Write it in your own words…" className="mt-1 w-full rounded-xl border border-input bg-card px-4 py-3" />
        </div>
        <Notice>
          <span className="flex items-center gap-2"><strong>AI help with wording</strong> <PlannedBadge /></span>
          Soon the companion will suggest gentle wording. For now, write it yourself — nothing here is saved or sent.
        </Notice>
        <button onClick={copy} disabled={!text.trim()} className={btnPrimary}>Copy message</button>
        <p aria-live="polite" className="text-sm">
          {copied === "ok" && "Copied. Paste it wherever you choose, when you're ready."}
          {copied === "fail" && <span className="text-destructive">Couldn't copy automatically. Please select the text and copy it.</span>}
        </p>
      </div>
    </AppShell>
  );
}
