import { useLevelData } from '../../hooks/useLevelData'
import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  const { progression, roadmap, activities, earningOpportunities, gameConfig } = useLevelData()

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandTitle}>VELOOP Rewards</span>
          </div>
          <span className={styles.badge}>Day 1 Foundation</span>
        </header>

        <main className={styles.foundationCard}>
          <div className={styles.cardGlow}></div>
          <h1 className={styles.foundationTitle}>Level-Up Dashboard</h1>
          <p className={styles.foundationSubtitle}>
            Frontend foundation initialized with centralized demo data and modular component architecture.
          </p>

          <div className={styles.metaGrid}>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Current Level</span>
              <span className={styles.metaValue}>
                Level <span className={styles.metaAccent}>{progression.currentLevel}</span>
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>XP Progress</span>
              <span className={styles.metaValue}>
                {progression.currentXp.toLocaleString()} / {progression.requiredXp.toLocaleString()} XP
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Next Reward</span>
              <span className={styles.metaValue}>
                <span className={styles.metaAccent}>{progression.nextLevelReward.label}</span>
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Roadmap Nodes</span>
              <span className={styles.metaValue}>
                {roadmap.length} Levels
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Activities</span>
              <span className={styles.metaValue}>
                {activities.length} Recorded
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Earn Channels</span>
              <span className={styles.metaValue}>
                {earningOpportunities.length} Available
              </span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaLabel}>Game Engine</span>
              <span className={styles.metaValue}>
                {gameConfig.title}
              </span>
            </div>
          </div>

          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span>Architecture & Routing Ready for Day 2</span>
          </div>
        </main>
      </div>
    </div>
  )
}
