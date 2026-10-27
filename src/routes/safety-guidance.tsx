import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { AppShell, Card, Notice, btnPrimary } from "@/components/AppShell";
import { SafetyNotice } from "@/components/SafetyNotice";
import { SAFETY_CATEGORY_IDS } from "@/lib/safety";
import { en } from "@/content/en";
import heart from "@/assets/illus-heart.png.asset.json";

const t = en.safetyGuidance;

export const Route = createFileRoute("/safety-guidance")({
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
  component: SafetyGuidance,
});

const label = "font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground";

/** Layout only. All wording and contacts are placeholders until reviewed. */
function SafetyGuidance() {
  return (
    <AppShell back={{ to: "/home", label: en.nav.home }} showUrgent={false}>
      <div className="flex items-center justify-between gap-3 pt-2">
        <h1 className="text-4xl leading-tight">{t.heading}</h1>
        <img src={heart.url} alt="" className="w-[104px]" />
      </div>
      <div className="mt-4">
        <Notice tone="warn">
          <span className="flex gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span><strong>{t.placeholderStrong}</strong> {t.placeholderBody}</span>
          </span>
        </Notice>
      </div>
      <Card className="mt-4">
        <h2 className={label}>{t.reviewedTitle}</h2>
        <p className="mt-2 text-lg">{t.reviewedBody}</p>
      </Card>
      <Card className="mt-4">
        <h2 className={label}>{t.contactsTitle}</h2>
        <div className="mt-3 rounded-2xl bg-background p-4">
          <p className="font-semibold">{t.contactName}</p>
          <p className="text-muted-foreground">{t.contactRoute}</p>
          <p className="text-sm text-muted-foreground">{t.contactSource}</p>
        </div>
        <p className="mt-3 text-muted-foreground">{t.contactsNote}</p>
      </Card>
      <section className="mt-6 space-y-3">
        <h2 className={label}>{t.categoriesTitle}</h2>
        {SAFETY_CATEGORY_IDS.map((id) => (
          <SafetyNotice key={id} category={id} />
        ))}
      </section>
      <Link to="/home" className={`${btnPrimary} mt-8`}>{t.endChat}</Link>
    </AppShell>
  );
}
