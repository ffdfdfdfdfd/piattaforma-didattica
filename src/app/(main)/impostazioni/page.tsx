'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ImpostazioniPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [nuovaPassword, setNuovaPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setEmail(data.user.email ?? '')
        setCreatedAt(
          data.user.created_at
            ? new Date(data.user.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : ''
        )
      }
    })
  }, [])

  async function cambiaPassword() {
    setMsg('')
    if (nuovaPassword.length < 6) {
      setMsg('La password deve avere almeno 6 caratteri.')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: nuovaPassword })
    setLoading(false)
    if (error) setMsg(error.message)
    else {
      setMsg('Password aggiornata.')
      setNuovaPassword('')
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <div className="max-w-2xl mx-auto px-10 py-12">
      <p className="eyebrow mb-4">Account</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Impostazioni</h1>

      <section className="border border-border rounded-xl bg-surface p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Profilo</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Email</dt>
            <dd className="text-text">{email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Account creato il</dt>
            <dd className="text-text">{createdAt}</dd>
          </div>
        </dl>
      </section>

      <section className="border border-border rounded-xl bg-surface p-6 mb-6">
        <h2 className="text-base font-semibold mb-2">Cambia password</h2>
        <p className="text-sm text-text-muted mb-4">
          Scegli una password di almeno 6 caratteri.
        </p>
        <label className="block mb-4">
          <span className="text-xs text-text-muted">Nuova password</span>
          <input
            type="password"
            value={nuovaPassword}
            onChange={(e) => setNuovaPassword(e.target.value)}
            autoComplete="new-password"
            className="mt-1 w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-sm text-text outline-none focus:border-border-strong"
          />
        </label>
        <button
          onClick={cambiaPassword}
          disabled={loading}
          className="bg-accent text-accent-fg px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Attendi...' : 'Aggiorna password'}
        </button>
        {msg && <p className="mt-4 text-xs text-text-muted">{msg}</p>}
      </section>

      <section className="border border-border rounded-xl bg-surface p-6">
        <h2 className="text-base font-semibold mb-2">Sessione</h2>
        <p className="text-sm text-text-muted mb-4">
          Esci dall&apos;account su questo dispositivo.
        </p>
        <button
          onClick={logout}
          className="border border-border-strong text-text px-4 py-2 rounded-md text-sm hover:bg-surface-2 transition-colors"
        >
          Esci
        </button>
      </section>
    </div>
  )
}