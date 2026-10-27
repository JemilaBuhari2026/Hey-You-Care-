import { describe, expect, it } from "vitest";
import { REACH_CATEGORIES } from "@/lib/reach-categories";
import { CompanionNotConnectedError, sendToCompanion } from "@/lib/companion";

describe("foundation rules", () => {
  it("offers the eight requested support categories", () => {
    expect(REACH_CATEGORIES).toHaveLength(8);
  });
  it("companion never fabricates a reply while not connected", async () => {
    await expect(sendToCompanion([])).rejects.toBeInstanceOf(CompanionNotConnectedError);
  });
});
