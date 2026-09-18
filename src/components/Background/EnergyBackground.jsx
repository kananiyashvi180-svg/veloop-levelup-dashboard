import React, { useEffect, useRef } from 'react'
import styles from './EnergyBackground.module.css'

/**
 * VELOOP Premium Dark Space & Crystal Energy Background
 *
 * Replaces all technical network/grid lines with:
 * - Pure Midnight Navy / Deep Space base (80%+ dark)
 * - Soft flowing violet energy clouds and ethereal diagonal light rays
 * - Ethereal organic crystal light ribbons and caustics
 * - Floating glowing faceted crystal shard formations (matching reference)
 * - Subtle ambient cosmic particles with soft purple/lavender glow
 * - Slow, atmospheric energy pulse (no harsh white flashes)
 */

export default function EnergyBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId = null
    let lastTime = performance.now()
    let isRunning = true

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let targetIntensity = 1.0
    let currentIntensity = 1.0

    const updatePageIntensity = () => {
      const page = document.documentElement.dataset.page || 'home'
      switch (page) {
        case 'level':
          targetIntensity = 1.2
          break
        case 'play':
        case 'play-and-earn':
          targetIntensity = 0.35 // Darkest & cleanest for gameplay focus
          break
        case 'rewards':
          targetIntensity = 1.05
          break
        case 'activity':
        case 'profile':
          targetIntensity = 0.75
          break
        case 'login':
        case 'register':
          targetIntensity = 1.0
          break
        case 'home':
        default:
          targetIntensity = 1.0
          break
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-page') {
          updatePageIntensity()
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true })
    updatePageIntensity()

    // ────────────────────────────────────────────────────────────
    // 1. ETHEREAL FLOWING ENERGY WISPS & CAUSTICS (Organic silk ribbons)
    // ────────────────────────────────────────────────────────────
    let wisps = []
    function initWisps() {
      wisps = []
      const isMobile = width < 768
      const count = isMobile ? 4 : 7

      for (let i = 0; i < count; i++) {
        wisps.push({
          xOffset: (i / count) * width * 1.3 - width * 0.15,
          speed: 0.12 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
          wavelength: 320 + Math.random() * 240,
          amplitude: 45 + Math.random() * 45,
          baseAlpha: 0.07 + Math.random() * 0.08,
          width: isMobile ? 1.0 : 1.6 + Math.random() * 1.2,
          color: i % 2 === 0 ? '168, 85, 247' : '139, 92, 246',
        })
      }
    }

    // ────────────────────────────────────────────────────────────
    // 2. ETHEREAL DIAGONAL LIGHT RAYS (Soft violet beams)
    // ────────────────────────────────────────────────────────────
    let lightRays = []
    function initLightRays() {
      lightRays = [
        { angle: -0.68, xPct: 0.15, widthPct: 0.18, baseAlpha: 0.05, speed: 0.05, phase: 0 },
        { angle: -0.72, xPct: 0.48, widthPct: 0.24, baseAlpha: 0.06, speed: 0.04, phase: 2 },
        { angle: -0.65, xPct: 0.82, widthPct: 0.20, baseAlpha: 0.04, speed: 0.06, phase: 4 },
      ]
    }

    // ────────────────────────────────────────────────────────────
    // 3. FLOATING CRYSTAL SHARD CLUSTER (Matches Reference Image #2)
    // ────────────────────────────────────────────────────────────
    // Represents the glowing purple crystal cluster in the background
    let crystalClusters = []
    function initCrystals() {
      const isMobile = width < 768
      crystalClusters = [
        // Primary cluster on left side (as in reference screenshot)
        {
          xPct: isMobile ? 0.12 : 0.09,
          yPct: isMobile ? 0.78 : 0.62,
          scale: isMobile ? 0.75 : 1.1,
          rotSpeed: 0.02,
          floatSpeed: 0.6,
          phase: 0,
          shards: [
            // Center main tall crystal
            {
              points: [
                { x: 0, y: -48 }, // top apex
                { x: 14, y: -16 }, // right facet
                { x: 10, y: 38 }, // bottom right
                { x: 0, y: 52 }, // bottom apex
                { x: -10, y: 38 }, // bottom left
                { x: -14, y: -16 }, // left facet
              ],
              centerRidge: { top: { x: 0, y: -48 }, mid: { x: 0, y: -14 }, bot: { x: 0, y: 52 } },
              colorTop: '#f5d0fe',
              colorMid: '#c084fc',
              colorBot: '#6b21a8',
              glowColor: 'rgba(192, 132, 252, 0.7)',
            },
            // Left flanking crystal
            {
              offsetX: -22,
              offsetY: 14,
              tilt: -0.32,
              points: [
                { x: 0, y: -28 },
                { x: 9, y: -10 },
                { x: 6, y: 22 },
                { x: 0, y: 30 },
                { x: -6, y: 22 },
                { x: -9, y: -10 },
              ],
              centerRidge: { top: { x: 0, y: -28 }, mid: { x: 0, y: -8 }, bot: { x: 0, y: 30 } },
              colorTop: '#e9d5ff',
              colorMid: '#a855f7',
              colorBot: '#581c87',
              glowColor: 'rgba(168, 85, 247, 0.6)',
            },
            // Right flanking crystal
            {
              offsetX: 20,
              offsetY: 16,
              tilt: 0.35,
              points: [
                { x: 0, y: -26 },
                { x: 8, y: -8 },
                { x: 6, y: 20 },
                { x: 0, y: 28 },
                { x: -6, y: 20 },
                { x: -8, y: -8 },
              ],
              centerRidge: { top: { x: 0, y: -26 }, mid: { x: 0, y: -8 }, bot: { x: 0, y: 28 } },
              colorTop: '#f5d0fe',
              colorMid: '#9333ea',
              colorBot: '#4c1d95',
              glowColor: 'rgba(168, 85, 247, 0.6)',
            },
          ]
        },
        // Secondary subtle crystal fragment high on the right side
        {
          xPct: 0.92,
          yPct: 0.28,
          scale: isMobile ? 0.45 : 0.65,
          rotSpeed: -0.015,
          floatSpeed: 0.45,
          phase: 3.14,
          shards: [
            {
              points: [
                { x: 0, y: -34 },
                { x: 11, y: -12 },
                { x: 8, y: 28 },
                { x: 0, y: 36 },
                { x: -8, y: 28 },
                { x: -11, y: -12 },
              ],
              centerRidge: { top: { x: 0, y: -34 }, mid: { x: 0, y: -10 }, bot: { x: 0, y: 36 } },
              colorTop: '#f5d0fe',
              colorMid: '#a855f7',
              colorBot: '#581c87',
              glowColor: 'rgba(168, 85, 247, 0.5)',
            }
          ]
        }
      ]
    }

    // ────────────────────────────────────────────────────────────
    // 4. SUBTLE COSMIC CRYSTAL PARTICLES & SPARKS
    // ────────────────────────────────────────────────────────────
    let particles = []
    function initParticles() {
      particles = []
      const isMobile = width < 768
      const count = isMobile ? 18 : 34

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0.08 + Math.random() * 0.16, // slow diagonal drift
          vy: -0.12 - Math.random() * 0.22,
          size: 0.8 + Math.random() * 1.5,
          baseAlpha: 0.25 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.8 + Math.random() * 1.2,
          isSparkle: Math.random() > 0.8,
        })
      }
    }

    // ────────────────────────────────────────────────────────────
    // 5. ATMOSPHERIC ENERGY PULSE (Gentle Thunderstorm Atmosphere)
    // ────────────────────────────────────────────────────────────
    let pulseTimer = 6.0
    let currentPulse = null // { progress, duration, center }

    function handleResize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      initWisps()
      initLightRays()
      initCrystals()
      initParticles()
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false
      } else {
        isRunning = true
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // ────────────────────────────────────────────────────────────
    // RENDER LOOP
    // ────────────────────────────────────────────────────────────
    function render(now) {
      if (!isRunning) return

      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      currentIntensity += (targetIntensity - currentIntensity) * 0.06

      // Base: Pure Deep Space Midnight Navy (80%+ of atmosphere)
      ctx.fillStyle = '#05060D'
      ctx.fillRect(0, 0, width, height)

      // ── Step 1: Soft Ambient Deep Energy Plumes ──
      // Subtle organic violet/indigo clouds drifting slowly
      const t = now * 0.0003

      // Main upper-right nebula plume
      const neb1X = width * 0.82 + Math.sin(t * 0.7) * 40
      const neb1Y = height * 0.28 + Math.cos(t * 0.5) * 35
      const rad1 = Math.min(width, height) * 0.65
      const neb1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, rad1)
      neb1.addColorStop(0, `rgba(109, 40, 217, ${0.11 * currentIntensity})`)
      neb1.addColorStop(0.45, `rgba(79, 70, 229, ${0.05 * currentIntensity})`)
      neb1.addColorStop(1, 'transparent')
      ctx.fillStyle = neb1
      ctx.fillRect(0, 0, width, height)

      // Left-center crystal energy plume (surrounding crystal cluster)
      const neb2X = width * 0.12 + Math.cos(t * 0.6) * 30
      const neb2Y = height * 0.65 + Math.sin(t * 0.8) * 35
      const rad2 = Math.min(width, height) * 0.55
      const neb2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, rad2)
      neb2.addColorStop(0, `rgba(147, 51, 234, ${0.12 * currentIntensity})`)
      neb2.addColorStop(0.5, `rgba(59, 7, 100, ${0.06 * currentIntensity})`)
      neb2.addColorStop(1, 'transparent')
      ctx.fillStyle = neb2
      ctx.fillRect(0, 0, width, height)

      // ── Step 2: Atmospheric Energy Pulses (Subtle Thunderstorm Surge) ──
      pulseTimer -= dt
      if (pulseTimer <= 0) {
        currentPulse = {
          progress: 0,
          duration: 1.4, // seconds
          x: width * (0.2 + Math.random() * 0.6),
          y: height * (0.3 + Math.random() * 0.4),
          radius: Math.min(width, height) * (0.4 + Math.random() * 0.3),
        }
        pulseTimer = 6.5 + Math.random() * 4.5
      }

      if (currentPulse) {
        currentPulse.progress += dt / currentPulse.duration
        if (currentPulse.progress >= 1) {
          currentPulse = null
        } else {
          // Smooth bell curve
          const pulseGlow = Math.sin(currentPulse.progress * Math.PI)
          const pGrad = ctx.createRadialGradient(
            currentPulse.x, currentPulse.y, 0,
            currentPulse.x, currentPulse.y, currentPulse.radius
          )
          pGrad.addColorStop(0, `rgba(192, 132, 252, ${0.10 * pulseGlow * currentIntensity})`)
          pGrad.addColorStop(0.5, `rgba(124, 58, 237, ${0.05 * pulseGlow * currentIntensity})`)
          pGrad.addColorStop(1, 'transparent')
          ctx.fillStyle = pGrad
          ctx.fillRect(0, 0, width, height)
        }
      }

      // ── Step 3: Diffused Violet Light Beams / Rays ──
      for (let r = 0; r < lightRays.length; r++) {
        const ray = lightRays[r]
        ray.phase += ray.speed * dt
        const alpha = (ray.baseAlpha + Math.sin(ray.phase) * 0.025) * currentIntensity
        if (alpha <= 0) continue

        const originX = width * ray.xPct + Math.sin(ray.phase * 0.5) * 40
        const rayW = width * ray.widthPct

        ctx.save()
        ctx.translate(originX, height)
        ctx.rotate(ray.angle)

        const rayGrad = ctx.createLinearGradient(0, 0, 0, -height * 1.6)
        rayGrad.addColorStop(0, `rgba(168, 85, 247, ${alpha * 1.2})`)
        rayGrad.addColorStop(0.4, `rgba(109, 40, 217, ${alpha * 0.6})`)
        rayGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = rayGrad
        ctx.beginPath()
        ctx.moveTo(-rayW * 0.5, 0)
        ctx.lineTo(-rayW * 1.4, -height * 1.6)
        ctx.lineTo(rayW * 1.4, -height * 1.6)
        ctx.lineTo(rayW * 0.5, 0)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // ── Step 4: Organic Flowing Energy Wisps (Silk-like Caustics) ──
      // These are smooth sinusoidal ribbons flowing diagonally, NOT network lines
      for (let w = 0; w < wisps.length; w++) {
        const wisp = wisps[w]
        wisp.phase += wisp.speed * dt

        ctx.save()
        ctx.shadowColor = `rgba(${wisp.color}, 0.5)`
        ctx.shadowBlur = 14
        ctx.strokeStyle = `rgba(${wisp.color}, ${wisp.baseAlpha * currentIntensity})`
        ctx.lineWidth = wisp.width

        ctx.beginPath()
        // Draw diagonal curve from lower left to upper right
        const steps = 30
        for (let s = 0; s <= steps; s++) {
          const ratio = s / steps
          const baseY = height * 1.15 - ratio * (height * 1.3)
          const baseX = wisp.xOffset + ratio * (width * 0.85)

          // Smooth wavy displacement
          const wave = Math.sin(ratio * Math.PI * 3 + wisp.phase) * wisp.amplitude
          const curX = baseX + wave
          const curY = baseY - wave * 0.35

          if (s === 0) {
            ctx.moveTo(curX, curY)
          } else {
            ctx.lineTo(curX, curY)
          }
        }
        ctx.stroke()
        ctx.restore()
      }

      // ── Step 5: Floating Crystal Shard Formations (Matches Reference #2) ──
      for (let c = 0; c < crystalClusters.length; c++) {
        const cluster = crystalClusters[c]
        cluster.phase += cluster.floatSpeed * dt

        const floatY = Math.sin(cluster.phase) * 7
        const cx = width * cluster.xPct
        const cy = height * cluster.yPct + floatY

        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(cluster.scale, cluster.scale)

        // Draw soft purple ambient glow halo behind crystal
        const auraGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 75)
        auraGrad.addColorStop(0, `rgba(192, 132, 252, ${0.45 * currentIntensity})`)
        auraGrad.addColorStop(0.4, `rgba(124, 58, 237, ${0.18 * currentIntensity})`)
        auraGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = auraGrad
        ctx.beginPath()
        ctx.arc(0, 0, 75, 0, Math.PI * 2)
        ctx.fill()

        // Draw each faceted shard
        for (let s = 0; s < cluster.shards.length; s++) {
          const shard = cluster.shards[s]
          ctx.save()
          if (shard.offsetX) ctx.translate(shard.offsetX, shard.offsetY)
          if (shard.tilt) ctx.rotate(shard.tilt)

          // Shard drop glow
          ctx.shadowColor = shard.glowColor
          ctx.shadowBlur = 18 * currentIntensity

          // 1. Shard back / base body
          ctx.beginPath()
          ctx.moveTo(shard.points[0].x, shard.points[0].y)
          for (let p = 1; p < shard.points.length; p++) {
            ctx.lineTo(shard.points[p].x, shard.points[p].y)
          }
          ctx.closePath()

          const bodyGrad = ctx.createLinearGradient(0, shard.points[0].y, 0, shard.points[3].y)
          bodyGrad.addColorStop(0, shard.colorTop)
          bodyGrad.addColorStop(0.35, shard.colorMid)
          bodyGrad.addColorStop(1, shard.colorBot)
          ctx.fillStyle = bodyGrad
          ctx.fill()

          // 2. Facet reflections (Left facet slightly darker, Right facet brighter)
          // Left facet
          ctx.beginPath()
          ctx.moveTo(shard.centerRidge.top.x, shard.centerRidge.top.y)
          ctx.lineTo(shard.points[5].x, shard.points[5].y)
          ctx.lineTo(shard.points[4].x, shard.points[4].y)
          ctx.lineTo(shard.centerRidge.bot.x, shard.centerRidge.bot.y)
          ctx.lineTo(shard.centerRidge.mid.x, shard.centerRidge.mid.y)
          ctx.closePath()
          ctx.fillStyle = 'rgba(76, 29, 149, 0.45)'
          ctx.fill()

          // Right facet highlight
          ctx.beginPath()
          ctx.moveTo(shard.centerRidge.top.x, shard.centerRidge.top.y)
          ctx.lineTo(shard.points[1].x, shard.points[1].y)
          ctx.lineTo(shard.points[2].x, shard.points[2].y)
          ctx.lineTo(shard.centerRidge.bot.x, shard.centerRidge.bot.y)
          ctx.lineTo(shard.centerRidge.mid.x, shard.centerRidge.mid.y)
          ctx.closePath()
          ctx.fillStyle = 'rgba(255, 255, 255, 0.28)'
          ctx.fill()

          // 3. Central bright ridge highlight line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(shard.centerRidge.top.x, shard.centerRidge.top.y)
          ctx.lineTo(shard.centerRidge.mid.x, shard.centerRidge.mid.y)
          ctx.lineTo(shard.centerRidge.bot.x, shard.centerRidge.bot.y)
          ctx.stroke()

          // 4. Glint sparkle at top apex
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(shard.centerRidge.top.x, shard.centerRidge.top.y, 1.8, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }

        ctx.restore()
      }

      // ── Step 6: Subtle Cosmic Particles & Sparks ──
      for (let p = 0; p < particles.length; p++) {
        const pt = particles[p]
        pt.x += pt.vx
        pt.y += pt.vy
        pt.phase += pt.pulseSpeed * dt

        // Wrap around bounds
        if (pt.x > width + 15) pt.x = -10
        if (pt.x < -15) pt.x = width + 10
        if (pt.y < -15) pt.y = height + 10
        if (pt.y > height + 15) pt.y = -10

        const alpha = Math.max(0.05, (pt.baseAlpha + Math.sin(pt.phase) * 0.22) * currentIntensity)

        ctx.save()
        ctx.fillStyle = `rgba(216, 180, 254, ${alpha})`
        ctx.shadowColor = 'rgba(192, 132, 252, 0.8)'
        ctx.shadowBlur = pt.isSparkle ? 8 : 4

        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fill()

        // Occasional delicate cross sparkle
        if (pt.isSparkle && alpha > 0.4) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(pt.x - 3.5, pt.y)
          ctx.lineTo(pt.x + 3.5, pt.y)
          ctx.moveTo(pt.x, pt.y - 3.5)
          ctx.lineTo(pt.x, pt.y + 3.5)
          ctx.stroke()
        }
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      isRunning = false
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.energyCanvas} />
      {/* Deep corner vignette to frame content and ensure cards pop */}
      <div className={styles.vignetteOverlay} />
    </div>
  )
}
