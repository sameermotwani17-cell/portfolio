'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  opacityDir: number
  parallax: number
  color: string
}

interface Cluster {
  x: number
  y: number
  radius: number
  color: string
  opacity: number
  driftX: number
  driftY: number
  driftAngle: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  active: boolean
  timer: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let scrollY = 0

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { scrollY = window.scrollY })

    // Stars
    const starColors = ['#ffffff', '#ccd6f6', '#a8c5ff', '#ffd8b0']
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 0.5 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.8,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.006),
      parallax: 0.1 + Math.random() * 0.2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }))

    // Galaxy clusters
    const clusterColors = [
      'rgba(249,115,22,',   // orange
      'rgba(59,130,246,',   // blue
      'rgba(168,197,255,',  // soft blue
    ]
    const clusters: Cluster[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 80 + Math.random() * 180,
      color: clusterColors[Math.floor(Math.random() * clusterColors.length)],
      opacity: 0.03 + Math.random() * 0.04,
      driftX: 0,
      driftY: 0,
      driftAngle: Math.random() * Math.PI * 2,
    }))

    // Shooting stars
    const shootingStars: ShootingStar[] = Array.from({ length: 5 }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      length: 0,
      opacity: 0,
      active: false,
      timer: 8000 + Math.random() * 4000,
    }))

    const spawnShootingStar = (s: ShootingStar) => {
      s.x = Math.random() * window.innerWidth * 0.6
      s.y = Math.random() * window.innerHeight * 0.4
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5
      const speed = 8 + Math.random() * 6
      s.vx = Math.cos(angle) * speed
      s.vy = Math.sin(angle) * speed
      s.length = 80 + Math.random() * 120
      s.opacity = 1
      s.active = true
    }

    let lastTime = performance.now()

    const draw = (now: number) => {
      const dt = now - lastTime
      lastTime = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw galaxy clusters
      clusters.forEach((c) => {
        c.driftAngle += 0.0002
        c.driftX = Math.cos(c.driftAngle) * 0.3
        c.driftY = Math.sin(c.driftAngle * 0.7) * 0.3
        c.x += c.driftX
        c.y += c.driftY

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius)
        grad.addColorStop(0, c.color + (c.opacity * 1.5).toFixed(3) + ')')
        grad.addColorStop(0.5, c.color + c.opacity.toFixed(3) + ')')
        grad.addColorStop(1, c.color + '0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw stars with parallax
      stars.forEach((s) => {
        // Twinkle
        s.opacity += s.opacityDir
        if (s.opacity > 1) { s.opacity = 1; s.opacityDir *= -1 }
        if (s.opacity < 0.1) { s.opacity = 0.1; s.opacityDir *= -1 }

        const py = (s.y - scrollY * s.parallax + window.innerHeight * 10) % window.innerHeight
        ctx.globalAlpha = s.opacity
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, py, s.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      // Shooting stars
      shootingStars.forEach((s) => {
        if (!s.active) {
          s.timer -= dt
          if (s.timer <= 0) {
            spawnShootingStar(s)
            s.timer = 8000 + Math.random() * 4000
          }
          return
        }

        s.x += s.vx
        s.y += s.vy
        s.opacity -= 0.025

        if (s.opacity <= 0 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
          s.active = false
          return
        }

        const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.length
        const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.length

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity.toFixed(3)})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
