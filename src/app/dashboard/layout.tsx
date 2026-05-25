import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand text-white px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg">
          Hotel Guestlink
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Gäste
          </Link>
          <Link href="/dashboard/tickets" className="hover:underline">
            Tickets
          </Link>
        </nav>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
