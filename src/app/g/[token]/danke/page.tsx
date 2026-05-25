import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const lang = await getLang();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm max-w-sm w-full p-8 text-center space-y-4">
        <div className="text-5xl">✓</div>
        <h1 className="text-xl font-semibold">{t("notedTitle", lang)}</h1>
        <p className="text-sm text-slate-600">{t("notedBody", lang)}</p>
        <Link
          href={`/g/${token}`}
          className="inline-block text-brand font-medium hover:underline"
        >
          {t("backToServiceMenu", lang)}
        </Link>
      </div>
    </div>
  );
}
