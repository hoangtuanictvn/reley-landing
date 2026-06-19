'use client'

import { motion, useReducedMotion } from 'motion/react'

const DOTS = [
  { x: 12, y: 18, d: 0 },
  { x: 88, y: 12, d: 1.2 },
  { x: 22, y: 64, d: 2.4 },
  { x: 76, y: 72, d: 0.6 },
  { x: 48, y: 9, d: 1.8 },
  { x: 6, y: 46, d: 3 },
  { x: 92, y: 40, d: 1.4 },
  { x: 38, y: 84, d: 2.1 },
  { x: 64, y: 24, d: 0.9 },
  { x: 18, y: 88, d: 2.8 },
]

export function HeroParticles() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {DOTS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-accent/55 shadow-[0_0_10px_2px_rgba(20,241,149,0.45)]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={reduce ? false : { opacity: 0.2, y: 0 }}
          animate={reduce ? undefined : { opacity: [0.2, 0.7, 0.2], y: [0, -14, 0] }}
          transition={{ duration: 5 + (i % 3), delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
