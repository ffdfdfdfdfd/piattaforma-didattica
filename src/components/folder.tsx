import Link from 'next/link'

export type FolderColor =
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'cyan'
  | 'yellow'
  | 'silver'
  | 'dark'

const colorMap: Record<FolderColor, { top: string; bottom: string }> = {
  blue:   { top: '#5fb3ff', bottom: '#2a7ed6' },
  green:  { top: '#3fc47d', bottom: '#1e8a4f' },
  orange: { top: '#ff9b48', bottom: '#e06a10' },
  red:    { top: '#ef4f4f', bottom: '#b82020' },
  pink:   { top: '#ff5fa2', bottom: '#c91e73' },
  purple: { top: '#b48bff', bottom: '#6f3fd6' },
  cyan:   { top: '#4dd0e1', bottom: '#0d8fa3' },
  yellow: { top: '#ffd24a', bottom: '#d99b00' },
  silver: { top: '#c6ccd4', bottom: '#8b95a1' },
  dark:   { top: '#5a626e', bottom: '#2e333b' },
}

const palette: FolderColor[] = [
  'blue', 'green', 'orange', 'red', 'pink',
  'purple', 'cyan', 'yellow', 'silver', 'dark',
]

export function colorForIndex(i: number): FolderColor {
  return palette[i % palette.length]
}

export function Folder({
  color = 'blue',
  monogram,
  label,
  href,
}: {
  color?: FolderColor
  monogram: string
  label: string
  href: string
}) {
  const { top, bottom } = colorMap[color]
  return (
    <Link href={href} className="folder-wrapper no-underline" aria-label={label}>
      <div
        className="folder"
        style={{ background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }}
      >
        <span className="folder-icon">{monogram}</span>
      </div>
      <span className="folder-label">{label}</span>
    </Link>
  )
}