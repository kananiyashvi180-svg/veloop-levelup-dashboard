import React, { useState, useMemo } from 'react'
import { Coins, Gem, Flame, Gift, ArrowRight, Zap, Gamepad2, Crown } from 'lucide-react'
import HeroSection from '../../components/LevelHero/HeroSection'
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap'
import { generateRoadmapData } from '../../data/levelConfig'
import styles from './LevelPage.module.css'

export default function LevelPage({
  progression,
  onNavigate,
  onOpenRoadmapModal
}) {
  const currentLevel = progression?.currentLevel || 11
  const userSummary = progression?.userSummary
  const totalEarnedVEs = userSummary?.totalEarnedVEs ?? 2450
  const totalGems = userSummary?.totalGems ?? 120
  const streakDays = userSummary?.longestStreak ?? 7
  const nextReward = progression?.nextLevelReward?.label || 'Premium Pack'

  const roadmap = useMemo(() => generateRoadmapData(currentLevel), [currentLevel])

  return (
    <div className={styles.pageContainer}>
      {/* 1. Large Premium Hero Area with 3D Podium Badge & XP Bar */}
      <HeroSection
        progression={progression}
        onOpenRoadmap={onOpenRoadmapModal}
      />

      {/* 2. Level Stat Cards Grid */}
      <div className={styles.statsGrid}>
        {/* VEs Card */}
        <div className={`${styles.statCard} ${styles.cardVEs}`}>
          <div className={styles.statIconWrap}>
            <Coins size={22} className={styles.veIcon} aria-hidden="true" />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>VEs Balance</span>
            <strong className={styles.statValue}>{totalEarnedVEs.toLocaleString()}</strong>
            <span className={styles.statSub}>Available to spend</span>
          </div>
          <ArrowRight size={16} className={styles.statArrow} aria-hidden="true" />
        </div>

        {/* Gems Card */}
        <div className={`${styles.statCard} ${styles.cardGems}`}>
          <div className={styles.statIconWrap}>
            <Gem size={22} className={styles.gemIcon} aria-hidden="true" />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Rare Gems</span>
            <strong className={styles.statValue}>{totalGems.toLocaleString()}</strong>
            <span className={styles.statSub}>Multiplier boosts</span>
          </div>
          <ArrowRight size={16} className={styles.statArrow} aria-hidden="true" />
        </div>

        {/* Streak Card */}
        <div className={`${styles.statCard} ${styles.cardStreak}`}>
          <div className={styles.statIconWrap}>
            <Flame size={22} className={styles.streakIcon} aria-hidden="true" />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Current Streak</span>
            <strong className={styles.statValue}>{streakDays} Days</strong>
            <span className={styles.statSub}>Daily consistency bonus</span>
          </div>
          <ArrowRight size={16} className={styles.statArrow} aria-hidden="true" />
        </div>

        {/* Next Level Reward Card */}
        <div className={`${styles.statCard} ${styles.cardReward}`}>
          <div className={styles.statIconWrap}>
            <Gift size={22} className={styles.rewardIcon} aria-hidden="true" />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Next Level Reward</span>
            <strong className={styles.statValue}>{nextReward}</strong>
            <span className={styles.statSub}>Unlocks at Level {String(currentLevel + 1).padStart(2, '0')}</span>
          </div>
          <ArrowRight size={16} className={styles.statArrow} aria-hidden="true" />
        </div>
      </div>

      {/* 3. Premium Level Roadmap */}
      <LevelRoadmap roadmap={roadmap} currentLevel={currentLevel} />

      {/* 4. Action Cards Row */}
      <div className={styles.actionGrid}>
        <button
          type="button"
          className={styles.actionCard}
          onClick={() => onNavigate && onNavigate('earn-xp')}
        >
          <div className={styles.actionIconWrap}>
            <Zap size={20} className={styles.actionZap} aria-hidden="true" />
          </div>
          <strong className={styles.actionTitle}>Earn More XP</strong>
          <p className={styles.actionDesc}>Complete daily tasks and climb to Level {currentLevel + 1}.</p>
          <span className={styles.actionLink}>
            View Tasks <ArrowRight size={14} aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          className={styles.actionCard}
          onClick={() => onNavigate && onNavigate('rewards')}
        >
          <div className={styles.actionIconWrap}>
            <Gift size={20} className={styles.actionGift} aria-hidden="true" />
          </div>
          <strong className={styles.actionTitle}>Unlock Rewards</strong>
          <p className={styles.actionDesc}>Spend your earned VEs on mystery boxes and exclusive perks.</p>
          <span className={styles.actionLink}>
            Reward Vault <ArrowRight size={14} aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          className={styles.actionCard}
          onClick={() => onNavigate && onNavigate('play-earn')}
        >
          <div className={styles.actionIconWrap}>
            <Gamepad2 size={20} className={styles.actionGame} aria-hidden="true" />
          </div>
          <strong className={styles.actionTitle}>Play &amp; Earn</strong>
          <p className={styles.actionDesc}>XP Catcher mini-game with 2X, 3X and 4X multipliers.</p>
          <span className={styles.actionLink}>
            Play Game <ArrowRight size={14} aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          className={styles.actionCard}
          onClick={onOpenRoadmapModal}
        >
          <div className={styles.actionIconWrap}>
            <Crown size={20} className={styles.actionCrown} aria-hidden="true" />
          </div>
          <strong className={styles.actionTitle}>Rank Ladders</strong>
          <p className={styles.actionDesc}>Inspect all 20 progression milestones up to Master tier.</p>
          <span className={styles.actionLink}>
            Full Roadmap <ArrowRight size={14} aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  )
}
