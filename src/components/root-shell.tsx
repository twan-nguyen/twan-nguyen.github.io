import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { content, localePaths, siteUrl, type Locale } from "@/data/profile";
import "@/app/globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

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
    <html lang={locale} className={`${beVietnamPro.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
