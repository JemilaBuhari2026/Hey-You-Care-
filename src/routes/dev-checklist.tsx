import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SafetyNotice } from "@/components/SafetyNotice";
import { SAFETY_CATEGORY_IDS } from "@/lib/safety";

/**
 * Developer-only review checklist.
 *
 * This route renders its content only in development builds
 * (import.meta.env.DEV). In production it shows a neutral unavailable
 * message, so internal technical detail is never exposed to ordinary users.
 * It is not linked from any user-facing navigation.
 */
export const Route = createFileRoute("/dev-checklist")({
  head: () => ({
    meta: [
      { title: "Developer checklist — Hey! You Care" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DevChecklist,
});

const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "Where user messages currently exist",
    items: [
      "Talk to me: messages live only in React component state (useState) on that screen. They are cleared by End conversation, Quick Exit, or leaving the page.",
      "Reach for me: the drafted message and the optional 'who' field live only in component state on that screen. Copy uses the system clipboard; nothing else leaves the device.",
      "No message text is sent to any server, because the AI companion is not connected.",
    ],
  },
  {
    title: "Browser storage",
    items: [
      "No localStorage, sessionStorage, IndexedDB or cookies are written by the app.",
      "Nothing persists across page loads.",
    ],
  },
  {
    title: "Analytics and error reporting",
    items: [
      "No third-party analytics are installed.",
      "src/lib/safe-log.ts is the only error logger: it prints a fixed code and timestamp, never messages or user text.",
      "Decision needed before pilot: whether any error reporting or analytics will be enabled in production, and under what consent.",
    ],
  },
  {
    title: "Server-side functions required for AI integration",
    items: [
      "A createServerFn chat endpoint that receives the in-memory conversation and returns the companion reply (browser must never call the AI provider directly).",
      "Routing through the Lovable AI Gateway so no provider keys reach the client.",
      "A safety layer designed with professionals (not keyword matching) that can trigger the appropriate safety guidance category.",
      "Rate limiting and abuse controls on the chat endpoint.",
    ],
  },
  {
    title: "Where API secrets must live",
    items: [
      "All provider keys must be stored as Lovable Cloud secrets and read only inside server-side handlers (process.env in server code).",
      "No secret may appear in client code, VITE_* variables, or the repository.",
    ],
  },
  {
    title: "Unresolved privacy and safety decisions",
    items: [
      "Final privacy policy and consent wording (currently placeholder).",
      "Data retention policy for when accounts/conversation storage are introduced.",
      "Verified Nigerian emergency numbers, hotlines and referral services for each safety category.",
      "Professionally reviewed response wording for distress, self-harm, baby safety, domestic abuse and medical emergencies.",
      "Whether Quick Exit should also cover shared-device risks beyond the app (e.g. browser history guidance).",
      "Nigerian Pidgin translation must be human-validated, not machine-translated.",
    ],
  },
  {
    title: "Tests that must pass before the AI is enabled",
    items: [
      "Existing routing and foundation tests (bunx vitest run) stay green.",
      "New tests: chat endpoint never exposes secrets; safety guidance renders the correct category; Quick Exit clears conversation state; no user text is persisted or logged.",
      "Manual safety review of real AI responses against each safety category with a qualified professional.",
    ],
  },
];

function DevChecklist() {
  if (!import.meta.env.DEV) {
    return (
      <AppShell>
        <h1 className="pt-6 text-2xl font-semibold">Page not available</h1>
        <p className="mt-2 text-muted-foreground">This page is only available during development.</p>
        <p className="mt-4">
          <Link to="/" className="text-primary underline underline-offset-4">Back to home</Link>
        </p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="pt-6 text-3xl font-semibold">Developer review checklist</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Internal development reference. Not linked from the user interface and not rendered in
        production builds. Status: development prototype — not safety- or privacy-reviewed.
      </p>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-3xl bg-card p-5 shadow-soft">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-3xl bg-card p-5 shadow-soft">
          <h2 className="text-xl font-semibold">Safety guidance placeholders</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The six categories the safety component must support. All wording is placeholder and
            unreviewed; no messages are currently detected, classified or monitored.
          </p>
          <div className="mt-4 space-y-3">
            {SAFETY_CATEGORY_IDS.map((id) => (
              <SafetyNotice key={id} category={id} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
