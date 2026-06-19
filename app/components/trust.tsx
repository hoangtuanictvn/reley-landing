const BRANDS = [
  'Meteora',
  'Kamino',
  'Jupiter',
  'Drift',
  'Phantom',
  'Helius',
  'Jito',
]

export function Trust() {
  return (
    <section className="relative py-16 border-y border-line bg-surface/40">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="text-mute text-[13px] mb-8">
          Programs Relay has been pointed at.
        </div>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {BRANDS.map((b, i) => (
            <li key={b} className="flex items-center gap-x-10">
              <span
                className="text-[20px] tracking-[-0.005em] text-soft/65 hover:text-fore transition-colors"
                style={{ fontVariant: 'small-caps' }}
              >
                {b}
              </span>
              {i < BRANDS.length - 1 && (
                <span aria-hidden className="hidden lg:inline-block h-1 w-1 rounded-full bg-line-strong" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
