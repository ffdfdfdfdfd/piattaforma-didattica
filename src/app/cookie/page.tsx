import Link from 'next/link'

export const metadata = { title: 'Cookie Policy' }

export default function CookiePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="label text-text-muted hover:text-text transition-colors inline-flex items-center gap-2 mb-10"
      >
        ← Indietro
      </Link>

      <div className="mb-12 pb-8 border-b border-border">
        <p className="label text-text-muted mb-3">Informativa</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Cookie Policy
        </h1>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        <p className="text-text-muted">
          Questa pagina descrive i cookie usati dalla piattaforma. Al momento
          vengono usati solo cookie tecnici necessari all&apos;autenticazione.
          Se in futuro verranno aggiunti cookie di analisi o di terze parti,
          sarà richiesto un consenso esplicito prima del loro utilizzo.
        </p>

        <section>
          <h2 className="label text-text-muted mb-3">Cookie tecnici</h2>
          <p className="text-text">
            Necessari per mantenere l&apos;accesso dopo il login. Non
            richiedono consenso.
          </p>
        </section>

        <section>
          <h2 className="label text-text-muted mb-3">Cookie di terze parti</h2>
          <p className="text-text">
            Attualmente nessuno. Se ne verranno aggiunti, questa pagina sarà
            aggiornata e sarà richiesto il consenso.
          </p>
        </section>
      </div>
    </div>
  )
}