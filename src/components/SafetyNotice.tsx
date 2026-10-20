import { en } from "@/content/en";
import { getSafetyGuidance, type SafetyCategoryId } from "@/lib/safety";

/**
 * Safety guidance display (development placeholder).
 *
 * Renders the reviewed-placeholder guidance for one safety category. It is
 * shown only on the development checklist screen for now; once real guidance
 * is reviewed, the same component can be surfaced in the conversation flow
 * alongside a properly designed (non-keyword) safety layer.
 *
 * This component never claims messages are detected or monitored, and it
 * never lists unverified phone numbers, hotlines or providers.
 */
export function SafetyNotice({ category }: { category: SafetyCategoryId }) {
  const guidance = getSafetyGuidance(category);
  const content = en.safety.categories[guidance.id];

  return (
    <section
      aria-label={`Safety guidance: ${content.label}`}
      className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm"
    >
      <h3 className="font-semibold">{content.label}</h3>
      <p className="mt-1">{content.guidance}</p>
      {guidance.isPlaceholder && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {en.safety.placeholderNotice}
        </p>
      )}
    </section>
  );
}
