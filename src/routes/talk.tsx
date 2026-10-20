import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Mic, Send, X, Loader2 } from "lucide-react";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";
import { QuickExit } from "@/components/QuickExit";
import { CompanionNotConnectedError, sendToCompanion, type ChatMessage } from "@/lib/companion";
import { en } from "@/content/en";

const t = en.talk;

export const Route = createFileRoute("/talk")({
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
  component: Talk,
});

type Status = "idle" | "loading" | "not_connected" | "error";

function Talk() {
  // Held in memory only: nothing is persisted, and leaving the page clears it.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || status === "loading") return;
    const next = [...messages, { id: crypto.randomUUID(), role: "user" as const, text }];
    setMessages(next);
    setDraft("");
    setStatus("loading");
    try {
      const reply = await sendToCompanion(next);
      setMessages((m) => [...m, reply]);
      setStatus("idle");
    } catch (err) {
      setStatus(err instanceof CompanionNotConnectedError ? "not_connected" : "error");
    }
  }

  function clearConversation() {
    setMessages([]);
    setDraft("");
    setStatus("idle");
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between gap-2 pt-4">
        <h1 className="text-2xl font-semibold">{t.heading}</h1>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button onClick={clearConversation} className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">
              <X className="h-4 w-4" aria-hidden /> {t.endConversation}
            </button>
          )}
          <QuickExit onExit={clearConversation} />
        </div>
      </div>
      <p className="mt-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium">
        {t.aiBanner}
      </p>

      <section aria-label={t.conversationLabel} aria-live="polite" className="mt-6 min-h-64 space-y-3">
        {messages.length === 0 && (
          <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
            <h2 className="text-xl font-semibold">{t.emptyHeading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.emptyBody}</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-3xl px-4 py-3 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-card shadow-soft"}`}>
            <span className="sr-only">{m.role === "user" ? t.youSaid : t.companionSaid}</span>
            {m.text}
          </div>
        ))}
        {status === "loading" && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t.sending}
          </p>
        )}
        {status === "not_connected" && (
          <Notice>
            <strong>{t.notConnected.split(":")[0]}:</strong>{t.notConnected.split(":").slice(1).join(":")}
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="warn">
            <strong>{t.sendError.split(".")[0]}.</strong>{t.sendError.split(".").slice(1).join(".")}
          </Notice>
        )}
      </section>

      <form onSubmit={onSubmit} className="sticky bottom-3 mt-6 rounded-3xl bg-card p-3 shadow-soft">
        <label htmlFor="msg" className="sr-only">{t.messageLabel}</label>
        <textarea
          id="msg"
          ref={inputRef}
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) onSubmit(e);
          }}
          placeholder={t.messagePlaceholder}
          className="w-full resize-none rounded-2xl bg-transparent p-2 outline-none"
        />
        <div className="flex items-center justify-between">
          <button type="button" disabled className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground" aria-label={t.voiceLabel}>
            <Mic className="h-4 w-4" aria-hidden /> {t.voice} <PlannedBadge />
          </button>
          <button type="submit" disabled={!draft.trim() || status === "loading"} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-50">
            {t.send} <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link to="/home" className="text-primary underline underline-offset-4">{en.common.backToHome}</Link>
      </p>
    </AppShell>
  );
}
