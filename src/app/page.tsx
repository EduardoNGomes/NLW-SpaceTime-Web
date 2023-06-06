import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Edit3 } from 'lucide-react'
import { ButtonDelete } from '@/components/ButtonDelete'

dayjs.locale(ptBR)

export interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
  content?: string
  author?: string
  isPublic?: boolean
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <main className="p-8">
      <div className="flex flex-col gap-10 p-8">
        {memories.map((memory) => {
          return (
            <div key={memory.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                  {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                </time>
                <div className="mr-2 flex gap-2">
                  <Link href={`memories/update/${memory.id}`}>
                    <Edit3 className="h-5 w-5 text-gray-200 transition-all duration-300 hover:cursor-pointer hover:text-gray-50 " />
                  </Link>
                  <ButtonDelete id={memory.id} token={token} />
                </div>
              </div>
              <Image
                src={memory.coverUrl}
                alt=""
                width={592}
                height={280}
                className="aspect-video w-full rounded-lg object-cover"
              />
              <p className="text-lg leading-relaxed text-gray-100">
                {memory.excerpt}
              </p>
              <Link
                href={`/memories/${memory.id}`}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              >
                Ler mais
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )
        })}
      </div>
    </main>
  )
}
