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
    <div className="max-w-4xl mx-auto px-8 py-10">
      <Link
        href="/corsi"
        className="text-xs text-text-muted no-underline hover:text-text transition-colors"
      >
        ← Catalogo
      </Link>

      <p className="eyebrow mt-6 mb-4">{corso.categoria}</p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">{corso.titolo}</h1>
      <p className="text-text-muted mb-10 max-w-2xl">{corso.descrizione}</p>

      <div className="grid grid-cols-3 gap-3 mb-12">
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="eyebrow mb-2">Anno</p>
          <p className="text-sm">{corso.anno}</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="eyebrow mb-2">Difficoltà</p>
          <p className="text-sm capitalize">{corso.difficolta}</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="eyebrow mb-2">Lezioni</p>
          <p className="text-sm">{lezioni.length}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Programma</h2>
      {lezioni.length === 0 ? (
        <p className="text-sm text-text-muted">
          Le lezioni saranno aggiunte nelle prossime fasi.
        </p>
      ) : (
        <ol className="border border-border rounded-xl divide-y divide-border bg-surface overflow-hidden">
          {lezioni.map((l, i) => (
            <li key={l.slug}>
              <Link
                href={`/corsi/${slug}/${l.slug}`}
                className="flex items-center gap-4 px-5 py-4 no-underline text-text hover:bg-surface-2 transition-colors"
              >
                <span className="text-text-muted text-xs w-6 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-sm">{l.titolo}</span>
                <span className="text-[11px] uppercase tracking-wider text-text-muted">
                  {l.livello}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}