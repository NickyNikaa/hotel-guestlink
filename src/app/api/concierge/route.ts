import { NextRequest, NextResponse } from "next/server";
import { DEMO_HOTEL_INFO } from "@/lib/hotel-data";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Concierge ist noch nicht konfiguriert (ANTHROPIC_API_KEY fehlt in Vercel Env Vars).",
      },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();
    const token = String(body.token || "");
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];

    if (!token || messages.length === 0) {
      return NextResponse.json({ error: "Token und messages benötigt" }, { status: 400 });
    }
    if (messages.length > 30) {
      return NextResponse.json({ error: "Zu viele Nachrichten — bitte neu starten." }, { status: 400 });
    }

    // Gast-Kontext holen
    const guest = await prisma.guest.findUnique({
      where: { token },
      include: { hotel: true },
    });
    if (!guest) {
      return NextResponse.json({ error: "Gast nicht gefunden" }, { status: 404 });
    }

    const guestContext = `\nGAST-INFO\n- Name: ${guest.name}\n- Zimmer: ${guest.room}\n- Aufenthalt: ${guest.checkIn.toLocaleDateString("de-DE")} bis ${guest.checkOut.toLocaleDateString("de-DE")}\n`;

    const systemPrompt = DEMO_HOTEL_INFO + "\n" + guestContext;

    // Claude Haiku — günstig, schnell
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content.slice(0, 1000), // jede Nachricht max 1000 Zeichen
        })),
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      console.error("Claude API error:", claudeRes.status, errText);
      return NextResponse.json(
        { error: "Concierge-Service vorübergehend nicht erreichbar." },
        { status: 502 },
      );
    }

    const data = await claudeRes.json();
    const reply =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Concierge route error:", err);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen — bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }
}
