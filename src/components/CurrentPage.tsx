'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function CurrentPage() {
  const path = usePathname()
  const activePage = 'border-b-2 border-gray-50 text-xl text-gray-50'
  const defaultPage =
    'cursor-pointer border-b-2 border-transparent text-xl transition-all duration-300 hover:border-b-2 hover:border-solid hover:border-gray-50 hover:text-gray-50'
  return (
    <div className="flex items-center justify-center gap-3 ">
      <Link href="/">
        <h1 className={path === '/' ? activePage : defaultPage}>
          Suas memorias
        </h1>
      </Link>
      <Link href="/memories/public">
        <h2 className={path === '/memories/public' ? activePage : defaultPage}>
          Todas as memorias
        </h2>
      </Link>
    </div>
  )
}
