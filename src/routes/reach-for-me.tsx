import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { ReachDraftProvider } from "@/lib/reach-draft";

export const Route = createFileRoute("/reach-for-me")({
  component: ReachLayout,
});

function ReachLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <ReachDraftProvider pathname={pathname}><Outlet /></ReachDraftProvider>;
}