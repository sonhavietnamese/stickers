"use client"

import {outline} from "@/lib/utils"
import NextImage from "next/image"
import {useCallback} from "react"
import Marquee from "react-fast-marquee"
import {AssetRecordType, type Editor, Tldraw, getHashForString, track, uniqueId, useEditor, useTools,} from "tldraw"

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
    console.log(base64Image)

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
  const editor = useEditor()

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
      <figure className="absolute z-30 left-1/2 -translate-x-1/2">
        <NextImage
          src={"/assets/logo.png"}
          className="w-[150px]"
          width={150}
          height={200}
          alt=""
        />
      </figure>

      <div className="absolute z-20 left-0 top-0 w-[200px] h-[100px]">
        <figure className="absolute -left-12 -top-[40px]">
          <NextImage
            src={"/assets/tl-01.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>

        <figure className="absolute left-2 top-[10px]">
          <NextImage
            src={"/assets/tl-02.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>
      </div>

      <div className="absolute z-20 right-0 top-0 w-[200px] h-[100px]">
        <figure className="absolute z-20 -right-4 -top-[60px]">
          <NextImage
            src={"/assets/tr-01.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>

        <figure className="absolute -right-[40px] -top-[10px]">
          <NextImage
            src={"/assets/tr-02.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>
      </div>

      <section className="w-full h-full p-5 absolute">
        <div className="w-full h-full relative bg-[#F7F3F0] rounded-2xl border overflow-hidden">
          <CustomUiExample />
        </div>
      </section>

      {/*<div className="absolute bottom-5 z-20 left-1/2 -translate-x-1/2">*/}
      {/*  <button type="button">Wauasdasdas</button>*/}
      {/*</div>*/}

      <div className="absolute select-none bottom-[21px] left-[21px] rounded-2xl overflow-hidden z-20 h-[90px] w-[320px]">
        <Marquee
          pauseOnHover={true}
          gradient={true}
          speed={20}
          className={"h-full w-full"}
          gradientColor={"#F9FAFB"}
        >
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      </div>

      {/*<div className="absolute bottom-0 z-20 right-0 flex flex-col gap-3">*/}
      {/*  {Array.from({ length: 4 }).map((_, i) => (*/}
      {/*    <div className="flex gap-2 items-center" key={i}>*/}
      {/*      <div className="flex">*/}
      {/*        {Array.from({ length: 4 }).map((_, i) => (*/}
      {/*          <button*/}
      {/*            type="button"*/}
      {/*            key={i}*/}
      {/*            className="w-12 rounded-full aspect-square bg-red-400"*/}
      {/*          >*/}
      {/*            Wau*/}
      {/*          </button>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*      <button*/}
      {/*        type="button"*/}
      {/*        className="w-12 rounded-full aspect-square bg-red-400"*/}
      {/*      >*/}
      {/*        Wau*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </main>
  )
}
