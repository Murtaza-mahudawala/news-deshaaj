import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab, Open_Sans } from 'next/font/google';

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'हिंदी समाचार - ताज़ा खबरें',
  description: 'भारत और दुनिया की ताज़ा खबरें, क्रिकेट, व्यापार, राजनीति और अन्य समाचार हिंदी में पढ़ें।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${robotoSlab.variable} ${openSans.variable}`}>{children}</body>
    </html>
  );
}
