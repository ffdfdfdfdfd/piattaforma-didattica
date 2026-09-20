'use client'

import { useState } from 'react'
import { corsi } from '@/data/corsi'
import { Folder, colorForIndex } from '@/components/folder'
import { monogramFor } from '@/lib/monogram'

export default function CorsiPage() {
  const [q, setQ] = useState('')

  const filtered = corsi.filter((c) =>
    (c.titolo + ' ' + c.descrizione + ' ' + c.categoria)
      .toLowerCase()
      .includes(q.toLowerCase())
  )

  const biennio = filtered.filter((c) => c.anno === '1-2')
  const triennio = filtered.filter((c) => c.anno !== '1-2')

  const gruppi = [
    { nome: 'Linguaggi di programmazione', corsi: triennio.filter((c) => c.categoria === 'Linguaggi') },
    { nome: 'Sviluppo web e frontend', corsi: triennio.filter((c) => c.categoria === 'Frontend') },
    { nome: 'Database relazionali', corsi: triennio.filter((c) => c.categoria === 'SQL') },
    { nome: 'Database NoSQL', corsi: triennio.filter((c) => c.categoria === 'NoSQL') },
    { nome: 'Sistemi e basso livello', corsi: triennio.filter((c) => c.categoria === 'Sistemi') },
    { nome: 'Linguaggi storici e settoriali', corsi: triennio.filter((c) => c.categoria === 'Storici') },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="label text-text-muted mb-3">Catalogo</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Tutti i corsi
        </h1>

        <div className="flex items-center gap-3 border-b border-border pb-4 max-w-md">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-text-muted"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 3 3" />
          </svg>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca un corso"
            aria-label="Cerca un corso"
            className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-text-dim"
          />
          <span className="label text-text-muted shrink-0">
            {filtered.length}
          </span>
        </div>
      </div>

      {biennio.length > 0 && (
        <section className="mb-16">
          <div className="mb-8 pb-4 border-b border-border">
            <h2 className="text-xl font-semibold">Biennio</h2>
            <p className="text-sm text-text-muted mt-1">
              Competenze digitali e Microsoft Office.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-10">
            {biennio.map((c, i) => (
              <Folder
                key={c.slug}
                color={colorForIndex(i)}
                monogram={monogramFor(c.slug, c.titolo)}
                label={c.titolo}
                href={`/corsi/${c.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {gruppi.map((g, gi) =>
        g.corsi.length > 0 ? (
          <section key={g.nome} className="mb-16">
            <div className="mb-8 pb-4 border-b border-border">
              <h2 className="text-xl font-semibold">Triennio · {g.nome}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
              {g.corsi.map((c, i) => (
                <Folder
                  key={c.slug}
                  color={colorForIndex(i + gi)}
                  monogram={monogramFor(c.slug, c.titolo)}
                  label={c.titolo}
                  href={`/corsi/${c.slug}`}
                />
              ))}
            </div>
          </section>
        ) : null
      )}

      {filtered.length === 0 && (
        <p className="text-sm text-text-muted py-12 text-center">
          Nessun corso trovato per &ldquo;{q}&rdquo;.
        </p>
      )}
    </div>
  )
}