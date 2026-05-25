import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Guestlink",
  description: "Gast-Service-Portal für kleine Hotels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
