import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, btnPrimary, btnSecondary } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hey! You Care — You don't have to carry it all alone" },
      { name: "description", content: "An AI-powered supportive companion for pregnant women and new mothers. Feel heard, find support, take your next step." },
      { property: "og:title", content: "Hey! You Care" },
      { property: "og:description", content: "Feel heard. Find support. Take your next step." },
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
          Feel heard. Find support. Take your next step.
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          You don't have to carry it all <span className="text-accent">alone.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Hey! You Care is a gentle companion for pregnancy and your baby's first year. Talk
          things through, find a manageable next step, and put into words the help you need from
          the people around you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/onboarding" className={btnPrimary}>Let's talk</Link>
          <Link to="/onboarding" hash="how" className={btnSecondary}>Explore how it works</Link>
        </div>
        <div className="mt-10 rounded-3xl bg-secondary p-5 text-sm">
          <p>
            <strong>Good to know:</strong> the companion uses AI. It is not a doctor, midwife,
            therapist or emergency service.
          </p>
          <Link to="/settings" className="mt-2 inline-block font-semibold text-primary underline underline-offset-4">
            How we handle your privacy
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
