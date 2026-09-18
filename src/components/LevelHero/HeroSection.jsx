import React from 'react'
import { Crown, ChevronLeft, Map, Sparkles } from 'lucide-react'
import PodiumBadge from './PodiumBadge'
import LevelBadge from '../LevelBadge/LevelBadge'
import styles from './HeroSection.module.css'

export default function HeroSection({ progression, onOpenRoadmap }) {
  const {
    currentLevel = 11,
    currentXp = 6420,
    requiredXp = 8000,
    xpPercentage = 80,
    nextLevel = 12,
    xpRemaining = 1580,
    currentLevelConfig,
    userSummary
  } = progression || {}

  const tierTitle = currentLevelConfig?.tier || 'PLATINUM II'
  const rankSubtitle = currentLevelConfig?.name || userSummary?.rank || 'Elite Miner'

  return (
    <section className={styles.heroSection} aria-label="Level Overview">
      {/* Ambient background light orbs */}
      <div className={styles.ambientTopGlow} />

      <div className={styles.heroCard}>
        {/* Top Header Eyebrow */}
        <div className={styles.eyebrowRow}>
          <button
            type="button"
            className={styles.backLevelBtn}
            onClick={onOpenRoadmap}
            title="View Roadmap"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <Crown size={15} className={styles.crownIcon} aria-hidden="true" />
            <span>YOUR LEVEL</span>
          </button>
        </div>

        {/* Hero Showcase Grid: Left Typography + Right Podium */}
        <div className={styles.showcaseGrid}>
          <div className={styles.heroCopyColumn}>
            <h1 className={styles.rankTitle}>{tierTitle}</h1>
            <h2 className={styles.rankSubtitle}>{rankSubtitle}</h2>

            <div className={styles.stylishDivider} />

            <div className={styles.cheeringMessage}>
              <p className={styles.cheerLine1}>Keep earning, keep growing!</p>
              <p className={styles.cheerLine2}>You're doing amazing!</p>
            </div>
          </div>

          <div className={styles.heroPodiumColumn}>
            <PodiumBadge
              level={currentLevel}
              tierName={tierTitle}
              subName={rankSubtitle}
            />
          </div>
        </div>

        {/* Wide Glass XP Progress Panel */}
        <div className={styles.xpStatusPanel}>
          <div className={styles.xpPanelTopRow}>
            {/* Level Identification */}
            <div className={styles.levelIdentityGroup}>
              <div className={styles.miniBadgeWrap}>
                <LevelBadge level={currentLevel} size="mini" showGlow={false} />
              </div>
              <div className={styles.levelLabelGroup}>
                <span className={styles.levelHeading}>Level {String(currentLevel).padStart(2, '0')}</span>
                <span className={styles.levelSublabel}>Current Level</span>
              </div>
            </div>

            {/* XP and Percentage */}
            <div className={styles.xpMetricsGroup}>
              <div className={styles.xpAmountRow}>
                <span className={styles.xpBigValue}>{currentXp.toLocaleString()} XP</span>
                <span className={styles.percentPill}>{Math.round(xpPercentage)}%</span>
              </div>
              <span className={styles.xpRemainingNote}>
                {xpRemaining?.toLocaleString() || (requiredXp - currentXp).toLocaleString()} XP to reach Level {String(nextLevel).padStart(2, '0')}
              </span>
            </div>

            {/* Action to view all levels */}
            <button
              type="button"
              className={styles.viewLevelsBtn}
              onClick={onOpenRoadmap}
              id="hero-view-all-levels-btn"
            >
              <Map size={14} aria-hidden="true" />
              <span>View All Levels</span>
            </button>
          </div>

          {/* Glowing Multi-Stop Progress Bar */}
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(100, Math.max(0, xpPercentage))}%` }}
            >
              <span className={styles.progressSparkleTip} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
