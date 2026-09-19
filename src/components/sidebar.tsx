'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 3.5h4a2 2 0 0 1 2 2v7.5a1.5 1.5 0 0 0-1.5-1.5h-4.5z" />
      <path d="M13.5 3.5h-4a2 2 0 0 0-2 2v7.5a1.5 1.5 0 0 1 1.5-1.5h4.5z" />
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 4 2 8l3.5 4" />
      <path d="M10.5 4 14 8l-3.5 4" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 1.5 2.5 3.5v4c0 3.5 2.5 6 5.5 7 3-1 5.5-3.5 5.5-7v-4z" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 1.5h5l3 3v10H4z" />
      <path d="M9 1.5v3h3" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 3H3.5v10H6" />
      <path d="M10 5.5 13 8l-3 2.5" />
      <path d="M13 8H6.5" />
    </svg>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--accent-fg)">
          <path d="M7 1 2 3.5v3.5c0 3 2 5.2 5 6 3-.8 5-3 5-6V3.5z" />
        </svg>
      </div>
      <span className="text-sm font-bold tracking-wider text-text">
        TECH <span className="font-normal text-text-muted">ACADEMY</span>
      </span>
    </div>
  )
}

const mainNav = [
  { href: '/', label: 'Panoramica', icon: <IconGrid /> },
  { href: '/corsi', label: 'Catalogo percorsi', icon: <IconBook /> },
  { href: '/corsi/python', label: 'Percorso Python', icon: <IconCode /> },
]

const resNav = [
  { href: '/privacy', label: 'Privacy', icon: <IconShield /> },
  { href: '/cookie', label: 'Cookie', icon: <IconFile /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [pathname])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initial = email?.[0]?.toUpperCase() ?? 'S'

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-bg-sidebar flex flex-col h-screen sticky top-0">
      <div className="px-5 h-14 flex items-center border-b border-border">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <p className="eyebrow px-5 mb-3">Il mio spazio</p>
        <ul className="space-y-0.5 px-3">
          {mainNav.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm no-underline transition-colors ${
                    active
                      ? 'bg-surface text-text'
                      : 'text-text-muted hover:text-text hover:bg-surface/60'
                  }`}
                >
                  <span className={active ? 'text-accent' : ''}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="eyebrow px-5 mt-8 mb-3">Risorse</p>
        <ul className="space-y-0.5 px-3">
          {resNav.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm no-underline transition-colors ${
                    active
                      ? 'bg-surface text-text'
                      : 'text-text-muted hover:text-text hover:bg-surface/60'
                  }`}
                >
                  <span className={active ? 'text-accent' : ''}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-surface/60">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-fg flex items-center justify-center text-xs font-semibold">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text truncate">Spazio studente</p>
            <p className="text-[11px] text-text-muted truncate">
              {email ?? 'Account personale'}
            </p>
          </div>
          <button
            onClick={logout}
            aria-label="Esci"
            className="text-text-muted hover:text-text p-1.5 rounded"
          >
            <IconLogout />
          </button>
        </div>
      </div>
    </aside>
  )
}