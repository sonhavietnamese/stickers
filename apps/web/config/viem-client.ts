import { createPublicClient, createWalletClient } from "viem"
import { baseSepolia } from "viem/chains"
import { http } from "wagmi"

export const CHAIN = baseSepolia

export const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http(),
})

export const walletClient = createWalletClient({
  chain: CHAIN,
  transport: http(),
})
