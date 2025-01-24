import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { NextAuthProvider } from '@/components/auth/next-auth-provider'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'GiveHope - Donation Platform',
  description: 'Make a difference through online donations',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}

