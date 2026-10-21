'use client'

import { useEffect } from 'react'

const MAX_PX = 4

/**
 * Subtle idle on desktop: the tiles shift at most 4px with the cursor.
 * Writes two CSS variables on the grid; each tile multiplies by its own depth.
 * Pointer-fine devices only, and never with reduced motion.
 */
export default function TileParallax({ targetId }: { targetId: string }) {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = document.getElementById(targetId)
    if (!el) return

    let frame = 0
    let nx = 0
    let ny = 0
    const onMove = (e: MouseEvent) => {
      nx = (e.clientX / window.innerWidth - 0.5) * 2
      ny = (e.clientY / window.innerHeight - 0.5) * 2
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty('--px', `${(nx * MAX_PX).toFixed(2)}px`)
        el.style.setProperty('--py', `${(ny * MAX_PX).toFixed(2)}px`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [targetId])

  return null
}
