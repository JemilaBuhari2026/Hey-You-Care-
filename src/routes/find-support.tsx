import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";

export const Route = createFileRoute("/find-support")({
  head: () => ({
    meta: [
      { title: "Find support — Hey! You Care" },
      { name: "description", content: "A planned directory of verified human and professional support." },
      { property: "og:title", content: "Find support — Hey! You Care" },
      { property: "og:description", content: "A planned directory of verified human and professional support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FindSupport,
});

function FindSupport() {
  return (
    <AppShell>
      <div className="flex items-center gap-2 pt-6">
        <h1 className="text-3xl font-semibold">Find support</h1>
        <PlannedBadge />
      </div>
      <p className="mt-3 text-muted-foreground">
        We're working on a list of verified human and professional support. We'll only add
        services once they've been checked, so this section is empty for now.
      </p>
      <div className="mt-6 space-y-4">
        <Notice tone="warn">
          <strong>If you or your baby are in immediate danger</strong>, contact local emergency
          services or go to the nearest hospital or health centre.
        </Notice>
        <Notice>
          In the meantime, your antenatal clinic, midwife, doctor or local primary health centre can
          help point you to support.
        </Notice>
      </div>
    </AppShell>
  );
}
