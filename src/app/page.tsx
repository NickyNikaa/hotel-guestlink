import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand to-brand-dark text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] opacity-75">
            Live-Demo
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Hotel Guestlink
          </h1>
          <p className="mt-4 text-lg opacity-95 max-w-xl leading-relaxed">
            Ihre Gäste melden Wünsche selbst per QR-Code im Zimmer — Ihre
            Rezeption wird weniger durch Telefonate unterbrochen, und Sie
            sammeln am Abreisetag automatisch mehr Bewertungen.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-4">
          <Link
            href="/g/demo123"
            className="bg-white text-slate-800 rounded-2xl p-6 hover:scale-[1.02] transition shadow-xl"
          >
            <div className="text-3xl">📱</div>
            <h2 className="mt-3 font-semibold text-lg text-brand">
              1 · Gast-Sicht
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Das sieht Ihr Gast, wenn er den QR-Code im Zimmer scannt.
              Probieren Sie es aus — klicken Sie auf einen Service.
            </p>
            <span className="inline-block mt-3 text-sm font-medium text-brand">
              Demo öffnen →
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="bg-white text-slate-800 rounded-2xl p-6 hover:scale-[1.02] transition shadow-xl"
          >
            <div className="text-3xl">🛎️</div>
            <h2 className="mt-3 font-semibold text-lg text-brand">
              2 · Hotel-Backend
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              So legen Sie Gäste an, sehen offene Service-Anfragen und drucken
              die QR-Karte für jedes Zimmer.
            </p>
            <span className="inline-block mt-3 text-sm font-medium text-brand">
              Demo öffnen →
            </span>
          </Link>
        </section>

        <section className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold">Was bringt das konkret?</h3>
          <ul className="text-sm space-y-2 opacity-95">
            <li>
              <span className="font-medium">Weniger Anrufe an der Rezeption:</span>{" "}
              Gäste melden Standardwünsche selbst.
            </li>
            <li>
              <span className="font-medium">Mehr Bewertungen:</span> Automatische
              Mail am Abreisetag mit One-Click-Link.
            </li>
            <li>
              <span className="font-medium">Kein PMS-Eingriff:</span> Funktioniert
              parallel zu Ihrer bestehenden Software.
            </li>
            <li>
              <span className="font-medium">Mehrsprachig:</span> Englische Gäste
              kommen ohne Deutschkenntnisse zurecht.
            </li>
          </ul>
        </section>

        <footer className="text-sm opacity-80 pt-4">
          Interesse an einem Pilot in Ihrem Haus? Schreiben Sie mir:{" "}
          <a
            href="mailto:nicky.nikaaa@gmail.com"
            className="underline font-medium"
          >
            nicky.nikaaa@gmail.com
          </a>
          <br />
          <span className="text-xs opacity-60">
            Demo-Daten werden regelmäßig zurückgesetzt.
          </span>
        </footer>
      </div>
    </div>
  );
}
