import { useEffect, useRef, useCallback, useState } from 'react'
import { playSound } from '../utils/gameAudio'
import styles from './GamePlay.module.css'

const OBJECT_SIZE = 48

const OBJECT_TYPES = [
  { type: 'xp-orb', color: '#a855f7', streakColor: 'rgba(168,85,247,0.38)', points: 10 },
  { type: 've-coin', color: '#f5ba31', streakColor: 'rgba(245,186,49,0.38)', points: 15 },
  { type: 'gem', color: '#22c55e', streakColor: 'rgba(34,197,94,0.38)', points: 20 },
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function buildXPOrb() {
  return `
    <div class="${styles.streak}" style="background: linear-gradient(to top, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <radialGradient id="xpOrbGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#d8b4fe"/>
          <stop offset="45%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#581c87"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#xpOrbGrad)" stroke="#c084fc" stroke-width="2.5"/>
      <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.45)" transform="rotate(-25 17 14)"/>
      <text x="24" y="29" text-anchor="middle" font-family="'Montserrat',sans-serif" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="0.5">XP</text>
    </svg>
  `
}

function buildVECoin() {
  return `
    <div class="${styles.streak}" style="background: linear-gradient(to top, rgba(245,186,49,0.5) 0%, rgba(245,186,49,0) 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <radialGradient id="veCoinGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#a16207"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#veCoinGrad)" stroke="#fde047" stroke-width="2.5"/>
      <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(161,98,7,0.4)" stroke-width="1.5"/>
      <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 17 14)"/>
      <text x="24" y="30" text-anchor="middle" font-family="'Montserrat',sans-serif" font-weight="900" font-size="17" fill="#713f12" letter-spacing="0.5">V</text>
    </svg>
  `
}

function buildGem() {
  return `
    <div class="${styles.streak}" style="background: linear-gradient(to top, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0) 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <linearGradient id="gemTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#86efac"/>
          <stop offset="100%" stop-color="#22c55e"/>
        </linearGradient>
        <linearGradient id="gemLeft" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#4ade80"/>
          <stop offset="100%" stop-color="#16a34a"/>
        </linearGradient>
        <linearGradient id="gemRight" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#15803d"/>
          <stop offset="100%" stop-color="#14532d"/>
        </linearGradient>
      </defs>
      <polygon points="24,3 43,14 43,34 24,45 5,34 5,14" fill="#16a34a" stroke="#86efac" stroke-width="1.8"/>
      <polygon points="24,3 43,14 24,20 5,14" fill="url(#gemTop)"/>
      <polygon points="5,14 24,20 24,45 5,34" fill="url(#gemLeft)"/>
      <polygon points="43,14 24,20 24,45 43,34" fill="url(#gemRight)"/>
      <circle cx="20" cy="11" r="2" fill="rgba(255,255,255,0.7)"/>
    </svg>
  `
}

function buildObjectHTML(def) {
  if (def.type === 'xp-orb') return buildXPOrb()
  if (def.type === 've-coin') return buildVECoin()
  return buildGem()
}

export default function GamePlay({
  duration,
  rewards,
  isMuted,
  onCatch,
  onTimerTick,
  onGameOver
}) {
  const arenaRef = useRef(null)
  const catcherRef = useRef(null)
  const floorRingsRef = useRef(null)
  const rafRef = useRef(null)
  const timerRef = useRef(null)
  const spawnRef = useRef(null)
  const objectsRef = useRef([])
  const catcherXRef = useRef(0)
  const keyVelocityRef = useRef(0)
  const keysPressedRef = useRef({})
  const timeLeftRef = useRef(duration)
  const activeRef = useRef(true)
  const comboRef = useRef(0)
  const maxMultiplierRef = useRef(1)
  const rewardsRef = useRef({ score: 0, xp: 0, ves: 0, gems: 0 })

  const [activeMultiplier, setActiveMultiplier] = useState(1)

  const syncCatcherPos = useCallback(() => {
    if (!arenaRef.current || !catcherRef.current || !floorRingsRef.current) return
    const arenaW = arenaRef.current.clientWidth
    const halfW = catcherRef.current.offsetWidth / 2
    const x = clamp(catcherXRef.current, halfW, arenaW - halfW)
    catcherXRef.current = x
    catcherRef.current.style.left = x + 'px'
    floorRingsRef.current.style.left = x + 'px'
  }, [])

  const spawnParticles = useCallback((x, y, color) => {
    if (!arenaRef.current) return
    const count = 7
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
      const dist = 24 + Math.random() * 26
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      const size = 4 + Math.random() * 4

      p.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 8px ${color};
        pointer-events: none;
        z-index: 25;
        transition: transform 0.45s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.45s ease-out;
        transform: translate(-50%, -50%);
      `
      arenaRef.current.appendChild(p)

      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.2)`
        p.style.opacity = '0'
      })

      setTimeout(() => {
        if (p.parentNode) p.remove()
      }, 500)
    }
  }, [])

  const showPop = useCallback((x, y, text, color) => {
    if (!arenaRef.current) return
    const pop = document.createElement('div')
    pop.className = styles.catchPopup
    pop.textContent = text
    pop.style.left = `${x}px`
    pop.style.top = `${y}px`
    pop.style.color = color
    pop.style.textShadow = `0 0 10px ${color}`
    arenaRef.current.appendChild(pop)
    setTimeout(() => {
      if (pop.parentNode) pop.remove()
    }, 850)
  }, [])

  const spawnObject = useCallback(() => {
    if (!arenaRef.current || !activeRef.current) return
    const arenaW = arenaRef.current.clientWidth
    const margin = OBJECT_SIZE + 4
    const x = margin + Math.random() * (arenaW - margin * 2)
    const timeElapsed = duration - timeLeftRef.current
    const isLate = timeElapsed > 10
    const speedMin = isLate ? 3.0 : 2.0
    const speedMax = isLate ? 4.5 : 3.2
    const speed = speedMin + Math.random() * (speedMax - speedMin)
    const def = pickRandom(OBJECT_TYPES)

    const wrapper = document.createElement('div')
    wrapper.className = styles.fallingObject
    wrapper.style.left = `${x}px`
    wrapper.style.top = `${-OBJECT_SIZE - 20}px`
    wrapper.innerHTML = buildObjectHTML(def)

    arenaRef.current.appendChild(wrapper)
    objectsRef.current.push({ el: wrapper, y: -(OBJECT_SIZE + 20), speed, def, x })
  }, [duration])

  const startSpawner = useCallback(() => {
    const getInterval = () => (duration - timeLeftRef.current > 10 ? 750 : 950)

    const scheduleNext = () => {
      if (!activeRef.current) return
      spawnObject()
      spawnRef.current = setTimeout(scheduleNext, getInterval())
    }

    spawnRef.current = setTimeout(scheduleNext, 250)
  }, [duration, spawnObject])

  const gameLoop = useCallback(() => {
    if (!activeRef.current || !arenaRef.current || !catcherRef.current) return

    if (keysPressedRef.current.ArrowLeft || keysPressedRef.current.a || keysPressedRef.current.A) {
      keyVelocityRef.current = -7
    } else if (keysPressedRef.current.ArrowRight || keysPressedRef.current.d || keysPressedRef.current.D) {
      keyVelocityRef.current = 7
    } else {
      keyVelocityRef.current *= 0.82
      if (Math.abs(keyVelocityRef.current) < 0.2) keyVelocityRef.current = 0
    }

    if (keyVelocityRef.current !== 0) {
      catcherXRef.current += keyVelocityRef.current
      syncCatcherPos()
    }

    const arenaH = arenaRef.current.clientHeight
    const catcherRect = catcherRef.current.getBoundingClientRect()
    const arenaRect = arenaRef.current.getBoundingClientRect()
    const toRemove = []

    objectsRef.current.forEach((obj) => {
      obj.y += obj.speed
      obj.el.style.top = obj.y + 'px'

      const cx = obj.x
      const objLeft = arenaRect.left + cx - OBJECT_SIZE / 2
      const objRight = arenaRect.left + cx + OBJECT_SIZE / 2
      const objTop = arenaRect.top + obj.y
      const objBottom = objTop + OBJECT_SIZE

      const hitH = objBottom >= catcherRect.top && objTop <= catcherRect.top + 34
      const hitV = objRight >= catcherRect.left + 15 && objLeft <= catcherRect.right - 15

      if (hitH && hitV) {
        toRemove.push(obj)
        comboRef.current += 1
        let currentMult = 1
        if (comboRef.current >= 15) currentMult = 4
        else if (comboRef.current >= 10) currentMult = 3
        else if (comboRef.current >= 5) currentMult = 2

        if (currentMult > maxMultiplierRef.current) {
          maxMultiplierRef.current = currentMult
          playSound('multiplier', isMuted)
        }
        setActiveMultiplier(currentMult)

        const earnedPoints = obj.def.points * currentMult
        playSound(obj.def.type, isMuted)
        spawnParticles(cx, obj.y + OBJECT_SIZE / 2, obj.def.color)

        const badgeText = obj.def.type === 'xp-orb'
          ? `+${earnedPoints} XP`
          : obj.def.type === 've-coin'
          ? `+${earnedPoints} VEs`
          : `+${earnedPoints} Gems`

        showPop(cx, obj.y - 10, badgeText, obj.def.color)
        onCatch(obj.def.type, currentMult)
      } else if (obj.y > arenaH + 30) {
        toRemove.push(obj)
        if (comboRef.current > 0) {
          comboRef.current = 0
          setActiveMultiplier(1)
        }
      }
    })

    toRemove.forEach((obj) => {
      if (obj.el.parentNode) obj.el.remove()
      objectsRef.current = objectsRef.current.filter((o) => o !== obj)
    })

    rafRef.current = requestAnimationFrame(gameLoop)
  }, [isMuted, onCatch, showPop, spawnParticles, syncCatcherPos])

  const handleMouseMove = useCallback((e) => {
    if (!arenaRef.current) return
    const rect = arenaRef.current.getBoundingClientRect()
    catcherXRef.current = e.clientX - rect.left
    syncCatcherPos()
  }, [syncCatcherPos])

  const handleTouchMove = useCallback((e) => {
    if (!arenaRef.current) return
    e.preventDefault()
    const rect = arenaRef.current.getBoundingClientRect()
    catcherXRef.current = e.touches[0].clientX - rect.left
    syncCatcherPos()
  }, [syncCatcherPos])

  const handleKeyDown = useCallback((e) => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
      keysPressedRef.current[e.key] = true
    }
  }, [])

  const handleKeyUp = useCallback((e) => {
    if (keysPressedRef.current[e.key]) {
      delete keysPressedRef.current[e.key]
    }
  }, [])

  useEffect(() => {
    activeRef.current = true
    timeLeftRef.current = duration
    comboRef.current = 0
    maxMultiplierRef.current = 1
    objectsRef.current = []
    rewardsRef.current = { score: 0, xp: 0, ves: 0, gems: 0 }

    if (arenaRef.current) {
      catcherXRef.current = arenaRef.current.clientWidth / 2
      syncCatcherPos()
    }

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1
      onTimerTick(timeLeftRef.current)

      if (timeLeftRef.current <= 0) {
        activeRef.current = false
        clearInterval(timerRef.current)
        clearTimeout(spawnRef.current)
        cancelAnimationFrame(rafRef.current)
        objectsRef.current.forEach((obj) => {
          if (obj.el.parentNode) obj.el.remove()
        })
        objectsRef.current = []
        playSound('gameover', isMuted)
        const snapshot = {
          ...rewardsRef.current,
          maxMultiplier: maxMultiplierRef.current,
        }
        setTimeout(() => onGameOver(snapshot), 400)
      }
    }, 1000)

    startSpawner()
    rafRef.current = requestAnimationFrame(gameLoop)

    const arena = arenaRef.current
    if (arena) {
      arena.addEventListener('mousemove', handleMouseMove)
      arena.addEventListener('touchmove', handleTouchMove, { passive: false })
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      activeRef.current = false
      clearInterval(timerRef.current)
      clearTimeout(spawnRef.current)
      cancelAnimationFrame(rafRef.current)
      objectsRef.current.forEach((obj) => {
        if (obj.el.parentNode) obj.el.remove()
      })
      objectsRef.current = []
      if (arena) {
        arena.removeEventListener('mousemove', handleMouseMove)
        arena.removeEventListener('touchmove', handleTouchMove)
      }
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [duration, gameLoop, handleKeyDown, handleKeyUp, handleMouseMove, handleTouchMove, isMuted, onGameOver, onTimerTick, startSpawner, syncCatcherPos])

  useEffect(() => {
    rewardsRef.current = rewards
  }, [rewards])

  return (
    <div className={styles.wrapper}>
      <div
        ref={arenaRef}
        className={styles.arena}
        id="xp-catcher-arena"
      >
        <div ref={floorRingsRef} className={styles.floorRings}>
          <svg viewBox="0 0 160 50" className={styles.ringsSvg}>
            <ellipse cx="80" cy="25" rx="72" ry="18" fill="none" stroke="rgba(245,186,49,0.12)" strokeWidth="1.2" />
            <ellipse cx="80" cy="25" rx="52" ry="13" fill="none" stroke="rgba(245,186,49,0.22)" strokeWidth="1.2" />
            <ellipse cx="80" cy="25" rx="32" ry="8" fill="none" stroke="rgba(245,186,49,0.38)" strokeWidth="1.5" />
          </svg>
        </div>

        <div ref={catcherRef} className={styles.catcher}>
          <svg
            className={styles.basketSvg}
            viewBox="0 0 170 92"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="rimMetallic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#f5ba31" />
                <stop offset="70%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="netWireGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(253,224,71,0.85)" />
                <stop offset="60%" stopColor="rgba(245,158,11,0.5)" />
                <stop offset="100%" stopColor="rgba(180,83,9,0.3)" />
              </linearGradient>
            </defs>

            <ellipse cx="85" cy="14" rx="76" ry="11" fill="rgba(15,12,8,0.7)" />

            <path d="M 16 14 Q 50 54 58 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 33 14 Q 60 54 67 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 52 14 Q 72 54 76 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 72 14 Q 82 54 85 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 98 14 Q 88 54 85 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 118 14 Q 98 54 94 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 137 14 Q 110 54 103 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 154 14 Q 120 54 112 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />

            <path d="M 154 14 Q 120 54 112 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 137 14 Q 110 54 103 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 118 14 Q 98 54 94 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 98 14 Q 88 54 85 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 72 14 Q 82 54 85 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 52 14 Q 72 54 76 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 33 14 Q 60 54 67 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />
            <path d="M 16 14 Q 50 54 58 82" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.6" />

            <path d="M 22 30 Q 85 40 148 30" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.4" />
            <path d="M 32 48 Q 85 59 138 48" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.4" />
            <path d="M 44 65 Q 85 76 126 65" fill="none" stroke="url(#netWireGrad)" strokeWidth="1.4" />

            <ellipse cx="85" cy="82" rx="28" ry="5.5" fill="none" stroke="url(#rimMetallic)" strokeWidth="4.5" />

            <ellipse cx="85" cy="14" rx="78" ry="11" fill="none" stroke="url(#rimMetallic)" strokeWidth="7" />
            <ellipse cx="85" cy="12.5" rx="77" ry="10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className={styles.scoreHudCard}>
        <div className={styles.scoreTopSection}>
          <span className={styles.scoreLabel}>YOUR SCORE</span>
          <span className={styles.scoreDisplay}>{rewards.score}</span>
        </div>

        <div className={styles.scoreBottomRow}>
          <div className={styles.rewardStat}>
            <span className={styles.statCoinIcon}>V</span>
            <span className={styles.statText}>+{rewards.ves} VEs</span>
          </div>

          <div className={`${styles.multiplierStat} ${activeMultiplier > 1 ? styles.multiplierActive : ''}`}>
            <span className={styles.statRocketIcon}>🚀</span>
            <span className={styles.multiplierText}>{activeMultiplier}X Multiplier</span>
          </div>
        </div>
      </div>
    </div>
  )
}
