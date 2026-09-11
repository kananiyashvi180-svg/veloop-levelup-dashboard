import styles from './RewardsHero.module.css'

const floatingCoins = [
  { size: 22, top: '14%', left: '8%', delay: '0s', drift: 'driftA' },
  { size: 16, top: '28%', left: '3%', delay: '0.6s', drift: 'driftB' },
  { size: 24, top: '10%', right: '10%', delay: '0.3s', drift: 'driftA' },
  { size: 18, top: '30%', right: '5%', delay: '0.9s', drift: 'driftB' },
  { size: 14, top: '52%', left: '6%', delay: '1.2s', drift: 'driftA' },
  { size: 14, top: '48%', right: '7%', delay: '1.5s', drift: 'driftB' },
]

const floatingGems = [
  { size: 20, top: '18%', left: '18%', delay: '0.4s', drift: 'driftB' },
  { size: 14, top: '38%', left: '12%', delay: '1.1s', drift: 'driftA' },
  { size: 20, top: '22%', right: '18%', delay: '0.8s', drift: 'driftA' },
  { size: 16, top: '42%', right: '14%', delay: '1.6s', drift: 'driftB' },
]

function VeCoin({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" fill="url(#coinGrad)" stroke="#c47f00" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="13" fill="none" stroke="rgba(255,220,100,0.35)" strokeWidth="1" />
      <text x="18" y="23" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="900" fontSize="13" fill="#0d0e17">V</text>
      <defs>
        <radialGradient id="coinGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fed268" />
          <stop offset="55%" stopColor="#f5ba31" />
          <stop offset="100%" stopColor="#b8760a" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function PurpleGem({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon points="16,2 28,11 24,28 8,28 4,11" fill="url(#gemGrad)" stroke="rgba(167,139,250,0.6)" strokeWidth="0.8" />
      <polygon points="16,2 28,11 16,8" fill="rgba(220,210,255,0.3)" />
      <polygon points="16,8 28,11 16,28" fill="url(#gemGrad2)" />
      <defs>
        <linearGradient id="gemGrad" x1="4" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="gemGrad2" x1="16" y1="8" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(139,92,246,0.8)" />
          <stop offset="100%" stopColor="rgba(67,20,140,0.9)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function RewardsHero({ nextLevel = 5 }) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgGlowGold} />
      <div className={styles.bgGlowPurple} />

      {floatingCoins.map((c, i) => (
        <span
          key={`coin-${i}`}
          className={`${styles.floater} ${styles[c.drift]}`}
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            animationDelay: c.delay,
            opacity: 0.85,
          }}
        >
          <VeCoin size={c.size} />
        </span>
      ))}

      {floatingGems.map((g, i) => (
        <span
          key={`gem-${i}`}
          className={`${styles.floater} ${styles[g.drift]}`}
          style={{
            top: g.top,
            left: g.left,
            right: g.right,
            animationDelay: g.delay,
            opacity: 0.9,
          }}
        >
          <PurpleGem size={g.size} />
        </span>
      ))}

      <div className={styles.heroContent}>
        <div className={styles.topLabel}>
          <span className={styles.levelUpBadge}>
            <span className={styles.levelUpStar}>✦</span>
            MILESTONE
            <span className={styles.levelUpStar}>✦</span>
          </span>
        </div>

        <h1 className={styles.heading}>NEXT MILESTONE</h1>
        <p className={styles.subheading}>Unlock at</p>

        <div className={styles.badgeArea}>
          <div className={styles.badgePedestal} />
          <div className={styles.wingsLeft}>
            <svg width="70" height="52" viewBox="0 0 70 52" fill="none">
              <path d="M70 26 C55 10, 30 6, 4 14 C-4 17, 0 24, 8 22 C20 18, 42 16, 60 26 Z" fill="url(#wL)" />
              <path d="M70 26 C50 30, 28 36, 8 30 C2 28, 4 34, 12 34 C26 34, 50 32, 70 26 Z" fill="url(#wL2)" />
              <path d="M65 26 C50 22, 32 20, 14 24 L14 28 C32 26, 50 28, 65 26 Z" fill="rgba(245,186,49,0.15)" />
              <defs>
                <linearGradient id="wL" x1="0" y1="14" x2="70" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#b8760a" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#f5ba31" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fed268" />
                </linearGradient>
                <linearGradient id="wL2" x1="0" y1="26" x2="70" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8a5500" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e8960a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className={styles.hexContainer}>
            <div className={styles.hexGlowRing} />
            <div className={styles.hexOuter}>
              <div className={styles.hexInner}>
                <span className={styles.levelTag}>LEVEL</span>
                <span className={styles.levelNum}>{String(nextLevel).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <div className={styles.wingsRight}>
            <svg width="70" height="52" viewBox="0 0 70 52" fill="none">
              <path d="M0 26 C15 10, 40 6, 66 14 C74 17, 70 24, 62 22 C50 18, 28 16, 10 26 Z" fill="url(#wR)" />
              <path d="M0 26 C20 30, 42 36, 62 30 C68 28, 66 34, 58 34 C44 34, 20 32, 0 26 Z" fill="url(#wR2)" />
              <path d="M5 26 C20 22, 38 20, 56 24 L56 28 C38 26, 20 28, 5 26 Z" fill="rgba(245,186,49,0.15)" />
              <defs>
                <linearGradient id="wR" x1="70" y1="14" x2="0" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#b8760a" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#f5ba31" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fed268" />
                </linearGradient>
                <linearGradient id="wR2" x1="70" y1="26" x2="0" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8a5500" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e8960a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
