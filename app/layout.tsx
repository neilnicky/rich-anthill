import type { Metadata, Viewport } from "next";
import { Archivo, Golos_Text, Martian_Mono } from "next/font/google";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const golos = Golos_Text({ subsets: ["latin"], variable: "--font-golos", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rich Anthill · the register of a daily ant experiment",
    template: "%s | Rich Anthill register",
  },
  description:
    "Every day, @rich_anthill leaves food at one wild anthill and films it. This register keeps what was issued, what the reels show, what the science says and what nobody knows yet.",
  applicationName: "Rich Anthill register",
  openGraph: { type: "website", siteName: "Rich Anthill register", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d4d0c6" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1a16" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${golos.variable} ${martian.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
