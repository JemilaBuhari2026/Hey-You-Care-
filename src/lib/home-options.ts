import { LITTLE_LIGHTER_READY, VERIFIED_RESOURCES_READY } from "@/lib/flags";

export type HomeOptionId = "talk" | "reachForMe" | "littleLighter" | "findSupport";
export type HomeOption = { id: HomeOptionId; to: "/talk" | "/reach-for-me" | "/little-lighter" | "/find-support" };

/** Which cards Home shows. Unready features stay hidden behind their flag. */
export function getHomeOptions(
  flags = { littleLighter: LITTLE_LIGHTER_READY, verifiedResources: VERIFIED_RESOURCES_READY },
): HomeOption[] {
  const list: HomeOption[] = [
    { id: "talk", to: "/talk" },
    { id: "reachForMe", to: "/reach-for-me" },
  ];
  if (flags.littleLighter) list.push({ id: "littleLighter", to: "/little-lighter" });
  if (flags.verifiedResources) list.push({ id: "findSupport", to: "/find-support" });
  return list;
}
