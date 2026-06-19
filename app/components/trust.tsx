import { BRAND_LOGOS, type BrandKey } from './brand-logos'

const BRANDS: BrandKey[] = ['Meteora', 'Kamino', 'Jupiter', 'Phantom']

export function Trust() {
  return (
    <section className="relative py-16 border-y border-line bg-surface/40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="text-mute text-[13px] mb-8">
          Programs Reley has been pointed at.
        </div>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {BRANDS.map((b) => {
            const entry = BRAND_LOGOS[b]
            const Logo = entry.Logo
            return (
              <li
                key={b}
                className="inline-flex items-center gap-2.5 text-soft/75 hover:text-fore transition-colors"
                title={b}
              >
                <Logo size={entry.height} />
                {!entry.hasWordmark && (
                  <span
                    className="text-[15px] tracking-[-0.005em]"
                    style={{ fontVariant: 'small-caps' }}
                  >
                    {b}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
