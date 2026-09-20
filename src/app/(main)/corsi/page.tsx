
'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { corsi, getCorso } from '@/data/corsi'
import { getLezioniCorso } from '@/lib/lezioni'

export function generateStaticParams() {
  return corsi.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = getCorso(slug)
  return { title: c ? c.titolo : 'Corso' }
}

export default async function CorsoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const corso = getCorso(slug)
  if (!corso) notFound()

  const lezioni = getLezioniCorso(slug)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/corsi"
        className="label text-text-muted hover:text-text transition-colors inline-flex items-center gap-2"
      >
        ← Catalogo
      </Link>

      <div className="mt-10 mb-12 pb-10 border-b border-border">
        <p className="label text-text-muted mb-4">{corso.categoria}</p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-5">
          {corso.titolo}
        </h1>
        <p className="text-text-muted max-w-2xl leading-relaxed text-base">
          {corso.descrizione}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 mb-16">
        <div>
          <p className="label text-text-muted mb-2">Anno</p>
          <p className="text-base">{corso.anno}</p>
        </div>
        <div>
          <p className="label text-text-muted mb-2">Difficoltà</p>
          <p className="text-base capitalize">{corso.difficolta}</p>
        </div>
        <div>
          <p className="label text-text-muted mb-2">Lezioni</p>
          <p className="text-base">{lezioni.length}</p>
        </div>
        <div>
          <p className="label text-text-muted mb-2">Categoria</p>
          <p className="text-base">{corso.categoria}</p>
        </div>
      </div>

      {corso.prerequisiti.length > 0 && (
        <section className="mb-16">
          <p className="label text-text-muted mb-4">Prerequisiti</p>
          <ul className="space-y-2 text-base">
            {corso.prerequisiti.map((p) => (
              <li key={p} className="flex gap-4">
                <span className="text-text-dim shrink-0">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="flex items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
          <h2 className="text-2xl font-semibold">Programma</h2>
          <span className="label text-text-muted shrink-0">
            {lezioni.length} lezioni
          </span>
        </div>

        {lezioni.length === 0 ? (
          <p className="text-sm text-text-muted py-8">
            Le lezioni di questo corso saranno aggiunte nelle prossime fasi.
          </p>
        ) : (
          <ol>
            {lezioni.map((l, i) => (
              <li key={l.slug}>
                <Link
                  href={`/corsi/${slug}/${l.slug}`}
                  className="group flex items-baseline gap-6 py-5 border-b border-border hover:bg-surface-2 -mx-3 px-3 transition-colors"
                >
                  <span className="text-text-dim text-xs tabular-nums w-8 shrink-0 font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-base">
                    {l.titolo}
                  </span>
                  <span className="label text-text-muted shrink-0">
                    {l.livello}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}