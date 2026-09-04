import { Zap, Flame, ArrowUpRight } from 'lucide-react'
import styles from './XPProgress.module.css'

export default function XPProgress({ progression, onBoost }) {
  const { currentXp, requiredXp, xpRemaining, xpPercentage, nextLevel } = progression

  return (
    <div className={styles.progressContainer}>
      <div className={styles.statsHeader}>
        <div className={styles.labelGroup}>
          <span className={styles.progressLabel}>
            <Zap size={14} color="var(--accent-gold)" /> Progression Path
          </span>
          <div className={styles.xpNumbers}>
            <span className={styles.currentXpVal}>{currentXp.toLocaleString()}</span>
            <span className={styles.requiredXpVal}>/ {requiredXp.toLocaleString()} XP</span>
          </div>
        </div>

        <div className={styles.percentageBadge} title="XP progress towards next tier">
          <Flame size={14} color="var(--accent-blue-soft)" />
          <span>{xpPercentage}% Complete</span>
        </div>
      </div>

      <div className={styles.trackWrapper}>
        <div
          className={styles.progressBarTrack}
          role="progressbar"
          aria-valuenow={currentXp}
          aria-valuemin={0}
          aria-valuemax={requiredXp}
          aria-label="XP Level Progress"
        >
          <div
            className={styles.progressBarFill}
            style={{ width: `${Math.min(100, Math.max(0, xpPercentage))}%` }}
          >
            <div className={styles.shimmerOverlay} />
          </div>
        </div>
      </div>

      <div className={styles.statsFooter}>
        <div className={styles.remainingText}>
          <span>Remaining:</span>
          <strong className={styles.remainingHighlight}>{xpRemaining.toLocaleString()} XP</strong>
          <span>to Level {String(nextLevel).padStart(2, '0')}</span>
        </div>

        <div className={styles.actionRow}>
          {onBoost && (
            <button
              type="button"
              className={styles.boostButton}
              onClick={() => onBoost(100, 'Micro Boost', 'Challenge')}
              title="Add 100 XP to test progression animation"
            >
              <ArrowUpRight size={13} />
              +100 XP Boost
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
