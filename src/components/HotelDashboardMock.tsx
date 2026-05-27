"use client";

import { useState } from "react";
import type { PreviewHotel } from "@/lib/preview-data";

type TicketStatus = "open" | "in_progress" | "done";

type MockTicket = {
  id: string;
  guestName: string;
  room: string;
  emoji: string;
  service: string;
  detail: string;
  receivedAt: string; // human readable
  status: TicketStatus;
  doneAt?: string; // wenn done
  doneBy?: string;
};

function buildInitialTickets(hotel: PreviewHotel): MockTicket[] {
  return [
    {
      id: "t1",
      guestName: "Frau Schmidt",
      room: "12",
      emoji: "🧺",
      service: "Handtuchwechsel",
      detail: "gewünscht: 11:00 Uhr",
      receivedAt: "vor 4 Min.",
      status: "open",
    },
    {
      id: "t2",
      guestName: "Herr Lange",
      room: "7",
      emoji: "☕",
      service: "Cappuccino zum Frühstück",
      detail: "Tisch am Fenster, 07:30 Uhr",
      receivedAt: "vor 12 Min.",
      status: "open",
    },
    {
      id: "t3",
      guestName: "Familie Krause",
      room: "21",
      emoji: "🚫",
      service: "Nicht stören",
      detail: "bis 14:00 Uhr",
      receivedAt: "vor 18 Min.",
      status: "open",
    },
    {
      id: "t4",
      guestName: hotel.mockGuestName,
      room: hotel.mockRoom,
      emoji: "🛏️",
      service: "Bettwäsche neu",
      detail: "während Spa-Termin 15:00",
      receivedAt: "vor 32 Min.",
      status: "in_progress",
      doneBy: "Frau Becker (Housekeeping)",
    },
    {
      id: "t5",
      guestName: "Herr Wagner",
      room: "204",
      emoji: "🍳",
      service: "Frühstück: glutenfrei",
      detail: "Tisch 4, 8:00 Uhr",
      receivedAt: "vor 1 Std.",
      status: "done",
      doneAt: "09:45",
    },
    {
      id: "t6",
      guestName: "Familie Bauer",
      room: "18",
      emoji: "🎁",
      service: "Blumen für Partnerin",
      detail: "Hochzeitstag, weiße Lilien wenn möglich",
      receivedAt: "vor 2 Std.",
      status: "done",
      doneAt: "08:20",
    },
    {
      id: "t7",
      guestName: "Herr Schäfer",
      room: "Suite 12",
      emoji: "🤖",
      service: "AI-Concierge: 'Wann gibt's Frühstück?'",
      detail: "automatisch beantwortet (06:30–10:30)",
      receivedAt: "vor 3 Std.",
      status: "done",
      doneAt: "07:15",
    },
  ];
}

export function HotelDashboardMock({ hotel }: { hotel: PreviewHotel }) {
  const [tickets, setTickets] = useState<MockTicket[]>(() =>
    buildInitialTickets(hotel),
  );
  const [toast, setToast] = useState<string | null>(null);

  const open = tickets.filter((t) => t.status === "open");
  const inProgress = tickets.filter((t) => t.status === "in_progress");
  const done = tickets.filter((t) => t.status === "done");

  function markDone(id: string) {
    const now = new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "done" as const, doneAt: now } : t,
      ),
    );
    setToast(
      "✓ Im Pilot würde Ihr Gast jetzt eine Bestätigung erhalten — inkl. der voraussichtlichen Uhrzeit.",
    );
    setTimeout(() => setToast(null), 4000);
  }

  function takeOver(id: string) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "in_progress" as const,
              doneBy: "Sie",
            }
          : t,
      ),
    );
    setToast("✓ Übernommen — der Gast sieht jetzt: 'wird gerade vorbereitet'.");
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header: Wer schaut, was ist heute los */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{
          background: `linear-gradient(135deg, ${hotel.brandColor} 0%, ${hotel.brandColorDark} 100%)`,
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">
          Rezeption · {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h2 className="text-2xl font-semibold mt-1">{hotel.name}</h2>
        <p className="text-sm opacity-90 mt-1">
          {open.length} offen · {inProgress.length} in Arbeit · {done.length}{" "}
          heute erledigt
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Offen" value={open.length} color={hotel.brandColor} highlight />
        <StatCard label="In Arbeit" value={inProgress.length} color={hotel.brandColor} />
        <StatCard label="Heute fertig" value={done.length} color={hotel.brandColor} />
      </div>

      {/* OFFEN */}
      {open.length > 0 && (
        <Section title={`Offen (${open.length})`} accent={hotel.brandColor}>
          {open.map((t) => (
            <TicketCard
              key={t.id}
              t={t}
              brandColor={hotel.brandColor}
              primaryAction={{
                label: "Erledigt",
                onClick: () => markDone(t.id),
              }}
              secondaryAction={{
                label: "Übernehmen",
                onClick: () => takeOver(t.id),
              }}
            />
          ))}
        </Section>
      )}

      {/* IN ARBEIT */}
      {inProgress.length > 0 && (
        <Section title={`In Arbeit (${inProgress.length})`} accent="#F59E0B">
          {inProgress.map((t) => (
            <TicketCard
              key={t.id}
              t={t}
              brandColor={hotel.brandColor}
              primaryAction={{
                label: "Erledigt",
                onClick: () => markDone(t.id),
              }}
            />
          ))}
        </Section>
      )}

      {/* ERLEDIGT */}
      {done.length > 0 && (
        <Section title={`Heute erledigt (${done.length})`} accent="#10B981">
          {done.map((t) => (
            <TicketCard
              key={t.id}
              t={t}
              brandColor={hotel.brandColor}
              dim
            />
          ))}
        </Section>
      )}

      {/* CTA */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{ backgroundColor: hotel.brandColorDark }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">
          So wäre Ihr Alltag mit dem Tool
        </p>
        <h3 className="font-semibold text-lg mt-1 leading-tight">
          Anfragen kommen geordnet — statt verstreut im Telefonbuch
        </h3>
        <p className="text-sm opacity-95 mt-2 leading-relaxed">
          Statt drei Anrufen und zwei Whatsapps im Schichtwechsel: ein
          aufgeräumtes Backend. Wer am Empfang sitzt, sieht sofort, was offen
          ist, wer was übernommen hat und welche Wünsche schon erfüllt wurden.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <a
            href="https://wa.me/4915206772337"
            className="bg-white text-slate-800 font-medium py-2.5 rounded-lg text-center text-sm hover:opacity-90 transition"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:nicoleemrich@outlook.com?subject=Pilot-Interesse%20${encodeURIComponent(hotel.name)}`}
            className="bg-white/20 backdrop-blur text-white font-medium py-2.5 rounded-lg text-center text-sm hover:bg-white/30 transition"
          >
            E-Mail
          </a>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%]">
          <div className="bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-2xl flex items-start gap-2">
            <span className="flex-1 leading-snug">{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white"
              aria-label="Schließen"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  highlight,
}: {
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-3 border"
      style={
        highlight
          ? {
              backgroundColor: `${color}15`,
              borderColor: `${color}40`,
            }
          : {
              backgroundColor: "white",
              borderColor: "#E2E8F0",
            }
      }
    >
      <div
        className="text-2xl font-bold"
        style={highlight ? { color } : { color: "#1E293B" }}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-0.5">
        {label}
      </div>
    </div>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: accent }}
        />
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function TicketCard({
  t,
  brandColor,
  primaryAction,
  secondaryAction,
  dim,
}: {
  t: MockTicket;
  brandColor: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  dim?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl p-3.5 border border-slate-200 transition ${
        dim ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: `${brandColor}15` }}
        >
          {t.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-medium text-sm leading-tight">
              {t.guestName}
              <span className="text-slate-400 font-normal">
                {" "}
                · Zimmer {t.room}
              </span>
            </p>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">
              {t.status === "done" ? `erledigt ${t.doneAt}` : t.receivedAt}
            </span>
          </div>
          <p className="text-sm text-slate-800 mt-1 leading-snug">
            <span className="font-medium">{t.service}</span>
            <span className="text-slate-500"> — {t.detail}</span>
          </p>
          {t.status === "in_progress" && t.doneBy && (
            <p className="text-xs text-amber-700 mt-1">
              ● {t.doneBy} hat übernommen
            </p>
          )}
        </div>
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-2 mt-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-2 rounded-lg transition"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex-1 text-white text-xs font-medium py-2 rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: brandColor }}
            >
              ✓ {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
