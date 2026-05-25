import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hotel = await prisma.hotel.upsert({
    where: { email: "demo@hotel.test" },
    update: {},
    create: {
      name: "Demo-Hotel München",
      email: "demo@hotel.test",
      serviceItems: {
        create: [
          { label: "Handtuchwechsel", emoji: "🛁", sortIdx: 1, type: "scheduled" },
          { label: "Bettwäsche neu", emoji: "🛏️", sortIdx: 2, type: "scheduled" },
          { label: "Nicht stören", emoji: "🚫", sortIdx: 3, type: "duration" },
          { label: "Frühstück", emoji: "🥐", sortIdx: 5, type: "breakfast" },
          { label: "Speisen bestellen", emoji: "🍽️", sortIdx: 6, type: "menu" },
          { label: "Getränke aufs Zimmer", emoji: "🍷", sortIdx: 7, type: "roomdrinks" },
          { label: "Geste / Überraschung", emoji: "🎁", sortIdx: 8, type: "gift" },
          { label: "Sonstige Wünsche", emoji: "✏️", sortIdx: 10, type: "freetext" },
        ],
      },
    },
    include: { serviceItems: true },
  });

  // Demo-Gast mit festem Token, damit der Link in der Landing-Page immer funktioniert
  await prisma.guest.upsert({
    where: { token: "demo123" },
    update: {},
    create: {
      token: "demo123",
      hotelId: hotel.id,
      name: "Familie Müller",
      email: "demo@example.com",
      room: "12",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 3 * 86400000),
    },
  });

  // Zweiter Gast für Demo-Liste
  await prisma.guest.upsert({
    where: { token: "demo456" },
    update: {},
    create: {
      token: "demo456",
      hotelId: hotel.id,
      name: "Herr Schmidt",
      email: "demo2@example.com",
      room: "8",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 2 * 86400000),
    },
  });

  console.log("✓ Seed complete. Demo-Token: demo123 und demo456");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
