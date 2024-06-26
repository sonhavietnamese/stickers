'use client'

import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { type Editor, Tldraw, track, useEditor } from 'tldraw'
import Marquee from "react-fast-marquee";

function CustomUiExample() {
  const handleMount = useCallback((editor: Editor) => {
    console.log('editor', editor)

    editor.setCurrentTool('draw')

    // editor.addListener("")

    // editor.asset

    // editor.registerExternalContentHandler('text', async ({ point, sources }) => {
    //   console.log('sources', sources)
    //   console.log('point', point)

    //   const htmlSource = sources?.find((s) => s.type === 'text' && s.subtype === 'html')

    //   if (htmlSource) {
    //     const center = point ?? editor.getViewportPageBounds().center

    //     editor.createShape({
    //       type: 'html',
    //       x: center.x - 250,
    //       y: center.y - 150,
    //       props: {
    //         html: htmlSource.data,
    //       },
    //     })
    //   }
    // })

    // [a]
    // editor.registerExternalAssetHandler('file', async ({ file }: { type: 'file'; file: File }) => {
    //   const id = uniqueId()

    //   const objectName = `${id}-${file.name}`.replaceAll(/[^a-zA-Z0-9.]/g, '-')

    //   console.log('objectName', objectName)

    //   // const url = `${UPLOAD_URL}/${objectName}`

    //   // await fetch(url, {
    //   //   method: 'POST',
    //   //   body: file,
    //   // })
    //   // //[b]
    //   // const assetId: TLAssetId = AssetRecordType.createId(getHashForString(url))

    //   // let size: {
    //   //   w: number
    //   //   h: number
    //   // }
    //   // let isAnimated: boolean
    //   // let shapeType: 'image' | 'video'

    //   // //[c]
    //   // if (MediaHelpers.isImageType(file.type)) {
    //   //   shapeType = 'image'
    //   //   size = await MediaHelpers.getImageSize(file)
    //   //   isAnimated = await MediaHelpers.isAnimated(file)
    //   // } else {
    //   //   shapeType = 'video'
    //   //   isAnimated = true
    //   //   size = await MediaHelpers.getVideoSize(file)
    //   // }
    //   // //[d]
    //   // const asset: TLAsset = AssetRecordType.create({
    //   //   id: assetId,
    //   //   type: shapeType,
    //   //   typeName: 'asset',
    //   //   props: {
    //   //     name: file.name,
    //   //     src: url,
    //   //     w: size.w,
    //   //     h: size.h,
    //   //     fileSize: file.size,
    //   //     mimeType: file.type,
    //   //     isAnimated,
    //   //   },
    //   // })

    //   return asset
    // })
  }, [])

  return <Tldraw className='z-10' hideUi onMount={handleMount} />
}

const CustomUi = track(() => {
  const editor = useEditor()

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          editor.deleteShapes(editor.getSelectedShapeIds())
          break
        }
        case 'v': {
          editor.setCurrentTool('select')
          break
        }
        case 'e': {
          editor.setCurrentTool('eraser')
          break
        }
        case 'x':
        case 'p':
        case 'b':
        case 'd': {
          editor.setCurrentTool('draw')
          break
        }
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <div className='custom-toolbar h-[100px] w-[500px] bg-green-500 absolute z-[300] inset-0'>
      <button
        type='button'
        className='text-black bg-red-300'
        data-isactive={editor.getCurrentToolId() === 'image'}
        onClick={() => {
          editor.setCurrentTool('asset')
        }}>
        Pencil
      </button>
    </div>
  )
})

export default function Page() {
  return (
    <main className='w-screen h-screen leading-none relative overflow-hidden'>
      <figure className='absolute z-30 left-1/2 -translate-x-1/2'>
        <Image src={'/assets/logo.png'} className='w-[150px]' width={150} height={200} alt='' />
      </figure>

      <div className='absolute z-20 left-0 top-0 w-[200px] h-[100px]'>
        <figure className='absolute -left-12 -top-[40px]'>
          <Image src={'/assets/tl-01.png'} className='w-[150px]' width={150} height={200} alt='' />
        </figure>

        <figure className='absolute left-2 top-[10px]'>
          <Image src={'/assets/tl-02.png'} className='w-[150px]' width={150} height={200} alt='' />
        </figure>
      </div>

      <div className='absolute z-20 right-0 top-0 w-[200px] h-[100px]'>
        <figure className='absolute z-20 -right-4 -top-[60px]'>
          <Image src={'/assets/tr-01.png'} className='w-[150px]' width={150} height={200} alt='' />
        </figure>

        <figure className='absolute -right-[40px] -top-[10px]'>
          <Image src={'/assets/tr-02.png'} className='w-[150px]' width={150} height={200} alt='' />
        </figure>
      </div>

      <section className='w-full h-full p-5 absolute'>
        <div className='w-full h-full relative bg-[#F7F3F0] rounded-2xl border overflow-hidden'>
          <CustomUiExample />
        </div>
      </section>

      <div className='absolute bottom-5 left-1/2 -translate-x-1/2'>
        <button type='button'>Wauasdasdas</button>
      </div>

      <div className='absolute select-none bottom-[21px] left-[21px] rounded-2xl overflow-hidden z-20 h-[90px] w-[320px]'>
        <Marquee pauseOnHover={true} gradient={true} speed={20} className={"h-full w-full"} gradientColor={"#F9FAFB"}>
          I can be a React component, multiple React components, or just some text.
        </Marquee>
      </div>

      <div className='absolute bottom-0 right-0 flex flex-col gap-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className='flex gap-2 items-center' key={i}>
            <div className='flex'>
              {Array.from({ length: 4 }).map((_, i) => (
                <button type='button' key={i} className='w-12 rounded-full aspect-square bg-red-400'>
                  Wau
                </button>
              ))}
            </div>
            <button type='button' className='w-12 rounded-full aspect-square bg-red-400'>
              Wau
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
