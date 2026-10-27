import { LITTLE_LIGHTER_READY, SHOW_PLANNED_FEATURES, VERIFIED_RESOURCES_READY } from "@/lib/flags";

export type HomeOptionId = "talk" | "reachForMe" | "littleLighter" | "findSupport";
export type HomeOption = {
  id: HomeOptionId;
  to: "/talk" | "/reach-for-me" | "/little-lighter" | "/find-support";
  comingSoon: boolean;
};

type Flags = { littleLighter: boolean; verifiedResources: boolean; showPlanned: boolean };
const DEFAULTS: Flags = {
  littleLighter: LITTLE_LIGHTER_READY,
  verifiedResources: VERIFIED_RESOURCES_READY,
  showPlanned: SHOW_PLANNED_FEATURES,
};

/** Which cards Home shows. Unready features appear only as "Coming soon" when showPlanned is on. */
export function getHomeOptions(flags: Flags = DEFAULTS): HomeOption[] {
  const list: HomeOption[] = [
    { id: "talk", to: "/talk", comingSoon: false },
    { id: "reachForMe", to: "/reach-for-me", comingSoon: false },
  ];
  if (flags.littleLighter || flags.showPlanned)
    list.push({ id: "littleLighter", to: "/little-lighter", comingSoon: !flags.littleLighter });
  if (flags.verifiedResources || flags.showPlanned)
    list.push({ id: "findSupport", to: "/find-support", comingSoon: !flags.verifiedResources });
  return list;
}
