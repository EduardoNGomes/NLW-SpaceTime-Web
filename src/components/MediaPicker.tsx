'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  srcImg?: string
}

export function MediaPicker({ srcImg }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        onChange={onFileSelected}
        id="media"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview ? (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        // eslint-disable-next-line
        <img
          src={srcImg}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
