import type { Metadata } from 'next';
import { Libre_Franklin, Newsreader, Inter } from 'next/font/google';
import './globals.css';

const libreFranklin = Libre_Franklin({
  variable: '--font-libre-franklin',
  subsets: ['latin'],
  weight: ['800', '900'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Bones Notícies',
  description: "Un qüestionari interactiu sobre política i actualitat mediàtica a Catalunya i Espanya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca" className={`${libreFranklin.variable} ${newsreader.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-bg">
        {children}
      </body>
    </html>
  );
}
