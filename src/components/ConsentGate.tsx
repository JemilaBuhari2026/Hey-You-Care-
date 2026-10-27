import { useState } from "react";
import { btnPrimary } from "@/components/AppShell";
import { en } from "@/content/en";

const t = en.welcome;

/** Required acknowledgement: Continue stays disabled until the box is ticked. Nothing is stored. */
export function ConsentGate({ onContinue }: { onContinue: () => void }) {
  const [understood, setUnderstood] = useState(false);
  return (
    <div>
      <label className="flex min-h-11 items-start gap-3">
        <input
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-0.5 h-7 w-7 shrink-0 accent-primary"
        />
        <span>{t.confirmLabel}</span>
      </label>
      <button
        type="button"
        className={`${btnPrimary} mt-6`}
        disabled={!understood}
        aria-describedby={understood ? undefined : "need-confirm"}
        onClick={onContinue}
      >
        {t.continue}
      </button>
      {!understood && (
        <p id="need-confirm" className="sr-only">
          {t.continueHint}
        </p>
      )}
    </div>
  );
}
