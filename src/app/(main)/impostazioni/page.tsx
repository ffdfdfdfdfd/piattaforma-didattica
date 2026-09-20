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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12 pb-8 border-b border-border">
        <p className="label text-text-muted mb-3">Account</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Impostazioni
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="label text-text-muted mb-4">Profilo</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 py-3 border-b border-border">
            <dt className="text-text-muted">Email</dt>
            <dd className="text-text">{email}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3 border-b border-border">
            <dt className="text-text-muted">Account creato il</dt>
            <dd className="text-text">{createdAt}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-12">
        <h2 className="label text-text-muted mb-4">Cambia password</h2>
        <p className="text-sm text-text-muted mb-4">
          Scegli una password di almeno 6 caratteri.
        </p>
        <label className="block mb-4">
          <span className="label text-text-muted block mb-1.5">Nuova password</span>
          <input
            type="password"
            value={nuovaPassword}
            onChange={(e) => setNuovaPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text outline-none focus:border-text"
          />
        </label>
        <button
          onClick={cambiaPassword}
          disabled={loading}
          className="bg-text text-bg px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {loading ? 'Attendi...' : 'Aggiorna password'}
        </button>
        {msg && (
          <p className="mt-4 text-xs text-text-muted">{msg}</p>
        )}
      </section>

      <section>
        <h2 className="label text-text-muted mb-4">Sessione</h2>
        <p className="text-sm text-text-muted mb-4">
          Esci dall&apos;account su questo dispositivo.
        </p>
        <button
          onClick={logout}
          className="border border-border text-text px-4 py-2 rounded-md text-sm hover:bg-surface-2 transition-colors"
        >
          Esci
        </button>
      </section>
    </div>
  )
}