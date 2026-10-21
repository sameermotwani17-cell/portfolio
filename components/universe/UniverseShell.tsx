'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useInViewRaf } from '@/hooks/useInViewRaf'
import { usePointerField } from '@/hooks/usePointerField'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { UNIVERSES, otherUniverse, type UniverseId } from '@/lib/universe/sides'
import { FROM_KEY, navigateWithTransition, notifyRouteReady } from '@/lib/universe/transition'
import { initialStage } from './types'
import UniverseContent from './UniverseContent'

const WarpGrid = dynamic(() => import('./WarpGrid'), { ssr: false })
const CircuitLayer = dynamic(() => import('./CircuitLayer'), { ssr: false })
const CreativeLayer = dynamic(() => import('./CreativeLayer'), { ssr: false })

/**
 * Full-screen frame for /tech and /creative. Keeps the universe's own motion
 * layer running as the page background (the same layers the split used), with
 * Back and a crossfading switch. Real content mounts in <UniverseContent />.
 */
export default function UniverseShell({ universe }: { universe: UniverseId }) {
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const state = useRef(initialStage())
  const field = usePointerField(rootRef)
  const running = useInViewRaf(rootRef)
  const [mobile, setMobile] = useState(false)
  const u = UNIVERSES[universe]
  const other = UNIVERSES[otherUniverse(universe)]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    notifyRouteReady()
    return () => mq.removeEventListener('change', on)
  }, [])

  const go = (href: string, from: UniverseId) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    try {
      sessionStorage.setItem(FROM_KEY, from)
    } catch {}
    navigateWithTransition(router, href)
  }

  return (
    <main ref={rootRef} className="uni-shell" data-universe={universe}>
      <div className={`uni-shell__ground uni-ground--${universe}`} />
      {universe === 'tech' ? (
        <>
          <CircuitLayer field={field} state={state} enabled={running} reduced={reduced} />
          <WarpGrid field={field} state={state} enabled={running} reduced={reduced} mobile={mobile} mode="tech" />
        </>
      ) : (
        <>
          <CreativeLayer field={field} state={state} enabled={running} reduced={reduced} mobile={mobile} region="full" />
          <WarpGrid field={field} state={state} enabled={running} reduced={reduced} mobile={mobile} mode="creative" />
        </>
      )}

      <header className="uni-shell__bar">
        <a href="/#universe" className="uni-btn" onClick={go('/#universe', universe)}>
          ← Back
        </a>
        <a href={other.href} className="uni-btn" onClick={go(other.href, other.id)}>
          Switch to {other.label} →
        </a>
      </header>

      <div className="uni-shell__centre">
        <h1 className="uni-shell__title">{u.label}</h1>
        <p className="uni-shell__sub">{u.sub}</p>
        <p className="uni-shell__soon">Coming in the next section.</p>
        <UniverseContent universe={universe} />
      </div>
    </main>
  )
}
