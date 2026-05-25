import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requestService } from "../../../actions";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export default async function BookBreakfastPage({
  params,
}: {
  params: Promise<{ token: string; itemId: string }>;
}) {
  const { token, itemId } = await params;
  const lang = await getLang();
  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) return notFound();

  const item = await prisma.serviceItem.findUnique({ where: { id: itemId } });
  if (!item || item.hotelId !== guest.hotelId) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto pt-4 space-y-6">
        <Link
          href={`/g/${token}/r/${item.id}`}
          className="text-sm text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
        >
          ← {t("back", lang)}
        </Link>

        <header className="text-center">
          <div className="text-5xl">🥐</div>
          <h1 className="text-2xl font-semibold mt-2">
            {t("breakfastBookTitle", lang)}
          </h1>
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <p className="text-slate-700">
            Möchten Sie Frühstück für Ihren Aufenthalt verbindlich dazu buchen?
          </p>
          <p className="text-sm text-slate-500">
            Die Kosten werden über Ihre Hotelrechnung verrechnet. Die Rezeption
            spricht Sie für Details (Anzahl Personen, Tage) noch einmal an.
          </p>
        </div>

        <form action={requestService} className="space-y-3">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="serviceItemId" value={item.id} />
          <input type="hidden" name="subOption" value="book" />
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
          >
            Ja, verbindlich buchen
          </button>
        </form>

        <Link
          href={`/g/${token}/r/${item.id}`}
          className="block text-center text-slate-500 hover:text-slate-700 py-2"
        >
          {t("cancel", lang)}
        </Link>
      </div>
    </div>
  );
}
