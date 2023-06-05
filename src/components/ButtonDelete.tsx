'use client'

import { api } from '@/lib/api'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ButtonDeleteProps {
  id: string
  token: string | undefined
}

export function ButtonDelete({ id, token }: ButtonDeleteProps) {
  const router = useRouter()
  async function handleDelete() {
    try {
      await api.delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      alert('item removido')
    } catch (error) {
      console.log(error)
    }
    router.refresh()
    router.push('/')
  }
  return (
    <button
      className="transition-all duration-1000 ease-in-out"
      onClick={handleDelete}
    >
      <Trash className="h-5 w-5 text-red-900  hover:text-red-500" />
    </button>
  )
}
