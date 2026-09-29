import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Geist carries the name, titles, and body; Geist Mono carries labels, dates,
// and indices so metadata reads like engraving on the metal.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400"],
  display: "swap",
});

// Runs before first paint on every load. Starts the page at the top (no
// scroll restoration, no jump to a leftover #hash) and marks the document so
// the hero starts hidden; the Hero effect plays the intro from there. The
// timeout is a failsafe so a failed script can never leave the hero invisible.
const introGate = `try{var d=document.documentElement;if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash)history.replaceState(null,'',location.pathname+location.search);d.dataset.intro=matchMedia('(prefers-reduced-motion: reduce)').matches?'fade':'play';setTimeout(function(){if(d.dataset.intro&&!d.dataset.introLive){delete d.dataset.intro}},3000)}catch(e){}`;

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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
