import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Mic, Send, X, Loader2 } from "lucide-react";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";
import { CompanionNotConnectedError, sendToCompanion, type ChatMessage } from "@/lib/companion";

export const Route = createFileRoute("/talk")({
  head: () => ({
    meta: [
      { title: "Talk to me — Hey! You Care" },
      { name: "description", content: "A supportive conversation space with an AI companion." },
      { property: "og:title", content: "Talk to me — Hey! You Care" },
      { property: "og:description", content: "A supportive conversation space with an AI companion." },
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

  function endConversation() {
    setMessages([]);
    setDraft("");
    setStatus("idle");
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-semibold">Talk to me</h1>
        {messages.length > 0 && (
          <button onClick={endConversation} className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">
            <X className="h-4 w-4" aria-hidden /> End conversation
          </button>
        )}
      </div>
      <p className="mt-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium">
        You're talking with an AI companion — not a person or professional. Not for emergencies.
      </p>

      <section aria-label="Conversation" aria-live="polite" className="mt-6 min-h-64 space-y-3">
        {messages.length === 0 && (
          <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
            <h2 className="text-xl font-semibold">What's on your mind?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Big or small, say it however it comes out. This conversation isn't saved.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-3xl px-4 py-3 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-card shadow-soft"}`}>
            <span className="sr-only">{m.role === "user" ? "You said:" : "Companion said:"}</span>
            {m.text}
          </div>
        ))}
        {status === "loading" && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
          </p>
        )}
        {status === "not_connected" && (
          <Notice>
            <strong>Development preview:</strong> the AI companion isn't connected yet, so there's
            no reply. Your message was not sent anywhere or stored.
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="warn">
            <strong>Something went wrong.</strong> Your message couldn't be sent. Please try again.
          </Notice>
        )}
      </section>

      <form onSubmit={onSubmit} className="sticky bottom-3 mt-6 rounded-3xl bg-card p-3 shadow-soft">
        <label htmlFor="msg" className="sr-only">Your message</label>
        <textarea
          id="msg"
          ref={inputRef}
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) onSubmit(e);
          }}
          placeholder="Type your message…"
          className="w-full resize-none rounded-2xl bg-transparent p-2 outline-none"
        />
        <div className="flex items-center justify-between">
          <button type="button" disabled className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground" aria-label="Voice input, planned">
            <Mic className="h-4 w-4" aria-hidden /> Voice <PlannedBadge />
          </button>
          <button type="submit" disabled={!draft.trim() || status === "loading"} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-50">
            Send <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link to="/home" className="text-primary underline underline-offset-4">Back to home</Link>
      </p>
    </AppShell>
  );
}
