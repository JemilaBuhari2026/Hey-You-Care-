import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, btnPrimary, btnSecondary } from "@/components/AppShell";
import { en } from "@/content/en";

const t = en.welcome;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: en.brand.name },
      { property: "og:description", content: en.brand.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <AppShell>
      <section className="pt-10 sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {en.brand.tagline}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          {t.headlineA} <span className="text-accent">{t.headlineAccent}</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">{t.intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/onboarding" className={btnPrimary}>{t.ctaPrimary}</Link>
          <Link to="/onboarding" hash="how" className={btnSecondary}>{t.ctaSecondary}</Link>
        </div>
        <div className="mt-10 rounded-3xl bg-secondary p-5 text-sm">
          <p>
            <strong>{t.goodToKnow.split(":")[0]}:</strong>{t.goodToKnow.split(":").slice(1).join(":")}
          </p>
          <Link to="/settings" className="mt-2 inline-block font-semibold text-primary underline underline-offset-4">
            {t.privacyLink}
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
