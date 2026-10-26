import { createFileRoute } from "@tanstack/react-router";
import { en } from "@/content/en";

/**
 * Neutral exit screen. Quick Exit normally goes to the static /exit.html
 * (works without the app bundle); this route is a blank equivalent in case
 * /exit is ever opened directly. It contains no app-identifying text.
 */
export const Route = createFileRoute("/exit")({
  head: () => ({
    meta: [{ title: en.exit.title }, { name: "robots", content: "noindex" }],
  }),
  component: ExitScreen,
});

function ExitScreen() {
  return <main id="main" className="min-h-screen bg-background" />;
}
