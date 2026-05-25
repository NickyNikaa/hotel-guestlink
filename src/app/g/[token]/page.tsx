import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requestService } from "./actions";
import { t, translateItemLabel } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function GuestPortal({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const lang = await getLang();
  const guest = await prisma.guest.findUnique({
    where: { token },
    include: { hotel: { include: { serviceItems: true } } },
  });
  if (!guest) return notFound();

  const items = guest.hotel.serviceItems
    .filter((i) => i.active)
    .sort((a, b) => a.sortIdx - b.sortIdx);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto pt-2 pb-8 space-y-5">
        <LanguageSwitcher current={lang} />

        <header className="text-center">
          <p className="text-sm text-slate-500">{guest.hotel.name}</p>
          <h1 className="text-2xl font-semibold mt-1">
            {t("welcome", lang)}, {guest.name}
          </h1>
          <p className="text-sm text-slate-500">
            {t("room", lang)} {guest.room}
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
            {t("howCanWeHelp", lang)}
          </h2>
          {items.map((item) =>
            item.type === "simple" ? (
              <form action={requestService} key={item.id}>
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="serviceItemId" value={item.id} />
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-brand hover:text-white border border-slate-200 rounded-xl px-4 py-4 text-left flex items-center gap-3 transition"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-medium flex-1">
                    {translateItemLabel(item.label, lang)}
                  </span>
                </button>
              </form>
            ) : (
              <Link
                key={item.id}
                href={`/g/${token}/r/${item.id}`}
                className="w-full bg-white hover:bg-brand hover:text-white border border-slate-200 rounded-xl px-4 py-4 text-left flex items-center gap-3 transition"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-medium flex-1">
                  {translateItemLabel(item.label, lang)}
                </span>
                <span className="text-slate-400">›</span>
              </Link>
            ),
          )}
        </section>

        <p className="text-xs text-slate-400 text-center pt-4">
          {t("footerNote", lang)}
        </p>
      </div>
    </div>
  );
}
