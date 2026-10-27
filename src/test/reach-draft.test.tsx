import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { en } from "@/content/en";
import { REACH_CATEGORIES } from "@/lib/reach-categories";
import { AI_DRAFTS_ENABLED } from "@/lib/flags";
import { buildReachDraft, REACH_NOTE_LIMIT, ReachDraftProvider, useReachDraft } from "@/lib/reach-draft";
import { Draft } from "@/routes/reach-for-me/draft";
import { ReachForMe } from "@/routes/reach-for-me/index";

const navigate = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-router", async (original) => ({ ...await original<typeof import("@tanstack/react-router")>(), useNavigate: () => navigate, Link: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => <a href="#" onClick={onClick}>{children}</a> }));
vi.mock("@/components/QuickExit", () => ({ QuickExit: ({ onExit }: { onExit?: () => void }) => <button onClick={onExit}>Quick exit</button> }));

function StateProbe() {
  const { visit } = useReachDraft();
  return <output data-testid="visit">{JSON.stringify(visit)}</output>;
}
function mount(child: React.ReactNode) { return render(<ReachDraftProvider>{child}<StateProbe /></ReachDraftProvider>); }
function state() { return JSON.parse(screen.getByTestId("visit").textContent || "{}"); }
function edit(value: string) { fireEvent.change(screen.getByLabelText("Message draft"), { target: { value } }); }

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable: true, value: function () { this.setAttribute("open", ""); } });
  Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); navigate.mockClear(); });

describe("Fixed Reach templates", () => {
  for (const category of REACH_CATEGORIES) for (const tone of en.reachForMe.draft.tones) {
    it(`${category.slug} / ${tone} produces a nonempty draft under 60 words`, () => {
      const draft = buildReachDraft(category.slug, tone, "");
      expect(draft.trim().length).toBeGreaterThan(0);
      expect(draft).not.toContain("undefined");
      expect(draft.split(/\s+/).length).toBeLessThan(60);
    });
  }
  it("defaults to Something else and appends at most 300 note characters", () => {
    expect(buildReachDraft(undefined, en.reachForMe.draft.tones[0], "")).toBe(en.reachForMe.templates.other[0]);
    expect(REACH_NOTE_LIMIT).toBe(300);
    expect(buildReachDraft("meals", en.reachForMe.draft.tones[0], "x".repeat(301))).toBe(`${en.reachForMe.templates.meals[0]}\n\nHere's a bit more: ${"x".repeat(300)}`);
  });
  it("keeps AI variations disabled", () => { expect(AI_DRAFTS_ENABLED).toBe(false); });
});

describe("Reach controls", () => {
  it("carries category and optional note into a generated draft", () => {
    mount(<ReachForMe />);
    fireEvent.click(screen.getByLabelText("Help with meals"));
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "Soup would help." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(state().text).toBe(`${en.reachForMe.templates.meals[0]}\n\nHere's a bit more: Soup would help.`);
    expect(navigate).toHaveBeenCalledWith({ to: "/reach-for-me/draft" });
  });
  it("limits the note to 300 characters", () => {
    mount(<ReachForMe />);
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "x".repeat(301) } });
    expect(state().note.length).toBe(300);
  });
  it("rebuilds on tone change, and asks before replacing edits", () => {
    mount(<Draft />);
    fireEvent.click(screen.getByRole("button", { name: "Short and direct" }));
    expect(screen.getByLabelText("Message draft")).toHaveValue(en.reachForMe.templates.other[1]);
    edit("My own request");
    fireEvent.click(screen.getByRole("button", { name: "Warm but firm" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Keep mine" }));
    expect(screen.getByLabelText("Message draft")).toHaveValue("My own request");
    fireEvent.click(screen.getByRole("button", { name: "Warm but firm" }));
    fireEvent.click(screen.getByRole("button", { name: /^Replace$/ }));
    expect(screen.getByLabelText("Message draft")).toHaveValue(en.reachForMe.templates.other[2]);
  });
  it("allows a user to erase all text", () => { mount(<Draft />); edit(""); expect(screen.getByLabelText("Message draft")).toHaveValue(""); });
  it("preserves the note when the draft mounts in StrictMode, then clears on Back", () => {
    const view = render(<StrictMode><ReachDraftProvider pathname="/reach-for-me"><ReachForMe /><StateProbe /></ReachDraftProvider></StrictMode>);
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "Synthetic note" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    view.rerender(<StrictMode><ReachDraftProvider pathname="/reach-for-me/draft"><Draft /><StateProbe /></ReachDraftProvider></StrictMode>);
    expect(screen.getByLabelText("Message draft")).toHaveValue(`${en.reachForMe.templates.other[0]}\n\nHere's a bit more: Synthetic note`);
    view.rerender(<StrictMode><ReachDraftProvider pathname="/reach-for-me"><ReachForMe /><StateProbe /></ReachDraftProvider></StrictMode>);
    expect(state().note).toBe(""); expect(state().text).toBe("");
  });
  it("discards the visit when the parent unmounts", () => {
    const view = mount(<ReachForMe />);
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "Synthetic note" } });
    view.unmount(); mount(<ReachForMe />);
    expect(state().note).toBe("");
  });
  it("shows Copied only after success", async () => {
    let resolve: (() => void) | undefined;
    vi.mocked(navigator.clipboard.writeText).mockImplementation(() => new Promise<void>((done) => { resolve = done; }));
    mount(<Draft />);
    fireEvent.click(screen.getByRole("button", { name: "Copy message" }));
    expect(screen.queryByText("Copied", { exact: true })).not.toBeInTheDocument();
    resolve?.();
    await waitFor(() => expect(screen.getByText("Copied", { exact: true })).toBeInTheDocument());
  });
  it("reports clipboard failure without showing Copied", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error("synthetic failure"));
    mount(<Draft />);
    fireEvent.click(screen.getByRole("button", { name: "Copy message" }));
    await waitFor(() => expect(screen.getByText("Couldn't copy. Select the text and copy it yourself.")).toBeInTheDocument());
    expect(screen.queryByText("Copied", { exact: true })).not.toBeInTheDocument();
  });
  it("hides share without device support and hides Another version", () => {
    mount(<Draft />);
    expect(screen.queryByRole("button", { name: "Share message" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Another version" })).not.toBeInTheDocument();
  });
  it("opens the device share sheet with the exact edited text", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    mount(<Draft />); edit("My request");
    fireEvent.click(await screen.findByRole("button", { name: "Share message" }));
    expect(share).toHaveBeenCalledWith({ text: "My request" });
  });
  it("permits copying a draft with brackets", async () => {
    mount(<Draft />);
    fireEvent.click(screen.getByRole("button", { name: "Practical and specific" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy message" }));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(en.reachForMe.templates.other[3]));
  });
  for (const action of ["Cancel", "Quick exit"]) it(`${action} clears draft and note`, () => {
    mount(<><ReachForMe /><Draft /></>);
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "Private note" } });
    edit("Private draft");
    if (action === "Cancel") fireEvent.click(screen.getByRole("link", { name: "Cancel" }));
    else {
      const exit = screen.getAllByRole("button", { name: "Quick exit" }).at(-1);
      if (!exit) throw new Error("Missing Quick exit");
      fireEvent.click(exit);
    }
    expect(state().note).toBe(""); expect(state().text).toBe("");
  });
  it("neither screen writes storage, logs, or makes feature requests", () => {
    const storage = vi.spyOn(Storage.prototype, "setItem");
    const cookie = vi.spyOn(Document.prototype, "cookie", "set");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const xhr = vi.spyOn(XMLHttpRequest.prototype, "send");
    const logs = [vi.spyOn(console, "log"), vi.spyOn(console, "error"), vi.spyOn(console, "warn")];
    const indexedDB = { open: vi.fn() };
    vi.stubGlobal("indexedDB", indexedDB);
    mount(<><ReachForMe /><Draft /></>);
    fireEvent.change(screen.getByLabelText("Anything you want to add? (optional)"), { target: { value: "Synthetic note" } });
    edit("Synthetic draft");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(storage).not.toHaveBeenCalled(); expect(cookie).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled(); expect(xhr).not.toHaveBeenCalled();
    expect(indexedDB.open).not.toHaveBeenCalled();
    logs.forEach((log) => expect(log).not.toHaveBeenCalled());
    vi.unstubAllGlobals();
  });
});