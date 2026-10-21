'use client'

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { VB } from '@/lib/story/layout'
import { N, progressForChapter, progressForEra, sample, viewBoxFor, type Sample } from '@/lib/story/camera'
import ChapterNav from './ChapterNav'
import ChapterPanel from './ChapterPanel'

/**
 * The tour. Scroll progress across the pinned section drives one thing, the
 * SVG viewBox (the camera); the rest is a few data attributes that CSS reacts
 * to. Only viewBox, opacity, transform and stroke-dashoffset ever animate.
 * No timers drive the camera: the scroll position IS the clock.
 */
type Mini = Pick<Sample, 'chapter' | 'era' | 'phase' | 'outro'>

const clamp = (x: number) => Math.min(1, Math.max(0, x))

export default function StoryScene({
  pinned,
  stage,
}: {
  pinned: RefObject<HTMLDivElement>
  stage: RefObject<HTMLDivElement>
}) {
  const [s, setS] = useState<Mini>({ chapter: -1, era: -1, phase: 'intro', outro: false })
  const sRef = useRef<Mini>(s)
  const chapterRef = useRef(-1)

  /** Scroll so the camera rests at progress pn (0..1) of the tour. */
  const goto = useCallback(
    (pn: number) => {
      const pin = pinned.current
      const st = stage.current
      if (!pin || !st) return
      const top = pin.getBoundingClientRect().top + window.scrollY
      const y = top + clamp(pn) * (pin.offsetHeight - st.clientHeight)
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.7 })
      else window.scrollTo({ top: y, behavior: 'smooth' })
    },
    [pinned, stage],
  )

  const toChapter = useCallback((i: number) => goto(progressForChapter(Math.max(0, Math.min(N - 1, i)))), [goto])
  const toEra = useCallback((k: number) => goto(progressForEra(k)), [goto])
  const toWhole = useCallback(() => goto(0), [goto])
  const skip = useCallback(() => {
    const el = document.getElementById('universe')
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // ── the camera: scroll -> viewBox ────────────────────────────────────────
  useEffect(() => {
    const pin = pinned.current
    const st = stage.current
    const svg = st?.querySelector<SVGSVGElement>('svg.story-svg')
    const section = pin?.closest<HTMLElement>('.story')
    if (!pin || !st || !svg || !section) return

    const mq = window.matchMedia('(max-width: 767px)')
    let w = st.clientWidth
    let h = st.clientHeight
    let raf = 0
    let lastVB = ''

    const update = () => {
      raf = 0
      const r = pin.getBoundingClientRect()
      const scrollable = r.height - h
      const p = scrollable > 0 ? clamp(-r.top / scrollable) : 0
      const mode = mq.matches ? 'compact' : 'wide'
      const sm = sample(p, mode)
      const vb = viewBoxFor(sm.view, w / h, VB.w, VB.h)
      const str = `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`
      if (str !== lastVB) {
        svg.setAttribute('viewBox', str)
        lastVB = str
      }
      const cur = sRef.current
      if (cur.chapter !== sm.chapter || cur.era !== sm.era || cur.phase !== sm.phase || cur.outro !== sm.outro) {
        const next = { chapter: sm.chapter, era: sm.era, phase: sm.phase, outro: sm.outro }
        sRef.current = next
        chapterRef.current = sm.chapter
        setS(next)
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const ro = new ResizeObserver(() => {
      w = st.clientWidth
      h = st.clientHeight
      lastVB = ''
      schedule()
    })
    ro.observe(st)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mq.addEventListener('change', schedule)
    update()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', schedule)
      svg.removeAttribute('data-camera')
    }
  }, [pinned, stage])

  // ── state -> attributes (CSS does the dimming and the red label) ─────────
  useEffect(() => {
    const st = stage.current
    const section = pinned.current?.closest<HTMLElement>('.story')
    if (!st || !section) return
    section.dataset.chapter = String(s.chapter)
    section.dataset.era = String(s.era)
    section.dataset.phase = s.phase
    if (s.outro) section.setAttribute('data-outro', '')
    else section.removeAttribute('data-outro')
    st.querySelectorAll<SVGGElement>('.eg').forEach((g) => {
      const k = Number(g.dataset.e)
      g.toggleAttribute('data-dim', s.era >= 0 && k !== s.era)
      g.toggleAttribute('data-era-active', s.era === k)
    })
    st.querySelectorAll<SVGGElement>('.cg').forEach((g) => {
      g.toggleAttribute('data-active', Number(g.dataset.c) === s.chapter)
    })
  }, [s, pinned, stage])

  // ── clicks and keys on the map labels ────────────────────────────────────
  useEffect(() => {
    const st = stage.current
    if (!st) return
    const go = (lbl: Element | null) => {
      if (!lbl) return false
      const el = lbl as HTMLElement
      if (el.dataset.c != null) toChapter(Number(el.dataset.c))
      else if (el.dataset.e != null) toEra(Number(el.dataset.e))
      else return false
      return true
    }
    const onClick = (e: MouseEvent) => {
      go((e.target as Element).closest('.lbl'))
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      const lbl = (e.target as Element).closest?.('.lbl')
      if (go(lbl ?? null)) e.preventDefault()
    }
    st.addEventListener('click', onClick)
    st.addEventListener('keydown', onKey)
    return () => {
      st.removeEventListener('click', onClick)
      st.removeEventListener('keydown', onKey)
    }
  }, [stage, toChapter, toEra])

  // ← / → between chapters while the section is on screen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable]')) return
      const st = stage.current
      if (!st) return
      const r = st.getBoundingClientRect()
      if (r.top > window.innerHeight * 0.4 || r.bottom < window.innerHeight * 0.6) return
      e.preventDefault()
      const c = sRef.current
      if (e.key === 'ArrowRight') {
        if (c.phase === 'outro') return
        toChapter(c.chapter < 0 ? 0 : c.chapter + 1)
      } else if (c.phase === 'outro') toChapter(N - 1)
      else if (c.chapter > 0) toChapter(c.chapter - 1)
      else toWhole()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, toChapter, toWhole])

  // ── one doodle wobbles at a time (±1°), never the candle ─────────────────
  useEffect(() => {
    const st = stage.current
    if (!st) return
    let prev: Element | null = null
    const id = window.setInterval(() => {
      if (document.hidden) return
      const r = st.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      const pool = Array.from(st.querySelectorAll('.dd:not(.still)'))
      if (!pool.length) return
      prev?.classList.remove('wob')
      prev = pool[Math.floor(Math.random() * pool.length)]
      prev.classList.add('wob')
    }, 4000)
    return () => window.clearInterval(id)
  }, [stage])

  return (
    <>
      <ChapterPanel chapter={s.chapter} />
      <ChapterNav
        chapter={s.chapter}
        era={s.era}
        phase={s.phase}
        onChapter={toChapter}
        onEra={toEra}
        onWhole={toWhole}
        onSkip={skip}
      />
    </>
  )
}

