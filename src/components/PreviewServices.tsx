"use client";

import { useState } from "react";
import type { ServiceItemPreview } from "@/lib/preview-data";

type Props = {
  items: ServiceItemPreview[];
  brandColor: string;
  brandColorDark: string;
  hotelName: string;
};

export function PreviewServices({
  items,
  brandColor,
  brandColorDark,
  hotelName,
}: Props) {
  const [modal, setModal] = useState<ServiceItemPreview | null>(null);

  return (
    <>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          Wie können wir helfen?
        </h2>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setModal(item)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-left flex items-center gap-3 transition group"
            style={
              {
                ["--brand" as string]: brandColor,
              } as React.CSSProperties
            }
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-medium flex-1 group-hover:text-[var(--brand)] transition">
              {item.label}
            </span>
            <span className="text-slate-300 group-hover:text-[var(--brand)] transition">
              ›
            </span>
          </button>
        ))}
      </section>

      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${brandColor}20` }}
              >
                {modal.emoji}
              </div>
              <div className="flex-1">
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: brandColor }}
                >
                  Vorschau · {hotelName}
                </p>
                <h3 className="font-semibold text-lg leading-tight">
                  {modal.label}
                </h3>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-2">
              <p className="font-medium text-slate-800">
                Im Pilot käme diese Anfrage hier bei Ihnen an:
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-600 space-y-1">
                <div>
                  <span className="text-slate-400">Gast:</span> Herr Müller,
                  Zimmer 204
                </div>
                <div>
                  <span className="text-slate-400">Wunsch:</span> {modal.label}
                </div>
                <div>
                  <span className="text-slate-400">Uhrzeit:</span>{" "}
                  {new Date().toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>{" "}
                  <span style={{ color: brandColor }} className="font-semibold">
                    ● Neu — wartet auf Bestätigung
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                Ihre Rezeption sieht das Ticket sofort im Backend, bestätigt mit
                einem Klick und der Gast bekommt eine Bestätigung mit
                voraussichtlicher Zeit zurück.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setModal(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition"
              >
                Weiterstöbern
              </button>
              <a
                href="https://wa.me/4915206772337"
                className="flex-1 text-white font-medium py-3 rounded-xl text-center transition hover:opacity-90"
                style={{ backgroundColor: brandColor }}
              >
                Pilot besprechen
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
