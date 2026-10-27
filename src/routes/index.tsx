import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, Card, textLink } from "@/components/AppShell";
import { ConsentGate } from "@/components/ConsentGate";
import { EXIT_URL } from "@/components/QuickExit";
import { en } from "@/content/en";
import welcomeArt from "@/assets/illus-welcome.png.asset.json";

const t = en.welcome;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: en.brand.name },
      { property: "og:description", content: t.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <img src={welcomeArt.url} alt="" className="mx-auto w-[190px]" />
      <h1 className="mt-6 text-4xl leading-tight">{t.headline}</h1>
      <p className="mt-4 text-muted-foreground">{t.intro}</p>
      <Card className="mt-5 space-y-2">
        <h2 className="font-sans text-base font-semibold text-sage-ink">{t.beforeTitle}</h2>
        <p>{t.beforeAi}</p>
        <p>
          {t.beforeData}{" "}
          <Link to="/settings" className={textLink}>
            {t.privacyLink}
          </Link>
        </p>
      </Card>
      <div className="mt-6">
        <ConsentGate onContinue={() => navigate({ to: "/home" })} />
      </div>
      <p className="mt-4 text-center">
        <a href={EXIT_URL} className="inline-flex min-h-11 items-center font-medium underline underline-offset-4">
          {t.notNow}
        </a>
      </p>
    </AppShell>
  );
}
