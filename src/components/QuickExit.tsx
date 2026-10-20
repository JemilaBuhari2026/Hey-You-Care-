import { useNavigate } from "@tanstack/react-router";
import { DoorOpen } from "lucide-react";
import { en } from "@/content/en";

/**
 * Quick Exit: immediately leaves the current screen for a neutral exit page.
 *
 * - Keyboard and assistive-technology accessible (a real button with a label).
 * - Clears in-memory conversation state where the screen provides an onExit
 *   callback (e.g. Talk to me clears its messages before navigating).
 * - Does NOT claim to erase browser history, server logs or any other copies,
 *   and does not redirect to any third-party website.
 */
export function QuickExit({ onExit }: { onExit?: () => void }) {
  const navigate = useNavigate();

  function activate() {
    onExit?.();
    void navigate({ to: "/exit" });
  }

  return (
    <button
      type="button"
      onClick={activate}
      aria-label={en.quickExit.ariaLabel}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-destructive/40 bg-card px-4 py-2 text-sm font-semibold text-destructive shadow-soft transition-colors hover:bg-destructive hover:text-destructive-foreground"
    >
      <DoorOpen className="h-4 w-4" aria-hidden />
      {en.quickExit.label}
    </button>
  );
}
