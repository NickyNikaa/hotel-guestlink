import Link from "next/link";

type Props = {
  slug: string;
  brandColor: string;
  active: "guest" | "hotel";
};

export function PreviewModeTabs({ slug, brandColor, active }: Props) {
  const guestActive = active === "guest";
  const hotelActive = active === "hotel";

  const tabBase =
    "flex-1 text-center py-3 text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1.5";

  return (
    <div
      className="sticky top-0 z-40 shadow-md text-white"
      style={{ backgroundColor: brandColor }}
    >
      <div className="flex items-stretch">
        <Link
          href={`/preview/${slug}`}
          aria-current={guestActive ? "page" : undefined}
          className={`${tabBase} ${
            guestActive
              ? "bg-white/20 border-b-2 border-white"
              : "border-b-2 border-transparent hover:bg-white/10"
          }`}
        >
          <span>📱</span>
          <span>Gast-Sicht</span>
        </Link>
        <Link
          href={`/preview/${slug}/hotel`}
          aria-current={hotelActive ? "page" : undefined}
          className={`${tabBase} ${
            hotelActive
              ? "bg-white/20 border-b-2 border-white"
              : "border-b-2 border-transparent hover:bg-white/10"
          }`}
        >
          <span>🛎️</span>
          <span>Hotel-Sicht</span>
        </Link>
        <a
          href="https://wa.me/4915206772337"
          className="hidden sm:flex items-center bg-white/20 hover:bg-white/30 px-4 text-xs font-medium transition"
        >
          Pilot anfragen
        </a>
      </div>
    </div>
  );
}
