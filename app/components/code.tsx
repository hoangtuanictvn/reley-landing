import type { ReactNode } from 'react'

type Tok = { t: string; c?: 'cmd' | 'flag' | 'arg' | 'str' | 'kw' | 'fn' | 'num' | 'cm' | 'p' | 'op' }

function color(c?: Tok['c']) {
  switch (c) {
    case 'cmd': return 'text-[#14f195]'
    case 'flag': return 'text-[#7dd3fc]'
    case 'arg': return 'text-[#e6e9ef]'
    case 'str': return 'text-[#f9c187]'
    case 'kw': return 'text-[#c4a3ff]'
    case 'fn': return 'text-[#7dd3fc]'
    case 'num': return 'text-[#f9c187]'
    case 'cm': return 'text-[#6b7385] italic'
    case 'p': return 'text-[#14f195]'
    case 'op': return 'text-[#6b7385]'
    default: return 'text-[#9aa3b2]'
  }
}

export function CodeLine({ tokens, indent = 0 }: { tokens: Tok[]; indent?: number }) {
  return (
    <div className="font-mono text-[12.5px] leading-[1.7] whitespace-pre">
      {' '.repeat(indent)}
      {tokens.map((tok, i) => (
        <span key={i} className={color(tok.c)}>{tok.t}</span>
      ))}
    </div>
  )
}

export function TerminalFrame({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`code-shadow rounded-[var(--radius-lg)] overflow-hidden bg-[#0b0c10] ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-[#0d0f15]">
        <div className="flex gap-1.5">
          <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#2a3142]" />
        </div>
        <span className="ml-3 font-mono text-[11px] text-mute">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
