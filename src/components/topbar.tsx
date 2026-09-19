'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Topbar() {
  const pathname = usePathname()
  const [initial, setInitial] = useState('S')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email
      if (email) setInitial(email[0].toUpperCase())
    })
  }, [])

  let page = 'Panoramica'
  if (pathname === '/corsi') page = 'Catalogo percorsi'
  else if (pathname.startsWith('/corsi/')) page = 'Percorso'
  else if (pathname === '/privacy') page = 'Privacy'
  else if (pathname === '/cookie') page = 'Cookie'

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-bg z-20">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-text-muted">Area studenti</span>
        <span className="text-text-dim">/</span>
        <span className="text-text font-medium">{page}</span>
      </div>
      <div className="w-7 h-7 rounded-full bg-accent text-accent-fg flex items-center justify-center text-xs font-semibold">
        {initial}
      </div>
    </header>
  )
}