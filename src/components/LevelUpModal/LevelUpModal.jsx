import { useState, useEffect } from 'react'
import styles from './LevelUpModal.module.css'

export default function LevelUpModal({ isOpen, onClose, level = 5, onClaim }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (isOpen) {
      const generated = Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 80 + 10}%`,
        color: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#38bdf8', '#fbbf24'][i % 6],
        size: Math.random() * 8 + 6,
        delay: `${Math.random() * 0.5}s`,
        duration: `${Math.random() * 1.5 + 1.2}s`,
      }))
      setParticles(generated)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Confetti Particles */}
        <div className={styles.particleContainer}>
          {particles.map((p) => (
            <span
              key={p.id}
              className={styles.particle}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: p.color,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className={styles.topBadge}>
          <span className={styles.sparkle}>✦</span>
          <span>LEVEL UP CELEBRATION</span>
          <span className={styles.sparkle}>✦</span>
        </div>

        <div className={styles.badgeArea}>
          <div className={styles.outerAura} />
          <div className={styles.hexShield}>
            <span className={styles.shieldLvl}>LEVEL</span>
            <span className={styles.shieldNum}>{String(level).padStart(2, '0')}</span>
          </div>
        </div>

        <h2 className={styles.congratsTitle}>CONGRATULATIONS!</h2>
        <p className={styles.congratsDesc}>
          You have achieved <strong>Level {String(level).padStart(2, '0')} Vanguard Master</strong>!
          Your dedication unlocked new VIP tier perks and reward bonuses.
        </p>

        {/* Milestone Rewards Card */}
        <div className={styles.rewardBox}>
          <div className={styles.rewardHeader}>
            <span>🎁 UNLOCKED MILESTONE REWARDS</span>
          </div>
          <div className={styles.rewardRow}>
            <div className={styles.rewardItem}>
              <span className={styles.rewardIcon}>🪙</span>
              <div>
                <span className={styles.rewardVal}>+500 VEs</span>
                <span className={styles.rewardSub}>Added to Balance</span>
              </div>
            </div>
            <div className={styles.rewardItem}>
              <span className={styles.rewardIcon}>💎</span>
              <div>
                <span className={styles.rewardVal}>+25 Gems</span>
                <span className={styles.rewardSub}>Rare Boosters</span>
              </div>
            </div>
            <div className={styles.rewardItem}>
              <span className={styles.rewardIcon}>⚡</span>
              <div>
                <span className={styles.rewardVal}>1.5X Multiplier</span>
                <span className={styles.rewardSub}>48h Duration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.claimBtn}
            onClick={() => {
              if (onClaim) onClaim()
              onClose()
            }}
            id="level-up-claim-btn"
          >
            Claim Rewards &amp; Continue
          </button>
        </div>
      </div>
    </div>
  )
}
