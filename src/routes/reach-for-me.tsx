import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ReachDraftProvider } from "@/lib/reach-draft";

export const Route = createFileRoute("/reach-for-me")({
  component: () => <ReachDraftProvider><Outlet /></ReachDraftProvider>,
});