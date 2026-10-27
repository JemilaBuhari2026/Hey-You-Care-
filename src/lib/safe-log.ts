/**
 * Privacy-safe logging. The ONLY way the app records an error.
 * Emits a fixed short code plus a timestamp — never messages, stacks, causes,
 * request/response bodies or user text.
 */
export type LogCode = "UI_ERROR" | "SERVER_ERROR" | "SSR_ERROR" | "AI_CALL_FAILED" | "UNHANDLED_ERROR";

const original = console.error.bind(console);

export function formatLogLine(code: LogCode, at: Date = new Date()): string {
  return `[${code}] ${at.toISOString()}`;
}

export function logCode(code: LogCode): void {
  original(formatLogLine(code));
}

let installed = false;

/**
 * Replace console.error/warn globally so any layer (framework internals, h3,
 * React) that logs an error object or text is reduced to a fixed code.
 */
export function installSafeConsole(): void {
  if (installed) return;
  installed = true;
  console.error = () => logCode("UNHANDLED_ERROR");
  console.warn = () => logCode("UNHANDLED_ERROR");
}
