import type { Metadata } from "next";
import { Playfair_Display, Inter, Anton } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const hero = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hero",
});

export const metadata: Metadata = {
  title: "Watch Studio — Luxury Timepieces",
  description: "Crafted in gold. Measured in legacy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${hero.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}