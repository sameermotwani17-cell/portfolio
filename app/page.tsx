import Navbar from '@/components/Navbar'
import HeroScene from '@/components/scenes/HeroScene'
import FireScene from '@/components/scenes/FireScene'
import DuskScene from '@/components/scenes/DuskScene'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      {/* one continuous take: light → fire → dusk */}
      <HeroScene />
      <FireScene />
      <DuskScene />
    </main>
  )
}
