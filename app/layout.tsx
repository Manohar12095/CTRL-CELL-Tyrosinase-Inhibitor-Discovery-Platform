import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TopNav } from "@/components/nav/TopNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTRL+CELL — Tyrosinase Inhibitor Discovery",
  description:
    "Hackathon platform presenting computational identification and evaluation of tyrosinase inhibitors to address enzymatic browning in produce and skin hyperpigmentation.",
  keywords: [
    "tyrosinase", "inhibitor", "phenylmaltol", "docking", "PredSkin", "ProTox",
    "drug discovery", "computational chemistry", "bioinformatics",
  ],
  openGraph: {
    title: "CTRL+CELL — Tyrosinase Inhibitor Discovery",
    description: "Stopping the Browning: computational inhibitor discovery for tyrosinase/PPO.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script src="/3Dmol-min.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-base-950 text-slate-100 antialiased min-h-screen">
        <TopNav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
