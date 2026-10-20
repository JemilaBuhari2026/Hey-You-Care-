export type ReachCategory = { slug: string; label: string; hint: string };

export const REACH_CATEGORIES: ReachCategory[] = [
  { slug: "listen", label: "Someone to listen", hint: "Time to talk without being fixed or judged." },
  { slug: "childcare", label: "Help with childcare", hint: "A break, a nap, or an extra pair of hands." },
  { slug: "meals", label: "Help with meals", hint: "Cooking, food drop-offs or shopping." },
  { slug: "errands", label: "Help with errands", hint: "Market runs, pharmacy, bills or queues." },
  { slug: "company", label: "Company or companionship", hint: "Someone to simply be around." },
  { slug: "appointment", label: "Help attending an appointment", hint: "Transport, company or minding the baby." },
  { slug: "other", label: "Other practical support", hint: "Anything else that would lighten the load." },
];

export const findCategory = (slug: string) => REACH_CATEGORIES.find((c) => c.slug === slug);
