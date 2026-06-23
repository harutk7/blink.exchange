import '@sushiswap/ui/index.css'

import { ToastContainer } from '@sushiswap/notifications'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import type React from 'react'
import { Trackers } from './trackers'
import { UtilityButtons } from './utility-buttons'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'BLINK Exchange',
    template: '%s | BLINK Exchange',
  },
  description:
    'A decentralized exchange (DEX) for the BLINK network. Swap tokens, provide liquidity, and explore pools across the BLINK ecosystem.',
  icons: {
    apple: '/apple-touch-icon.png?v=1',
    icon: '/favicon-32x32.png?v=1',
    shortcut: '/favicon-16x16.png?v=1',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1920,
        height: 1080,
        alt: 'BLINK Exchange',
      },
    ],
  },
  other: {
    'base:app_id': '6a0391a02be96789d34cef6d',
  },
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space_grotesk.variable} ${jetbrains_mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/site.webmanifest?v=1" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=1"
          color="#00D9FF"
        />
        <link rel="shortcut icon" href="/favicon-32x32.png?v=1" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ToastContainer />
        <UtilityButtons />
        {children}
        <Trackers />
      </body>
    </html>
  )
}
