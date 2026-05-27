import { notFound } from "next/navigation";
import { getPreviewHotel, ALL_PREVIEW_SLUGS } from "@/lib/preview-data";
import { PreviewModeTabs } from "@/components/PreviewModeTabs";
import { HotelDashboardMock } from "@/components/HotelDashboardMock";
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
  if (!hotel) return { title: "Vorschau · Hotel-Sicht" };
  return {
    title: `Hotel-Sicht · Vorschau für ${hotel.name}`,
    description: `So sähe Ihr Reception-Dashboard aus — Tickets, Tagesübersicht, Statusverfolgung. Personalisierte Demo für ${hotel.name}.`,
  };
}

export default async function PreviewHotelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getPreviewHotel(slug);
  if (!hotel) return notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <PreviewModeTabs slug={hotel.slug} brandColor={hotel.brandColor} active="hotel" />

      <div className="max-w-md mx-auto px-4 pt-4">
        {/* Intro: erkläre wofür die Hotel-Sicht da ist */}
        <div className="text-center mb-5">
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: hotel.brandColor }}
          >
            Vorschau · Rezeption
          </p>
          <h1 className="text-xl font-semibold mt-1 leading-tight">
            So kommen die Wünsche bei Ihnen an
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Probieren Sie aus — klicken Sie auf <strong>Erledigt</strong> oder{" "}
            <strong>Übernehmen</strong>. So fühlt sich Ihr Backend an.
          </p>
        </div>

        <HotelDashboardMock hotel={hotel} />
      </div>

      <div className="max-w-md mx-auto px-4 pb-8 text-center text-xs text-slate-500 leading-relaxed">
        Diese Vorschau wurde individuell für {hotel.name} gebaut — von Nicole
        Emrich, Hotel Guestlink. Die Tickets sind Beispiele und werden in der
        Pilot-Version durch echte Anfragen Ihrer Gäste ersetzt.
      </div>
    </div>
  );
}
