import type { Metadata, Viewport } from "next";
import { Golos_Text, Literata, Martian_Mono } from "next/font/google";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
});
const golos = Golos_Text({ subsets: ["latin"], variable: "--font-golos", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rich Anthill · a documentary at ant height",
    template: "%s | Rich Anthill",
  },
  description:
    "Every day, @rich_anthill leaves food at one wild anthill and films it. Follow the experiment day by day: what was given, what the reels show, what the science says and what nobody knows yet.",
  applicationName: "Rich Anthill",
  openGraph: { type: "website", siteName: "Rich Anthill", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#17110c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${literata.variable} ${golos.variable} ${martian.variable}`}>
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
