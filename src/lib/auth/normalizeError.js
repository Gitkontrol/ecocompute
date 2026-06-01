import { AUTH_ERROR_CODES } from "./authErrorMap";

export function normalizeAuthError(error) {
  if (!error) return null;

  const code = error.code || error.message;

  switch (code) {
    case "invalid_credentials":
      return AUTH_ERROR_CODES.invalid_credentials;

    case "email_not_confirmed":
      return AUTH_ERROR_CODES.email_not_confirmed;

    case "email_exists":
      return AUTH_ERROR_CODES.email_exists;

    case "weak_password":
      return AUTH_ERROR_CODES.weak_password;

    case "over_email_send_rate_limit":    
      return AUTH_ERROR_CODES.over_email_send_rate_limit;

    case "session_not_found":
      return AUTH_ERROR_CODES.session_not_found;

    case "signup_disabled":
      return AUTH_ERROR_CODES.signup_disabled;    
    
    case "password_conflict":
      return AUTH_ERROR_CODES.password_conflict;

    case "password_character_length":
      return AUTH_ERROR_CODES.password_character_length;

    case "invalid_JWT":
      return AUTH_ERROR_CODES.invalid_JWT;

    default:
      return "Something went wrong. Please try again."; 

    
  }
}