import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ConsentGate } from "@/components/ConsentGate";
import { getHomeOptions } from "@/lib/home-options";
import { LITTLE_LIGHTER_READY, VERIFIED_RESOURCES_READY } from "@/lib/flags";
import { showableListings } from "@/lib/support-directory";

describe("Welcome consent", () => {
  it("keeps Continue disabled until the checkbox is ticked", () => {
    const onContinue = vi.fn();
    render(<ConsentGate onContinue={onContinue} />);
    const btn = screen.getByRole("button", { name: "Continue" });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onContinue).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(btn).toBeEnabled();
    fireEvent.click(btn);
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});

describe("Home cards", () => {
  it("both flags default to off", () => {
    expect(VERIFIED_RESOURCES_READY).toBe(false);
    expect(LITTLE_LIGHTER_READY).toBe(false);
  });
  it("hides Find support and Little Lighter while their flags are off", () => {
    const ids = getHomeOptions({ littleLighter: false, verifiedResources: false }).map((o) => o.id);
    expect(ids).toEqual(["talk", "reachForMe"]);
  });
  it("shows exactly three cards once Little Lighter is ready and resources are not", () => {
    const ids = getHomeOptions({ littleLighter: true, verifiedResources: false }).map((o) => o.id);
    expect(ids).toEqual(["talk", "reachForMe", "littleLighter"]);
  });
});

describe("Find support listings", () => {
  it("never shows a listing without a source and verification date", () => {
    const base = { name: "X", type: "emotional" as const, area: "Lagos", contactRoute: "-" };
    expect(showableListings([{ ...base, source: "", lastVerified: "2026-01-01" }])).toHaveLength(0);
    expect(showableListings([{ ...base, source: "Ministry", lastVerified: "" }])).toHaveLength(0);
  });
});
