import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createGuest } from "./actions";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { requests: true } } },
  });

  const todayISO = new Date().toISOString().slice(0, 10);
  const checkoutDefault = new Date(Date.now() + 2 * 86400000)
    .toISOString()
    .slice(0, 10);

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-4">Neuen Gast anlegen</h1>
        <form action={createGuest} className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-sm">
            Name
            <input
              name="name"
              required
              placeholder="Familie Müller"
              className="border rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            E-Mail
            <input
              name="email"
              type="email"
              required
              placeholder="mueller@example.com"
              className="border rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Zimmer
            <input
              name="room"
              required
              placeholder="12"
              className="border rounded px-3 py-2 mt-1"
            />
          </label>
          <div />
          <label className="flex flex-col text-sm">
            Check-in
            <input
              name="checkIn"
              type="date"
              defaultValue={todayISO}
              required
              className="border rounded px-3 py-2 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Check-out
            <input
              name="checkOut"
              type="date"
              defaultValue={checkoutDefault}
              required
              className="border rounded px-3 py-2 mt-1"
            />
          </label>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white font-medium px-5 py-2.5 rounded"
            >
              Gast anlegen & QR generieren
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Aktuelle Gäste</h2>
        {guests.length === 0 ? (
          <p className="text-slate-500">
            Noch keine Gäste. Lege oben einen an.
          </p>
        ) : (
          <ul className="space-y-2">
            {guests.map((g) => (
              <li
                key={g.id}
                className="bg-white rounded-lg shadow-sm px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/dashboard/guests/${g.id}`}
                    className="font-medium text-brand hover:underline"
                  >
                    {g.name}
                  </Link>
                  <div className="text-xs text-slate-500">
                    Zimmer {g.room} · {formatDate(g.checkIn)} – {formatDate(g.checkOut)}
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {g._count.requests} Anfragen
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
