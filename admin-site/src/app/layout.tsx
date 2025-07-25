import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Freddy English Tutor - Admin',
  description: 'Admin panel for Freddy English Tutor',
  keywords: ['admin', 'English', 'learning', 'AI', 'tutor'],
  authors: [{ name: 'Freddy English Tutor Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
