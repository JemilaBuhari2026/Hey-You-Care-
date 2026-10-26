import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuickExit, EXIT_URL } from "@/components/QuickExit";

describe("Quick Exit", () => {
  it("clears conversation state and replaces the page with the neutral exit page", () => {
    let conversation = ["I feel overwhelmed"];
    const replace = vi.fn();
    vi.stubGlobal("location", { ...window.location, replace });
    render(<QuickExit onExit={() => (conversation = [])} />);
    fireEvent.click(screen.getByRole("button", { name: /quick exit/i }));
    expect(conversation).toEqual([]);
    expect(replace).toHaveBeenCalledWith("/exit.html");
    vi.unstubAllGlobals();
  });

  it("exit page contains no app-identifying text", () => {
    const html = readFileSync(path.resolve(__dirname, "../../public", "." + EXIT_URL), "utf8");
    expect(html).toContain("<title>New Tab</title>");
    for (const word of ["hey", "you care", "conversation", "cleared", "mother", "pregnan", "wellbeing", "support"]) {
      expect(html.toLowerCase()).not.toContain(word);
    }
  });
});
