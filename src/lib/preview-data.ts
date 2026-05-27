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
  // === Bayern-Batch-3 Hero-Upgrade (24) ===
  "hotel-exquisit-oberstdorf": {
    slug: "hotel-exquisit-oberstdorf",
    name: "Hotel Exquisit",
    city: "Oberstdorf",
    brandColor: "#2C4A2E",
    brandColorDark: "#233B25",
    heroImage: "https://storage.tramino.net/hotel-exquisit/1507906/800.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Wagner",
    mockRoom: "14",
  },
  "hotel-filser-fuessen": {
    slug: "hotel-filser-fuessen",
    name: "Hotel Filser",
    city: "Füssen",
    brandColor: "#6B8E6F",
    brandColorDark: "#567259",
    heroImage: "https://www.hotel-filser-fuessen.de/media/yrewrite_seo_image/hotel-filser-fuessen-aussen_hotel-aussen-sommer-2023-20210711_201345_filter-travel_filser.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Schmidt",
    mockRoom: "22",
  },
  "hotel-zum-hechten-fuessen": {
    slug: "hotel-zum-hechten-fuessen",
    name: "Hotel Zum Hechten",
    city: "Füssen",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: "https://www.hotel-hechten.com/andsrv/content/files/resized/2115.567x378m1.223.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Becker",
    mockRoom: "8",
  },
  "hotel-hirsch-fuessen": {
    slug: "hotel-hirsch-fuessen",
    name: "Hotel Hirsch",
    city: "Füssen",
    brandColor: "#722F37",
    brandColorDark: "#5B262C",
    heroImage: "https://www.hotelhirsch.de/images/slider/startseite/hotel-hirsch-fuessen-mit-restaurant.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Meier",
    mockRoom: "203",
  },
  "berghotel-sonnenklause-sonthofen": {
    slug: "berghotel-sonnenklause-sonthofen",
    name: "Berghotel Sonnenklause",
    city: "Sonthofen",
    brandColor: "#2C4A2E",
    brandColorDark: "#233B25",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Kraus",
    mockRoom: "12",
  },
  "hotel-pfrontener-hof": {
    slug: "hotel-pfrontener-hof",
    name: "Hotel Pfrontener Hof",
    city: "Pfronten",
    brandColor: "#2C4A2E",
    brandColorDark: "#233B25",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Vogt",
    mockRoom: "9",
  },
  "hotel-berghof-pfronten": {
    slug: "hotel-berghof-pfronten",
    name: "Hotel Berghof",
    city: "Pfronten",
    brandColor: "#2C4A2E",
    brandColorDark: "#233B25",
    heroImage: "https://www.berghof-pfronten.de/media/img_medium/k-10012-hotel-aussen_sto5885_simon-toplak.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Lehmann",
    mockRoom: "15",
  },
  "allgaeu-art-hotel-kempten": {
    slug: "allgaeu-art-hotel-kempten",
    name: "Allgäu ART Hotel",
    city: "Kempten",
    brandColor: "#2D3748",
    brandColorDark: "#242A39",
    heroImage: "https://allgaeuarthotel.de/wp-content/uploads/2025/07/zimmer-allgaeu-art-hotel-balkon-06.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Müller",
    mockRoom: "302",
  },
  "hotel-fuerstenhof-kempten": {
    slug: "hotel-fuerstenhof-kempten",
    name: "Hotel Fürstenhof",
    city: "Kempten",
    brandColor: "#475569",
    brandColorDark: "#394454",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Klein",
    mockRoom: "118",
  },
  "hotel-weisses-ross-memmingen": {
    slug: "hotel-weisses-ross-memmingen",
    name: "Hotel Weisses Ross",
    city: "Memmingen",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Beck",
    mockRoom: "7",
  },
  "yachthotel-helvetia-lindau": {
    slug: "yachthotel-helvetia-lindau",
    name: "YachtHotel Helvetia",
    city: "Lindau",
    brandColor: "#1E3A5F",
    brandColorDark: "#182E4C",
    heroImage: "https://images.squarespace-cdn.com/content/v1/6554cb0effaa2c073ef8124f/e6d9af97-0f19-4f0e-b639-9ac9bff3b47b/aussenansicht_dachterrasse_yachthotel_helvetia_lindau_bodensee--6.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Bauer",
    mockRoom: "42",
  },
  "burghotel-nuernberg": {
    slug: "burghotel-nuernberg",
    name: "Burghotel Nürnberg",
    city: "Nürnberg",
    brandColor: "#A0735C",
    brandColorDark: "#805C4A",
    heroImage: "https://le-cdn.website-editor.net/s/3ccdcad78cb4428cb0c09b567c7f2b03/dms3rep/multi/opt/IMG_9755-1920w.JPEG",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Hoffmann",
    mockRoom: "18",
  },
  "hotel-am-jakobsmarkt-nuernberg": {
    slug: "hotel-am-jakobsmarkt-nuernberg",
    name: "Hotel am Jakobsmarkt",
    city: "Nürnberg",
    brandColor: "#475569",
    brandColorDark: "#394454",
    heroImage: "https://www.hotel-am-jakobsmarkt.de/fileadmin/_processed_/0/1/csm_Rezeption_9f62b21eba.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Walter",
    mockRoom: "207",
  },
  "hotel-drei-raben-nuernberg": {
    slug: "hotel-drei-raben-nuernberg",
    name: "Hotel Drei Raben",
    city: "Nürnberg",
    brandColor: "#722F37",
    brandColorDark: "#5B262C",
    heroImage: "https://www.hoteldreiraben.de/cms/cache/cead92be222684997fce20724a7d217c.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Schmitt",
    mockRoom: "11",
  },
  "hotel-bayerischer-hof-bayreuth": {
    slug: "hotel-bayerischer-hof-bayreuth",
    name: "Hotel Bayerischer Hof",
    city: "Bayreuth",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Wagner",
    mockRoom: "35",
  },
  "hotel-alte-reichsbank-schweinfurt": {
    slug: "hotel-alte-reichsbank-schweinfurt",
    name: "Hotel Alte Reichsbank",
    city: "Schweinfurt",
    brandColor: "#A0735C",
    brandColorDark: "#805C4A",
    heroImage: "https://www.altereichsbank.de/images/hotelfront_480.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Roth",
    mockRoom: "4",
  },
  "hotel-goldener-karpfen-aschaffenburg": {
    slug: "hotel-goldener-karpfen-aschaffenburg",
    name: "Hotel Goldener Karpfen",
    city: "Aschaffenburg",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: "https://www.hotel-wilder-mann.de/wp-content/uploads/wm_banner_home.png",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Fischer",
    mockRoom: "21",
  },
  "hotel-frankenland-bad-kissingen": {
    slug: "hotel-frankenland-bad-kissingen",
    name: "Hotel Frankenland",
    city: "Bad Kissingen",
    brandColor: "#6B8E6F",
    brandColorDark: "#567259",
    heroImage: "https://www.hotel-frankenland.de/de/photos/crop__338950_t1__1280.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Lehmann",
    mockRoom: "302",
  },
  "kurparkhotel-das-kleinod-bad-kissingen": {
    slug: "kurparkhotel-das-kleinod-bad-kissingen",
    name: "Kurparkhotel Das Kleinod",
    city: "Bad Kissingen",
    brandColor: "#6B8E6F",
    brandColorDark: "#567259",
    heroImage: "https://das-kleinodhotel.de/wp-content/uploads/2021/05/Hotelansicht1.png",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Berg",
    mockRoom: "16",
  },
  "grand-hotel-kaiserhof-victoria-bad-kissingen": {
    slug: "grand-hotel-kaiserhof-victoria-bad-kissingen",
    name: "Grand Hotel Kaiserhof Victoria",
    city: "Bad Kissingen",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: "https://www.kaiserhof-victoria.de/wp-content/uploads/2021/08/kaiserhof-victoria-teaser-aussenansicht_02.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Wolf",
    mockRoom: "208",
  },
  "hotel-zur-sonne-dinkelsbuehl": {
    slug: "hotel-zur-sonne-dinkelsbuehl",
    name: "Hotel zur Sonne",
    city: "Dinkelsbühl",
    brandColor: "#A0735C",
    brandColorDark: "#805C4A",
    heroImage: "https://static.wixstatic.com/media/1109cd_8070ef7eb4564068a673b7fba063efb8~mv2.png/v1/fit/w_2500,h_1330,al_c/1109cd_8070ef7eb4564068a673b7fba063efb8~mv2.png",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Familie Schäfer",
    mockRoom: "5",
  },
  "hezelhof-hotel-dinkelsbuehl": {
    slug: "hezelhof-hotel-dinkelsbuehl",
    name: "Hezelhof Hotel",
    city: "Dinkelsbühl",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: "https://www.hezelhof.com/site/assets/files/1/kz8a9482.1200x0.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Mayer",
    mockRoom: "23",
  },
  "hotel-gruenwald-ansbach": {
    slug: "hotel-gruenwald-ansbach",
    name: "Hotel Grünwald",
    city: "Ansbach",
    brandColor: "#6B8E6F",
    brandColorDark: "#567259",
    heroImage: null,
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Frau Krüger",
    mockRoom: "10",
  },
  "hotel-strauss-hof": {
    slug: "hotel-strauss-hof",
    name: "Hotel Strauss",
    city: "Hof",
    brandColor: "#8B5A3C",
    brandColorDark: "#6F4830",
    heroImage: "https://www.hotel-strauss-hof.de/wp-content/uploads/2022/03/B34A8881b.jpg",
    serviceItems: DEFAULT_SERVICE_ITEMS,
    mockGuestName: "Herr Schulz",
    mockRoom: "17",
  },
};


export function getPreviewHotel(slug: string): PreviewHotel | null {
  return PREVIEW_HOTELS[slug] ?? null;
}

export const ALL_PREVIEW_SLUGS = Object.keys(PREVIEW_HOTELS);
