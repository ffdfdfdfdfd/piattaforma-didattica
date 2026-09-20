export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12 pb-8 border-b border-border">
        <p className="label text-text-muted mb-3">Informativa</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        <p className="text-text-muted">
          Questa pagina descrive come vengono trattati i dati degli utenti
          della piattaforma. Il contenuto definitivo deve essere completato e
          validato dalla scuola, che è il titolare del trattamento.
        </p>

        <section>
          <h2 className="label text-text-muted mb-3">Dati raccolti</h2>
          <p className="text-text">
            Email e password cifrata per l&apos;accesso. I progressi nelle
            lezioni e i risultati dei quiz sono associati all&apos;account.
          </p>
        </section>

        <section>
          <h2 className="label text-text-muted mb-3">Finalità</h2>
          <p className="text-text">
            I dati servono solo a far funzionare l&apos;accesso e a mostrare a
            ogni studente i propri progressi. Non vengono ceduti a terzi.
          </p>
        </section>

        <section>
          <h2 className="label text-text-muted mb-3">Titolare e contatti</h2>
          <p className="text-text">
            Da compilare a cura della scuola. Questa sezione non contiene dati
            inventati.
          </p>
        </section>
      </div>
    </div>
  )
}