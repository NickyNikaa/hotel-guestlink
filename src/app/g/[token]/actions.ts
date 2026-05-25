"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function requestService(formData: FormData) {
  const token = String(formData.get("token"));
  const serviceItemId = String(formData.get("serviceItemId"));

  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) throw new Error("Gast nicht gefunden");

  // Optionale Parameter abhängig vom Item-Typ
  const date = formData.get("date");
  const win = formData.get("window");
  const untilTime = formData.get("untilTime");

  let params: { date?: string; window?: string; untilTime?: string } | undefined;
  if (date && win) {
    params = { date: String(date), window: String(win) };
  } else if (untilTime) {
    params = { untilTime: String(untilTime) };
  }

  await prisma.serviceRequest.create({
    data: {
      guestId: guest.id,
      serviceItemId,
      params: params ?? undefined,
    },
  });

  redirect(`/g/${token}/danke`);
}
