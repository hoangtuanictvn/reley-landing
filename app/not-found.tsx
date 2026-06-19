import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Nav } from './components/nav'

export default function NotFound() {
  return (
    <div className="min-h-[100dvh]">
      <Nav />
      <main className="pt-[120px] pb-32 px-6">
        <div className="mx-auto max-w-[600px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep mb-4">
            404
          </div>
          <h1 className="text-fore text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.028em] font-medium [text-wrap:balance]">
            Page not in the sandbox.
          </h1>
          <p className="mt-6 text-soft text-[16.5px] leading-[1.6] max-w-[52ch]">
            That route doesn&apos;t exist. Head back to the landing page or jump
            straight into the docs.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 h-[44px] px-5 rounded-[10px] bg-accent text-ink font-medium text-[14px] hover:bg-[#19ffa0] transition-all active:translate-y-[1px]"
            >
              <ArrowLeft size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
              Back home
            </Link>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-1.5 h-[44px] text-fore font-mono text-[13.5px] hover:text-accent transition-colors"
            >
              Read the docs
              <ArrowRight size={13} weight="bold" className="opacity-60 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
