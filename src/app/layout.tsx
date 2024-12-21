import '@/globals.css'

import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import Script from 'next/script'

import { env } from '@/lib/env'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  title: 'Next',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable, lora.variable)}>
        {env.NODE_ENV === 'production' && (
          <Script
            src="https://a.mancuoj.me/script.js"
            data-website-id="7c1b8609-8069-4f19-999d-c08bd2c57a55"
          />
        )}
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
