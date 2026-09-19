'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { corsi } from '@/data/corsi'

type Progresso = {
  course_slug: string
  lezioni_fatte: number
}

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [progressi, setProgressi] = useState<Progresso[]>([])
  const [totaleCompletate, setTotaleCompletate] = useState(0)

  useEffect(() => {
    async function load() {
      const { data: u } = await supabase.auth.getUser()
      setEmail(u.user?.email ?? '')

      const { data } = await supabase
        .from('lesson_progress')
        .select('course_slug')

      if (data) {
        const mappa = new Map<string, number>()
        for (const riga of data) {
          const s = riga.course_slug as string
          mappa.set(s, (mappa.get(s) ?? 0) + 1)
        }
        const lista: Progresso[] = Array.from(mappa.entries()).map(
          ([course_slug, lezioni_fatte]) => ({ course_slug, lezioni_fatte })
        )
        lista.sort((a, b) => b.lezioni_fatte - a.lezioni_fatte)
        setProgressi(lista)
        setTotaleCompletate(data.length)
      }
      setLoading(false)
    }
    load()
  }, [])

  const corsiDisponibili = corsi.filter((c) => c.slug === 'python').length
  const corsiTotali = corsi.length

  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Ciao{email ? `, ${email.split('@')[0]}` : ''}.
        </h1>
        <p className="text-text-muted">
          Ecco la situazione dei tuoi studi su Kernel Academy.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="border border-border rounded-xl bg-surface p-5">
          <p className="eyebrow mb-3">Corsi attivi</p>
          <p className="text-3xl font-semibold">{corsiDisponibili}</p>
          <p className="text-xs text-text-muted mt-1">su {corsiTotali} in catalogo</p>
        </div>
        <div className="border border-border rounded-xl bg-surface p-5">
          <p className="eyebrow mb-3">Lezioni completate</p>
          <p className="text-3xl font-semibold">{loading ? '—' : totaleCompletate}</p>
          <p className="text-xs text-text-muted mt-1">in totale</p>
        </div>
        <div className="border border-border rounded-xl bg-surface p-5">
          <p className="eyebrow mb-3">Corsi iniziati</p>
          <p className="text-3xl font-semibold">{loading ? '—' : progressi.length}</p>
          <p className="text-xs text-text-muted mt-1">almeno una lezione</p>
        </div>
        <div className="border border-border rounded-xl bg-surface p-5">
          <p className="eyebrow mb-3">Stato</p>
          <p className="text-lg font-semibold text-accent">
            {totaleCompletate > 0 ? 'In corso' : 'Da iniziare'}
          </p>
          <p className="text-xs text-text-muted mt-1">questo mese</p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-end justify-between gap-4 mb-5">
          <h2 className="text-xl font-semibold">I tuoi corsi</h2>
          <Link
            href="/corsi"
            className="text-sm text-accent no-underline hover:text-text transition-colors"
          >
            Vedi catalogo
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Caricamento...</p>
        ) : progressi.length === 0 ? (
          <div className="border border-border rounded-xl bg-surface p-6">
            <p className="text-sm text-text-muted mb-4">
              Non hai ancora iniziato nessun corso.
            </p>
            <Link
              href="/corsi"
              className="inline-block bg-accent text-accent-fg px-4 py-2 rounded-md text-sm font-medium no-underline"
            >
              Scegli un corso
            </Link>
          </div>
        ) : (
          <ul className="border border-border rounded-xl bg-surface divide-y divide-border overflow-hidden">
            {progressi.map((p) => {
              const corso = corsi.find((c) => c.slug === p.course_slug)
              const titolo = corso?.titolo ?? p.course_slug
              const percento = Math.min(100, Math.round((p.lezioni_fatte / 50) * 100))
              return (
                <li key={p.course_slug}>
                  <Link
                    href={`/corsi/${p.course_slug}`}
                    className="flex items-center gap-4 px-5 py-4 no-underline text-text hover:bg-surface-2 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{titolo}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {p.lezioni_fatte} di 50 lezioni
                      </p>
                    </div>
                    <div className="w-32 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${percento}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-muted w-10 text-right tabular-nums">
                      {percento}%
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-5">
          <h2 className="text-xl font-semibold">Catalogo</h2>
          <span className="text-xs text-text-muted">
            {corsiTotali} percorsi pianificati
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {corsi.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/corsi/${c.slug}`}
              className="border border-border rounded-xl bg-surface p-4 no-underline text-text hover:border-border-strong transition-colors"
            >
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">
                {c.categoria}
              </p>
              <p className="text-sm font-medium mb-1">{c.titolo}</p>
              <p className="text-xs text-text-muted line-clamp-2">
                {c.descrizione}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}