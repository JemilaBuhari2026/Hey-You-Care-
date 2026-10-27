export type ReachCategory = { slug: string; label: string };

export const REACH_CATEGORIES: ReachCategory[] = [
  { slug: "listen", label: "Someone to listen" },
  { slug: "children", label: "Help with the baby or children" },
  { slug: "meals", label: "Help with meals" },
  { slug: "errands", label: "Help with errands" },
  { slug: "company", label: "Company" },
  { slug: "appointment", label: "Help getting to an appointment" },
  { slug: "professional", label: "Help finding professional support" },
  { slug: "other", label: "Something else" },
];

export const findCategory = (slug?: string) => REACH_CATEGORIES.find((c) => c.slug === slug);
