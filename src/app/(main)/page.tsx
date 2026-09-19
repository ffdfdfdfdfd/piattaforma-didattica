'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

function ProgressRing({ percent }: { percent: number }) {
  const size = 64
  const stroke = 4
  const r = (size - stroke * 2) / 2
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--border-strong)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--accent)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-text">
        {percent}%
      </span>
    </div>
  )
}

function LessonCard({
  n,
  title,
  min,
  slug,
}: {
  n: number
  title: string
  min: number
  slug: string
}) {
  return (
    <Link
      href={`/corsi/python/${slug}`}
      className="group border border-border rounded-lg p-5 bg-surface no-underline flex flex-col hover:border-border-strong transition-colors min-h-[210px]"
    >
      <div className="w-10 h-10 rounded-md bg-[#1a2416] flex items-center justify-center text-accent">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4 2 8l3 4" />
          <path d="M11 4l3 4-3 4" />
        </svg>
      </div>

      <div className="mt-auto">
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted mb-2.5 font-medium">
          Fondamenta · Lezione {n}
        </p>
        <p className="text-text text-[15px] font-medium leading-snug">
          {title}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-text-muted">{min} min</span>
        <span className="text-accent">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 7h9M7 3l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const [done, setDone] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: u } = await supabase.auth.getUser()
      if (u.user) {
        const { count } = await supabase
          .from('lesson_progress')
          .select('*', { count: 'exact', head: true })
          .eq('course_slug', 'python')
        setDone(count ?? 0)
      }
      setLoading(false)
    }
    load()
  }, [])

  const totale = 50
  const percento = Math.max(0, Math.round((done / totale) * 100))

  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      {/* Intestazione */}
      <div className="flex items-start justify-between gap-8 mb-14">
        <div className="pt-1">
          <p className="eyebrow mb-5">Il tuo percorso di studio</p>
          <h1 className="text-[56px] leading-[1.02] font-semibold tracking-[-0.03em] mb-4">
            Buongiorno,
            <br />
            <span className="serif font-normal">studente.</span>
          </h1>
          <p className="text-text-muted text-[15px]">
            Python è pronto quando lo sei tu.
          </p>
        </div>

        <div className="text-right pt-2 shrink-0">
          <div className="flex items-center justify-end gap-2 text-accent mb-1.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 1.5c2 2 3 3.5 3 5.5a3 3 0 0 1-6 0c0-2 1-3.5 3-5.5z" />
            </svg>
            <span className="text-sm font-medium">Inizia oggi</span>
          </div>
          <p className="text-xs text-text-muted">un passo alla volta</p>
        </div>
      </div>

      {/* Card percorso */}
      <section className="border border-border rounded-xl bg-surface px-6 py-6 mb-16">
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted mb-3 font-medium">
          Percorso Python
        </p>
        <div className="flex items-center gap-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-semibold mb-2">
              Continua con il tuo ritmo
            </h2>
            <p className="text-[13px] text-text-muted">
              {loading ? '0' : done} di {totale} lezioni completate
            </p>
          </div>

          <ProgressRing percent={percento} />

          <Link
            href="/corsi/python"
            className="flex items-center gap-2 text-[13px] text-accent no-underline hover:text-text transition-colors shrink-0"
          >
            Apri lezione
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7h9M7 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Prossime lezioni */}
      <section className="mb-16">
        <p className="eyebrow mb-5">Riprendi il filo</p>
        <div className="flex items-end justify-between gap-4 mb-7">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">
            Python, le prossime tappe
          </h2>
          <Link
            href="/corsi/python"
            className="text-[13px] text-accent no-underline hover:text-text transition-colors flex items-center gap-1.5 pb-1.5"
          >
            Vedi percorso
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7h9M7 3l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <LessonCard n={1} title="Inizia con Python" min={12} slug="01-introduzione" />
          <LessonCard n={2} title="Output e commenti" min={12} slug="02-installazione" />
          <LessonCard n={3} title="Variabili" min={12} slug="03-variabili-e-tipi" />
        </div>
      </section>

      {/* Card crema in fondo */}
      <section className="bg-cream text-cream-text rounded-xl px-6 py-6">
        <p className="text-[10px] uppercase tracking-[0.14em] text-cream-muted mb-3 font-medium">
          Percorso disponibile
        </p>
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-semibold mb-1">
              Python: dal primo script al progetto
            </h2>
            <p className="text-[13px] text-cream-muted">
              Esempi, esercizi e progetti progressivi
            </p>
          </div>
          <Link
            href="/corsi/python"
            className="border border-cream-text rounded-md px-4 py-2 text-[13px] no-underline text-cream-text hover:bg-cream-text hover:text-cream transition-colors shrink-0"
          >
            Apri percorso
          </Link>
        </div>
      </section>
    </div>
  )
}