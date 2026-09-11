import styles from './GameStart.module.css'

const objectTypes = [
  {
    type: 'xp-orb',
    color: '#c084fc',
    label: 'XP Orb',
    reward: '+10 XP',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#7c3aed" stroke="#c084fc" strokeWidth="2.5" />
        <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.4)" />
        <text x="24" y="29" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="900" fontSize="13" fill="#ffffff">XP</text>
      </svg>
    ),
  },
  {
    type: 've-coin',
    color: '#fde047',
    label: 'VE Coin',
    reward: '+5 VEs',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#d97706" stroke="#fde047" strokeWidth="2.5" />
        <ellipse cx="17" cy="14" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.4)" />
        <text x="24" y="30" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="900" fontSize="17" fill="#713f12">V</text>
      </svg>
    ),
  },
  {
    type: 'gem',
    color: '#4ade80',
    label: 'Gem',
    reward: '+2 Gems',
    svg: (
      <svg width="36" height="36" viewBox="0 0 48 48">
        <polygon points="24,3 43,14 43,34 24,45 5,34 5,14" fill="#16a34a" stroke="#86efac" strokeWidth="1.8" />
        <polygon points="24,3 43,14 24,20 5,14" fill="#4ade80" />
        <polygon points="5,14 24,20 24,45 5,34" fill="#15803d" />
        <polygon points="43,14 24,20 24,45 43,34" fill="#14532d" />
      </svg>
    ),
  },
]

export default function GameStart({ onStart }) {
  return (
    <div className={styles.container}>
      <div className={styles.heroCenter}>
        <div className={styles.basketPreview}>
          <svg viewBox="0 0 170 92" className={styles.previewBasketSvg}>
            <defs>
              <linearGradient id="startRim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#f5ba31" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
            <ellipse cx="85" cy="14" rx="76" ry="11" fill="rgba(15,12,8,0.7)" />
            <path d="M 22 30 Q 85 40 148 30" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.4" />
            <path d="M 32 48 Q 85 59 138 48" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.4" />
            <ellipse cx="85" cy="82" rx="28" ry="5.5" fill="none" stroke="url(#startRim)" strokeWidth="4" />
            <ellipse cx="85" cy="14" rx="78" ry="11" fill="none" stroke="url(#startRim)" strokeWidth="6" />
          </svg>
          <div className={styles.previewGlow} />
        </div>

        <p className={styles.missionText}>
          Catch falling objects to earn XP, V-Coins, and Gems before the 20s timer expires!
        </p>
      </div>

      <div className={styles.objectsGrid}>
        {objectTypes.map((obj) => (
          <div key={obj.label} className={styles.objectCard}>
            <div className={styles.svgHolder} style={{ filter: `drop-shadow(0 0 10px ${obj.color}55)` }}>
              {obj.svg}
            </div>
            <span className={styles.objName}>{obj.label}</span>
            <span className={styles.objReward} style={{ color: obj.color }}>{obj.reward}</span>
          </div>
        ))}
      </div>

      <div className={styles.bonusBadge}>
        <span className={styles.bonusRocket}>🚀</span>
        <span className={styles.bonusText}>
          Catch streaks without missing to unlock <strong>2X, 3X &amp; 4X Multipliers</strong>!
        </span>
      </div>

      <div className={styles.footerActions}>
        <button
          className={styles.startBtn}
          type="button"
          onClick={onStart}
          id="xp-catcher-start-game"
        >
          <span className={styles.startShimmer} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          START GAME
        </button>

        <p className={styles.controlsHint}>
          Mouse, Touch, or ◄ ► Arrow Keys to move
        </p>
      </div>
    </div>
  )
}
