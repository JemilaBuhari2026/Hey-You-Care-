/**
 * Feature flags. Flip only when the feature is genuinely ready.
 * - VERIFIED_RESOURCES_READY: true only once every Find support listing has a
 *   checked source and verification date.
 * - LITTLE_LIGHTER_READY: true only once at least one activity is built.
 */
export const VERIFIED_RESOURCES_READY = false;
export const LITTLE_LIGHTER_READY = false;
/** Show not-yet-ready features on Home as "Coming soon" cards with an honest placeholder page. */
export const SHOW_PLANNED_FEATURES = true;
/** Fixed drafts do not need AI. Keep AI-only variations hidden until ready. */
export const AI_DRAFTS_ENABLED = false;
