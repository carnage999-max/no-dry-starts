import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NO DRY STARTS® - Engine Pre-Primer System",
  description: "Revolutionary engine pre-primer system that eliminates cold-start wear and extends engine life by 2x. Patent-pending technology.",
  keywords: ["engine pre-primer", "cold start wear", "oil pressure", "engine protection"],
  authors: [{ name: "NO DRY STARTS®" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nodrystarts.com",
    siteName: "NO DRY STARTS®",
    title: "NO DRY STARTS® - Engine Pre-Primer System",
    description: "Eliminate cold-start engine wear with our revolutionary electric pre-primer system. Double your engine's lifespan.",
    images: [
      {
        url: "/images/nodrystarts.jpeg",
        width: 1200,
        height: 630,
        alt: "NO DRY STARTS® Engine Pre-Primer System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NO DRY STARTS® - Engine Pre-Primer System",
    description: "Eliminate cold-start engine wear and extend engine life by 2x.",
    images: ["/images/nodrystarts.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
