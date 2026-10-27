export type SupportType = "emotional" | "pregnancy" | "practical";

export type SupportListing = {
  name: string;
  type: SupportType;
  area: string;
  contactRoute: string;
  source: string;
  lastVerified: string; // ISO date
};

/** Verified listings only. Empty until real services are checked. */
export const SUPPORT_LISTINGS: SupportListing[] = [];

/** A listing without a source and verification date is never shown. */
export const showableListings = (list: SupportListing[]) =>
  list.filter((l) => l.source.trim() !== "" && l.lastVerified.trim() !== "");

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;
