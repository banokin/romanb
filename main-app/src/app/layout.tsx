import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Freddy - AI English Tutor',
  description: 'Learn English with Freddy, your AI-powered personal tutor',
  keywords: 'English learning, AI tutor, language learning, conversation practice',
  authors: [{ name: 'Freddy Team' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://freddy-english-tutor.vercel.app',
    title: 'Freddy - AI English Tutor',
    description: 'Learn English with Freddy, your AI-powered personal tutor',
    siteName: 'Freddy English Tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freddy - AI English Tutor',
    description: 'Learn English with Freddy, your AI-powered personal tutor',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="freddy-theme"
          >
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}