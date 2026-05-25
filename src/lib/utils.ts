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

const windowLabels: Record<string, string> = {
  morning: "Vormittag (08–11 Uhr)",
  midday: "Mittag (11–14 Uhr)",
  afternoon: "Nachmittag (14–17 Uhr)",
  evening: "Abend (17–20 Uhr)",
};

/**
 * Liefert eine menschlich lesbare Zusammenfassung der Request-Parameter
 * für die Anzeige im Hotel-Ticket-Dashboard.
 */
export function formatParams(
  type: string,
  params: unknown,
): string {
  if (!params || typeof params !== "object") return "";
  const p = params as {
    date?: string;
    window?: string;
    time?: string;
    untilTime?: string;
    subOption?: string;
    drink?: string;
    drinkTime?: string;
    selectedItem?: string;
    quantity?: number;
    requestedTime?: string;
    recipient?: string;
  };

  // Frühstück-Sub-Options haben eigene Anzeige
  if (p.subOption === "book") return "Verbindlich dazu gebucht";
  if (p.subOption === "drink" && p.drink) {
    return p.drinkTime
      ? `${p.drink} · ${p.drinkTime} Uhr`
      : p.drink;
  }
  if (p.subOption === "wish") return "Besonderer Wunsch";

  // Menu / Roomdrinks / Gift
  if (p.selectedItem) {
    const parts = [p.selectedItem];
    if (p.quantity && p.quantity > 1) parts.push(`${p.quantity}×`);
    if (p.requestedTime) parts.push(`${p.requestedTime} Uhr`);
    if (p.recipient) parts.push(`für ${p.recipient}`);
    return parts.join(" · ");
  }

  if (type === "scheduled" && p.date) {
    const date = new Date(p.date).toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });
    if (p.time) return `${date} · ${p.time} Uhr`;
    if (p.window) return `${date} · ${windowLabels[p.window] ?? p.window}`;
    return date;
  }

  if (type === "duration" && p.untilTime) {
    const until = new Date(p.untilTime);
    const now = new Date();
    const time = until.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const isToday = until.toDateString() === now.toDateString();
    if (isToday) return `bis ${time} Uhr heute`;
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (until.toDateString() === tomorrow.toDateString()) {
      return `bis ${time} Uhr morgen`;
    }
    return `bis ${until.toLocaleDateString("de-DE")} ${time} Uhr`;
  }
  return "";
}
