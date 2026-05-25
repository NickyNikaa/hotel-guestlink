import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requestService } from "../../../actions";
import { getLang, t } from "@/lib/i18n";

export default async function WishPage({
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
          <div className="text-5xl">📝</div>
          <h1 className="text-2xl font-semibold mt-2">Besondere Wünsche</h1>
          <p className="text-sm text-slate-500 mt-1">
            Allergien, Vorlieben oder Diät — wir kümmern uns
          </p>
        </header>

        <form action={requestService} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="serviceItemId" value={item.id} />
          <input type="hidden" name="subOption" value="wish" />
          <textarea
            name="freeNote"
            required
            rows={5}
            placeholder="z.B. Glutenfreies Brot bitte, Laktose-Unverträglichkeit, vegetarisch, …"
            className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base resize-none"
          />
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
          >
            Wunsch senden
          </button>
        </form>
      </div>
    </div>
  );
}
