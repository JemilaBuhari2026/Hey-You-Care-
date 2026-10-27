import { useEffect, useRef, useState } from "react";
import { en } from "@/content/en";

const t = en.welcome;

const base =
  "mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full px-6 py-3 text-lg font-bold transition-colors";
export const continueEnabled = `${base} bg-primary text-primary-foreground hover:bg-plum-hover active:scale-[0.98] active:bg-plum-hover`;
export const continueDisabled = `${base} cursor-not-allowed bg-secondary text-muted-foreground`;

/**
 * Required acknowledgement. The button's state comes straight from the
 * checkbox. It uses aria-disabled (not the disabled attribute) so it stays
 * focusable; taps are ignored while unticked. Nothing is stored.
 */
export function ConsentGate({ onContinue }: { onContinue: () => void }) {
  const [understood, setUnderstood] = useState(false);
  const boxRef = useRef<HTMLInputElement>(null);

  // A box ticked before the page finished loading on a slow phone is picked up here.
  useEffect(() => {
    if (boxRef.current?.checked) setUnderstood(true);
  }, []);

  return (
    <div>
      <label className="flex min-h-11 items-start gap-3">
        <input
          ref={boxRef}
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-0.5 h-7 w-7 shrink-0 accent-primary"
        />
        <span>{t.confirmLabel}</span>
      </label>
      <button
        type="button"
        aria-disabled={!understood}
        aria-describedby={understood ? undefined : "need-confirm"}
        className={understood ? continueEnabled : continueDisabled}
        onClick={() => {
          if (understood) onContinue();
        }}
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
