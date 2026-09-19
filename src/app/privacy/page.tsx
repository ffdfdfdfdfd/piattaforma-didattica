import Link from 'next/link'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm text-text-muted leading-relaxed">
          <p>
            Questa pagina descrive come vengono trattati i dati degli utenti.
            Il contenuto definitivo deve essere completato e validato dalla
            scuola, che è il titolare del trattamento.
          </p>
          <h2 className="text-base font-semibold text-text pt-4">Dati raccolti</h2>
          <p>
            Email e password cifrata per l&apos;accesso. Progressi nelle lezioni
            e risultati dei quiz sono associati all&apos;account.
          </p>
          <h2 className="text-base font-semibold text-text pt-4">Titolare e contatti</h2>
          <p>Da compilare a cura della scuola. Nessun dato inventato.</p>
        </div>
      </div>
    </div>
  )
}