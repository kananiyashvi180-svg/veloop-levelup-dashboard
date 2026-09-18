import React from 'react'
import {
  Coins,
  Gem,
  Flame,
  Gift,
  Gamepad2,
  Zap,
  Clock,
  ArrowRight,
  ChevronRight,
  Shield,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import {
  PodiumHeroGraphic,
  CrystalCluster,
  GlowingGameController,
  ElectricLightningArt,
  MilestoneBadge
} from '../../components/DashboardMockupAssets/DashboardVisuals'
import styles from './HomeView.module.css'

export default function HomeView({
  progression,
  activities = [],
  onNavigate,
  onOpenRoadmap
}) {
  const currentLevel = progression?.currentLevel ?? 11
  const currentXp = progression?.currentXp ?? 6420
  const requiredXp = progression?.requiredXp ?? 8000
  const xpPercentage = Math.min(100, Math.round((currentXp / requiredXp) * 100)) || 80
  const xpToNext = Math.max(0, requiredXp - currentXp)

  const userSummary = progression?.userSummary
  const username = userSummary?.username || 'Yashvi Kanani'
  const totalEarnedVEs = userSummary?.totalEarnedVEs ?? 2450
  const totalGems = userSummary?.totalGems ?? 120
  const streak = userSummary?.longestStreak ?? 7
  const tierName = progression?.currentLevelConfig?.tier || 'PLATINUM II'

  const nextRewardTitle =
    progression?.nextLevelReward?.label ||
    progression?.nextLevelReward?.title ||
    'Premium Pack'

  return (
    <div className={styles.homeLayout}>
      {/* ============================================================ */}
      {/* LEFT / CENTER MAIN COLUMN */}
      {/* ============================================================ */}
      <div className={styles.mainStream}>
        {/* 1. HERO SECTION BANNER */}
        <section className={styles.heroCard}>
          {/* Background Nebula & Cosmic Sparkles */}
          <div className={styles.heroNebulaGlow} />

          {/* Left Column: Greeting, XP, Quick Stats */}
          <div className={styles.heroLeftCol}>
            <div className={styles.greetingBlock}>
              <span className={styles.greetingSub}>Good Morning,</span>
              <h1 className={styles.greetingName}>{username}</h1>
              <p className={styles.greetingMotto}>Keep pushing, you're doing great!</p>
            </div>

            {/* XP Progress Block */}
            <div className={styles.xpProgressBlock}>
              <div className={styles.xpInfoRow}>
                <span className={styles.xpValues}>
                  <strong>{currentXp.toLocaleString()}</strong>
                  <span className={styles.xpTotal}> / {requiredXp.toLocaleString()} XP</span>
                </span>
                <span className={styles.xpPercent}>{xpPercentage}%</span>
              </div>

              {/* Glowing XP Bar */}
              <div className={styles.xpTrack}>
                <div
                  className={styles.xpFill}
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>

              <span className={styles.xpToNextText}>
                {xpToNext.toLocaleString()} XP to reach Level {currentLevel + 1}
              </span>
            </div>

            {/* 3 Quick Stat Badges */}
            <div className={styles.quickStatsRow}>
              {/* VEs */}
              <div
                className={`${styles.statPill} ${styles.statPillVEs}`}
                onClick={() => onNavigate && onNavigate('rewards')}
                role="button"
                tabIndex={0}
              >
                <div className={styles.pillIconWrap}>
                  <Coins size={17} className={styles.coinIcon} aria-hidden="true" />
                </div>
                <div className={styles.pillText}>
                  <strong className={styles.pillValue}>{totalEarnedVEs.toLocaleString()}</strong>
                  <span className={styles.pillLabel}>VEs</span>
                </div>
              </div>

              {/* Gems */}
              <div className={`${styles.statPill} ${styles.statPillGems}`}>
                <div className={styles.pillIconWrap}>
                  <Gem size={17} className={styles.gemIcon} aria-hidden="true" />
                </div>
                <div className={styles.pillText}>
                  <strong className={styles.pillValue}>{totalGems.toLocaleString()}</strong>
                  <span className={styles.pillLabel}>Gems</span>
                </div>
              </div>

              {/* Streak */}
              <div className={`${styles.statPill} ${styles.statPillStreak}`}>
                <div className={styles.pillIconWrap}>
                  <Flame size={17} className={styles.streakIcon} aria-hidden="true" />
                </div>
                <div className={styles.pillText}>
                  <strong className={styles.pillValue}>{streak} Days</strong>
                  <span className={styles.pillLabel}>Streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: 3D Stepped Podium Trophy Emblem */}
          <div
            className={styles.heroCenterCol}
            onClick={() => onNavigate && onNavigate('level')}
            role="button"
            tabIndex={0}
            title="View Level Progression"
          >
            <PodiumHeroGraphic level={currentLevel} tier={tierName.toUpperCase()} />
          </div>

          {/* Right Column: Next Level Reward Glass Card */}
          <div className={styles.heroRightCol}>
            <div className={styles.nextRewardCard}>
              <div className={styles.nextRewardHeader}>
                <Gift size={16} className={styles.rewardGiftIcon} aria-hidden="true" />
                <span className={styles.nextRewardTag}>Next Level Reward</span>
              </div>
              <h3 className={styles.nextRewardTitle}>{nextRewardTitle}</h3>
              <button
                type="button"
                className={styles.viewRewardBtn}
                onClick={() => onNavigate && onNavigate('rewards')}
              >
                <span>View Reward</span>
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. MIDDLE ROW: PLAY & EARN (Left) + LEVEL ROADMAP (Right) */}
        <div className={styles.middleRow}>
          {/* Play & Earn Card */}
          <div className={styles.playEarnCard}>
            <div className={styles.playEarnLeft}>
              <div className={styles.sectionHeaderIcon}>
                <div className={styles.headerIconCircle}>
                  <Gamepad2 size={18} className={styles.gameIcon} aria-hidden="true" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Play &amp; Earn</h2>
                  <p className={styles.cardHeaderSub}>Fun games, real rewards</p>
                </div>
              </div>

              <button
                type="button"
                className={styles.startPlayingBtn}
                onClick={() => onNavigate && onNavigate('play-earn')}
              >
                <span>Start Playing</span>
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.playEarnArtWrap}>
              <GlowingGameController size={125} />
            </div>
          </div>

          {/* Level Roadmap Card */}
          <div className={styles.roadmapCard}>
            <div className={styles.roadmapHeaderRow}>
              <div className={styles.sectionHeaderIcon}>
                <div className={styles.headerIconCircle}>
                  <Shield size={18} className={styles.crownIcon} aria-hidden="true" />
                </div>
                <div>
                  <h2 className={styles.cardHeaderTitle}>Level Roadmap</h2>
                  <p className={styles.cardHeaderSub}>Your journey to greatness</p>
                </div>
              </div>
            </div>

            {/* 5 Milestone Badges Connected by Line */}
            <div className={styles.milestonesTrackContainer}>
              <div className={styles.milestonesInnerTrack}>
                {/* Connecting progress line */}
                <div className={styles.milestoneLineTrack}>
                  <div className={styles.milestoneLineActive} style={{ width: '56%' }} />
                </div>

                <div className={styles.milestonesList}>
                  <MilestoneBadge level="Lv 05" tier="Bronze" />
                  <MilestoneBadge level="Lv 10" tier="Silver" />
                  <MilestoneBadge level="Lv 11" tier="Platinum II" active />
                  <MilestoneBadge level="Lv 15" tier="Diamond" locked />
                  <MilestoneBadge level="Lv 20" tier="Master" locked />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. YOUR STATS ROW */}
        <section className={styles.yourStatsSection}>
          <div className={styles.statsSectionHeader}>
            <div className={styles.statsHeaderIconCircle}>
              <Sparkles size={16} className={styles.sparkleIcon} aria-hidden="true" />
            </div>
            <h2 className={styles.statsSectionTitle}>Your Stats</h2>
          </div>

          <div className={styles.statsFourGrid}>
            {/* Card 1: Total XP Earned */}
            <div className={styles.statMetricCard}>
              <div className={styles.metricTopRow}>
                <div className={`${styles.metricIconWrap} ${styles.metricIconPurple}`}>
                  <Zap size={17} aria-hidden="true" />
                </div>
                <span className={styles.metricChangeBadge}>+12%</span>
              </div>
              <div className={styles.metricContentWrap}>
                <span className={styles.metricLabel}>Total XP Earned</span>
                <strong className={styles.metricValue}>{currentXp.toLocaleString()}</strong>
              </div>
            </div>

            {/* Card 2: Total VEs Earned */}
            <div className={styles.statMetricCard}>
              <div className={styles.metricTopRow}>
                <div className={`${styles.metricIconWrap} ${styles.metricIconGold}`}>
                  <Coins size={17} aria-hidden="true" />
                </div>
                <span className={styles.metricChangeBadge}>+8%</span>
              </div>
              <div className={styles.metricContentWrap}>
                <span className={styles.metricLabel}>Total VEs Earned</span>
                <strong className={styles.metricValue}>{totalEarnedVEs.toLocaleString()}</strong>
              </div>
            </div>

            {/* Card 3: Total Gems Earned */}
            <div className={styles.statMetricCard}>
              <div className={styles.metricTopRow}>
                <div className={`${styles.metricIconWrap} ${styles.metricIconTeal}`}>
                  <Gem size={17} aria-hidden="true" />
                </div>
                <span className={styles.metricChangeBadge}>+5%</span>
              </div>
              <div className={styles.metricContentWrap}>
                <span className={styles.metricLabel}>Total Gems Earned</span>
                <strong className={styles.metricValue}>{totalGems.toLocaleString()}</strong>
              </div>
            </div>

            {/* Card 4: Games Played */}
            <div className={styles.statMetricCard}>
              <div className={styles.metricTopRow}>
                <div className={`${styles.metricIconWrap} ${styles.metricIconBlue}`}>
                  <Gamepad2 size={17} aria-hidden="true" />
                </div>
                <span className={styles.metricChangeBadge}>+3%</span>
              </div>
              <div className={styles.metricContentWrap}>
                <span className={styles.metricLabel}>Games Played</span>
                <strong className={styles.metricValue}>28</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROMO BANNER: SMALL STEPS -> BIG REWARDS */}
        <section className={styles.promoBanner}>
          <div className={styles.promoLeftArt}>
            <CrystalCluster size={65} />
          </div>

          <div className={styles.promoCenterText}>
            <div className={styles.promoTitleRow}>
              <span>Small Steps</span>
              <span className={styles.promoArrow}>→</span>
              <span>Big Rewards</span>
            </div>
            <p className={styles.promoSubtitle}>Keep playing, keep earning, keep growing!</p>
          </div>

          <div className={styles.promoRightGroup}>
            <div className={styles.promoRightArt}>
              <CrystalCluster size={65} />
            </div>
            <button
              type="button"
              className={styles.exploreRewardsBtn}
              onClick={() => onNavigate && onNavigate('rewards')}
            >
              <span>Explore Rewards</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* RIGHT SIDEBAR COLUMN */}
      {/* ============================================================ */}
      <div className={styles.rightStream}>
        {/* 1. TODAY'S BOOST CARD */}
        <div className={styles.boostCard}>
          <div className={styles.boostTopRow}>
            <div className={styles.boostHeaderTitleWrap}>
              <div className={styles.boostIconCircle}>
                <Zap size={16} className={styles.boostZapIcon} aria-hidden="true" />
              </div>
              <span className={styles.boostCardTag}>TODAY'S BOOST</span>
            </div>
          </div>

          <div className={styles.boostContentRow}>
            <div className={styles.boostTexts}>
              <h3 className={styles.boostMainTitle}>
                <strong>Double XP</strong> for all activities!
              </h3>
              <p className={styles.boostDesc}>
                Complete more tasks and earn extra XP today.
              </p>
            </div>
            <div className={styles.boostArtWrap}>
              <ElectricLightningArt size={90} />
            </div>
          </div>

          <div className={styles.boostFooterRow}>
            <div className={styles.timerWrap}>
              <Clock size={13} aria-hidden="true" />
              <span>12h 45m left</span>
            </div>
            <button
              type="button"
              className={styles.activateBoostBtn}
              onClick={() => onNavigate && onNavigate('earn-xp')}
            >
              Activate
            </button>
          </div>
        </div>

        {/* 2. EARN MORE XP CARD */}
        <div className={styles.earnMoreCard}>
          <div className={styles.earnMoreTopRow}>
            <div className={styles.earnMoreHeaderTitleWrap}>
              <div className={styles.earnMoreIconCircle}>
                <Sparkles size={16} className={styles.earnSparkleIcon} aria-hidden="true" />
              </div>
              <span className={styles.earnMoreCardTag}>EARN MORE XP</span>
            </div>
          </div>

          <div className={styles.earnMoreContentRow}>
            <div className={styles.earnMoreTexts}>
              <p className={styles.earnMoreDesc}>
                Complete tasks, play games and level up faster.
              </p>
              <button
                type="button"
                className={styles.viewTasksBtn}
                onClick={() => onNavigate && onNavigate('earn-xp')}
              >
                <span>View Tasks</span>
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.earnMoreArtWrap}>
              <CrystalCluster size={85} />
            </div>
          </div>
        </div>

        {/* 3. RECENT ACTIVITY CARD */}
        <div className={styles.activityCard}>
          <div className={styles.activityHeaderRow}>
            <div className={styles.activityTitleGroup}>
              <div className={styles.activityHexIcon}>
                <ActivityIconSvg />
              </div>
              <h3 className={styles.activityCardTitle}>Recent Activity</h3>
            </div>
            <button
              type="button"
              className={styles.viewAllLink}
              onClick={() => onNavigate && onNavigate('activity')}
            >
              <span>View All</span>
              <ChevronRight size={13} aria-hidden="true" />
            </button>
          </div>

          {/* 5 Rows Matching Mockup */}
          <div className={styles.activityList}>
            {/* Row 1: Played XP Catcher */}
            <div
              className={styles.activityItem}
              onClick={() => onNavigate && onNavigate('activity')}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.actIconCircle} ${styles.actBlue}`}>
                <Gamepad2 size={16} aria-hidden="true" />
              </div>
              <div className={styles.actInfo}>
                <strong className={styles.actTitle}>Played XP Catcher</strong>
                <span className={styles.actGains}>
                  <span className={styles.gainXp}>+120 XP</span> •{' '}
                  <span className={styles.gainVe}>+25 VEs</span> •{' '}
                  <span className={styles.gainGem}>+2 Gems</span>
                </span>
              </div>
              <span className={styles.actTime}>2h ago ›</span>
            </div>

            {/* Row 2: Claimed Reward */}
            <div
              className={styles.activityItem}
              onClick={() => onNavigate && onNavigate('rewards')}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.actIconCircle} ${styles.actPink}`}>
                <Gift size={16} aria-hidden="true" />
              </div>
              <div className={styles.actInfo}>
                <strong className={styles.actTitle}>Claimed Reward</strong>
                <span className={styles.actSubtle}>Premium Pack</span>
              </div>
              <span className={styles.actTime}>4h ago ›</span>
            </div>

            {/* Row 3: Level Up */}
            <div
              className={styles.activityItem}
              onClick={() => onNavigate && onNavigate('level')}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.actIconCircle} ${styles.actPurple}`}>
                <Flame size={16} aria-hidden="true" />
              </div>
              <div className={styles.actInfo}>
                <strong className={styles.actTitle}>Level Up</strong>
                <span className={styles.actSubtle}>Reached Level 11</span>
              </div>
              <span className={styles.actTime}>5h ago ›</span>
            </div>

            {/* Row 4: Earned XP */}
            <div
              className={styles.activityItem}
              onClick={() => onNavigate && onNavigate('activity')}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.actIconCircle} ${styles.actGold}`}>
                <Zap size={16} aria-hidden="true" />
              </div>
              <div className={styles.actInfo}>
                <strong className={styles.actTitle}>Earned XP</strong>
                <span className={styles.gainXp}>+60 XP</span>
              </div>
              <span className={styles.actTime}>6h ago ›</span>
            </div>

            {/* Row 5: Earned VEs */}
            <div
              className={styles.activityItem}
              onClick={() => onNavigate && onNavigate('activity')}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.actIconCircle} ${styles.actTeal}`}>
                <Gem size={16} aria-hidden="true" />
              </div>
              <div className={styles.actInfo}>
                <strong className={styles.actTitle}>Earned VEs</strong>
                <span className={styles.gainVe}>+15 VEs</span>
              </div>
              <span className={styles.actTime}>8h ago ›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityIconSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="#c084fc" strokeWidth="2" fill="rgba(168, 85, 247, 0.2)" />
      <path d="M7 12h3l2-3 2 6 2-3h2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}