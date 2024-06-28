import OnchainProviders from "@/components/providers/onchain-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "tldraw/tldraw.css"
import "@coinbase/onchainkit/styles.css"

const inter = Inter({ subsets: ["latin"] })

const APP_NAME = "Stickers Club"
const APP_DEFAULT_TITLE = "Stickers"
const APP_TITLE_TEMPLATE = "%s - PWA App"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnchainProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </OnchainProviders>
      </body>
    </html>
  )
}
