import { Memory } from '@/app/page'
import { UpdateMemoryForm } from '@/components/UpdateMemoryForm'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export const dynamicParams = true
export const revalidate = 60

export default async function Update({ params }: { params: { id: string } }) {
  const id = params.id
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="1 flex flex-col gap-4 p-16">
      <UpdateMemoryForm memory={memory} />
    </div>
  )
}
