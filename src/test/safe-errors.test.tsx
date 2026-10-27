import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { ErrorScreen } from "@/components/ErrorScreen";
import { formatLogLine, installSafeConsole, logCode } from "@/lib/safe-log";

const SECRET = "I am scared to tell my husband how I feel";

afterEach(() => vi.restoreAllMocks());

describe("privacy-safe error handling", () => {
  it("log line contains only a code and timestamp", () => {
    expect(formatLogLine("AI_CALL_FAILED", new Date("2026-01-01T00:00:00Z"))).toBe(
      "[AI_CALL_FAILED] 2026-01-01T00:00:00.000Z",
    );
  });

  it("a thrown error's text never reaches logs or the screen", async () => {
    const out: string[] = [];
    const capture = (...a: unknown[]) => out.push(a.map((x) => (x instanceof Error ? `${x.message} ${x.stack}` : String(x))).join(" "));
    for (const m of ["error", "warn", "log", "info"] as const) vi.spyOn(console, m).mockImplementation(capture);
    installSafeConsole();
    console.error(new Error(SECRET, { cause: SECRET }));
    console.warn(SECRET);
    logCode("SERVER_ERROR");

    const rootRoute = createRootRoute({
      component: () => {
        throw new Error(SECRET);
      },
      errorComponent: ErrorScreen,
    });
    const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory({ initialEntries: ["/"] }) });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText("This page didn't load")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Exit" })).toBeTruthy();

    expect(document.body.textContent).not.toContain(SECRET);
    expect(out.join("\n")).not.toContain(SECRET);
    expect(out.join("\n")).not.toContain("scared");
  });
});
