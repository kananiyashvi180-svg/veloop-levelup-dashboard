import React from 'react'
import {
  Gamepad2,
  Play,
  Zap,
  Coins,
  Gem,
  Timer,
  Target,
  Gift,
  Flame,
  MousePointer,
  Smartphone,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import styles from './GameStart.module.css'

const COLLECTIBLES = [
  {
    type: 'xp-orb',
    name: 'XP Orb',
    reward: '+10 XP',
    desc: 'Multiplied by streak combo',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    svg: (
      <svg width="44" height="44" viewBox="0 0 48 48">
        <defs>
          <radialGradient id="startOrbGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f5d0fe" />
            <stop offset="40%" stopColor="#c084fc" />
            <stop offset="85%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#startOrbGrad)" stroke="#e9d5ff" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.55)" transform="rotate(-25 17 14)" />
        <text x="24" y="29" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="13" fill="#ffffff" letterSpacing="0.5">XP</text>
      </svg>
    ),
  },
  {
    type: 've-coin',
    name: 'VE Coin',
    reward: '+5 VEs',
    desc: 'Score & progression currency',
    color: '#fde047',
    glowColor: 'rgba(253, 224, 71, 0.45)',
    svg: (
      <svg width="44" height="44" viewBox="0 0 48 48">
        <defs>
          <radialGradient id="startCoinGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#startCoinGrad)" stroke="#fef08a" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.6)" transform="rotate(-25 17 14)" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize="17" fill="#713f12" letterSpacing="0.5">V</text>
      </svg>
    ),
  },
  {
    type: 'gem',
    name: 'Rare Gem',
    reward: '+2 Gems',
    desc: 'High value multiplier booster',
    color: '#4ade80',
    glowColor: 'rgba(74, 222, 128, 0.45)',
    svg: (
      <svg width="44" height="44" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="startGemTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="startGemLeft" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="startGemRight" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>
        <polygon points="24,3 43,14 43,34 24,45 5,34 5,14" fill="#15803d" stroke="#86efac" strokeWidth="1.8" />
        <polygon points="24,3 43,14 24,20 5,14" fill="url(#startGemTop)" />
        <polygon points="5,14 24,20 24,45 5,34" fill="url(#startGemLeft)" />
        <polygon points="43,14 24,20 24,45 43,34" fill="url(#startGemRight)" />
        <circle cx="20" cy="11" r="2.2" fill="rgba(255,255,255,0.85)" />
      </svg>
    ),
  },
]

export default function GameStart({ onStart }) {
  return (
    <div className={styles.lobbyContainer}>
      {/* Background Ambience & Lighting */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />

      {/* 1. Header & Title Banner */}
      <div className={styles.headerSection}>
        <div className={styles.modeBadge}>
          <Gamepad2 size={15} className={styles.badgeIcon} aria-hidden="true" />
          <span>VELOOP ARCADE • MINI-GAME</span>
          <span className={styles.livePulseDot} />
        </div>

        <h1 className={styles.heroTitle}>XP CATCHER</h1>
        <p className={styles.heroSubtitle}>
          Catch falling XP Orbs, VE Coins &amp; Gems before the 20s timer expires!
        </p>
      </div>

      {/* 2. Interactive Arena Preview with Basket & Collectibles */}
      <div className={styles.arenaPreviewCard}>
        {/* Floating Collectibles Showcase Grid */}
        <div className={styles.collectiblesGrid}>
          {COLLECTIBLES.map((item) => (
            <div key={item.name} className={styles.collectibleCard}>
              <div
                className={styles.collectibleIconHolder}
                style={{ filter: `drop-shadow(0 0 14px ${item.glowColor})` }}
              >
                {item.svg}
              </div>
              <div className={styles.collectibleInfo}>
                <span className={styles.collectibleName}>{item.name}</span>
                <span className={styles.collectibleReward} style={{ color: item.color }}>
                  {item.reward}
                </span>
                <span className={styles.collectibleDesc}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Holographic Center Catcher Showcase */}
        <div className={styles.catcherStage}>
          <div className={styles.catcherPlatformBeam} />
          <div className={styles.basketContainer}>
            <svg viewBox="0 0 170 92" className={styles.basketSvg}>
              <defs>
                <linearGradient id="startRimGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="30%" stopColor="#c084fc" />
                  <stop offset="70%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
                <linearGradient id="startNetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(240,171,252,0.85)" />
                  <stop offset="60%" stopColor="rgba(168,85,247,0.55)" />
                  <stop offset="100%" stopColor="rgba(124,58,237,0.25)" />
                </linearGradient>
              </defs>

              <ellipse cx="85" cy="14" rx="76" ry="11" fill="rgba(15,12,38,0.85)" />

              <path d="M 16 14 Q 50 54 58 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 33 14 Q 60 54 67 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 52 14 Q 72 54 76 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 72 14 Q 82 54 85 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 98 14 Q 88 54 85 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 118 14 Q 98 54 94 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 137 14 Q 110 54 103 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />
              <path d="M 154 14 Q 120 54 112 82" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.6" />

              <path d="M 22 30 Q 85 40 148 30" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.4" />
              <path d="M 32 48 Q 85 59 138 48" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.4" />
              <path d="M 44 65 Q 85 76 126 65" fill="none" stroke="url(#startNetGrad)" strokeWidth="1.4" />

              <ellipse cx="85" cy="82" rx="28" ry="5.5" fill="none" stroke="url(#startRimGrad)" strokeWidth="4.5" />
              <ellipse cx="85" cy="14" rx="78" ry="11" fill="none" stroke="url(#startRimGrad)" strokeWidth="6.5" />
              <ellipse cx="85" cy="12.5" rx="77" ry="10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            </svg>
            <div className={styles.basketEnergyHalo} />
          </div>

          <span className={styles.basketLabel}>PLAYER CATCHER PLATFORM</span>
        </div>

        {/* 3. Multiplier & Combo Progression Track */}
        <div className={styles.multiplierBanner}>
          <div className={styles.multHeader}>
            <Flame size={16} className={styles.flameIcon} aria-hidden="true" />
            <span className={styles.multBannerTitle}>COMBO STREAK BOOSTERS</span>
            <span className={styles.multBannerDesc}>Catch consecutive items without dropping</span>
          </div>

          <div className={styles.multiplierSteps}>
            <div className={`${styles.multStep} ${styles.multStepActive}`}>
              <span className={styles.multStepVal}>2X</span>
              <span className={styles.multStepTag}>START</span>
              <span className={styles.multStepSub}>Immediate Base</span>
            </div>

            <div className={styles.multStepConnector}>
              <Zap size={14} className={styles.connectorIcon} aria-hidden="true" />
            </div>

            <div className={styles.multStep}>
              <span className={styles.multStepVal}>3X</span>
              <span className={styles.multStepTag}>5 STREAK</span>
              <span className={styles.multStepSub}>+50% Bonus</span>
            </div>

            <div className={styles.multStepConnector}>
              <Zap size={14} className={styles.connectorIcon} aria-hidden="true" />
            </div>

            <div className={`${styles.multStep} ${styles.multStepMax}`}>
              <span className={styles.multStepVal}>4X</span>
              <span className={styles.multStepTag}>10 STREAK</span>
              <span className={styles.multStepSub}>MAXIMUM POWER</span>
            </div>
          </div>
        </div>

        {/* 4. Quick Rule Badges */}
        <div className={styles.rulesChipsRow}>
          <div className={styles.ruleChip}>
            <Timer size={14} className={styles.chipIconGold} aria-hidden="true" />
            <span>20 Seconds Session</span>
          </div>
          <div className={styles.ruleChip}>
            <Zap size={14} className={styles.chipIconPurple} aria-hidden="true" />
            <span>Start at 2X Multiplier</span>
          </div>
          <div className={styles.ruleChip}>
            <Target size={14} className={styles.chipIconBlue} aria-hidden="true" />
            <span>Skill-Based Physics</span>
          </div>
          <div className={styles.ruleChip}>
            <Gift size={14} className={styles.chipIconGreen} aria-hidden="true" />
            <span>Direct XP &amp; VE Payout</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Action Area (Gold Start CTA & Control Instructions) */}
      <div className={styles.ctaFooter}>
        <button
          className={styles.startBtn}
          type="button"
          onClick={onStart}
          id="xp-catcher-start-game"
        >
          <span className={styles.startBtnShimmer} />
          <Play size={20} fill="currentColor" aria-hidden="true" />
          <span className={styles.startBtnText}>START GAME</span>
        </button>

        {/* Instructions & Controls Bar */}
        <div className={styles.controlsBar}>
          <span className={styles.controlsInstruction}>Catch falling rewards before the timer ends.</span>
          <div className={styles.controlPills}>
            <span className={styles.controlPill}>
              <MousePointer size={12} aria-hidden="true" /> Mouse
            </span>
            <span className={styles.controlSeparator}>•</span>
            <span className={styles.controlPill}>
              <Smartphone size={12} aria-hidden="true" /> Touch
            </span>
            <span className={styles.controlSeparator}>•</span>
            <span className={styles.controlPill}>
              <ArrowLeftRight size={12} aria-hidden="true" /> Arrow Keys
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
