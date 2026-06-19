import { clsx } from './clsx'

export function Brand({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2.5 font-mono text-[15px] tracking-tight',
        className,
      )}
    >
      <RelayMark />
      <span className="text-fore">reley</span>
    </span>
  )
}

export function RelayMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className="shrink-0"
    >
      <rect x="0.5" y="0.5" width="63" height="63" rx="14" fill="#11141b" stroke="#2a3142" />
      <path
        fill="#e8eaf0"
        fillRule="evenodd"
        d="M18 16h17.5c6.4 0 10.5 3.7 10.5 9.5 0 4.2-2.1 7.4-5.8 8.8L48 48h-9l-7-12h-5v12H18V16zm9 8v6h8c2.1 0 3.4-1.1 3.4-3s-1.3-3-3.4-3h-8z"
      />
      <circle cx="49" cy="15" r="3.5" fill="#5d83ff" />
    </svg>
  )
}
