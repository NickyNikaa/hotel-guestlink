# Hotel Guestlink — MVP Session 1

Gast-Service-Portal für kleine Hotels (8–60 Zimmer).

## Was Session 1 kann

- Hotel-Backend: Gäste anlegen mit Name, Mail, Zimmer, Check-in/-out
- Jeder Gast bekommt eine eindeutige Token-URL `/g/[token]` und einen QR-Code
- Gast-Portal: Service-Buttons klicken (Handtuchwechsel, Nicht stören, etc.)
- Ticket-Liste für die Rezeption mit „Erledigt"-Button
- SQLite-DB lokal, kein Login (kommt in Session 2)

## Setup lokal

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Env mit Postgres-URL anlegen (Neon oder Vercel Postgres — siehe DEPLOY.md)
echo 'DATABASE_URL="postgres://..."' > .env

# 3. Tabellen anlegen
npx prisma db push

# 4. Demo-Hotel + Demo-Gäste seeden
npm run db:seed

# 5. Dev-Server starten
npm run dev
```

Öffne http://localhost:3000.

## Live-Demo deployen

Siehe [DEPLOY.md](./DEPLOY.md) für die 10-Min-Anleitung zu GitHub + Vercel + Neon.

## Was wo ist

```
prisma/
  schema.prisma       Datenmodell (Hotel, Guest, ServiceItem, ServiceRequest)
  seed.ts             Demo-Hotel anlegen
src/
  app/
    page.tsx          Redirect → /dashboard
    dashboard/
      layout.tsx      Header mit Nav
      page.tsx        Gast anlegen + Liste
      actions.ts      Server Actions (Gast anlegen, Ticket abhaken)
      guests/[id]/
        page.tsx      Gast-Detail mit QR-Code
      tickets/
        page.tsx      Offene Tickets für Rezeption
    g/[token]/
      page.tsx        Gast-Portal (öffentlich, kein Login)
      actions.ts      Service-Request anlegen
      danke/
        page.tsx      Bestätigungsseite
  lib/
    prisma.ts         Prisma Client Singleton
    utils.ts          Token-Generator, Datumsformatierung
```

## Test-Walkthrough

1. Browser → http://localhost:3000 → Dashboard öffnet sich
2. Gast anlegen (z.B. „Familie Müller", Zi. 12)
3. Detail-Seite zeigt QR-Code mit URL wie `http://localhost:3000/g/xK4nQv2WpL7M`
4. URL im 2. Browser-Tab öffnen (= Gast-Sicht)
5. Service-Button klicken → „Notiert"-Seite
6. Dashboard → Tickets → siehst die Anfrage, kannst sie abhaken

## Session 2 — was als nächstes ansteht

In dieser Reihenfolge mit Claude Code lokal:

1. **Hotel-Login** mit NextAuth Magic Link (Resend) — pro Hotel eigener Account
2. **Multi-Tenant-Trennung** — Hotels sehen nur eigene Gäste/Tickets
3. **Service-Items im Backend editieren** (eigene Items, Reihenfolge, Emojis)
4. **Notification an Rezeption** (Browser-Push oder einfache Polling-Anzeige im Header)
5. **PDF-Druck der QR-Karte** mit Hotel-Branding

## Session 3

6. **Post-Stay-Mail** automatisch am Check-out-Datum 18:00 (Cron via Vercel)
7. **Bewertungs-Tracking** über Google Places API
8. **Bewertungs-Dashboard** mit Schnitt, Trend, Alerts bei < 3 Sternen
