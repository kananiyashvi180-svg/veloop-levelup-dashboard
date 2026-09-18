import { useEffect, useRef, useCallback, useState } from 'react'
import { Trophy, Timer, Zap, Coins, Gem, Flame, Pause, Play } from 'lucide-react'
import { playSound } from '../utils/gameAudio'
import { getLevelConfig } from '../../../data/levelConfig'
import styles from './GamePlay.module.css'

const OBJECT_SIZE = 48

const OBJECT_TYPES = [
  { type: 'xp-orb', color: '#c084fc', glowColor: 'rgba(192, 132, 252, 0.7)', points: 10 },
  { type: 've-coin', color: '#fde047', glowColor: 'rgba(253, 224, 71, 0.7)', points: 15 },
  { type: 'gem', color: '#4ade80', glowColor: 'rgba(74, 222, 128, 0.7)', points: 20 },
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function formatTimer(s) {
  const mins = Math.floor(s / 60).toString().padStart(2, '0')
  const secs = (s % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

function buildXPOrb() {
  return `
    <div class="${styles.objectTrail}" style="background: linear-gradient(to top, rgba(192, 132, 252, 0.6) 0%, transparent 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <radialGradient id="playXpGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#f5d0fe"/>
          <stop offset="40%" stop-color="#c084fc"/>
          <stop offset="85%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#4c1d95"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#playXpGrad)" stroke="#e9d5ff" stroke-width="2.2"/>
      <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.55)" transform="rotate(-25 17 14)"/>
      <text x="24" y="29" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="0.5">XP</text>
    </svg>
  `
}

function buildVECoin() {
  return `
    <div class="${styles.objectTrail}" style="background: linear-gradient(to top, rgba(245, 184, 46, 0.6) 0%, transparent 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <radialGradient id="playCoinGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="45%" stop-color="#f59e0b"/>
          <stop offset="85%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#playCoinGrad)" stroke="#fef08a" stroke-width="2.2"/>
      <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
      <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.6)" transform="rotate(-25 17 14)"/>
      <text x="24" y="30" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="17" fill="#713f12" letter-spacing="0.5">V</text>
    </svg>
  `
}

function buildGem() {
  return `
    <div class="${styles.objectTrail}" style="background: linear-gradient(to top, rgba(74, 222, 128, 0.6) 0%, transparent 100%);"></div>
    <svg width="${OBJECT_SIZE}" height="${OBJECT_SIZE}" viewBox="0 0 48 48" class="${styles.objectSvg}">
      <defs>
        <linearGradient id="playGemTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#bbf7d0"/>
          <stop offset="100%" stop-color="#4ade80"/>
        </linearGradient>
        <linearGradient id="playGemLeft" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
        <linearGradient id="playGemRight" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#16a34a"/>
          <stop offset="100%" stop-color="#14532d"/>
        </linearGradient>
      </defs>
      <polygon points="24,3 43,14 43,34 24,45 5,34 5,14" fill="#15803d" stroke="#86efac" stroke-width="1.8"/>
      <polygon points="24,3 43,14 24,20 5,14" fill="url(#playGemTop)"/>
      <polygon points="5,14 24,20 24,45 5,34" fill="url(#playGemLeft)"/>
      <polygon points="43,14 24,20 24,45 43,34" fill="url(#playGemRight)"/>
      <circle cx="20" cy="11" r="2.2" fill="rgba(255,255,255,0.85)"/>
    </svg>
  `
}

function buildObjectHTML(def) {
  if (def.type === 'xp-orb') return buildXPOrb()
  if (def.type === 've-coin') return buildVECoin()
  return buildGem()
}

export default function GamePlay({
  duration = 20,
  rewards,
  isMuted,
  currentLevel = 4,
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
  const bestStreakRef = useRef(0)
  const itemsCaughtRef = useRef(0)
  const maxMultiplierRef = useRef(2)
  const rewardsRef = useRef({ score: 0, xp: 0, ves: 0, gems: 0 })

  const [activeMultiplier, setActiveMultiplier] = useState(2)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [displaySeconds, setDisplaySeconds] = useState(duration)

  const levelConfig = getLevelConfig(currentLevel)
  const difficulty = levelConfig.gameDifficulty || { speedMin: 2.5, speedMax: 3.5, spawnInterval: 800 }

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
    const count = 9
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
      const dist = 26 + Math.random() * 28
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      const size = 3 + Math.random() * 4

      p.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 10px ${color};
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
    pop.style.textShadow = `0 0 14px ${color}`
    arenaRef.current.appendChild(pop)
    setTimeout(() => {
      if (pop.parentNode) pop.remove()
    }, 850)
  }, [])

  const spawnObject = useCallback(() => {
    if (!arenaRef.current || !activeRef.current) return
    const arenaW = arenaRef.current.clientWidth
    const margin = OBJECT_SIZE + 8
    const x = margin + Math.random() * Math.max(10, arenaW - margin * 2)
    const timeElapsed = duration - timeLeftRef.current
    const isLate = timeElapsed > 8
    const speedMin = isLate ? difficulty.speedMin * 1.35 : difficulty.speedMin * 1.15
    const speedMax = isLate ? difficulty.speedMax * 1.35 : difficulty.speedMax * 1.15
    const speed = speedMin + Math.random() * (speedMax - speedMin)
    const def = pickRandom(OBJECT_TYPES)

    const wrapper = document.createElement('div')
    wrapper.className = styles.fallingObject
    wrapper.style.left = `${x}px`
    wrapper.style.top = `${-OBJECT_SIZE - 20}px`
    wrapper.innerHTML = buildObjectHTML(def)

    arenaRef.current.appendChild(wrapper)
    objectsRef.current.push({ el: wrapper, y: -(OBJECT_SIZE + 20), speed, def, x })
  }, [duration, difficulty])

  const startSpawner = useCallback(() => {
    const getInterval = () =>
      duration - timeLeftRef.current > 8
        ? difficulty.spawnInterval * 0.68
        : difficulty.spawnInterval * 0.85

    const scheduleNext = () => {
      if (!activeRef.current) return
      spawnObject()
      spawnRef.current = setTimeout(scheduleNext, getInterval())
    }

    spawnRef.current = setTimeout(scheduleNext, 180)
  }, [duration, difficulty, spawnObject])

  const gameLoop = useCallback(() => {
    if (!activeRef.current || !arenaRef.current || !catcherRef.current) return

    if (keysPressedRef.current.ArrowLeft || keysPressedRef.current.a || keysPressedRef.current.A) {
      keyVelocityRef.current = -9.5
    } else if (keysPressedRef.current.ArrowRight || keysPressedRef.current.d || keysPressedRef.current.D) {
      keyVelocityRef.current = 9.5
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

      const hitH = objBottom >= catcherRect.top && objTop <= catcherRect.top + 36
      const hitV = objRight >= catcherRect.left + 12 && objLeft <= catcherRect.right - 12

      if (hitH && hitV) {
        toRemove.push(obj)
        itemsCaughtRef.current += 1
        comboRef.current += 1
        setCurrentStreak(comboRef.current)
        if (comboRef.current > bestStreakRef.current) {
          bestStreakRef.current = comboRef.current
        }

        let currentMult = 2
        if (comboRef.current >= 10) currentMult = 4
        else if (comboRef.current >= 5) currentMult = 3

        if (currentMult > maxMultiplierRef.current) {
          maxMultiplierRef.current = currentMult
          playSound('multiplier', isMuted)
        }
        setActiveMultiplier(currentMult)

        const earnedPoints = obj.def.points * currentMult
        playSound(obj.def.type, isMuted)
        spawnParticles(cx, obj.y + OBJECT_SIZE / 2, obj.def.color)

        const badgeText =
          obj.def.type === 'xp-orb'
            ? `+${earnedPoints} XP`
            : obj.def.type === 've-coin'
            ? `+${earnedPoints} VEs`
            : `+${earnedPoints} Gems`

        showPop(cx, obj.y - 12, badgeText, obj.def.color)
        onCatch(obj.def.type, currentMult)
      } else if (obj.y > arenaH + 30) {
        toRemove.push(obj)
        if (comboRef.current > 0) {
          comboRef.current = 0
          setCurrentStreak(0)
          setActiveMultiplier(2)
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
    if (!arenaRef.current || !activeRef.current) return
    const rect = arenaRef.current.getBoundingClientRect()
    catcherXRef.current = e.clientX - rect.left
    syncCatcherPos()
  }, [syncCatcherPos])

  const handleTouchStart = useCallback((e) => {
    if (!arenaRef.current || !activeRef.current) return
    const rect = arenaRef.current.getBoundingClientRect()
    if (e.touches && e.touches[0]) {
      catcherXRef.current = e.touches[0].clientX - rect.left
      syncCatcherPos()
    }
  }, [syncCatcherPos])

  const handleTouchMove = useCallback((e) => {
    if (!arenaRef.current || !activeRef.current) return
    e.preventDefault()
    const rect = arenaRef.current.getBoundingClientRect()
    if (e.touches && e.touches[0]) {
      catcherXRef.current = e.touches[0].clientX - rect.left
      syncCatcherPos()
    }
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
    setDisplaySeconds(duration)
    comboRef.current = 0
    setCurrentStreak(0)
    bestStreakRef.current = 0
    itemsCaughtRef.current = 0
    maxMultiplierRef.current = 2
    objectsRef.current = []
    rewardsRef.current = { score: 0, xp: 0, ves: 0, gems: 0 }

    if (arenaRef.current) {
      catcherXRef.current = arenaRef.current.clientWidth / 2
      syncCatcherPos()
    }

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1
      setDisplaySeconds(timeLeftRef.current)
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
          itemsCaught: itemsCaughtRef.current,
          bestStreak: bestStreakRef.current,
          duration
        }
        setTimeout(() => onGameOver(snapshot), 350)
      }
    }, 1000)

    startSpawner()
    rafRef.current = requestAnimationFrame(gameLoop)

    const arena = arenaRef.current
    if (arena) {
      arena.addEventListener('mousemove', handleMouseMove)
      arena.addEventListener('touchstart', handleTouchStart, { passive: false })
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
        arena.removeEventListener('touchstart', handleTouchStart)
        arena.removeEventListener('touchmove', handleTouchMove)
      }
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    duration,
    gameLoop,
    handleKeyDown,
    handleKeyUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    isMuted,
    onGameOver,
    onTimerTick,
    startSpawner,
    syncCatcherPos
  ])

  useEffect(() => {
    rewardsRef.current = rewards
  }, [rewards])

  const togglePause = () => {
    setIsPaused((p) => {
      const next = !p
      activeRef.current = !next
      if (!next) {
        rafRef.current = requestAnimationFrame(gameLoop)
      }
      return next
    })
  }

  return (
    <div className={styles.arenaMasterWrapper}>
      {/* 1. Integrated Game Arena HUD (Score, 2X/3X/4X Multipliers, Countdown Timer) */}
      <div className={styles.hudBar}>
        {/* LEFT: Score + Trophy */}
        <div className={styles.hudLeftScore}>
          <div className={styles.trophyWrap}>
            <Trophy size={18} className={styles.trophyIcon} aria-hidden="true" />
          </div>
          <div className={styles.scoreMeta}>
            <span className={styles.hudLabel}>SCORE</span>
            <strong className={styles.scoreVal}>{rewards.score.toLocaleString()}</strong>
          </div>
          {currentStreak > 1 && (
            <div className={styles.streakTag}>
              <Flame size={12} className={styles.streakFlame} aria-hidden="true" />
              <span>{currentStreak} STREAK</span>
            </div>
          )}
        </div>

        {/* CENTER: 2X / 3X / 4X Multipliers */}
        <div className={styles.hudCenterMultipliers}>
          <div
            className={`${styles.multBadge} ${
              activeMultiplier === 2 ? styles.multActive2X : styles.multDimmed
            }`}
          >
            <span className={styles.multVal}>2X</span>
            <span className={styles.multSub}>BASE</span>
          </div>

          <div
            className={`${styles.multBadge} ${
              activeMultiplier === 3 ? styles.multActive3X : styles.multDimmed
            }`}
          >
            <span className={styles.multVal}>3X</span>
            <span className={styles.multSub}>5 STREAK</span>
          </div>

          <div
            className={`${styles.multBadge} ${
              activeMultiplier === 4 ? styles.multActive4X : styles.multDimmed
            }`}
          >
            <span className={styles.multVal}>4X</span>
            <span className={styles.multSub}>MAX POWER</span>
          </div>
        </div>

        {/* RIGHT: Timer & Pause Button */}
        <div className={styles.hudRightTimer}>
          <div
            className={`${styles.hudTimerBox} ${
              displaySeconds <= 5 ? styles.hudTimerUrgent : ''
            }`}
          >
            <Timer size={16} aria-hidden="true" />
            <span className={styles.hudTimerDigits}>{formatTimer(displaySeconds)}</span>
          </div>

          <button
            type="button"
            className={styles.hudPauseBtn}
            onClick={togglePause}
            aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>

      {/* 2. Secondary Mini Loot Counters (XP, VEs, Gems) */}
      <div className={styles.lootPillsRow}>
        <div className={`${styles.lootPill} ${styles.lootXp}`}>
          <Zap size={13} aria-hidden="true" />
          <span>+{rewards.xp} XP</span>
        </div>
        <div className={`${styles.lootPill} ${styles.lootVes}`}>
          <Coins size={13} aria-hidden="true" />
          <span>+{rewards.ves} VEs</span>
        </div>
        <div className={`${styles.lootPill} ${styles.lootGems}`}>
          <Gem size={13} aria-hidden="true" />
          <span>+{rewards.gems} Gems</span>
        </div>
      </div>

      {/* 3. Main Dedicated Interactive Game Arena */}
      <div
        ref={arenaRef}
        className={styles.gameArena}
        id="xp-catcher-arena"
      >
        {/* Subtle Ambient Cosmic Arena Background */}
        <div className={styles.arenaBackdropGlow} />
        <div className={styles.arenaBeamLeft} />
        <div className={styles.arenaBeamRight} />

        {/* Pause Overlay */}
        {isPaused && (
          <div className={styles.pauseOverlay}>
            <div className={styles.pauseCard}>
              <h3>GAME PAUSED</h3>
              <p>Take a breath and continue when ready</p>
              <button
                type="button"
                className={styles.resumeBtn}
                onClick={togglePause}
              >
                <Play size={16} fill="currentColor" /> Resume
              </button>
            </div>
          </div>
        )}

        {/* Floor Magnetic Rings (Follows Catcher) */}
        <div ref={floorRingsRef} className={styles.floorRings}>
          <svg viewBox="0 0 160 40" className={styles.ringsSvg}>
            <ellipse cx="80" cy="20" rx="74" ry="14" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.2" />
            <ellipse cx="80" cy="20" rx="52" ry="10" fill="none" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.2" />
            <ellipse cx="80" cy="20" rx="30" ry="6" fill="none" stroke="rgba(245, 184, 46, 0.65)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Futuristic Catcher Basket Platform */}
        <div ref={catcherRef} className={styles.catcher}>
          <svg
            className={styles.basketSvg}
            viewBox="0 0 170 92"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="catcherRimGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#c084fc" />
                <stop offset="70%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="catcherNetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(240,171,252,0.9)" />
                <stop offset="60%" stopColor="rgba(168,85,247,0.6)" />
                <stop offset="100%" stopColor="rgba(124,58,237,0.3)" />
              </linearGradient>
            </defs>

            <ellipse cx="85" cy="14" rx="76" ry="11" fill="rgba(15,12,38,0.85)" />

            <path d="M 16 14 Q 50 54 58 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 33 14 Q 60 54 67 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 52 14 Q 72 54 76 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 72 14 Q 82 54 85 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 98 14 Q 88 54 85 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 118 14 Q 98 54 94 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 137 14 Q 110 54 103 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />
            <path d="M 154 14 Q 120 54 112 82" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.6" />

            <path d="M 22 30 Q 85 40 148 30" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.4" />
            <path d="M 32 48 Q 85 59 138 48" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.4" />
            <path d="M 44 65 Q 85 76 126 65" fill="none" stroke="url(#catcherNetGrad)" strokeWidth="1.4" />

            <ellipse cx="85" cy="82" rx="28" ry="5.5" fill="none" stroke="url(#catcherRimGrad)" strokeWidth="4.5" />
            <ellipse cx="85" cy="14" rx="78" ry="11" fill="none" stroke="url(#catcherRimGrad)" strokeWidth="6.5" />
            <ellipse cx="85" cy="12.5" rx="77" ry="10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* 4. Bottom Controls & Helper Strip */}
      <footer className={styles.bottomHelpStrip}>
        <span className={styles.helpText}>
          Move catcher with Mouse, Touch, or ◄ ► Arrow Keys to catch items and maintain combos!
        </span>
      </footer>
    </div>
  )
}
