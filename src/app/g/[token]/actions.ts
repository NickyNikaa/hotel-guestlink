"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Wandelt eine HH:MM-Uhrzeit-Eingabe in einen ISO-Timestamp um.
 * Wenn die Zeit heute schon vorbei ist, wird automatisch der nächste Tag genommen.
 */
function timeStringToISO(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  if (d.getTime() <= Date.now()) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString();
}

export async function requestService(formData: FormData) {
  const token = String(formData.get("token"));
  const serviceItemId = String(formData.get("serviceItemId"));

  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) throw new Error("Gast nicht gefunden");

  // Mögliche Eingaben
  const date = formData.get("date");
  const win = formData.get("window");
  const customTime = formData.get("customTime");
  const untilTime = formData.get("untilTime");
  const customUntil = formData.get("customUntil");
  const subOption = formData.get("subOption"); // breakfast: "book" | "drink" | "wish"
  const drink = formData.get("drink");
  const drinkTime = formData.get("drinkTime");
  const freeNote = formData.get("freeNote");

  let params:
    | {
        date?: string;
        window?: string;
        time?: string;
        untilTime?: string;
        subOption?: string;
        drink?: string;
        drinkTime?: string;
      }
    | undefined;
  let note: string | undefined;

  // 1. Frühstück / Sub-Options
  if (subOption === "book") {
    params = { subOption: "book" };
  } else if (subOption === "drink" && drink) {
    params = {
      subOption: "drink",
      drink: String(drink),
      ...(drinkTime ? { drinkTime: String(drinkTime) } : {}),
    };
  } else if (subOption === "wish") {
    params = { subOption: "wish" };
    if (freeNote) note = String(freeNote);
  }
  // 2. Sonstige Wünsche (freetext) — kein subOption, nur freeNote
  else if (freeNote && String(freeNote).trim().length > 0) {
    note = String(freeNote);
  }
  // 3. Scheduled-Anfrage: Datum + entweder Zeitfenster oder genaue Uhrzeit
  else if (date && customTime && String(customTime).length > 0) {
    params = { date: String(date), time: String(customTime) };
  } else if (date && win) {
    params = { date: String(date), window: String(win) };
  }
  // 4. Duration-Anfrage: entweder Quick-Pick (untilTime) oder eigene Uhrzeit
  else if (customUntil && String(customUntil).length > 0) {
    params = { untilTime: timeStringToISO(String(customUntil)) };
  } else if (untilTime) {
    params = { untilTime: String(untilTime) };
  }

  await prisma.serviceRequest.create({
    data: {
      guestId: guest.id,
      serviceItemId,
      params: params ?? undefined,
      note,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tickets");
  revalidatePath(`/dashboard/guests/${guest.id}`);

  redirect(`/g/${token}/danke`);
}
