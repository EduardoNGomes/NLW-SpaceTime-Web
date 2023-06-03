import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { ButtonDelete } from '@/components/ButtonDelete'

dayjs.locale(ptBR)

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default async function MemoryDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory = response.data

  return (
    <div className="1 flex flex-col gap-4 p-16">
      <div className="-ml-10 flex justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <ButtonDelete id={id} token={token} />
      </div>

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
          {memory.content}
        </p>
      </div>
    </div>
  )
}
