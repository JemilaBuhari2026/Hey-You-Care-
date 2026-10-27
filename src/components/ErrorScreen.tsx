import { useEffect } from "react";
import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { logCode } from "@/lib/safe-log";
import { EXIT_URL } from "@/components/QuickExit";
import { en } from "@/content/en";

/** Neutral error screen: never shows or logs the error itself. */
export function ErrorScreen({ reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    logCode("UI_ERROR");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{en.error.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{en.error.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {en.error.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            {en.error.goHome}
          </a>
          <a
            href={EXIT_URL}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            {en.error.exit}
          </a>
        </div>
      </div>
    </div>
  );
}
