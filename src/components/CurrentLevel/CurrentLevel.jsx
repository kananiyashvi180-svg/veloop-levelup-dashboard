import { Shield, Sparkles, Coins } from 'lucide-react'
import styles from './CurrentLevel.module.css'

export default function CurrentLevel({ progression, roadmap = [] }) {
  const currentItem = roadmap.find((r) => r.level === progression.currentLevel) || {}
  const currentTitle = currentItem.name || 'Champion'

  return (
    <div className={styles.currentLevelContainer}>
      <div className={styles.profileAvatarWrapper}>
        <div className={styles.avatarRing}>
          <img
            src={progression.userSummary.avatar}
            alt={progression.userSummary.username}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.levelShieldBadge} title={`Level ${progression.currentLevel}`}>
          <Shield size={13} />
          <span>L{progression.currentLevel}</span>
        </div>
      </div>

      <div className={styles.profileMeta}>
        <div className={styles.userNameRow}>
          <h2 className={styles.userName}>{progression.userSummary.username}</h2>
          <span className={styles.tierPill}>
            <Sparkles size={12} />
            {progression.userSummary.rank}
          </span>
        </div>

        <div className={styles.levelTitleRow}>
          <span className={styles.levelNumber}>Level {String(progression.currentLevel).padStart(2, '0')}</span>
          <span className={styles.levelTag}>• {currentTitle}</span>
        </div>

        <div className={styles.balanceRow}>
          <Coins size={14} color="var(--accent-gold)" />
          <span>
            Total Rewards Balance: <strong className={styles.balanceHighlight}>{progression.userSummary.totalEarnedVEs.toLocaleString()} VEs</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
