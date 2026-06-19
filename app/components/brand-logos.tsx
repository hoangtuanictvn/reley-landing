import type { JSX } from 'react'

type Props = { className?: string; size?: number; alt?: string }

function ImgLogo({
  src,
  alt,
  size = 28,
  className,
}: {
  src: string
  alt: string
  size?: number
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', height: size, width: 'auto' }}
    />
  )
}

export function MeteoraLogo({ className, size }: Props) {
  return <ImgLogo src="/brands/meteora.svg" alt="Meteora" size={size} className={className} />
}

export function JupiterLogo({ className, size }: Props) {
  return <ImgLogo src="/brands/jupiter.svg" alt="Jupiter" size={size} className={className} />
}

export function KaminoLogo({ className, size }: Props) {
  return <ImgLogo src="/brands/kamino.svg" alt="Kamino" size={size} className={className} />
}

export function PhantomLogo({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Phantom"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M14 30 C14 17 22 8 32 8 S50 17 50 30 V52 L44 47 L38 52 L32 47 L26 52 L20 47 L14 52 Z" />
        <circle cx="24" cy="26" r="3.5" fill="var(--color-ink)" />
        <circle cx="40" cy="26" r="3.5" fill="var(--color-ink)" />
      </g>
    </svg>
  )
}

export type BrandKey = 'Meteora' | 'Kamino' | 'Jupiter' | 'Phantom'

export const BRAND_LOGOS: Record<
  BrandKey,
  { Logo: (props: Props) => JSX.Element; hasWordmark: boolean; height: number }
> = {
  Meteora: { Logo: MeteoraLogo, hasWordmark: false, height: 26 },
  Kamino: { Logo: KaminoLogo, hasWordmark: true, height: 18 },
  Jupiter: { Logo: JupiterLogo, hasWordmark: false, height: 26 },
  Phantom: { Logo: PhantomLogo, hasWordmark: false, height: 26 },
}
