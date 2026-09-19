'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function MarkComplete({
  corsoSlug,
  lezioneSlug,
}: {
  corsoSlug: string
  lezioneSlug: string
}) {
  const [logged, setLogged] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        setLoading(false)
        return
      }
      setLogged(true)
      const { data } = await supabase
        .from('lesson_progress')
        .select('id')
        .eq('course_slug', corsoSlug)
        .eq('lesson_slug', lezioneSlug)
        .maybeSingle()
      setDone(!!data)
      setLoading(false)
    }
    load()
  }, [corsoSlug, lezioneSlug])

  async function toggle() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    if (done) {
      await supabase
        .from('lesson_progress')
        .delete()
        .eq('course_slug', corsoSlug)
        .eq('lesson_slug', lezioneSlug)
      setDone(false)
    } else {
      await supabase.from('lesson_progress').insert({
        user_id: userData.user.id,
        course_slug: corsoSlug,
        lesson_slug: lezioneSlug,
      })
      setDone(true)
    }
  }

  if (loading) return null

  if (!logged) {
    return (
      <div className="mt-10 p-4 border border-border rounded-lg bg-surface text-sm text-text-muted">
        Accedi per salvare i tuoi progressi.
      </div>
    )
  }

  return (
    <div className="mt-10">
      <button
        onClick={toggle}
        className={`px-4 py-2 rounded-md border ${
          done
            ? 'bg-success/10 border-success text-success'
            : 'bg-surface border-border text-text hover:bg-surface-2'
        }`}
      >
        {done ? '✓ Completata' : 'Segna come completata'}
      </button>
    </div>
  )
}