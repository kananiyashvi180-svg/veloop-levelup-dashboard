import styles from './LevelRewards.module.css'

export default function LevelRewards({ progression, onNavigate }) {
  const { nextLevel, nextLevelReward, requiredXp, nextLevelConfig } = progression

  const perks = nextLevelConfig?.benefits || [
    `Exclusive Level ${String(nextLevel).padStart(2, '0')} Badge`,
    '1.5x Multiplier for 48 Hours',
    'Instant Access to Premium Drops'
  ]

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>
            Level {String(nextLevel).padStart(2, '0')} Rewards
          </h2>
          <p className={styles.sectionSub}>Upcoming Milestone Rewards</p>
        </div>
        <span className={styles.unlocksTag}>Unlocks at {requiredXp?.toLocaleString()} XP</span>
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
            <p className={styles.rewardDesc}>{nextLevelReward?.description || `Level ${String(nextLevel).padStart(2, '0')} Milestone Bonus`}</p>
          </div>
        </div>

        <div className={styles.perksList}>
          {perks.map((perk, i) => (
            <div className={styles.perkItem} key={i}>
              <span className={styles.perkIcon}>✓</span>
              <span className={styles.perkText}>{perk}</span>
            </div>
          ))}
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
