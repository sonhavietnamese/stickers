import OnchainProviders from "@/components/onchain-provider.tsx";
import {ThemeProvider} from '@/components/theme-provider'
import type {Metadata, Viewport} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import 'tldraw/tldraw.css'

const inter = Inter({ subsets: ["latin"] })

const APP_NAME = "Stickers Club"
const APP_DEFAULT_TITLE = "Stickers"
const APP_TITLE_TEMPLATE = "%s - PWA App"
const APP_DESCRIPTION = "Best PWA app in the world!"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  // description: APP_DESCRIPTION,
  // manifest: '/manifest.json',
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: 'default',
  //   title: APP_DEFAULT_TITLE,
  // },
  // formatDetection: {
  //   telephone: false,
  // },
  // openGraph: {
  //   type: 'website',
  //   siteName: APP_NAME,
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
  // twitter: {
  //   card: 'summary',
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
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
