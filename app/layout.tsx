import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { Open_Sans } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'discord clone app',
  description: 'Esto es un clon de discord',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
