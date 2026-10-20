/**
 * Companion conversation service boundary.
 * The real implementation must call a server function (never the AI provider
 * directly from the browser) so no secret keys reach the client.
 * Not connected yet: it reports that honestly instead of inventing replies.
 */
export type ChatMessage = { id: string; role: "user" | "companion" | "system"; text: string };

export class CompanionNotConnectedError extends Error {
  constructor() {
    super("The AI companion is not connected yet.");
    this.name = "CompanionNotConnectedError";
  }
}

export async function sendToCompanion(_history: ChatMessage[]): Promise<ChatMessage> {
  await new Promise((r) => setTimeout(r, 600));
  throw new CompanionNotConnectedError();
}
