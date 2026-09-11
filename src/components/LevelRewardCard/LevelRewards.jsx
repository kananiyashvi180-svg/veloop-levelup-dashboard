import styles from './LevelRewards.module.css'

export default function LevelRewards({ progression, onNavigate }) {
  const nextLevel = progression?.nextLevel ?? (progression?.currentLevel ? progression.currentLevel + 1 : 5)
  const nextLevelReward = progression?.nextLevelReward || {
    label: '500 VEs',
    description: `Level ${String(nextLevel).padStart(2, '0')} Milestone Bonus`
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>
            Level {String(nextLevel).padStart(2, '0')} Rewards
          </h2>
          <p className={styles.sectionSub}>Upcoming Milestone Rewards</p>
        </div>
        <span className={styles.unlocksTag}>Unlocks at 8,000 XP</span>
      </div>

      <div className={styles.rewardCard}>
        <div className={styles.cardGlow} />

        <div className={styles.cardContent}>
          <div className={styles.chestArea}>
            <div className={styles.chestIcon}>🏆</div>
            <div className={styles.coinsRow}>
              <span className={styles.coinIcon}>🪙</span>
              <span className={styles.coinIcon}>🪙</span>
              <span className={styles.coinIcon}>🪙</span>
            </div>
          </div>

          <div className={styles.rewardInfo}>
            <span className={styles.milestoneTag}>MILESTONE BONUS</span>
            <p className={styles.rewardAmount}>{nextLevelReward?.label || '500 VEs'}</p>
            <p className={styles.rewardDesc}>{nextLevelReward?.description || 'Upcoming Milestone Bonus'}</p>
          </div>
        </div>

        <div className={styles.perksList}>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>✓</span>
            <span className={styles.perkText}>Exclusive Level 05 Badge</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>✓</span>
            <span className={styles.perkText}>1.5x Multiplier for 48 Hours</span>
          </div>
          <div className={styles.perkItem}>
            <span className={styles.perkIcon}>✓</span>
            <span className={styles.perkText}>Instant Access to Premium Drops</span>
          </div>
        </div>

        <button
          className={styles.viewBtn}
          type="button"
          onClick={() => onNavigate && onNavigate('rewards')}
          id="level-rewards-view-all-btn"
        >
          View All Rewards →
        </button>
      </div>
    </section>
  )
}
