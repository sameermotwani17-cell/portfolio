'use client'

import { useEffect, useState, type RefObject } from 'react'

/** True while the element is on screen and the tab is visible: gate for rAF work. */
export function useInViewRaf(ref: RefObject<Element>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    const onVis = () => setVisible(document.visibilityState === 'visible')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ref, rootMargin])

  return inView && visible
}
