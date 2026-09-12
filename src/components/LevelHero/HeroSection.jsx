import styles from './HeroSection.module.css'

export default function HeroSection({ progression, onOpenRoadmap, onTriggerLevelUp }) {
  const { currentLevel, currentXp, requiredXp, xpPercentage, nextLevel, xpRemaining, currentLevelConfig, userSummary } = progression

  const tierLabel = currentLevelConfig ? `${currentLevelConfig.tier} ${currentLevelConfig.name}` : userSummary?.rank || 'Gold Tier'

  return (
    <section className={styles.heroCard}>
      <div className={styles.ambientGlow} />

      <div className={styles.cardHeader}>
        <div className={styles.badgeWrapper}>
          <div className={styles.hexOuter}>
            <div className={styles.hexInner}>
              <span className={styles.levelTag}>LVL</span>
              <span className={styles.levelNum}>{String(currentLevel).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className={styles.levelMeta}>
          <div className={styles.tierRow}>
            <span className={styles.tierBadge}>ACTIVE TIER</span>
            <span className={styles.rankName}>{tierLabel}</span>
          </div>

          <div className={styles.xpRow}>
            <span className={styles.xpValue}>
              <span className={styles.xpBig}>{currentXp.toLocaleString()}</span>
              <span className={styles.xpUnit}>XP</span>
            </span>
            <span className={styles.xpSeparator}>•</span>
            <span className={styles.xpTarget}>
              {xpRemaining?.toLocaleString() || (requiredXp - currentXp).toLocaleString()} XP to Level {String(nextLevel).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className={styles.headerRightArea}>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>{Math.round(xpPercentage)}% Completed</span>
          </div>

          <div className={styles.heroActionBtns}>
            <button
              type="button"
              className={styles.roadmapBtn}
              onClick={onOpenRoadmap}
              id="hero-open-roadmap-btn"
              title="View Level Progression Roadmap"
            >
              🗺️ Roadmap
            </button>
            <button
              type="button"
              className={styles.levelUpDemoBtn}
              onClick={onTriggerLevelUp}
              id="hero-level-up-demo-btn"
              title="Simulate Level Up Celebration"
            >
              🎉 Test Level Up
            </button>
          </div>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(100, Math.max(0, xpPercentage))}%` }}
          >
            <div className={styles.progressShimmer} />
          </div>
        </div>

        <div className={styles.milestoneRow}>
          <div className={styles.milestoneItem}>
            <span className={styles.milestoneCircle}>{String(currentLevel).padStart(2, '0')}</span>
            <span className={styles.milestoneLabel}>Current Level</span>
          </div>

          <div className={styles.progressStats}>
            <span className={styles.progressStatCurrent}>{currentXp.toLocaleString()} XP</span>
            <span className={styles.progressStatSlash}>/</span>
            <span className={styles.progressStatTotal}>{requiredXp.toLocaleString()} XP</span>
          </div>

          <div className={styles.milestoneItem}>
            <span className={styles.milestoneCircleActive}>{String(nextLevel).padStart(2, '0')}</span>
            <span className={styles.milestoneLabel}>Next Milestone</span>
          </div>
        </div>
      </div>
    </section>
  )
}
