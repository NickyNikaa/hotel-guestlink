import { prisma } from "@/lib/prisma";
import { markTicketDone } from "../actions";
import { formatParams } from "@/lib/utils";

// Niemals statisch — Tickets müssen immer frisch sein
export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  const tickets = await prisma.serviceRequest.findMany({
    where: { status: "open" },
    include: { serviceItem: true, guest: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Offene Tickets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Neue Anfragen werden automatisch hier angezeigt
          </p>
        </div>
        <div
          className={`text-5xl font-bold ${
            tickets.length > 0 ? "text-amber-600" : "text-slate-300"
          }`}
        >
          {tickets.length}
        </div>
      </div>
      {tickets.length === 0 ? (
        <p className="text-slate-500">
          Aktuell keine offenen Anfragen. ✨
        </p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((t) => {
            const paramSummary = formatParams(t.serviceItem.type, t.params);
            return (
              <li
                key={t.id}
                className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">
                    {t.serviceItem.emoji} {t.serviceItem.label}
                  </div>
                  {paramSummary && (
                    <div className="text-sm text-brand font-medium mt-0.5">
                      {paramSummary}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-0.5">
                    Zimmer {t.guest.room} · {t.guest.name} · eingegangen{" "}
                    {new Date(t.createdAt).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {t.note && (
                    <div className="text-sm mt-1 italic">„{t.note}"</div>
                  )}
                </div>
                <form action={markTicketDone}>
                  <input type="hidden" name="id" value={t.id} />
                  <button
                    type="submit"
                    className="bg-brand hover:bg-brand-dark text-white text-sm px-4 py-2 rounded"
                  >
                    Erledigt
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
