import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate, formatParams } from "@/lib/utils";
import QRCode from "qrcode";
import { headers } from "next/headers";

export default async function GuestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guest = await prisma.guest.findUnique({
    where: { id },
    include: { requests: { include: { serviceItem: true } } },
  });
  if (!guest) return notFound();

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const proto = host.includes("localhost") ? "http" : "https";
  const guestUrl = `${proto}://${host}/g/${guest.token}`;
  const qrDataUrl = await QRCode.toDataURL(guestUrl, {
    margin: 2,
    width: 320,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{guest.name}</h1>
        <p className="text-sm text-slate-500">
          Zimmer {guest.room} · {formatDate(guest.checkIn)} –{" "}
          {formatDate(guest.checkOut)} · {guest.email}
        </p>
      </header>

      <section className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center gap-4">
        <h2 className="font-semibold">QR-Code für das Zimmer</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="QR-Code" className="w-72 h-72" />
        <code className="text-xs bg-slate-100 px-2 py-1 rounded">
          {guestUrl}
        </code>
        <p className="text-xs text-slate-500 text-center max-w-sm">
          Drucken und auf die Schlüsselkarte legen. Der Gast scannt und sieht
          sofort sein personalisiertes Service-Menü.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">
          Bisherige Anfragen ({guest.requests.length})
        </h2>
        {guest.requests.length === 0 ? (
          <p className="text-slate-500 text-sm">
            Noch keine Anfragen von diesem Gast.
          </p>
        ) : (
          <ul className="space-y-2">
            {guest.requests.map((r) => {
              const summary = formatParams(r.serviceItem.type, r.params);
              return (
                <li
                  key={r.id}
                  className="bg-white rounded shadow-sm px-4 py-2 flex justify-between items-center text-sm"
                >
                  <span>
                    {r.serviceItem.emoji} {r.serviceItem.label}
                    {summary && (
                      <span className="text-slate-500 ml-2">· {summary}</span>
                    )}
                  </span>
                  <span
                    className={
                      r.status === "done" ? "text-green-600" : "text-amber-600"
                    }
                  >
                    {r.status === "done" ? "✓ erledigt" : "offen"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
