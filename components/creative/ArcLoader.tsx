'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import { LOADER } from '@/lib/creative/intro'

/**
 * Act 3 loader: the 000 → 100 counter. Driven by real preload progress (the
 * card thumbnails + the sky), never faster than MIN_MS unless the visitor
 * skipped, never longer than MAX_MS. Eased so it never visibly stalls.
 * Writes progress (0..1) into `progress` every frame for the arc.
 */
type Props = {
  urls: string[]
  progress: MutableRefObject<number>
  skip: boolean
  onDone: () => void
}

export default function ArcLoader({ urls, progress, skip, onDone }: Props) {
  const numRef = useRef<HTMLSpanElement>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let loaded = 0
    const total = urls.length
    const imgs = urls.map((u) => {
      const im = new Image()
      const done = () => {
        loaded++
      }
      im.onload = done
      im.onerror = done // a broken thumb must never hold the page
      im.decoding = 'async'
      im.src = u
      return im
    })

    const t0 = performance.now()
    let shown = 0
    let raf = 0
    let finished = false
    const loop = (now: number) => {
      const elapsed = now - t0
      const real = total ? loaded / total : 1
      const timeGate = skip ? 1 : Math.min(1, elapsed / LOADER.MIN_MS)
      let target = Math.min(real, timeGate)
      if (elapsed >= LOADER.MAX_MS) target = 1
      // ease toward the target, and always creep a little so it never freezes
      shown += (target - shown) * 0.09
      if (target < 1 && shown >= target - 0.002) shown = Math.min(0.97, shown + 0.0012)
      if (target >= 1 && shown > 0.995) shown = 1
      progress.current = shown
      if (numRef.current) numRef.current.textContent = String(Math.round(shown * 100)).padStart(3, '0')
      if (shown >= 1) {
        if (!finished) {
          finished = true
          doneRef.current()
        }
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      imgs.forEach((im) => {
        im.onload = null
        im.onerror = null
      })
    }
  }, [urls, progress, skip])

  return (
    <div className="cr-counter" aria-live="off">
      <span ref={numRef}>000</span>
    </div>
  )
}
