// Installs privacy-safe console handling on the server and swallows global
// error events so their messages are never printed.
import { installSafeConsole, logCode } from "./safe-log";

installSafeConsole();

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => {
    (event as Event).preventDefault?.();
    logCode("UNHANDLED_ERROR");
  });
  globalThis.addEventListener("unhandledrejection", (event) => {
    (event as Event).preventDefault?.();
    logCode("UNHANDLED_ERROR");
  });
}
