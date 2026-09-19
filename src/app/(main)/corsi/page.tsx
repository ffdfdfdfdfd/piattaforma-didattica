'use client'

import Link from 'next/link'
import { useState } from 'react'
import { corsi } from '@/data/corsi'

function CourseIcon({ categoria }: { categoria: string }) {
  if (categoria === 'Linguaggi') {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4 2 8l3 4" />
        <path d="M11 4l3 4-3 4" />
      </svg>
    )
  }
  if (categoria === 'SQL' || categoria === 'NoSQL') {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="8" cy="4" rx="5" ry="2" />
        <path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4" />
        <path d="M3 8c0 1.1 2.2 2 5 2s5-.9 5-2" />
      </svg>
    )
  }
  if (categoria === 'Office') {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 2h5l3 3v9H4z" />
        <path d="M9 2v3h3" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="10" height="9" rx="1" />
      <path d="M3 7h10" />
    </svg>
  )
}

export default function CorsiPage() {
  const [q, setQ] = useState('')

  const visibili = corsi.filter((c) =>
    (c.titolo + ' ' + c.descrizione + ' ' + c.categoria)
      .toLowerCase()
      .includes(q.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <p className="eyebrow mb-4">Biblioteca dei corsi</p>
      <h1 className="text-5xl font-semibold tracking-tight leading-[1.05] mb-4 max-w-3xl">
        Impara il <span className="serif font-normal">prossimo</span> linguaggio.
      </h1>
      <p className="text-text-muted mb-12">
        Il primo percorso completo è Python. Gli altri arrivano dopo, passo per passo.
      </p>

      <div className="flex items-center justify-between gap-6 mb-6 border-b border-border pb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 3 3" />
          </svg>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca un percorso"
            aria-label="Cerca un percorso"
            className="w-full bg-transparent border-0 outline-none text-sm text-text placeholder:text-text-muted"
          />
        </div>
        <span className="text-xs text-text-muted shrink-0">
          {visibili.length} percorsi visibili
        </span>
      </div>

      <ul className="divide-y divide-border">
        {visibili.map((c) => {
          const disponibile = c.slug === 'python'
          return (
            <li key={c.slug}>
              <Link
                href={`/corsi/${c.slug}`}
                className="flex items-center gap-5 py-6 no-underline group"
              >
                <div
                  className={`w-11 h-11 rounded-md border flex items-center justify-center shrink-0 ${
                    disponibile
                      ? 'border-border-strong text-accent bg-surface'
                      : 'border-border text-text-muted bg-surface'
                  }`}
                >
                  <CourseIcon categoria={c.categoria} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1.5">
                    {disponibile ? '50 lezioni' : 'In preparazione'}
                  </p>
                  <p className="text-text font-medium mb-1">
                    {c.titolo}
                  </p>
                  <p className="text-sm text-text-muted truncate">
                    {c.descrizione}
                  </p>
                </div>

                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7h9M7 3l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}