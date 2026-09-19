import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type LezioneMeta = {
  slug: string
  corsoSlug: string
  titolo: string
  livello: string
  ordine: number
}

export function getLezioniCorso(corsoSlug: string): LezioneMeta[] {
  const dir = path.join(contentDir, corsoSlug)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const lezioni: LezioneMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(raw)
    const ordine = parseInt(file.substring(0, 2), 10) || 0
    return {
      slug: file.replace(/\.mdx$/, ''),
      corsoSlug,
      titolo: (data.title as string) || 'Senza titolo',
      livello: (data.level as string) || 'base',
      ordine,
    }
  })

  lezioni.sort((a, b) => a.ordine - b.ordine)
  return lezioni
}

export function getLezione(corsoSlug: string, lezioneSlug: string) {
  const file = path.join(contentDir, corsoSlug, `${lezioneSlug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data, content }
}