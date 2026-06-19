import { Nav } from '../components/nav'
import { Sidebar } from './sidebar'
import { TopMenu } from './topmenu'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-[8px] focus:bg-accent focus:text-ink font-mono text-[12.5px]"
      >
        Skip to content
      </a>
      <Nav />
      <TopMenu />
      <div className="pt-[112px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
          <div className="flex gap-0 lg:gap-12">
            <Sidebar />
            <main id="main" className="flex-1 min-w-0 py-12 lg:py-16 max-w-[820px]">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
