"use client"

import { CHAIN } from "@/config/viem-client.ts"
import { wagmiConfig } from "@/config/wagmi"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { WagmiProvider } from "wagmi"

type Props = { children: ReactNode }

const queryClient = new QueryClient()

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAIN_KIT_API_KEY}
          chain={CHAIN}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default OnchainProviders
