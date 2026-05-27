// Hardgecodete Preview-Hotels für Cold-Mail-Personalisierung.
// /preview/[slug] rendert eine personalisierte Ansicht für Verkaufs-Pitch.
// Keine DB, keine Tickets — nur eine Demo-Vorschau.

export type ServiceItemPreview = {
  id: string;
  label: string;
  emoji: string;
  type: "simple" | "scheduled" | "duration" | "menu" | "concierge";
};

export type PreviewHotel = {
  slug: string;
  name: string;
  city: string;
  street: string;
  // Wirkung
  brandColor: string; // Tailwind / inline color (hex)
  brandColorDark: string;
  // Visuals
  heroImage: string; // absolute URL (vom Hotel selbst)
  logoUrl?: string; // optional
  // Service-Katalog für Demo (hardgecodet, alle Hotels gleich für v1)
  serviceItems: ServiceItemPreview[];
  // Mock-Gast für Begrüßung
  mockGuestName: string;
  mockRoom: string;
};

const DEFAULT_SERVICE_ITEMS: ServiceItemPreview[] = [
  { id: "towels", label: "Handtuchwechsel", emoji: "🧺", type: "scheduled" },
  { id: "sheets", label: "Bettwäsche neu", emoji: "🛏️", type: "scheduled" },
  { id: "donotdisturb", label: "Nicht stören", emoji: "🚫", type: "duration" },
  { id: "breakfast", label: "Frühstück dazu buchen", emoji: "🍳", type: "menu" },
  { id: "drinks", label: "Getränk vorbestellen", emoji: "☕", type: "menu" },
  { id: "gift", label: "Geste / Überraschung", emoji: "🎁", type: "menu" },
  { id: "other", label: "Sonstige Wünsche", emoji: "💬", type: "simple" },
  { id: "concierge", label: "Concierge fragen", emoji: "🤖", type: "concierge" },
];

export const PREVIEW_HOTELS: Record<string, PreviewHotel> = {
  "altstadthotel-augsburg": {
    slug: "altstadthotel-augsburg",
    name: "Altstadthotel Augsburg",
    city: "Augsburg",
    street: "Kapuzinergasse 6",
    brandColor: "#A0735C", // warmer Bronze-Ton, passt zum historischen Altbau
    brandColorDark: "#7A5440",
    heroImage:
      "https://altstadthotelaugsburg.de/wp-content/uploads/2025/12/Eingangshalle_1-scaled.jpeg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Müller",
    mockRoom: "204",
  },
};

export function getPreviewHotel(slug: string): PreviewHotel | null {
  return PREVIEW_HOTELS[slug] ?? null;
}

export const ALL_PREVIEW_SLUGS = Object.keys(PREVIEW_HOTELS);
