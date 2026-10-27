import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ConsentGate } from "@/components/ConsentGate";
import { getHomeOptions } from "@/lib/home-options";
import { LITTLE_LIGHTER_READY, SHOW_PLANNED_FEATURES, VERIFIED_RESOURCES_READY } from "@/lib/flags";
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
  it("shows four cards when planned features are shown", () => {
    const opts = getHomeOptions({ littleLighter: false, verifiedResources: false, showPlanned: true });
    expect(opts.map((o) => o.id)).toEqual(["talk", "reachForMe", "littleLighter", "findSupport"]);
    expect(opts.filter((o) => o.comingSoon).map((o) => o.id)).toEqual(["littleLighter", "findSupport"]);
  });
  it("shows two cards when planned features are hidden", () => {
    const ids = getHomeOptions({ littleLighter: false, verifiedResources: false, showPlanned: false }).map((o) => o.id);
    expect(ids).toEqual(["talk", "reachForMe"]);
  });
  it("readiness flags default to off and planned features default to shown", () => {
    expect(VERIFIED_RESOURCES_READY).toBe(false);
    expect(LITTLE_LIGHTER_READY).toBe(false);
    expect(SHOW_PLANNED_FEATURES).toBe(true);
  });
});

describe("Find support listings", () => {
  it("never shows a listing without a source and verification date", () => {
    const base = { name: "X", type: "emotional" as const, area: "Lagos", contactRoute: "-" };
    expect(showableListings([{ ...base, source: "", lastVerified: "2026-01-01" }])).toHaveLength(0);
    expect(showableListings([{ ...base, source: "Ministry", lastVerified: "" }])).toHaveLength(0);
  });
});
