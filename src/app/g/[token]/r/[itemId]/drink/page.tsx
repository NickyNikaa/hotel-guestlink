import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requestService } from "../../../actions";

const DRINKS = [
  { value: "Kaffee", emoji: "☕" },
  { value: "Cappuccino", emoji: "☕" },
  { value: "Espresso", emoji: "☕" },
  { value: "Latte Macchiato", emoji: "🥛" },
  { value: "Schwarzer Tee", emoji: "🍵" },
  { value: "Grüner Tee", emoji: "🍵" },
  { value: "Heiße Schokolade", emoji: "🍫" },
  { value: "Orangensaft", emoji: "🧃" },
];

export default async function DrinkPage({
  params,
}: {
  params: Promise<{ token: string; itemId: string }>;
}) {
  const { token, itemId } = await params;
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
          ← Zurück
        </Link>

        <header className="text-center">
          <div className="text-5xl">☕</div>
          <h1 className="text-2xl font-semibold mt-2">Getränk vorbestellen</h1>
          <p className="text-sm text-slate-500 mt-1">
            Wartet zur gewünschten Uhrzeit am Frühstückstisch auf Sie
          </p>
        </header>

        <form action={requestService} className="space-y-5">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="serviceItemId" value={item.id} />
          <input type="hidden" name="subOption" value="drink" />

          <div>
            <span className="block text-sm font-medium text-slate-700 mb-2">
              Getränk
            </span>
            <div className="grid grid-cols-2 gap-2">
              {DRINKS.map((d, idx) => (
                <label
                  key={d.value}
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-brand transition has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:border-brand"
                >
                  <input
                    type="radio"
                    name="drink"
                    value={d.value}
                    defaultChecked={idx === 0}
                    required
                    className="sr-only"
                  />
                  <span>{d.emoji}</span>
                  <span className="font-medium text-sm">{d.value}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="drinkTime"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Uhrzeit am Frühstück
            </label>
            <input
              id="drinkTime"
              type="time"
              name="drinkTime"
              defaultValue="08:00"
              required
              className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
          >
            Bestellen
          </button>
        </form>
      </div>
    </div>
  );
}
