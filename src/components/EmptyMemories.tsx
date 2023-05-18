export function EmptyMemories() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Voce ainda nao registrou nenhuma lembraca, comece a{' '}
        <a href="" className="underline hover:text-gray-50">
          {' '}
          criar agora{' '}
        </a>
      </p>
    </div>
  )
}