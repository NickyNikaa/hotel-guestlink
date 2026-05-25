"use client";

import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Lang }) {
  function setLang(lang: Lang) {
    document.cookie = `hgl-lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  }

  return (
    <div className="flex gap-1 justify-center pt-1">
      {SUPPORTED_LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          title={l.label}
          aria-label={l.label}
          className={`text-2xl px-1.5 py-0.5 rounded transition ${
            current === l.code
              ? "bg-brand/10 ring-1 ring-brand/30"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}
