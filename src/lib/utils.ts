import { randomBytes } from "crypto";

/**
 * URL-sicherer Token, z.B. "xK4nQv2WpL7M".
 * 12 Zeichen = ausreichend gegen Erraten.
 */
export function generateToken(length = 12): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(length);
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
}

export function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
