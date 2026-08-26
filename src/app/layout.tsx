import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const fontCaveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-handwriting",
});

const fontPatrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrick",
});

export const metadata: Metadata = {
  title: "VedaAI - AI Assessment Extraction & Answer Mapping",
  description: "Automated assessment question extraction, handwritten student answer mapping, and AI grading insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontJakarta.variable} ${fontCaveat.variable} ${fontPatrickHand.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#F8F9FA] text-[#1E242D] antialiased selection:bg-orange-100 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}
