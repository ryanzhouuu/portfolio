import type { Metadata } from "next";
import { JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";

// Archivo carries a real width axis (62–125). We load it once and drive the
// expanded "nameplate" display look via font-variation-settings in CSS, while
// body copy uses the same family at normal width.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Zhou — Software Engineer",
  description:
    "Ryan Zhou — CS & Economics at UT Austin. Software engineering across systems, machine learning, and the interfaces in between. Selected work, presented under light.",
  keywords: [
    "Ryan Zhou",
    "portfolio",
    "software engineer",
    "UT Austin",
    "computer science",
    "machine learning",
  ],
  openGraph: {
    title: "Ryan Zhou — Software Engineer",
    description:
      "CS & Economics @ UT Austin. Selected work, presented under light.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
