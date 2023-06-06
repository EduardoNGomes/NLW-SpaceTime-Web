import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Memory } from '@/app/page'

dayjs.locale(ptBR)

export default async function Home() {
  const response = await api.get('/public')

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-center gap-3 ">
        <Link href="/">
          <h1 className="cursor-pointer border-b-2 border-transparent text-xl transition-all duration-300 hover:border-b-2 hover:border-solid hover:border-gray-50 hover:text-gray-50">
            Suas memorias
          </h1>
        </Link>
        <h2 className="border-b-2 border-gray-50 text-xl text-gray-50">
          Todas as memorias
        </h2>
      </div>
      <div className="flex flex-col gap-10 p-8">
        {memories.map((memory) => {
          return (
            <div key={memory.id} className="space-y-4">
              <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </time>
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
              <div className="flex justify-between">
                <Link
                  href={`/memories/${memory.id}`}
                  className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                >
                  Ler mais
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p>Autor: {memory.author}</p>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
