'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { corsi } from '@/data/corsi'
import { Folder, colorForIndex } from '@/components/folder'
import { monogramFor } from '@/lib/monogram'

export default function DashboardPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? '')
    })
  }, [])

  const biennio = corsi.filter((c) => c.anno === '1-2')
  const triennio = corsi.filter((c) => c.anno !== '1-2')
  const nome = email ? email.split('@')[0] : 'studente'

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-14">
        <p className="label text-text-muted mb-3">Area studenti</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
          Ciao, {nome}.
        </h1>
        <p className="text-text-muted">
          Scegli un corso per iniziare. {corsi.length} percorsi disponibili.
        </p>
      </div>

      <section className="mb-16">
        <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold">Primo e secondo anno</h2>
            <p className="text-sm text-text-muted mt-1">
              Competenze digitali e Microsoft Office.
            </p>
          </div>
          <span className="label text-text-muted shrink-0">
            {biennio.length} corsi
          </span>
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

      <section>
        <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold">Terzo, quarto e quinto anno</h2>
            <p className="text-sm text-text-muted mt-1">
              Programmazione, web, database e sistemi.
            </p>
          </div>
          <span className="label text-text-muted shrink-0">
            {triennio.length} corsi
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
          {triennio.map((c, i) => (
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

      <div className="mt-20 pt-8 border-t border-border text-center">
        <Link href="/corsi" className="label text-text-muted hover:text-text">
          Vedi tutti i corsi in catalogo
        </Link>
      </div>
    </div>
  )
}