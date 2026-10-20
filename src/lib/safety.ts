/**
 * Safety guidance boundary (development placeholder).
 *
 * This module defines the categories of safety guidance the app will
 * eventually surface, and exposes reviewed-placeholder content for each.
 *
 * IMPORTANT:
 * - Nothing here detects, classifies or monitors user messages. There is
 *   no crisis-detection system yet, and a simple keyword match must never
 *   be shipped as the final one.
 * - All guidance text is a placeholder. Verified Nigerian resources and
 *   professionally reviewed wording must be supplied before real use.
 * - The app never automatically contacts anyone and never discloses the
 *   user's messages.
 */

export type SafetyCategoryId =
  | "emotional-distress"
  | "immediate-danger"
  | "self-harm"
  | "baby-safety"
  | "domestic-abuse"
  | "medical-emergency";

export type SafetyGuidance = {
  id: SafetyCategoryId;
  /** True while the wording is an unreviewed placeholder. */
  isPlaceholder: true;
};

export const SAFETY_CATEGORY_IDS: SafetyCategoryId[] = [
  "emotional-distress",
  "immediate-danger",
  "self-harm",
  "baby-safety",
  "domestic-abuse",
  "medical-emergency",
];

/**
 * Returns the guidance entry for a category. Content is always placeholder
 * until a reviewed content set replaces it; the isPlaceholder flag exists so
 * the UI can keep labelling it honestly.
 */
export function getSafetyGuidance(id: SafetyCategoryId): SafetyGuidance {
  return { id, isPlaceholder: true };
}
