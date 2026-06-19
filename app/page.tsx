import { Bento } from './components/bento'
import { CTA } from './components/cta'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { Nav } from './components/nav'
import { Trust } from './components/trust'
import { UseCase } from './components/usecase'
import { Workflow } from './components/workflow'

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Trust />
      <Bento />
      <UseCase />
      <Workflow />
      <CTA />
      <Footer />
    </main>
  )
}
