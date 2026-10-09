import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Newsreader } from "next/font/google";
import { content, localePaths, siteUrl, type Locale } from "@/data/profile";
import "@/app/globals.css";

// Every face must ship the Vietnamese subset — the /vi/ page depends on it.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "vietnamese"],
  style: ["italic"],
  weight: ["400", "500"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

export const viewport: Viewport = { themeColor: "#0b0e13" };

export function buildMetadata(locale: Locale): Metadata {
  const { name, role, summary } = content[locale];
  const title = `${name} — ${role}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description: summary,
    alternates: {
      canonical: localePaths[locale],
      languages: { en: localePaths.en, vi: localePaths.vi, "x-default": localePaths.en },
    },
    openGraph: {
      type: "profile",
      url: localePaths[locale],
      title,
      description: summary,
      siteName: name,
      locale: locale === "en" ? "en_US" : "vi_VN",
    },
  };
}

// Each language has its own root layout so `<html lang>` matches the page.
export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
