import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import "./globals.css"

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Donasi Chain - Donation Platform',
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
        {children}
      </body>
    </html>
  )
}

