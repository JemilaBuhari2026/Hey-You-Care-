import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Notice, PlannedBadge } from "@/components/AppShell";
import { QuickExit } from "@/components/QuickExit";
import { en } from "@/content/en";

const t = en.findSupport;

export const Route = createFileRoute("/find-support")({
  head: () => ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FindSupport,
});

function FindSupport() {
  return (
    <AppShell>
      <div className="flex items-center justify-between gap-2 pt-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold">{t.heading}</h1>
          <PlannedBadge />
        </div>
        <QuickExit />
      </div>
      <p className="mt-3 text-muted-foreground">{t.body}</p>
      <div className="mt-6 space-y-4">
        <Notice tone="warn">
          <strong>{t.dangerNotice.split(",")[0]},</strong>{t.dangerNotice.split(",").slice(1).join(",")}
        </Notice>
        <Notice>{t.meantimeNotice}</Notice>
      </div>
    </AppShell>
  );
}
