import { createFileRoute, redirect } from "@tanstack/react-router";

/** The "Before you start" step now lives on the Welcome screen. */
export const Route = createFileRoute("/onboarding")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
