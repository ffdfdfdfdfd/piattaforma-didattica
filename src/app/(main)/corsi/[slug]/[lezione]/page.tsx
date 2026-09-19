import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCorso } from '@/data/corsi'
import { getLezione, getLezioniCorso } from '@/lib/lezioni'
import { mdxComponents } from '@/components/mdx'
import { MarkComplete } from '@/components/mark-complete'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lezione: string }>
}) {
  const { slug, lezione } = await params
  const data = getLezione(slug, lezione)
  return { title: data?.frontmatter.title ?? 'Lezione' }
}

export default async function LezionePage({
  params,
}: {
  params: Promise<{ slug: string; lezione: string }>
}) {
  const { slug, lezione } = await params
  const corso = getCorso(slug)
  if (!corso) notFound()

  const data = getLezione(slug, lezione)
  if (!data) notFound()

  const lezioni = getLezioniCorso(slug)
  const idx = lezioni.findIndex((l) => l.slug === lezione)
  const prev = idx > 0 ? lezioni[idx - 1] : null
  const next = idx >= 0 && idx < lezioni.length - 1 ? lezioni[idx + 1] : null

  const fm = data.frontmatter as {
    title?: string
    level?: string
    prerequisiti?: string[]
    obiettivi?: string[]
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <nav className="text-xs text-text-muted mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/corsi" className="no-underline hover:text-text">Corsi</Link>
        <span className="text-text-dim">/</span>
        <Link href={`/corsi/${slug}`} className="no-underline hover:text-text">
          {corso.titolo}
        </Link>
        <span className="text-text-dim">/</span>
        <span>Lezione {idx + 1} di {lezioni.length}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">{fm.title}</h1>
        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-text-muted">
          {fm.level && (
            <span className="border border-border rounded-full px-2.5 py-1">
              Livello {fm.level}
            </span>
          )}
          <span className="border border-border rounded-full px-2.5 py-1">
            {corso.categoria}
          </span>
        </div>
      </header>

      {fm.obiettivi && fm.obiettivi.length > 0 && (
        <section className="border border-border rounded-xl p-5 bg-surface mb-10">
          <p className="eyebrow mb-3">Obiettivi di apprendimento</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {fm.obiettivi.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </section>
      )}

      <article>
        <MDXRemote source={data.content} components={mdxComponents} />
      </article>

      <MarkComplete corsoSlug={slug} lezioneSlug={lezione} />

      <nav className="flex justify-between gap-4 mt-14 pt-6 border-t border-border">
        {prev ? (
          <Link
            href={`/corsi/${slug}/${prev.slug}`}
            className="text-sm text-accent no-underline hover:text-text transition-colors"
          >
            ← {prev.titolo}
          </Link>
        ) : <span />}
        {next ? (
          <Link
            href={`/corsi/${slug}/${next.slug}`}
            className="text-sm text-accent no-underline hover:text-text transition-colors text-right"
          >
            {next.titolo} →
          </Link>
        ) : <span />}
      </nav>
    </div>
  )
}