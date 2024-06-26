"use client"

import {outline} from "@/lib/utils.ts";
import {type ChangeEvent, useState} from "react";

export default function Page() {
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [outlinedImage, setOutlinedImage] = useState<string | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileType = file.type
      if (fileType === "image/jpeg" || fileType === "image/png") {
        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64String = reader.result as string
          setRawImage(base64String)

          // Upload the image to the /v1/img endpoint
          const response = await fetch("/api/v1/p", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64String.split(",")[1] }),
          })

          if (response.ok) {
            const data = await response.json()
            setProcessedImage(data.image)

            const img = new Image()

            img.crossOrigin = "anonymous"
            img.onload = () => {
              setOutlinedImage(outline(img, 10, "white").toDataURL())
            }
            img.src = `data:image/png;base64,${data.image}`
          } else {
            console.error("Upload failed:", response.statusText)
          }
        }
        reader.readAsDataURL(file)
      } else {
        alert("Invalid file type. Only .jpg and .png files are accepted.")
      }
    }
  }

  return (
    <main className={"w-screen min-h-screen bg-red-300"}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <label
            htmlFor="fileUpload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload an image</span>
            <input
              id="fileUpload"
              name="fileUpload"
              type="file"
              className="sr-only"
              accept=".jpg, .png"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      {rawImage && (
        <div className={"w-[400px] h-auto"}>
          <span>Raw</span>
          <img src={rawImage} alt="uploaded " className={"w-full h-auto"} />
        </div>
      )}

      {processedImage && (
        <div className={"w-[400px] h-auto"}>
          <span>Raw</span>
          <img
            src={`data:image/png;base64,${processedImage}`}
            alt="uploaded "
            className={"w-full h-auto"}
          />
        </div>
      )}

      {outlinedImage && (
        <div className={"w-[400px] h-auto"}>
          <span>Raw</span>
          <img
            src={outlinedImage}
            alt="uploaded "
            className={"w-full h-auto"}
          />
        </div>
      )}
    </main>
  )
}
