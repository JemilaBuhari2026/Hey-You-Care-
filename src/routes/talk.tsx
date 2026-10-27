import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { AppShell, Notice, chip } from "@/components/AppShell";
import { CompanionNotConnectedError, sendToCompanion, type ChatMessage } from "@/lib/companion";
import { en } from "@/content/en";
import cup from "@/assets/illus-cup.png.asset.json";

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

  async function send(raw: string) {
    const text = raw.trim();
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

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(draft);
  }

  function clearConversation() {
    setMessages([]);
    setDraft("");
    setStatus("idle");
  }

  return (
    <AppShell back={{ to: "/home", label: en.nav.home }} onExit={clearConversation}>
      <div className="flex items-center justify-between gap-3 pt-2">
        <h1 className="text-3xl">{t.heading}</h1>
        <button type="button" onClick={clearConversation} className={chip}>
          {t.endConversation}
        </button>
      </div>
      <div className="mt-4">
        <Notice>{t.aiBanner}</Notice>
      </div>

      <section aria-label={t.conversationLabel} aria-live="polite" className="mt-6 space-y-3 pb-40">
        <img src={cup.url} alt="" className="mx-auto w-[104px]" />
        <div className="max-w-[90%] rounded-3xl border border-border bg-card px-5 py-4">
          <span className="sr-only">{t.appSaid}</span>
          {t.opener}
        </div>
        {messages.length === 0 && (
          <ul aria-label={t.choicesLabel} className="flex flex-col items-start gap-3 pt-1">
            {t.choices.map((c) => (
              <li key={c}>
                <button type="button" className={chip} onClick={() => void send(c)}>
                  {c}
                </button>
              </li>
            ))}
          </ul>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-3xl px-5 py-3 ${
              m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border border-border bg-card"
            }`}
          >
            <span className="sr-only">{m.role === "user" ? t.youSaid : t.companionSaid}</span>
            {m.text}
          </div>
        ))}
        {status === "loading" && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t.sending}
          </p>
        )}
        {status === "not_connected" && <Notice>{t.notConnected}</Notice>}
        {status === "error" && <Notice tone="warn">{t.sendError}</Notice>}
      </section>

      <form
        onSubmit={onSubmit}
        className="fixed inset-x-0 bottom-[calc(var(--urgent-strip-h)+env(safe-area-inset-bottom))] z-30 border-t border-border bg-background"
      >
        <div className="mx-auto max-w-xl px-5 pb-2 pt-3">
          <div className="flex items-center gap-3">
            <label htmlFor="msg" className="sr-only">{t.messageLabel}</label>
            <input
              id="msg"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t.messagePlaceholder}
              autoComplete="off"
              className="min-h-12 w-full rounded-full border-2 border-input bg-card px-5 placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label={t.send}
              disabled={!draft.trim() || status === "loading"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-plum-hover disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <p className="mt-1 text-center text-sm text-muted-foreground">{t.notSaved}</p>
        </div>
      </form>
    </AppShell>
  );
}
