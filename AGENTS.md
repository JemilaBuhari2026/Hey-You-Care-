<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Pages live in `src/routes`; shared frame/UI primitives in `src/components/AppShell.tsx`; data and service boundaries in `src/lib` — keeps presentation separate from logic.
- AI calls must go through `src/lib/companion.ts` → a server function; never call an AI provider from the browser (keeps keys server-side).
- Conversations are in-memory only; do not persist transcripts without an explicit consent design.
- Reach draft data stays in a React provider scoped to its parent route, never URLs or storage; child navigation carries the note, and leaving the draft or parent clears it.
- Unbuilt features must be labelled with `PlannedBadge`; never fabricate replies, providers or emergency numbers.
- Unready features are controlled by constants in `src/lib/flags.ts`: with SHOW_PLANNED_FEATURES on they show as "Coming soon" cards opening an honest placeholder page; flipping the feature's READY flag shows the real page — so nothing unverified is presented as working.
