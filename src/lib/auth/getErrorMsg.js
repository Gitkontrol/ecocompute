import { normalizeAuthError } from "./normalizeError";
import { AUTH_ERROR_MESSAGES } from "./authErrorMessages";

export function getAuthErrorMessage(error) {
  const normalized = normalizeAuthError(error);

  return AUTH_ERROR_MESSAGES[normalized] || AUTH_ERROR_MESSAGES.UNKNOWN_ERROR;
}