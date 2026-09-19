export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <p className="eyebrow mb-4">Informativa</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <p>
          Questa pagina descrive come vengono trattati i dati degli utenti. Il
          contenuto definitivo deve essere completato e validato dalla scuola,
          che è il titolare del trattamento.
        </p>
        <h2 className="text-base font-semibold text-text pt-4">Dati raccolti</h2>
        <p>
          Email e password cifrata per l&apos;accesso. Progressi nelle lezioni e
          risultati dei quiz sono associati all&apos;account.
        </p>
        <h2 className="text-base font-semibold text-text pt-4">Titolare e contatti</h2>
        <p>Da compilare a cura della scuola. Nessun dato inventato.</p>
      </div>
    </div>
  )
}