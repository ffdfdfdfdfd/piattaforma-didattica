import type { Metadata } from 'next'
import { Geist, Geist_Mono, Archivo_Black } from 'next/font/google'
import './globals.css'

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const archivo = Archivo_Black({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Kernel Academy',
  description: 'Piattaforma didattica di informatica per il liceo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${geist.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}