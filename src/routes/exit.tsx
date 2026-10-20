import { createFileRoute, Link } from "@tanstack/react-router";
import { en } from "@/content/en";

/**
 * Neutral exit screen for Quick Exit.
 *
 * Deliberately plain: no brand header, no navigation, no app wording beyond
 * what is needed to explain the state honestly. It does not claim that
 * browser history or any other records were erased.
 */
export const Route = createFileRoute("/exit")({
  head: () => ({
    meta: [
      { title: en.exit.title },
      { name: "description", content: en.exit.body },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ExitScreen,
});

function ExitScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <main id="main" className="max-w-md">
        <h1 className="text-2xl font-semibold">{en.exit.heading}</h1>
        <p className="mt-3">{en.exit.body}</p>
        <p className="mt-3 text-sm text-muted-foreground">{en.exit.notErased}</p>
        <p className="mt-6">
          <Link to="/" className="text-primary underline underline-offset-4">
            {en.exit.returnLink}
          </Link>
        </p>
      </main>
    </div>
  );
}
