'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.6.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  // Se sei già loggato, vai alla dashboard
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace('/')
    })
  }, [router])

  async function signIn() {
    setMsg('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        setLoading(false)
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setMsg('Devi confermare la tua email. Controlla la casella di posta.')
        } else if (error.message.toLowerCase().includes('invalid login')) {
          setMsg('Email o password non corretti.')
        } else {
          setMsg(error.message)
        }
        return
      }
      if (data.session) {
        router.refresh()
        router.replace('/')
      } else {
        setLoading(false)
        setMsg('Accesso non riuscito. Riprova.')
      }
    } catch (e) {
      setLoading(false)
      setMsg('Errore imprevisto. Riprova.')
    }
  }

  async function signUp() {
    setMsg('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin },
      })
      setLoading(false)
      if (error) {
        if (error.message.toLowerCase().includes('already registered')) {
          setMsg('Questa email è già registrata. Prova ad accedere.')
        } else {
          setMsg(error.message)
        }
        return
      }
      setMsg(
        'Registrazione inviata. Controlla la tua email e clicca il link di conferma.'
      )
    } catch (e) {
      setLoading(false)
      setMsg('Errore imprevisto. Riprova.')
    }
  }

  async function google() {
    setMsg('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setMsg(error.message)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative bg-bg text-text px-10 lg:px-16 py-10 flex flex-col justify-between min-h-[60vh] lg:min-h-screen overflow-hidden">
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--accent-fg)">
              <path d="M7 1 2 3.5v3.5c0 3 2 5.2 5 6 3-.8 5-3 5-6V3.5z" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wider">
            KERNEL <span className="font-normal text-text-muted">ACADEMY</span>
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="eyebrow mb-6">Il tuo metodo, più lontano</p>
          <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Impara con <br />
            <span className="serif font-normal">intenzione.</span>
          </h1>
          <p className="text-text-muted mt-8 max-w-sm">
            Un ambiente ordinato per costruire competenze digitali che restano.
          </p>
        </div>

        <div className="text-xs text-text-muted z-10 flex gap-6">
          <span className="text-accent">01</span>
          <span>Un percorso chiaro, ogni giorno</span>
        </div>

        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent rotate-[8deg] origin-center"
        />
      </aside>

      <section className="bg-cream text-cream-text px-10 lg:px-16 py-12 flex flex-col justify-between min-h-[60vh] lg:min-h-screen">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cream-muted">Area studenti</span>
          <span className="flex items-center gap-1.5 text-cream-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            online
          </span>
        </div>

        <div className="max-w-sm w-full mx-auto lg:mx-0 my-12">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center mb-8">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent-fg)" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 6 8 3l6 3-6 3z" />
              <path d="M4 7.5V11c0 1 2 2 4 2s4-1 4-2V7.5" />
            </svg>
          </div>

          <p className="text-[11px] uppercase tracking-[0.14em] text-cream-muted mb-4 font-medium">
            {mode === 'login' ? 'Bentornato' : 'Nuovo studente'}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight mb-3">
            {mode === 'login' ? 'Accedi al tuo spazio.' : 'Crea il tuo spazio.'}
          </h2>
          <p className="text-cream-muted mb-10">
            {mode === 'login'
              ? 'Riprendi da dove avevi lasciato.'
              : 'Un account, tutti i tuoi progressi.'}
          </p>

          <button
            type="button"
            onClick={google}
            className="w-full flex items-center justify-center gap-3 border border-cream-border bg-white rounded-md py-3 text-sm font-medium hover:bg-cream/50 transition-colors"
          >
            <GoogleIcon />
            Continua con Google
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h9M7 3l4 4-4 4" />
            </svg>
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-cream-border" />
            <span className="text-xs text-cream-muted">oppure</span>
            <div className="h-px flex-1 bg-cream-border" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (mode === 'login') signIn()
              else signUp()
            }}
          >
            <label className="block mb-4">
              <span className="text-xs font-medium text-cream-text mb-1.5 block">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="nome@scuola.it"
                className="w-full bg-white border border-cream-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-cream-text"
              />
            </label>

            <label className="block mb-6">
              <span className="text-xs font-medium text-cream-text mb-1.5 block">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-white border border-cream-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-cream-text"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cream-text text-cream rounded-md py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading
                ? 'Attendi...'
                : mode === 'login'
                ? 'Accedi'
                : 'Crea account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setMsg('')
            }}
            className="mt-4 text-xs text-cream-muted hover:text-cream-text underline"
          >
            {mode === 'login'
              ? 'Non hai un account? Registrati'
              : 'Hai già un account? Accedi'}
          </button>

          {msg && (
            <p
              className="mt-5 text-xs text-cream-text bg-white/60 border border-cream-border rounded-md px-3 py-2"
              role="status"
            >
              {msg}
            </p>
          )}

          <p className="text-xs text-cream-muted mt-8 leading-relaxed">
            Accedendo accetti la{' '}
            <Link href="/privacy" className="underline text-cream-text">
              Privacy Policy
            </Link>{' '}
            e la{' '}
            <Link href="/cookie" className="underline text-cream-text">
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <p className="text-xs text-cream-muted text-center lg:text-left">
          Accesso email disponibile da subito
        </p>
      </section>
    </div>
  )
}