import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requestService } from "../../actions";

const WINDOWS = [
  { value: "morning", label: "Vormittag", time: "08–11 Uhr" },
  { value: "midday", label: "Mittag", time: "11–14 Uhr" },
  { value: "afternoon", label: "Nachmittag", time: "14–17 Uhr" },
  { value: "evening", label: "Abend", time: "17–20 Uhr" },
];

const BREAKFAST_OPTIONS = [
  { href: "book", emoji: "🥐", title: "Frühstück dazu buchen", desc: "Falls noch nicht in Ihrer Buchung enthalten" },
  { href: "drink", emoji: "☕", title: "Getränk vorbestellen", desc: "Kaffee, Cappuccino, Tee — wartet auf Sie" },
  { href: "wish", emoji: "📝", title: "Besondere Wünsche", desc: "Allergien, glutenfrei, vegan, Vorlieben" },
];

const MENU_OPTIONS = [
  { emoji: "🥗", label: "Gemischter Salat" },
  { emoji: "🥗", label: "Caesar Salad" },
  { emoji: "🍅", label: "Caprese (Tomate-Mozzarella)" },
  { emoji: "🍕", label: "Pizza Margherita" },
  { emoji: "🍕", label: "Pizza Salami" },
  { emoji: "🍕", label: "Pizza Vegetarisch" },
  { emoji: "🍝", label: "Spaghetti Bolognese" },
  { emoji: "🍝", label: "Penne Arrabiata" },
  { emoji: "🍔", label: "Burger Klassisch" },
  { emoji: "🥪", label: "Club Sandwich" },
  { emoji: "🍰", label: "Tiramisu" },
  { emoji: "🍦", label: "Eisbecher" },
];

const ROOMDRINKS_OPTIONS = [
  { emoji: "💧", label: "Wasser still" },
  { emoji: "💦", label: "Wasser sprudelnd" },
  { emoji: "🍷", label: "Rotwein (Flasche)" },
  { emoji: "🥂", label: "Weißwein (Flasche)" },
  { emoji: "🍾", label: "Sekt / Prosecco" },
  { emoji: "🥂", label: "Champagner" },
  { emoji: "🍺", label: "Bier" },
  { emoji: "🍹", label: "Aperol Spritz" },
  { emoji: "🥤", label: "Cola / Softdrink" },
  { emoji: "🧃", label: "Saft" },
];

const GIFT_OPTIONS = [
  { emoji: "🌹", label: "Blumenstrauß bunt" },
  { emoji: "🌷", label: "Tulpen" },
  { emoji: "🌹", label: "Rosenstrauß rot" },
  { emoji: "🍫", label: "Pralinenschachtel" },
  { emoji: "🎂", label: "Kleiner Kuchen" },
  { emoji: "🍰", label: "Mini-Torte mit Schriftzug" },
  { emoji: "🍾", label: "Sekt + 2 Gläser" },
  { emoji: "🥂", label: "Champagner-Überraschung" },
  { emoji: "🧸", label: "Plüschtier" },
  { emoji: "💌", label: "Romantische Deko (Rosenblätter)" },
];

function isoFromTodayAt(hour: number, minute = 0): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1);
  return d.toISOString();
}

function isoIn(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Wiederverwendbares Formular für menu / roomdrinks / gift
type CatalogFormProps = {
  token: string;
  itemId: string;
  options: Array<{ emoji: string; label: string }>;
  withRecipient?: boolean;
  defaultTime: string;
  freeNoteLabel: string;
  freeNotePlaceholder: string;
  submitLabel: string;
};

function CatalogForm(props: CatalogFormProps) {
  const {
    token,
    itemId,
    options,
    withRecipient = false,
    defaultTime,
    freeNoteLabel,
    freeNotePlaceholder,
    submitLabel,
  } = props;
  return (
    <form action={requestService} className="space-y-5">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="serviceItemId" value={itemId} />

      <div>
        <span className="block text-sm font-medium text-slate-700 mb-2">
          Auswahl
        </span>
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt, idx) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-brand transition has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:border-brand"
            >
              <input
                type="radio"
                name="selectedItem"
                value={opt.label}
                defaultChecked={idx === 0}
                required
                className="sr-only"
              />
              <span>{opt.emoji}</span>
              <span className="font-medium text-sm leading-tight">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Anzahl
          </span>
          <input
            type="number"
            name="quantity"
            min={1}
            max={20}
            defaultValue={1}
            className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Uhrzeit
          </span>
          <input
            type="time"
            name="requestedTime"
            defaultValue={defaultTime}
            className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base"
          />
        </label>
      </div>

      {withRecipient && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Für wen?{" "}
            <span className="text-slate-400 font-normal">
              (Name oder Zimmernummer, optional)
            </span>
          </span>
          <input
            type="text"
            name="recipient"
            placeholder="z.B. meine Frau, Zimmer 12"
            className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base"
          />
        </label>
      )}

      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">
          {freeNoteLabel}{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </span>
        <textarea
          name="freeNote"
          rows={3}
          placeholder={freeNotePlaceholder}
          className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base resize-none"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default async function RequestPage({
  params,
}: {
  params: Promise<{ token: string; itemId: string }>;
}) {
  const { token, itemId } = await params;
  const guest = await prisma.guest.findUnique({
    where: { token },
    include: { hotel: true },
  });
  if (!guest) return notFound();

  const item = await prisma.serviceItem.findUnique({ where: { id: itemId } });
  if (!item || item.hotelId !== guest.hotelId) return notFound();

  const todayISO = new Date().toISOString().slice(0, 10);
  const checkoutISO = guest.checkOut.toISOString().slice(0, 10);

  const durationOptions = [
    { label: "1 Stunde", until: isoIn(1) },
    { label: "2 Stunden", until: isoIn(2) },
    { label: "4 Stunden", until: isoIn(4) },
    { label: "Bis heute Abend", until: isoFromTodayAt(20) },
    { label: "Bis morgen früh", until: isoFromTodayAt(8) },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-12 space-y-6">
        <Link
          href={`/g/${token}`}
          className="text-sm text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
        >
          ← Zurück zum Menü
        </Link>

        <header className="text-center">
          <div className="text-5xl">{item.emoji}</div>
          <h1 className="text-2xl font-semibold mt-2">{item.label}</h1>
        </header>

        {item.type === "breakfast" && (
          <section className="space-y-3">
            {BREAKFAST_OPTIONS.map((opt) => (
              <Link
                key={opt.href}
                href={`/g/${token}/r/${item.id}/${opt.href}`}
                className="block bg-white hover:bg-brand hover:text-white border border-slate-200 rounded-xl p-4 transition group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div className="flex-1">
                    <div className="font-medium">{opt.title}</div>
                    <div className="text-xs text-slate-500 group-hover:text-white/80 mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:text-white">›</span>
                </div>
              </Link>
            ))}
          </section>
        )}

        {item.type === "menu" && (
          <CatalogForm
            token={token}
            itemId={item.id}
            options={MENU_OPTIONS}
            defaultTime="19:00"
            freeNoteLabel="Besondere Wünsche / Sonderwunsch"
            freeNotePlaceholder="z.B. glutenfrei, ohne Zwiebeln, extra scharf, oder ganz anderes Gericht …"
            submitLabel="Bestellen"
          />
        )}

        {item.type === "roomdrinks" && (
          <CatalogForm
            token={token}
            itemId={item.id}
            options={ROOMDRINKS_OPTIONS}
            defaultTime="18:00"
            freeNoteLabel="Anmerkung"
            freeNotePlaceholder="z.B. gekühlt, mit Eis, bestimmte Marke …"
            submitLabel="Bestellen"
          />
        )}

        {item.type === "gift" && (
          <CatalogForm
            token={token}
            itemId={item.id}
            options={GIFT_OPTIONS}
            withRecipient
            defaultTime="18:00"
            freeNoteLabel="Botschaft oder Wunsch"
            freeNotePlaceholder="z.B. Botschaft auf der Karte, Anlass (Geburtstag, Jubiläum, …)"
            submitLabel="Überraschung bestellen"
          />
        )}

        {item.type === "freetext" && (
          <form action={requestService} className="space-y-4">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="serviceItemId" value={item.id} />
            <label htmlFor="freeNote" className="block text-sm text-slate-600">
              Beschreiben Sie Ihren Wunsch — wir kümmern uns darum, wenn möglich.
            </label>
            <textarea
              id="freeNote"
              name="freeNote"
              required
              rows={5}
              placeholder="z.B. Bügeleisen aufs Zimmer, Taxi für morgen 09:00 bestellen, …"
              className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base resize-none"
            />
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
            >
              Anfrage senden
            </button>
          </form>
        )}

        {item.type === "scheduled" && (
          <form action={requestService} className="space-y-5">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="serviceItemId" value={item.id} />

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                Datum
              </label>
              <input
                id="date"
                type="date"
                name="date"
                defaultValue={todayISO}
                min={todayISO}
                max={checkoutISO}
                required
                className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base"
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700 mb-2">
                Zeitfenster
              </span>
              <div className="grid grid-cols-2 gap-2">
                {WINDOWS.map((w, idx) => (
                  <label
                    key={w.value}
                    className="flex flex-col items-center gap-0.5 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-brand transition has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:border-brand"
                  >
                    <input
                      type="radio"
                      name="window"
                      value={w.value}
                      defaultChecked={idx === 0}
                      className="sr-only"
                    />
                    <span className="font-medium">{w.label}</span>
                    <span className="text-xs opacity-80">{w.time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label htmlFor="customTime" className="block text-sm font-medium text-slate-700 mb-2">
                Oder genaue Uhrzeit{" "}
                <span className="text-slate-400 font-normal">(überschreibt das Zeitfenster)</span>
              </label>
              <input
                id="customTime"
                type="time"
                name="customTime"
                className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
            >
              Anfrage senden
            </button>
          </form>
        )}

        {item.type === "duration" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 text-center">
              Wie lange möchten Sie nicht gestört werden?
            </p>

            <div className="space-y-2">
              {durationOptions.map((opt) => (
                <form action={requestService} key={opt.label}>
                  <input type="hidden" name="token" value={token} />
                  <input type="hidden" name="serviceItemId" value={item.id} />
                  <input type="hidden" name="untilTime" value={opt.until} />
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-brand hover:text-white border border-slate-200 rounded-xl px-4 py-4 text-left flex items-center justify-between transition"
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs opacity-60">
                      bis {formatTime(opt.until)} Uhr
                    </span>
                  </button>
                </form>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <p className="text-sm font-medium text-slate-700 text-center">
                Oder bis zu einer bestimmten Uhrzeit
              </p>
              <form action={requestService} className="flex gap-2">
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="serviceItemId" value={item.id} />
                <input
                  type="time"
                  name="customUntil"
                  required
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-3 text-base"
                />
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-dark text-white font-medium px-5 rounded-lg"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        )}

        {item.type === "simple" && (
          <form action={requestService}>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="serviceItemId" value={item.id} />
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-medium py-3.5 rounded-xl"
            >
              Anfrage senden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
