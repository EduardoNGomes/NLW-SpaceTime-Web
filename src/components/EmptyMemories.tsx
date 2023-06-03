import Link from 'next/link'

export function EmptyMemories() {
  return (
    <div className="flex h-full items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Voce ainda nao registrou nenhuma lembraca, comece a{' '}
        <Link href="/memories/new" passHref>
          <p className="underline hover:text-gray-50"> criar agora </p>
        </Link>
      </p>
    </div>
  )
}
