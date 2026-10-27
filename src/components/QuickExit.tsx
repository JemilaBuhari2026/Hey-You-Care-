import { LogOut } from "lucide-react";
import { en } from "@/content/en";

/** Static neutral page in /public: loads even if the app bundle fails or is stale. */
export const EXIT_URL = "/exit.html";

/**
 * Quick Exit: immediately replaces the current page with a blank neutral page.
 *
 * - Uses location.replace, so Back does not return to this screen, and the full
 *   page load discards all in-memory app state (conversation, drafts).
 * - Calls onExit first so the screen also clears its own state explicitly.
 * - Its accessible description says it cannot erase browser history; the
 *   Privacy and data screen says the same visibly.
 */
export function QuickExit({ onExit }: { onExit?: () => void }) {
  function activate() {
    try {
      onExit?.();
    } finally {
      window.location.replace(EXIT_URL);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={activate}
        aria-label={en.quickExit.ariaLabel}
        aria-describedby="quick-exit-note"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-primary bg-card px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
      >
        <LogOut className="h-4 w-4" aria-hidden />
        {en.quickExit.label}
      </button>
      <span id="quick-exit-note" className="sr-only">
        {en.quickExit.notErased}
      </span>
    </>
  );
}
