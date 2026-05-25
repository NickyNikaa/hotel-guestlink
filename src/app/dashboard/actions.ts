"use server";

import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createGuest(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const room = String(formData.get("room") || "").trim();
  const checkIn = new Date(String(formData.get("checkIn")));
  const checkOut = new Date(String(formData.get("checkOut")));

  if (!name || !email || !room) throw new Error("Pflichtfelder fehlen");

  // MVP: nimm das erste Hotel in der DB (= Demo-Hotel aus Seed)
  const hotel = await prisma.hotel.findFirst();
  if (!hotel) throw new Error("Kein Hotel angelegt – bitte 'npm run db:seed' laufen lassen");

  const guest = await prisma.guest.create({
    data: {
      token: generateToken(),
      hotelId: hotel.id,
      name,
      email,
      room,
      checkIn,
      checkOut,
    },
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard/guests/${guest.id}`);
}

export async function markTicketDone(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.serviceRequest.update({
    where: { id },
    data: { status: "done", doneAt: new Date() },
  });
  revalidatePath("/dashboard/tickets");
}
