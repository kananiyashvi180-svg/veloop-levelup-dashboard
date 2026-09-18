import React from 'react'
import {
  Award,
  Zap,
  Coins,
  Gem,
  Flame,
  Target,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Crown
} from 'lucide-react'
import styles from './GameResult.module.css'

export default function GameResult({ finalRewards, onPlayAgain, onExit }) {
  const score = finalRewards?.score ?? 0
  const xp = finalRewards?.xp ?? 0
  const ves = finalRewards?.ves ?? 0
  const gems = finalRewards?.gems ?? 0
  const maxMultiplier = finalRewards?.maxMultiplier ?? 2
  const itemsCaught = finalRewards?.itemsCaught ?? 0
  const bestStreak = finalRewards?.bestStreak ?? 0
  const didLevelUp = finalRewards?.didLevelUp
  const newLevel = finalRewards?.newLevel

  return (
    <div className={styles.resultContainer}>
      {/* Background Ambient Glows */}
      <div className={styles.ambientTopGlow} />

      {/* 1. Victory Header */}
      <div className={styles.header}>
        <div className={styles.awardCircle}>
          <Award size={36} className={styles.awardIcon} aria-hidden="true" />
        </div>
        <h2 className={styles.title}>GAME COMPLETE</h2>
        <p className={styles.subtitle}>XP Catcher session complete — Great reflex performance!</p>
      </div>

      {/* Level-Up Celebration Banner (if applicable) */}
      {didLevelUp && (
        <div className={styles.levelUpBanner}>
          <Crown size={16} className={styles.crownIcon} aria-hidden="true" />
          <span>LEVEL UP ACHIEVED! You reached Level {newLevel}!</span>
          <Sparkles size={16} className={styles.sparkleIcon} aria-hidden="true" />
        </div>
      )}

      {/* 2. Final Score Showcase */}
      <div className={styles.scoreHero}>
        <span className={styles.scoreLabel}>TOTAL SESSION SCORE</span>
        <strong className={styles.scoreNumber}>{score.toLocaleString()}</strong>
        <span className={styles.scoreSub}>Multiplier streak boosts applied</span>
      </div>

      {/* 3. 6-Card Progression & Loot Grid with Staggered Entrance */}
      <div className={styles.statsGrid}>
        {/* XP Earned */}
        <div className={`${styles.statCard} ${styles.statXp}`}>
          <div className={styles.iconBox}>
            <Zap size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>XP Earned</span>
            <strong className={styles.statVal}>+{xp.toLocaleString()} XP</strong>
          </div>
        </div>

        {/* VEs Earned */}
        <div className={`${styles.statCard} ${styles.statVes}`}>
          <div className={styles.iconBox}>
            <Coins size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>VEs Earned</span>
            <strong className={styles.statVal}>+{ves.toLocaleString()} VEs</strong>
          </div>
        </div>

        {/* Gems Earned */}
        <div className={`${styles.statCard} ${styles.statGems}`}>
          <div className={styles.iconBox}>
            <Gem size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Gems Earned</span>
            <strong className={styles.statVal}>+{gems} Gems</strong>
          </div>
        </div>

        {/* Peak Multiplier */}
        <div className={`${styles.statCard} ${styles.statMult}`}>
          <div className={styles.iconBox}>
            <Flame size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Peak Multiplier</span>
            <strong className={styles.statVal}>{maxMultiplier}X</strong>
          </div>
        </div>

        {/* Items Caught */}
        <div className={`${styles.statCard} ${styles.statCaught}`}>
          <div className={styles.iconBox}>
            <Target size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Items Caught</span>
            <strong className={styles.statVal}>{itemsCaught}</strong>
          </div>
        </div>

        {/* Best Streak */}
        <div className={`${styles.statCard} ${styles.statStreak}`}>
          <div className={styles.iconBox}>
            <Award size={18} aria-hidden="true" />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Best Streak</span>
            <strong className={styles.statVal}>{bestStreak} Combo</strong>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className={styles.actionsRow}>
        <button
          type="button"
          className={styles.playAgainBtn}
          onClick={onPlayAgain}
          id="game-play-again-btn"
        >
          <RotateCcw size={18} aria-hidden="true" />
          <span>PLAY AGAIN</span>
        </button>

        {onExit && (
          <button
            type="button"
            className={styles.exitBtn}
            onClick={onExit}
            id="game-exit-btn"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Back to Dashboard</span>
          </button>
        )}
      </div>
    </div>
  )
}
