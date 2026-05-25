import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const openTickets = await prisma.serviceRequest.count({
    where: { status: "open" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo-Bar oben — klar zurück zur Landing */}
      <div className="bg-slate-900 text-white text-xs">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/" className="opacity-80 hover:opacity-100 inline-flex items-center gap-1">
            ← Zurück zur Demo-Übersicht
          </Link>
          <span className="opacity-60">Live-Demo · Daten werden regelmäßig zurückgesetzt</span>
        </div>
      </div>

      <header className="bg-brand text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-lg hover:opacity-90">
            🛎️ Hotel Guestlink
          </Link>
          <nav className="flex gap-5 text-sm items-center">
            <Link href="/dashboard" className="hover:underline">
              Gäste
            </Link>
            <Link
              href="/dashboard/tickets"
              className="hover:underline inline-flex items-center gap-2"
            >
              Tickets
              <span
                className={`text-xs font-bold rounded-full px-2 py-0.5 leading-none ${
                  openTickets > 0
                    ? "bg-amber-300 text-amber-900"
                    : "bg-white/20 text-white/80"
                }`}
              >
                {openTickets}
              </span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
