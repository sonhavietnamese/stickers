import OnchainProviders from "@/components/onchain-provider.tsx"
import type {Metadata} from "next"

const APP_NAME = "Stickers Club | Me"
const APP_DEFAULT_TITLE = "Stickers"
const APP_TITLE_TEMPLATE = "%s - PWA App"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <OnchainProviders>{children}</OnchainProviders>
}
