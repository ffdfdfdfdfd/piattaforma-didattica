import Link from 'next/link'

export const metadata = { title: 'Cookie Policy' }

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wider no-underline text-text">
            KERNEL <span className="font-normal text-text-muted">ACADEMY</span>
          </Link>
          <Link href="/login" className="text-sm text-accent no-underline hover:text-text">
            Accedi
          </Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="eyebrow mb-4">Informativa</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Cookie Policy</h1>
        <div className="space-y-6 text-sm text-text-muted leading-relaxed">
          <p>
            Al momento vengono usati solo cookie tecnici necessari
            all&apos;autenticazione. Se verranno aggiunti cookie di analisi o di
            terze parti, sarà richiesto un consenso esplicito prima del loro uso.
          </p>
          <h2 className="text-base font-semibold text-text pt-4">Cookie tecnici</h2>
          <p>Necessari per mantenere l&apos;accesso dopo il login.</p>
        </div>
      </div>
    </div>
  )
}