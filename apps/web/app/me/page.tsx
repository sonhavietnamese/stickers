"use client"

import Decors from "@/components/decors.tsx"
import { fileToBase64, loadImage, outline } from "@/lib/utils"
import { Avatar } from "@coinbase/onchainkit/identity"
import { ConnectAccount } from "@coinbase/onchainkit/wallet"
import NextImage from "next/image"
import { useCallback } from "react"
import Marquee from "react-fast-marquee"
import {
  AssetRecordType,
  type Editor,
  Tldraw,
  getHashForString,
  track,
  uniqueId,
  useTools,
} from "tldraw"
import { useAccount } from "wagmi"

function CustomUiExample() {
  const handleMount = useCallback((editor: Editor) => {
    editor.registerExternalAssetHandler("file", async ({ file }) => {
      const id = uniqueId()
      const url = "api/v1/p"
      const base64String = await fileToBase64(file)
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          image: base64String.split(",")[1],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      const loadedImage = await loadImage(`data:image/png;base64,${data.image}`)

      const outlined = outline(loadedImage, 8, "black").toDataURL()
      const loadedOutlined = await loadImage(outlined)

      return AssetRecordType.create({
        id: AssetRecordType.createId(getHashForString(id)),
        type: "image",
        typeName: "asset",
        props: {
          name: file.name,
          src: loadedOutlined.src,
          w: loadedOutlined.width,
          h: loadedOutlined.height,
          mimeType: file.type,
          isAnimated: false,
        },
      })
    })
  }, [])

  return (
    <Tldraw onMount={handleMount} hideUi={true} className={"z-10 absolute"}>
      <CustomUi />
    </Tldraw>
  )
}

const CustomUi = track(() => {
  const tools = useTools()

  return (
    <div className="custom-layout">
      <div className="">
        <button
          type="button"
          className="custom-button"
          onClick={() => tools.asset.onSelect("toolbar")}
        >
          Select
        </button>
      </div>
    </div>
  )
})

export default function Page() {
  const account = useAccount()

  const handleMint = async () => {
    // const { testClient, walletClient, publicClient } = viemClients;
    // const creatorAccount = (await walletClient.getAddresses())[0]!;
    // const creatorAccount = (await walletClient.getAddresses())[0]
    // console.log(creatorAccount)
  }

  return (
    <main className="w-screen h-screen leading-none relative overflow-hidden">
      <Decors />

      <figure className="absolute z-30 bottom-0 left-1/2 -translate-x-1/2">
        <button
          className={"bg-red-300 p-4 rounded-2xl"}
          onClick={handleMint}
          type={"button"}
        >
          Test mint
        </button>

        <ConnectAccount />
        {/*<Image*/}
        {/*  src={"/assets/logo.png"}*/}
        {/*  className="w-[150px]"*/}
        {/*  width={150}*/}
        {/*  height={200}*/}
        {/*  alt=""*/}
        {/*/>*/}
      </figure>

      <section className="w-full h-full p-5 absolute">
        <div className="w-full h-full relative bg-[#F7F3F0] rounded-2xl border overflow-hidden">
          <CustomUiExample />
        </div>
      </section>
      <div className="absolute select-none bottom-[21px] rounded-bl-2xl left-[21px] overflow-hidden z-20 h-[90px] w-[320px]">
        <Marquee
          pauseOnHover={true}
          gradient={true}
          gradientWidth={100}
          speed={20}
          className={"h-full w-full space-x-2"}
          gradientColor={"#F9FAFB"}
        >
          <div
            className={
              "w-[90px] items-center flex justify-center h-full aspect-square mr-4"
            }
          >
            <NextImage
              src={"https://vitejs.dev/logo-uwu.png"}
              alt={"uwu"}
              width={320}
              height={90}
            />
          </div>

          <div
            className={
              "w-[90px] items-center flex justify-center h-full aspect-square mr-4"
            }
          >
            <NextImage
              src={"https://www.haskell.org/img/haskell-uwu.png"}
              alt={"uwu"}
              width={320}
              height={90}
            />
          </div>

          <div
            className={
              "w-[90px] items-center flex justify-center h-full aspect-square "
            }
          >
            <NextImage
              src={
                "https://nextjs.org/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1714730590%2Ffront%2Fnextjs%2Fuwu%2Fnext-uwu-logo.png&w=1080&q=75"
              }
              alt={"uwu"}
              width={320}
              height={90}
            />
          </div>
        </Marquee>
      </div>

      <div className="absolute bottom-8 z-20 right-8 flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className={"w-10 aspect-square"} key={i}>
            <Avatar
              className={"w-full h-full"}
              address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
