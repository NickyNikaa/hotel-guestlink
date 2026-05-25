"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS_DE = [
  "Wann gibt es Frühstück?",
  "Wie ist das WLAN-Passwort?",
  "Können Sie ein Restaurant empfehlen?",
  "Bis wann kann ich auschecken?",
];
const SUGGESTIONS_EN = [
  "When is breakfast?",
  "What is the Wi-Fi password?",
  "Can you recommend a restaurant?",
  "Until when can I check out?",
];

export function ConciergeChat({ token, lang }: { token: string; lang: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  async function send(content: string) {
    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Fehler beim Senden");
        setLoading(false);
        return;
      }
      setMessages([...next, { role: "assistant", content: data.reply || "…" }]);
    } catch {
      setError("Verbindungsproblem — bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  const suggestions = lang === "de" ? SUGGESTIONS_DE : SUGGESTIONS_EN;
  const placeholder =
    lang === "de"
      ? "Ihre Frage an den Concierge…"
      : lang === "it"
      ? "La vostra domanda al concierge…"
      : lang === "fr"
      ? "Votre question au concierge…"
      : lang === "es"
      ? "Su pregunta al conserje…"
      : "Your question to the concierge…";

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden h-[60vh] min-h-[400px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !loading && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 text-center">
              {lang === "de"
                ? "Fragen Sie mich alles rund um Ihren Aufenthalt"
                : lang === "it"
                ? "Chiedete tutto sul vostro soggiorno"
                : lang === "fr"
                ? "Posez-moi vos questions sur votre séjour"
                : lang === "es"
                ? "Pregúnteme sobre su estancia"
                : "Ask me anything about your stay"}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm bg-slate-50 hover:bg-brand hover:text-white border border-slate-200 rounded-lg px-3 py-2 transition"
                >
                  💡 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-brand text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-800 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm">
              …
            </div>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-600 bg-red-50 rounded-lg p-2">
            {error}
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !loading) send(input.trim());
        }}
        className="border-t border-slate-200 p-2 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-base"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-brand hover:bg-brand-dark text-white font-medium px-4 rounded-lg disabled:opacity-50"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
