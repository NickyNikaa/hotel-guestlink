# Live-Demo deployen — 10-Minuten-Guide

Ziel: eine öffentliche URL wie `https://hotel-guestlink.vercel.app`, die du an Hotels schicken kannst.

**Du brauchst:**
- GitHub-Account (hast du)
- Vercel-Account (kostenlos, Login via GitHub)
- Neon-Account für die Datenbank (kostenlos, 1-Min-Signup) — Alternative: Vercel Postgres
- Im Terminal: `git` und idealerweise `gh` (GitHub CLI)

---

## Schritt 1 — Repo auf GitHub anlegen (2 Min)

Im `hotel-tool/`-Ordner:

```bash
cd hotel-tool
git init
git add .
git commit -m "Initial commit — Hotel Guestlink MVP"

# Variante A: mit GitHub CLI (am schnellsten)
gh repo create hotel-guestlink --public --source=. --remote=origin --push

# Variante B: ohne gh CLI
# 1. Auf github.com → "New repository" → Name "hotel-guestlink" → Public → Create
# 2. Dann:
git remote add origin https://github.com/[DEIN_USERNAME]/hotel-guestlink.git
git branch -M main
git push -u origin main
```

Ergebnis: `https://github.com/[DEIN_USERNAME]/hotel-guestlink`

---

## Schritt 2 — Postgres-DB bei Neon anlegen (2 Min)

1. Auf [neon.tech](https://neon.tech) registrieren (mit GitHub einloggen)
2. „Create Project" → Name `hotel-guestlink`, Region `Frankfurt (eu-central-1)`
3. Du bekommst eine **Connection String** in der Form:
   ```
   postgres://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Diesen String kopieren — brauchen wir gleich zweimal.

---

## Schritt 3 — DB-Tabellen anlegen + Demo-Daten seeden (2 Min)

Lokal im `hotel-tool/`-Ordner:

```bash
# .env mit dem Neon-String anlegen
echo 'DATABASE_URL="DEIN_NEON_STRING_HIER"' > .env

# Abhängigkeiten installieren (falls noch nicht passiert)
npm install

# Tabellen auf der Neon-DB anlegen
npx prisma db push

# Demo-Hotel + Demo-Gäste seeden
npm run db:seed
```

Du solltest sehen: `✓ Seed complete. Demo-Token: demo123 und demo456`

---

## Schritt 4 — Auf Vercel deployen (3 Min)

1. Auf [vercel.com](https://vercel.com) registrieren (mit GitHub einloggen)
2. „Add New… → Project" → wähle dein `hotel-guestlink`-Repo
3. **Framework:** wird automatisch als Next.js erkannt — alles auf Default lassen
4. **Environment Variables:** füge hinzu:
   - Name: `DATABASE_URL`
   - Value: dein Neon-Connection-String von Schritt 2
5. „Deploy" klicken → ~2 Min warten

---

## Schritt 5 — Fertig

Vercel zeigt dir die Live-URL, z.B. `https://hotel-guestlink.vercel.app`.

Teste:
- Landing-Page: `https://hotel-guestlink.vercel.app`
- Gast-Sicht direkt: `https://hotel-guestlink.vercel.app/g/demo123`
- Hotel-Backend: `https://hotel-guestlink.vercel.app/dashboard`

**Den Hotels schickst du nur:** `https://hotel-guestlink.vercel.app`

Die Landing-Page führt sie selbst zu beiden Sichten.

---

## Optional: Eigene Domain

In Vercel-Project-Settings → Domains → eigene Domain hinzufügen (z.B. `demo.deinedomain.de`). Wenn du noch keine Domain hast, ist die `.vercel.app`-Subdomain völlig in Ordnung für den Pitch.

---

## Wenn die Demo zugemüllt wird

Hotels werden Test-Gäste anlegen, klicken, vermüllen die DB. Easy zu lösen:

```bash
# DB wieder auf Demo-Zustand zurücksetzen (löscht alles, seedet neu)
npx prisma db push --force-reset
npm run db:seed
```

Mach das einmal pro Woche oder vor jedem wichtigen Pitch-Termin.

---

## Updates deployen

Jeder Push auf den `main`-Branch deployed automatisch:

```bash
git add .
git commit -m "Beschreibung deiner Änderung"
git push
```

Nach ~1 Min ist die neue Version live.

---

## Troubleshooting

**„Prisma Client not generated":** Schon im `package.json` als `postinstall`-Hook eingebaut — sollte nicht passieren. Falls doch: `npx prisma generate` ausführen.

**„relation does not exist":** `npx prisma db push` vergessen. Nachholen.

**Vercel-Build schlägt fehl:** Check, ob `DATABASE_URL` in Vercel Environment Variables gesetzt ist.

**Demo-Token funktioniert nicht (`/g/demo123` zeigt 404):** Seed wurde nicht ausgeführt. Lokal `npm run db:seed` laufen lassen.
