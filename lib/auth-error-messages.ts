import type { Dictionary } from "@/lib/i18n";

/** Maps a Firebase auth error code to a message from the active dictionary. */
export function getAuthErrorMessage(code: unknown, messages: Dictionary["authErrors"]): string {
  if (typeof code === "string" && messages.codes[code]) return messages.codes[code];
  return messages.fallback;
}

export function firebaseErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error && "code" in error) {
    return String((error as { code: unknown }).code);
  }
  return undefined;
}
