import { useState } from 'react'
import GamerAvatar from '../../components/Profile/GamerAvatar'
import AvatarVault from '../../components/Profile/AvatarVault'
import { gamerAvatars, profileAchievements } from '../../data/levelData'
import styles from './ProfilePage.module.css'

export default function ProfilePage({ progression, userProfile, onUpdateProfile, onNavigate }) {
  const [vaultOpen, setVaultOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // 'all', 'unlocked', 'in-progress'
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bioText, setBioText] = useState(
    userProfile?.bio || progression?.userSummary?.bio || 'Pushing for Level 5 Vanguard Master • Daily Streak Hunter ⚡'
  )
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [streakAlerts, setStreakAlerts] = useState(true)
  const [rewardDrops, setRewardDrops] = useState(true)

  const activeAvatarId = userProfile?.avatarId || progression?.userSummary?.avatarId || 'vanguard'
  const currentAvatarMeta = gamerAvatars.find((a) => a.id === activeAvatarId) || gamerAvatars[0]
  const username = userProfile?.username || progression?.userSummary?.username || 'AlexRider'
  const tag = userProfile?.tag || progression?.userSummary?.tag || '#VEL-7402'
  const rank = userProfile?.rank || progression?.userSummary?.rank || 'Gold Tier'
  const totalEarnedVEs = progression?.userSummary?.totalEarnedVEs ?? 1850
  const totalGems = userProfile?.totalGems || progression?.userSummary?.totalGems || 48
  const lifetimeXp = userProfile?.lifetimeXp || progression?.userSummary?.lifetimeXp || 18450
  const currentLevel = progression?.currentLevel || 4
  const currentXp = progression?.currentXp || 6420
  const requiredXp = progression?.requiredXp || 8000
  const xpPercentage = progression?.xpPercentage || 80.25

  const handleSelectAvatar = (avatarId) => {
    if (onUpdateProfile) {
      onUpdateProfile({ avatarId })
    }
  }

  const handleSaveBio = () => {
    setIsEditingBio(false)
    if (onUpdateProfile) {
      onUpdateProfile({ bio: bioText })
    }
  }

  const filteredAchievements = profileAchievements.filter((ach) => {
    if (activeTab === 'unlocked') return ach.unlocked
    if (activeTab === 'in-progress') return !ach.unlocked
    return true
  })

  return (
    <div className={styles.container}>
      {/* 1. PLAYER HERO CARD */}
      <section className={styles.heroCard}>
        <div className={styles.heroBackgroundMesh} />
        
        <div className={styles.heroContent}>
          <div className={styles.avatarColumn}>
            <div className={styles.avatarRing} style={{ borderColor: currentAvatarMeta.theme }}>
              <GamerAvatar avatarId={activeAvatarId} size={110} showGlow={true} />
              <span className={styles.levelPillBadge} style={{ background: currentAvatarMeta.theme }}>
                LVL {currentLevel}
              </span>
            </div>
            <button
              type="button"
              className={styles.changeAvatarBtn}
              onClick={() => setVaultOpen(true)}
              id="profile-change-avatar-btn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Change Avatar
            </button>
          </div>

          <div className={styles.playerMetaColumn}>
            <div className={styles.nameRow}>
              <div className={styles.nameAndTag}>
                <h1 className={styles.username}>{username}</h1>
                <span className={styles.tagBadge}>{tag}</span>
              </div>
              <div className={styles.tierPill} style={{ borderColor: `${currentAvatarMeta.theme}77` }}>
                <span className={styles.tierDot} style={{ background: currentAvatarMeta.theme }} />
                <span>{rank}</span>
              </div>
            </div>

            <div className={styles.subMeta}>
              <span className={styles.playerTitle}>⚔️ Level {String(currentLevel).padStart(2, '0')} Vanguard</span>
              <span className={styles.dotSeparator}>•</span>
              <span className={styles.joinDate}>Member since Aug 2026</span>
              <span className={styles.dotSeparator}>•</span>
              <span className={styles.vipStatus}>⭐ VIP Verified</span>
            </div>

            {/* Editable Bio / Motto */}
            <div className={styles.bioContainer}>
              {isEditingBio ? (
                <div className={styles.bioEditRow}>
                  <input
                    type="text"
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    className={styles.bioInput}
                    maxLength={120}
                    autoFocus
                  />
                  <button type="button" className={styles.saveBioBtn} onClick={handleSaveBio}>
                    Save
                  </button>
                  <button type="button" className={styles.cancelBioBtn} onClick={() => setIsEditingBio(false)}>
                    ✕
                  </button>
                </div>
              ) : (
                <div className={styles.bioDisplayRow} onClick={() => setIsEditingBio(true)}>
                  <p className={styles.bioText}>"{bioText}"</p>
                  <button type="button" className={styles.editBioBtn} aria-label="Edit bio">
                    ✎
                  </button>
                </div>
              )}
            </div>

            {/* Level XP Progress strip */}
            <div className={styles.progressionBarArea}>
              <div className={styles.progressBarMeta}>
                <span className={styles.progressLabel}>Progress to Level 05</span>
                <span className={styles.progressNums}>
                  <strong>{currentXp.toLocaleString()}</strong> / {requiredXp.toLocaleString()} XP ({xpPercentage}%)
                </span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${xpPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS ROW */}
      {onNavigate && (
        <section className={styles.quickActionsRow}>
          <button
            type="button"
            className={styles.qaBtnPrimary}
            onClick={() => onNavigate('play-earn')}
            id="profile-play-game-btn"
          >
            <span className={styles.qaIcon}>🎮</span>
            <span className={styles.qaLabel}>Play & Earn</span>
            <span className={styles.qaArrow}>→</span>
          </button>
          <button
            type="button"
            className={styles.qaBtnSecondary}
            onClick={() => onNavigate('earn-xp')}
            id="profile-earn-xp-btn"
          >
            <span className={styles.qaIcon}>⚡</span>
            <span className={styles.qaLabel}>Earn More XP</span>
            <span className={styles.qaArrow}>→</span>
          </button>
          <button
            type="button"
            className={styles.qaBtnSecondary}
            onClick={() => onNavigate('activity')}
            id="profile-view-activity-btn"
          >
            <span className={styles.qaIcon}>📈</span>
            <span className={styles.qaLabel}>View Activity</span>
            <span className={styles.qaArrow}>→</span>
          </button>
          <button
            type="button"
            className={styles.qaBtnSecondary}
            onClick={() => onNavigate('rewards')}
            id="profile-view-rewards-btn"
          >
            <span className={styles.qaIcon}>🎁</span>
            <span className={styles.qaLabel}>My Rewards</span>
            <span className={styles.qaArrow}>→</span>
          </button>
        </section>
      )}

      {/* 2. STATS & ASSET VAULT GRID */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
            ⚡
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Lifetime XP</span>
            <span className={styles.statValue}>{lifetimeXp.toLocaleString()} XP</span>
            <span className={styles.statSub}>Top 5% on VELOOP</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
            🪙
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>VE Coins Balance</span>
            <span className={styles.statValue}>{totalEarnedVEs.toLocaleString()} VEs</span>
            <span className={styles.statSub}>Available to spend</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>
            💎
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Rare Gems</span>
            <span className={styles.statValue}>{totalGems} Gems</span>
            <span className={styles.statSub}>Premium multiplier boosts</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            🔥
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Active Streak</span>
            <span className={styles.statValue}>7 Days</span>
            <span className={styles.statSub}>2.5X active boost</span>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE & RECORDS ROW */}
      <section className={styles.recordsSection}>
        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎮</span>
            <span className={styles.recordTitle}>XP Catcher Record</span>
          </div>
          <span className={styles.recordScore}>165 Pts</span>
          <span className={styles.recordTag}>Elite Rating Achieved</span>
        </div>

        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎯</span>
            <span className={styles.recordTitle}>Quests Completed</span>
          </div>
          <span className={styles.recordScore}>24 Tasks</span>
          <span className={styles.recordTag}>100% on-time completion</span>
        </div>

        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎁</span>
            <span className={styles.recordTitle}>Vouchers Unlocked</span>
          </div>
          <span className={styles.recordScore}>5 Vouchers</span>
          <span className={styles.recordTag}>All perks claimed</span>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS SHOWCASE */}
      <section className={styles.achievementsCard}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionPill}>HONOR BADGES</span>
            <h2 className={styles.sectionTitle}>Player Achievements</h2>
            <p className={styles.sectionDesc}>Milestones unlocked across progression, mini-games, and daily challenges.</p>
          </div>

          <div className={styles.tabFilters}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({profileAchievements.length})
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'unlocked' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('unlocked')}
            >
              Unlocked (4)
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'in-progress' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('in-progress')}
            >
              In Progress (2)
            </button>
          </div>
        </div>

        <div className={styles.achievementsGrid}>
          {filteredAchievements.map((ach) => (
            <div
              key={ach.id}
              className={`${styles.achievementCard} ${ach.unlocked ? styles.achUnlocked : styles.achLocked}`}
            >
              <div className={styles.achTop}>
                <div className={styles.achIconWrap}>
                  <span className={styles.achIcon}>{ach.icon}</span>
                  {ach.unlocked && <span className={styles.checkMark}>✓</span>}
                </div>
                <span className={styles.achRewardBadge}>{ach.xpReward}</span>
              </div>

              <div className={styles.achContent}>
                <h3 className={styles.achTitle}>{ach.title}</h3>
                <p className={styles.achDesc}>{ach.desc}</p>
              </div>

              <div className={styles.achBottom}>
                {ach.unlocked ? (
                  <span className={styles.unlockedDate}>Unlocked on {ach.date}</span>
                ) : (
                  <div className={styles.achProgressWrap}>
                    <div className={styles.achProgressMeta}>
                      <span>{ach.progressLabel}</span>
                      <span>{ach.progress}%</span>
                    </div>
                    <div className={styles.achTrack}>
                      <div className={styles.achBar} style={{ width: `${ach.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GAMER SETTINGS & QUICK PREFERENCES */}
      <section className={styles.settingsCard}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionPill}>SYSTEM CONFIG</span>
            <h2 className={styles.sectionTitle}>Gaming & Experience Preferences</h2>
          </div>
        </div>

        <div className={styles.settingsList}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Mini-Game Sound Effects & Music</span>
              <span className={styles.settingDesc}>Play audio on catching XP Orbs and triggering streak multipliers.</span>
            </div>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${soundEnabled ? styles.toggleActive : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label="Toggle sound effects"
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Daily Streak & Multiplier Reminders</span>
              <span className={styles.settingDesc}>Get notified before your 2.5X streak timer resets at midnight.</span>
            </div>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${streakAlerts ? styles.toggleActive : ''}`}
              onClick={() => setStreakAlerts(!streakAlerts)}
              aria-label="Toggle streak alerts"
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Exclusive Reward Drop Notifications</span>
              <span className={styles.settingDesc}>Instant alerts when Gold Tier limited voucher drops become claimable.</span>
            </div>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${rewardDrops ? styles.toggleActive : ''}`}
              onClick={() => setRewardDrops(!rewardDrops)}
              aria-label="Toggle reward notifications"
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      </section>

      {/* AVATAR SELECTOR VAULT MODAL */}
      <AvatarVault
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
        currentAvatarId={activeAvatarId}
        onSelectAvatar={handleSelectAvatar}
      />
    </div>
  )
}
