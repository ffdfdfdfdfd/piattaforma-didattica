'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace('/')
    })
  }, [router])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setLoading(true)

    if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        setLoading(false)
        if (error.message.toLowerCase().includes('invalid login')) {
          setMsg('Email o password non corretti.')
        } else if (error.message.toLowerCase().includes('not confirmed')) {
          setMsg('Devi confermare la tua email.')
        } else {
          setMsg(error.message)
        }
        return
      }
      if (data.session) {
        router.refresh()
        router.replace('/')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin },
      })
      setLoading(false)
      if (error) {
        setMsg(error.message)
        return
      }
      setMsg('Registrazione inviata. Controlla la tua email.')
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
    <div className="min-h-screen bg-bg flex flex-col">
      <div className="pt-14 sm:pt-16 pb-8 px-6 flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Kernel Academy"
          width={120}
          height={120}
          priority
          className="mb-6"
        />
        <h1 className="brand text-center text-[64px] sm:text-[100px] md:text-[130px]">
          KERNEL
        </h1>
        <p className="label text-center text-text-muted mt-4">
          Piattaforma didattica di informatica per il liceo
        </p>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 pb-16">
        <div className="w-full max-w-sm">
          <div className="border border-border bg-surface rounded-md p-6">
            <p className="label text-text-muted mb-2">
              {mode === 'login' ? 'Bentornato' : 'Nuovo studente'}
            </p>
            <h2 className="text-xl font-semibold mb-6">
              {mode === 'login' ? 'Accedi' : 'Crea account'}
            </h2>

            <button
              type="button"
              onClick={google}
              className="w-full border border-border bg-bg rounded-md py-2.5 text-sm hover:bg-surface-2 transition-colors mb-5"
            >
              Continua con Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border" />
              <span className="label text-text-dim">oppure</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="label text-text-muted block mb-1.5">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-text"
                />
              </label>
              <label className="block">
                <span className="label text-text-muted block mb-1.5">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-text"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-text text-bg rounded-md py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Attendi...' : mode === 'login' ? 'Accedi' : 'Crea account'}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMsg('')
              }}
              className="mt-4 text-xs text-text-muted hover:text-text underline w-full text-center"
            >
              {mode === 'login'
                ? 'Non hai un account? Registrati'
                : 'Hai già un account? Accedi'}
            </button>

            {msg && (
              <p className="mt-4 text-xs text-text bg-bg border border-border rounded-md px-3 py-2">
                {msg}
              </p>
            )}
          </div>

          <p className="text-[10px] text-text-muted text-center mt-6 leading-relaxed">
            Accedendo accetti la{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>{' '}
            e la{' '}
            <Link href="/cookie" className="underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}