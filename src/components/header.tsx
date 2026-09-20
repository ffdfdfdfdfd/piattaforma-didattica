'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [pathname])

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const initial = email?.[0]?.toUpperCase() ?? 'S'

  const links = [
    { href: '/', label: 'Home' },
    { href: '/corsi', label: 'Corsi' },
    { href: '/impostazioni', label: 'Impostazioni' },
  ]

  return (
    <header className="border-b border-border bg-bg sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="brand text-lg tracking-[0.02em]">
          KERNEL<span className="text-brand">.</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`label transition-colors ${
                  active ? 'text-text' : 'text-text-muted hover:text-text'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu utente"
            aria-expanded={open}
            className="w-8 h-8 rounded-full bg-text text-bg flex items-center justify-center text-xs font-semibold"
          >
            {initial}
          </button>

          {open && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
                aria-hidden
              />
              <div className="absolute right-0 top-11 z-20 w-64 border border-border bg-surface rounded-md shadow-lg p-3">
                <p className="text-[11px] text-text-muted truncate mb-3">
                  {email ?? 'Account'}
                </p>
                <Link
                  href="/impostazioni"
                  onClick={() => setOpen(false)}
                  className="block px-2 py-1.5 text-sm rounded hover:bg-surface-2"
                >
                  Impostazioni
                </Link>
                <Link
                  href="/privacy"
                  onClick={() => setOpen(false)}
                  className="block px-2 py-1.5 text-sm rounded hover:bg-surface-2"
                >
                  Privacy
                </Link>
                <Link
                  href="/cookie"
                  onClick={() => setOpen(false)}
                  className="block px-2 py-1.5 text-sm rounded hover:bg-surface-2"
                >
                  Cookie
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-surface-2 mt-1 border-t border-border pt-2"
                >
                  Esci
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}