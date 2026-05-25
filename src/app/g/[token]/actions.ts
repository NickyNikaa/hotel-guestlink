"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function requestService(formData: FormData) {
  const token = String(formData.get("token"));
  const serviceItemId = String(formData.get("serviceItemId"));

  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) throw new Error("Gast nicht gefunden");

  await prisma.serviceRequest.create({
    data: { guestId: guest.id, serviceItemId },
  });

  redirect(`/g/${token}/danke`);
}
