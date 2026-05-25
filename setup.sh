#!/usr/bin/env bash
set -e

# Hotel Guestlink — One-Shot Setup Script
# Macht git init + push + .env + npm install + DB-Setup in einem Rutsch.

# Wechsle in das Skript-Verzeichnis
cd "$(dirname "$0")"

echo ""
echo "🏨  Hotel Guestlink Setup"
echo "========================="
echo ""

# 1. Git Repo initialisieren (falls noch nicht geschehen)
if [ ! -d ".git" ]; then
  echo "[1/6] Git Repo initialisieren..."
  git init -q
  git branch -M main
fi

# Git-Identität für dieses Repo (falls global nicht gesetzt)
git config user.name "Nicky Nikaa"
git config user.email "nicky.nikaaa@gmail.com"

# 2. .env mit Neon-Connection-String anlegen
echo "[2/6] .env Datei anlegen..."
cat > .env <<'EOF'
DATABASE_URL="postgresql://neondb_owner:npg_OIU5d9SCilfQ@ep-cool-morning-ape0zgwp.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
EOF

# 3. Git Remote setzen (falls noch nicht)
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "[3/6] Git Remote setzen..."
  git remote add origin https://github.com/NickyNikaa/hotel-guestlink.git
else
  echo "[3/6] Git Remote schon gesetzt."
fi

# 4. Erster Commit
echo "[4/6] Code committen..."
git add .
git commit -q -m "Initial commit — Hotel Guestlink MVP" || echo "    (nichts zu committen)"

# 5. NPM Pakete installieren + Prisma Client generieren
echo "[5/6] NPM Pakete installieren (kann 1-2 Min dauern)..."
npm install --silent

# 6. Datenbank-Tabellen + Demo-Daten
echo "[6/6] Datenbank-Tabellen anlegen und seeden..."
npx prisma db push --skip-generate --accept-data-loss
npm run db:seed --silent

echo ""
echo "✅ Lokale Vorbereitung abgeschlossen."
echo ""
echo "Jetzt push zu GitHub — eventuell öffnet sich ein Browser-Fenster zur Autorisierung:"
echo ""

# 7. Push zu GitHub
git push -u origin main

echo ""
echo "🎉 Fertig! Code ist auf https://github.com/NickyNikaa/hotel-guestlink"
echo ""
echo "Nächster Schritt: Vercel-Deploy (das macht Nicole für dich im Browser)."
