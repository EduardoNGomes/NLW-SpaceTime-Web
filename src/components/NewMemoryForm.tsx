'use client'
import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'

import { FormEvent, useState } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
export function NewMemoryForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    setLoading(true)
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const filetToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (filetToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.append('cover', filetToUpload)
      try {
        const uploadResponse = await api.post('upload', uploadFormData)

        coverUrl = uploadResponse.data.fileUrl
      } catch (error) {
        console.log(error)
        setLoading(false)
        return alert('imagem nao cadastrada')
      }
    }
    const token = Cookie.get('token')

    try {
      await api.post(
        'memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (error) {
      setLoading(false)
      console.log(error)
      return alert('memoria nao cadastrada')
    }

    router.refresh()
    router.push('/')
  }

  return (
    <form
      className="flex  flex-1  flex-col gap-2"
      onSubmit={handleCreateMemory}
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded-none border-0 bg-transparent p-1 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        disabled={loading}
        type="submit"
        className="inline-block  self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm font-bold uppercase leading-none text-black hover:bg-green-600 disabled:cursor-wait disabled:bg-gray-500"
      >
        Salvar
      </button>
    </form>
  )
}
