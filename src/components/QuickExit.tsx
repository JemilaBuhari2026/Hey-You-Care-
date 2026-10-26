import { DoorOpen } from "lucide-react";
import { en } from "@/content/en";

/** Static neutral page in /public: loads even if the app bundle fails or is stale. */
export const EXIT_URL = "/exit.html";

/**
 * Quick Exit: immediately replaces the current page with a blank neutral page.
 *
 * - Uses location.replace, so Back does not return to this screen, and the full
 *   page load discards all in-memory app state (conversation, drafts).
 * - Calls onExit first so the screen also clears its own state explicitly.
 * - Shows, before use, that it cannot erase browser history or other records.
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
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={activate}
        aria-label={en.quickExit.ariaLabel}
        aria-describedby="quick-exit-note"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-destructive/40 bg-card px-4 py-2 text-sm font-semibold text-destructive shadow-soft transition-colors hover:bg-destructive hover:text-destructive-foreground"
      >
        <DoorOpen className="h-4 w-4" aria-hidden />
        {en.quickExit.label}
      </button>
      <p id="quick-exit-note" className="max-w-[16rem] text-right text-xs text-muted-foreground">
        {en.quickExit.notErased}
      </p>
    </div>
  );
}
