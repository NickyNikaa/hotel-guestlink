import { notFound } from "next/navigation";
import { getPreviewHotel, ALL_PREVIEW_SLUGS } from "@/lib/preview-data";
import { PreviewServices } from "@/components/PreviewServices";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return ALL_PREVIEW_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getPreviewHotel(slug);
  if (!hotel) return { title: "Vorschau" };
  return {
    title: `Hotel Guestlink — Vorschau für ${hotel.name}`,
    description: `Personalisierte Demo-Vorschau für ${hotel.name} in ${hotel.city}. Wie würde Ihr Gäste-Portal aussehen?`,
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getPreviewHotel(slug);
  if (!hotel) return notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Demo-Banner oben */}
      <div
        className="sticky top-0 z-40 text-white text-xs sm:text-sm py-2.5 px-4 flex items-center justify-between shadow-md"
        style={{ backgroundColor: hotel.brandColor }}
      >
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
            Vorschau
          </span>
          <span className="hidden sm:inline">
            Personalisierte Demo für {hotel.name}
          </span>
        </div>
        <a
          href="https://wa.me/4915206772337"
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition text-xs font-medium"
        >
          Pilot anfragen
        </a>
      </div>

      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        {hotel.heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hotel.heroImage}
              alt={hotel.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 0%, transparent 50%, ${hotel.brandColorDark}CC 100%)`,
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${hotel.brandColor} 0%, ${hotel.brandColorDark} 100%)`,
            }}
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white">
          <p className="text-xs uppercase tracking-[0.3em] opacity-90">
            Gäste-Portal · {hotel.city}
          </p>
          <h1
            className="text-3xl sm:text-5xl font-serif font-semibold mt-2 leading-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            {hotel.name}
          </h1>
          <p className="text-sm sm:text-base opacity-95 mt-2 max-w-md">
            So sähe das Gäste-Portal aus, wenn Sie das Tool in Ihrem Haus
            einsetzen.
          </p>
        </div>
      </div>

      {/* Mock Gast-Begrüßung */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-2">
        <div
          className="rounded-2xl p-5 shadow-sm border"
          style={{
            backgroundColor: `${hotel.brandColor}10`,
            borderColor: `${hotel.brandColor}30`,
          }}
        >
          <p className="text-xs uppercase tracking-wide font-semibold opacity-70">
            Beispiel-Gast
          </p>
          <h2 className="text-xl font-semibold mt-1">
            Willkommen, {hotel.mockGuestName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Zimmer {hotel.mockRoom} · Check-out morgen 11:00
          </p>
        </div>
      </div>

      {/* Service-Items */}
      <div className="max-w-md mx-auto px-4 py-4">
        <PreviewServices
          items={hotel.serviceItems}
          brandColor={hotel.brandColor}
          brandColorDark={hotel.brandColorDark}
          hotelName={hotel.name}
        />
      </div>

      {/* Footer / CTA */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-12 space-y-4">
        <div
          className="rounded-2xl p-6 text-white space-y-3"
          style={{ backgroundColor: hotel.brandColorDark }}
        >
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">
            Nächster Schritt
          </p>
          <h3 className="text-xl font-semibold leading-tight">
            Pilot in {hotel.city} — drei Plätze frei
          </h3>
          <p className="text-sm opacity-95 leading-relaxed">
            Als Pilothotel zahlen Sie nur 800 € einmalig statt 1.600 € — alle
            anfänglichen Anpassungen sind kostenlos. Wir schneiden das Tool
            gemeinsam auf Ihr Haus zu.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://wa.me/4915206772337"
              className="bg-white text-slate-800 font-medium py-2.5 rounded-lg text-center text-sm hover:opacity-90 transition"
            >
              WhatsApp
            </a>
            <a
              href="mailto:nicoleemrich@outlook.com?subject=Pilot-Interesse%20Hotel%20Guestlink"
              className="bg-white/20 backdrop-blur text-white font-medium py-2.5 rounded-lg text-center text-sm hover:bg-white/30 transition"
            >
              E-Mail
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 leading-relaxed pt-2">
          Diese Vorschau wurde individuell für {hotel.name} gebaut — von Nicole
          Emrich, Hotel Guestlink. Logo &amp; Bilder stammen von Ihrer Website
          und werden in der Pilot-Version durch eigenes Material ersetzt.
        </div>
      </div>
    </div>
  );
}
