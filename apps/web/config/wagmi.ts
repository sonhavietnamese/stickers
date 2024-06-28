import { baseSepolia } from "viem/chains"
import { http, createConfig } from "wagmi"
import { coinbaseWallet } from "wagmi/connectors"

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "sticker-club",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
})
