import { Gift, CheckCircle2, Lock, Sparkles } from 'lucide-react'
import styles from './LevelRewardCard.module.css'

export default function LevelRewardCard({ reward, nextLevel, xpPercentage }) {
  return (
    <div className={styles.rewardCard}>
      <div className={styles.cardGlowBadge}>
        <span>Level {String(nextLevel).padStart(2, '0')} Target</span>
      </div>

      <div className={styles.rewardHeader}>
        <div className={styles.iconBox}>
          <Gift size={28} />
        </div>
        <div className={styles.headerText}>
          <span className={styles.subTitle}>Unlockable Milestone Reward</span>
          <h3 className={styles.rewardAmount}>{reward.label}</h3>
        </div>
      </div>

      <p className={styles.description}>{reward.description}</p>

      <div className={styles.perksList}>
        <div className={styles.perkItem}>
          <CheckCircle2 size={14} className={styles.perkIcon} />
          <span>Instant {reward.amount} VEs credited directly to wallet</span>
        </div>
        <div className={styles.perkItem}>
          <CheckCircle2 size={14} className={styles.perkIcon} />
          <span>Exclusive "Master" Discord & profile badge unlock</span>
        </div>
        <div className={styles.perkItem}>
          <CheckCircle2 size={14} className={styles.perkIcon} />
          <span>1.25x Multiplier for Daily Task XP earnings</span>
        </div>
      </div>

      <div className={styles.progressMini}>
        <div className={styles.miniTrack}>
          <div className={styles.miniFill} style={{ width: `${Math.min(100, xpPercentage)}%` }} />
        </div>
        <div className={styles.miniText}>
          <span>Unlock Progress</span>
          <span>{xpPercentage}%</span>
        </div>
      </div>
    </div>
  )
}
