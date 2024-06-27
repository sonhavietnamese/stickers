"use client"

import Decors from "@/components/decors.tsx"
import { outline } from "@/lib/utils"
import { Avatar } from "@coinbase/onchainkit/identity"
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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function loadImage(base64Image: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      try {
        resolve(img)
      } catch (error) {
        reject(error)
      }
    }
    img.onerror = reject
    img.src = base64Image
  })
}

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

      const outlined = outline(loadedImage, 10, "black").toDataURL()
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
  return (
    <main className="w-screen h-screen leading-none relative overflow-hidden">
      <Decors />

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
          className={"h-full w-full"}
          gradientColor={"#F9FAFB"}
        >
          <div
            className={
              "w-[90px] items-center flex justify-center h-full aspect-square"
            }
          >
            <NextImage
              src={"https://vitejs.dev/logo-uwu.png"}
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
              key={i}
              address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
