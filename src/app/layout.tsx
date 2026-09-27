import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

// One rounded sans for the whole page. The chrome fill on the name is the
// display moment; this face stays at a normal width in regular and medium.
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500"],
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
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}
