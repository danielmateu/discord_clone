import './globals.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'

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
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={cn(font.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <SocketProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey='discord-theme'
            >
              <ModalProvider />
              {children}
              <Toaster />
            </ThemeProvider>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
