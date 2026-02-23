import type { Metadata } from 'next';
import { JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ryan Zhou',
  description: 'Computer Science & Economics student at UT Austin — software engineering, machine learning, and systems.',
  keywords: ['Ryan Zhou', 'portfolio', 'software engineer', 'UT Austin', 'computer science'],
  openGraph: {
    title: 'Ryan Zhou',
    description: 'CS & Economics @ UT Austin',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
