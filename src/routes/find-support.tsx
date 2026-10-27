import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, chip } from "@/components/AppShell";
import { VERIFIED_RESOURCES_READY } from "@/lib/flags";
import { NIGERIAN_STATES, SUPPORT_LISTINGS, showableListings, type SupportType } from "@/lib/support-directory";
import { en } from "@/content/en";
import pin from "@/assets/illus-pin.png.asset.json";

const t = en.findSupport;

export const Route = createFileRoute("/find-support")({
  beforeLoad: () => {
    if (!VERIFIED_RESOURCES_READY) throw redirect({ to: "/home" });
  },
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

const TYPES = Object.keys(t.filters) as SupportType[];

function FindSupport() {
  const [state, setState] = useState("");
  const [type, setType] = useState<SupportType>("emotional");
  const listings = showableListings(SUPPORT_LISTINGS).filter(
    (l) => l.type === type && (!state || l.area.includes(state)),
  );

  return (
    <AppShell back={{ to: "/home", label: en.nav.home }}>
      <div className="flex items-center justify-between gap-3 pt-2">
        <h1 className="text-4xl">{t.heading}</h1>
        <img src={pin.url} alt="" className="w-[96px]" />
      </div>
      <p className="mt-2 text-muted-foreground">{t.body}</p>
      <label htmlFor="state" className="mt-4 block text-sm font-semibold text-sage-ink">{t.locationLabel}</label>
      <select
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="mt-1 min-h-14 w-full rounded-2xl border-2 border-input bg-card px-4"
      >
        <option value="">{t.locationPlaceholder}</option>
        {NIGERIAN_STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div role="group" aria-label={t.filtersLabel} className="mt-4 flex flex-wrap gap-3">
        {TYPES.map((k) => (
          <button key={k} type="button" aria-pressed={type === k} onClick={() => setType(k)} className={chip}>
            {t.filters[k]}
          </button>
        ))}
      </div>
      <ul className="mt-5 space-y-4">
        {listings.map((l) => (
          <li key={l.name}>
            <Card>
              <h2 className="text-2xl">{l.name}</h2>
              <p className="text-muted-foreground">{t.filters[l.type]} · {l.area}</p>
              <p className="font-semibold">{l.contactRoute}</p>
              <p className="text-sm text-muted-foreground">
                {t.source}: {l.source}. {t.lastVerified}: {l.lastVerified}.
              </p>
            </Card>
          </li>
        ))}
      </ul>
      {listings.length === 0 && <p className="mt-5 text-muted-foreground">{t.empty}</p>}
    </AppShell>
  );
}
