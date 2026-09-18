import { useState, useEffect } from 'react'
import { getLevelConfig } from '../../data/levelConfig'
import { Gift, Coins, Gem, Zap, Star } from 'lucide-react'
import LevelBadge from '../LevelBadge/LevelBadge'
import styles from './LevelUpModal.module.css'

export default function LevelUpModal({ isOpen, onClose, level = 5, onClaim }) {
  const [particles, setParticles] = useState([])

  const config = getLevelConfig(level)
  const vesAmount = config?.reward?.amount || 500
  const gemsAmount = config?.reward?.gems || 25

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
          <Star size={13} className={styles.sparkleIcon} aria-hidden="true" />
          <span>LEVEL UP CELEBRATION</span>
          <Star size={13} className={styles.sparkleIcon} aria-hidden="true" />
        </div>

        <div className={styles.badgeArea}>
          <LevelBadge level={level} size="large" showGlow={true} />
        </div>

        <h2 className={styles.congratsTitle}>CONGRATULATIONS!</h2>
        <p className={styles.congratsDesc}>
          You have achieved <strong>Level {String(level).padStart(2, '0')} {config.name}</strong>!
          Your dedication unlocked new VIP tier perks and reward bonuses.
        </p>

        <div className={styles.rewardBox}>
          <div className={styles.rewardHeader}>
            <Gift size={14} aria-hidden="true" />
            <span>UNLOCKED MILESTONE REWARDS</span>
          </div>
          <div className={styles.rewardRow}>
            <div className={styles.rewardItem}>
              <div className={styles.rewardIconWrap} style={{ background: 'rgba(245,186,49,0.15)', border: '1px solid rgba(245,186,49,0.35)' }}>
                <Coins size={20} color="#f5ba31" aria-hidden="true" />
              </div>
              <div>
                <span className={styles.rewardVal}>+{vesAmount} VEs</span>
                <span className={styles.rewardSub}>Added to Balance</span>
              </div>
            </div>
            <div className={styles.rewardItem}>
              <div className={styles.rewardIconWrap} style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)' }}>
                <Gem size={20} color="#a78bfa" aria-hidden="true" />
              </div>
              <div>
                <span className={styles.rewardVal}>+{gemsAmount} Gems</span>
                <span className={styles.rewardSub}>Rare Boosters</span>
              </div>
            </div>
            <div className={styles.rewardItem}>
              <div className={styles.rewardIconWrap} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)' }}>
                <Zap size={20} color="#10b981" aria-hidden="true" />
              </div>
              <div>
                <span className={styles.rewardVal}>1.5X Multiplier</span>
                <span className={styles.rewardSub}>48h Duration</span>
              </div>
            </div>
          </div>
        </div>

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
