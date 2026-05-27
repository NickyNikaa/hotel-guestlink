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
  street?: string;
  // Wirkung
  brandColor: string; // Tailwind / inline color (hex)
  brandColorDark: string;
  // Visuals
  heroImage: string | null; // absolute URL (vom Hotel selbst). null → Gradient-Hero
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
    brandColor: "#A0735C",
    brandColorDark: "#7A5440",
    heroImage:
      "https://altstadthotelaugsburg.de/wp-content/uploads/2025/12/Eingangshalle_1-scaled.jpeg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Müller",
    mockRoom: "204",
  },
  // === Deutschland-Batch 1 (10 Hotels) ===
  "boutique-hotel-poppenbuetteler-hof-hamburg": {
    slug: "boutique-hotel-poppenbuetteler-hof-hamburg",
    name: "Boutique Hotel Poppenbütteler Hof",
    city: "Hamburg",
    brandColor: "#2D3748",
    brandColorDark: "#1A202C",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5d53c5092ee2de0001dcd4a1/1567156722090-KE3UISGYCG2BUIM78F7D/Boutique+Hotel+Hamburg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Schmidt",
    mockRoom: "12",
  },
  "klassik-altstadt-hotel-luebeck": {
    slug: "klassik-altstadt-hotel-luebeck",
    name: "Klassik Altstadt Hotel",
    city: "Lübeck",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage:
      "https://www.klassik-altstadt-hotel.de/wp-content/uploads/2019/10/klassik-altstadt-hotel-angebot-guenter-grass-suite.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Lange",
    mockRoom: "7",
  },
  "lindenkrug-hannover": {
    slug: "lindenkrug-hannover",
    name: "Lindenkrug Hannover",
    city: "Hannover",
    brandColor: "#2C4A2E",
    brandColorDark: "#1F351F",
    heroImage: null, // nur Logo verfügbar → Gradient-Hero
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Krause",
    mockRoom: "21",
  },
  "hotel-martha-dresden": {
    slug: "hotel-martha-dresden",
    name: "Hotel Martha Dresden",
    city: "Dresden",
    brandColor: "#6B8E6F",
    brandColorDark: "#566F58",
    heroImage:
      "https://hotel-martha.de/wp-content/uploads/2025/09/Header-Hotel-Martha-Startseite.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Weber",
    mockRoom: "32",
  },
  "das-kleine-hotel-weimar": {
    slug: "das-kleine-hotel-weimar",
    name: "Das Kleine Hotel",
    city: "Weimar",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: null, // nur Logo verfügbar → Gradient-Hero
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Hofmann",
    mockRoom: "5",
  },
  "hotel-drei-kronen-koeln": {
    slug: "hotel-drei-kronen-koeln",
    name: "Hotel Drei Kronen",
    city: "Köln",
    brandColor: "#722F37",
    brandColorDark: "#5B252C",
    heroImage:
      "https://www.hotel-drei-kronen.de/uploads/images/logo/logo3.png",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Becker",
    mockRoom: "108",
  },
  "hotel-west-frankfurt": {
    slug: "hotel-west-frankfurt",
    name: "Hotel West an der Bockenheimer Warte",
    city: "Frankfurt am Main",
    brandColor: "#2C4A2E",
    brandColorDark: "#1F351F",
    heroImage:
      "https://lirp.cdn-website.com/7c679edf/dms3rep/multi/opt/Hotel+West+2026-1920w.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Wagner",
    mockRoom: "204",
  },
  "hotel-villa-huegel-trier": {
    slug: "hotel-villa-huegel-trier",
    name: "Hotel Villa Hügel",
    city: "Trier",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage:
      "https://hotel-villa-huegel.de/wp-content/uploads/2017/10/MG_7282-1.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Schäfer",
    mockRoom: "Suite 12",
  },
  "hotel-schwarzwaelder-hof-freiburg": {
    slug: "hotel-schwarzwaelder-hof-freiburg",
    name: "Hotel Schwarzwälder Hof",
    city: "Freiburg im Breisgau",
    brandColor: "#2C4A2E",
    brandColorDark: "#1F351F",
    heroImage:
      "https://www.schwarzwaelder-hof.com/wp-content/uploads/2017/09/schwarzwaelder-hof_header_home.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Bauer",
    mockRoom: "18",
  },
  "hotel-crystal-saarbruecken": {
    slug: "hotel-crystal-saarbruecken",
    name: "Hotel Crystal",
    city: "Saarbrücken",
    brandColor: "#475569",
    brandColorDark: "#374152",
    heroImage: null, // nur Logo verfügbar → Gradient-Hero
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Hoffmann",
    mockRoom: "411",
  },
};

export function getPreviewHotel(slug: string): PreviewHotel | null {
  return PREVIEW_HOTELS[slug] ?? null;
}

export const ALL_PREVIEW_SLUGS = Object.keys(PREVIEW_HOTELS);
