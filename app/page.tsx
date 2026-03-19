import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ParticlesBurst from '@/components/ParticlesBurst'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Awards from '@/components/Awards'
import Hobbies from '@/components/Hobbies'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ zIndex: 10 }}>
      <Navbar />
      <Hero />
      <ParticlesBurst />
      <Projects />
      <ParticlesBurst />
      <Skills />
      <ParticlesBurst />
      <Awards />
      <ParticlesBurst />
      <Hobbies />
      <ParticlesBurst />
      <Contact />
    </main>
  )
}
