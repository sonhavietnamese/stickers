"use client"

import { CHAIN, publicClient } from "@/config/viem-client.ts"
import { ConnectAccount } from "@coinbase/onchainkit/wallet"
import { createCreatorClient } from "@zoralabs/protocol-sdk"
import { useState } from "react"
import { useAccount, useChainId, useDisconnect, useSignTypedData } from "wagmi"

const creatorClient = createCreatorClient({
  chainId: CHAIN.id,
  publicClient,
})

export default function Page() {
  const chainId = useChainId()
  const { address: creatorAddress, status } = useAccount()
  const { disconnect } = useDisconnect()
  const [isRequestMint, setIsRequestMint] = useState(false)
  const {
    signTypedData,
    signTypedDataAsync,
    data: signature,
  } = useSignTypedData()
  const [dataDefinition, setDataDefinition] = useState(null)

  const [exposedSubmit, setExposedSubmit] = useState(null)

  const prepareData = (
    creatorAddress: `0x${string}`,
    uri: string,
  ): Promise<{ typedDataDefinition: any; submit: any }> => {
    return new Promise((resolve, reject) => {
      creatorClient
        .createPremint({
          contract: {
            contractAdmin: creatorAddress,
            contractName: "Testing Contract",
            contractURI: uri,
          },
          // token info of token to create
          token: {
            tokenURI: uri,
            payoutRecipient: creatorAddress,
          },
        })
        .then(({ typedDataDefinition, submit }) => {
          resolve({ typedDataDefinition, submit })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async function handleMint() {
    if (!creatorAddress) {
      return
    }
    const { typedDataDefinition, submit } = await prepareData(
      creatorAddress,
      "ipfs://bafkreiainxen4b4wz4ubylvbhons6rembxdet4a262nf2lziclqvv7au3e",
    )
    // console.log(typedDataDefinition)
    // console.log(submit)
    const res = await signTypedDataAsync(typedDataDefinition)
    // console.log(res)
    if (res) {
      submit(res)
    }
  }

  return (
    <main>
      {(() => {
        if (status === "disconnected") {
          return <ConnectAccount />
        }

        return (
          <div className="flex h-8 w-8 items-center justify-center">
            {/*{address && (*/}
            {/*  <button type="button" onClick={() => disconnect()}>*/}
            {/*    <Avatar address={address} />*/}
            {/*  </button>*/}
            {/*)}*/}
          </div>
        )
      })()}
      <span>{chainId}</span>
      {/*{address && (*/}
      {/*  <Identity address={address}>*/}
      {/*    <Avatar address={address} />*/}
      {/*    <OCKAddress address={address} />*/}
      {/*  </Identity>*/}
      {/*)}*/}

      <button type={"button"} onClick={handleMint}>
        Create
      </button>

      <button
        className={"bg-amber-600 p-6"}
        type={"button"}
        onClick={handleMint}
      >
        Mint
      </button>
    </main>
  )
}
