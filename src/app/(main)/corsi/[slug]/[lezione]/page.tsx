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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="label text-text-muted mb-10 flex items-center gap-2 flex-wrap">
        <Link href="/corsi" className="hover:text-text transition-colors">
          Corsi
        </Link>
        <span className="text-text-dim">/</span>
        <Link
          href={`/corsi/${slug}`}
          className="hover:text-text transition-colors"
        >
          {corso.titolo}
        </Link>
        <span className="text-text-dim">/</span>
        <span className="text-text">
          {idx + 1} di {lezioni.length}
        </span>
      </nav>

      <header className="mb-10 pb-8 border-b border-border">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">
          {fm.title}
        </h1>
        <div className="flex flex-wrap gap-4 label text-text-muted">
          {fm.level && <span>Livello · {fm.level}</span>}
          <span>·</span>
          <span>{corso.categoria}</span>
        </div>
      </header>

      {fm.obiettivi && fm.obiettivi.length > 0 && (
        <section className="mb-12 pb-8 border-b border-border">
          <p className="label text-text-muted mb-4">Obiettivi di apprendimento</p>
          <ul className="space-y-2 text-base">
            {fm.obiettivi.map((o, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-text-dim shrink-0">—</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {fm.prerequisiti && fm.prerequisiti.length > 0 && (
        <section className="mb-12 pb-8 border-b border-border">
          <p className="label text-text-muted mb-4">Prerequisiti</p>
          <ul className="space-y-2 text-base">
            {fm.prerequisiti.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-text-dim shrink-0">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <article className="prose-kernel">
        <MDXRemote source={data.content} components={mdxComponents} />
      </article>

      <MarkComplete corsoSlug={slug} lezioneSlug={lezione} />

      <nav className="flex justify-between gap-4 mt-16 pt-8 border-t border-border">
        {prev ? (
          <Link
            href={`/corsi/${slug}/${prev.slug}`}
            className="group flex flex-col gap-1 max-w-[45%]"
          >
            <span className="label text-text-muted">← Precedente</span>
            <span className="text-sm group-hover:text-text-muted transition-colors">
              {prev.titolo}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/corsi/${slug}/${next.slug}`}
            className="group flex flex-col gap-1 max-w-[45%] text-right ml-auto"
          >
            <span className="label text-text-muted">Successiva →</span>
            <span className="text-sm group-hover:text-text-muted transition-colors">
              {next.titolo}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}