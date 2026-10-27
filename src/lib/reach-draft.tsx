import { createContext, useContext, useState, type ReactNode } from "react";
import { en } from "@/content/en";

export const REACH_NOTE_LIMIT = 300;
export type ReachTone = (typeof en.reachForMe.draft.tones)[number];
export type ReachTemplateCategory = keyof typeof en.reachForMe.templates;
export function buildReachDraft(category: string | undefined, tone: ReachTone, note: string) {
  const key = category && Object.hasOwn(en.reachForMe.templates, category) ? category as ReachTemplateCategory : "other";
  const index = en.reachForMe.draft.tones.indexOf(tone);
  const template = en.reachForMe.templates[key][index] ?? en.reachForMe.templates.other[0];
  const extra = note.slice(0, REACH_NOTE_LIMIT).trim();
  return extra ? `${template}\n\n${en.reachForMe.noteSuffix} ${extra}` : template;
}

type Visit = { category: string | undefined; note: string; text: string; tone: ReachTone };
const emptyVisit = (): Visit => ({ category: undefined, note: "", text: "", tone: en.reachForMe.draft.tones[0] });
const ReachContext = createContext<{
  visit: Visit;
  update: (values: Partial<Visit>) => void;
  clear: () => void;
} | undefined>(undefined);

/** Scoped to the Reach parent route: leaving it discards all visit data. */
export function ReachDraftProvider({ children }: { children: ReactNode }) {
  const [visit, setVisit] = useState(emptyVisit);
  return <ReachContext.Provider value={{ visit, update: (values) => setVisit((current) => ({ ...current, ...values })), clear: () => setVisit(emptyVisit()) }}>{children}</ReachContext.Provider>;
}
export function useReachDraft() {
  const value = useContext(ReachContext);
  if (!value) throw new Error("REACH_CONTEXT_MISSING");
  return value;
}