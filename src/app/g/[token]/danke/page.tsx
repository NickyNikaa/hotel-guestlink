import Link from "next/link";

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm max-w-sm w-full p-8 text-center space-y-4">
        <div className="text-5xl">✓</div>
        <h1 className="text-xl font-semibold">Notiert</h1>
        <p className="text-sm text-slate-600">
          Ihre Anfrage wurde an unser Team weitergeleitet. Wir kümmern uns in
          den nächsten ca. 15 Minuten darum.
        </p>
        <Link
          href={`/g/${token}`}
          className="inline-block text-brand font-medium hover:underline"
        >
          Zurück zum Service-Menü
        </Link>
      </div>
    </div>
  );
}
