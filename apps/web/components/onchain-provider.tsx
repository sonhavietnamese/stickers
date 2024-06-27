"use client"

import { OnchainKitProvider } from "@coinbase/onchainkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { baseSepolia } from "viem/chains"

type Props = { children: ReactNode }

const queryClient = new QueryClient()

function OnchainProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAIN_KIT_API_KEY}
        chain={baseSepolia}
      >
        {children}
      </OnchainKitProvider>
    </QueryClientProvider>
  )
}

export default OnchainProviders
