import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import GamerAvatar from '../../components/Profile/GamerAvatar'
import AvatarVault from '../../components/Profile/AvatarVault'
import { gamerAvatars, profileAchievements } from '../../data/levelData'
import styles from './ProfilePage.module.css'

export default function ProfilePage({ progression, userProfile, onUpdateProfile, onNavigate }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [vaultOpen, setVaultOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [bioText, setBioText] = useState(
    userProfile?.bio || progression?.userSummary?.bio || 'Pushing for Level 5 Vanguard Master • Daily Streak Hunter ⚡'
  )
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [streakAlerts, setStreakAlerts] = useState(true)
  const [rewardDrops, setRewardDrops] = useState(true)

  const activeAvatarId = userProfile?.avatarId || progression?.userSummary?.avatarId || 'vanguard'
  const currentAvatarMeta = gamerAvatars.find((a) => a.id === activeAvatarId) || gamerAvatars[0]
  const username = userProfile?.username || progression?.userSummary?.username || 'AlexRider'
  const email = userProfile?.email || progression?.userSummary?.email || ''
  const tag = userProfile?.tag || progression?.userSummary?.tag || '#VEL-7402'
  const rank = progression?.currentLevelConfig?.tier || userProfile?.rank || progression?.userSummary?.rank || 'Gold Tier'
  const totalEarnedVEs = progression?.userSummary?.totalEarnedVEs ?? 1850
  const totalGems = progression?.userSummary?.totalGems ?? 48
  const lifetimeXp = progression?.userSummary?.lifetimeXp ?? 6670
  const currentLevel = progression?.currentLevel ?? 4
  const nextLevel = progression?.nextLevel ?? 5
  const currentXp = progression?.currentXp ?? 2170
  const requiredXp = progression?.requiredXp ?? 3500
  const xpPercentage = progression?.xpPercentage ?? 62
  const longestStreak = progression?.userSummary?.longestStreak ?? 7
  const miniGameHighScore = progression?.userSummary?.miniGameHighScore ?? 165
  const tasksCompleted = progression?.userSummary?.tasksCompleted ?? 4
  const gamesPlayed = progression?.userSummary?.gamesPlayed ?? 0
  const vouchersClaimed = progression?.userSummary?.vouchersClaimed ?? 0
  const playerTitle = progression?.userSummary?.title || `Level ${String(currentLevel).padStart(2, '0')} Vanguard`

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

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const filteredAchievements = profileAchievements.filter((ach) => {
    if (activeTab === 'unlocked') return ach.unlocked
    if (activeTab === 'in-progress') return !ach.unlocked
    return true
  })

  return (
    <div className={styles.container}>
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
              {email && <span className={styles.email}>{email}</span>}
              <span className={styles.dotSeparator}>•</span>
              <span className={styles.playerTitle}>⚔️ {playerTitle}</span>
              <span className={styles.dotSeparator}>•</span>
              <span className={styles.joinDate}>Member since Aug 2026</span>
              <span className={styles.dotSeparator}>•</span>
              <span className={styles.vipStatus}>⭐ VIP Verified</span>
            </div>

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

            <div className={styles.progressionBarArea}>
              <div className={styles.progressBarMeta}>
                <span className={styles.progressLabel}>Progress to Level {String(nextLevel).padStart(2, '0')}</span>
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

      <section className={styles.progressSummary}>
        <div className={styles.progressSummaryHeader}>
          <div>
            <span className={styles.sectionPill}>LEVEL PROGRESS</span>
            <h2 className={styles.sectionTitle}>Your next milestone</h2>
          </div>
          <span className={styles.progressPercent}>{xpPercentage}% Complete</span>
        </div>
        <div className={styles.progressSummaryMeta}>
          <span>LEVEL {String(currentLevel).padStart(2, '0')}</span>
          <strong>{currentXp.toLocaleString()} / {requiredXp.toLocaleString()} XP</strong>
          <span>LEVEL {String(nextLevel).padStart(2, '0')}</span>
        </div>
        <div className={styles.progressSummaryTrack}>
          <div className={styles.progressSummaryBar} style={{ width: `${xpPercentage}%` }} />
        </div>
        <p className={styles.progressSummaryNote}>{xpPercentage >= 100 ? 'Next level unlocked' : `${Math.max(0, requiredXp - currentXp).toLocaleString()} XP to Level ${String(nextLevel).padStart(2, '0')}`}</p>
      </section>

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

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
            ⚡
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Lifetime XP</span>
            <span className={styles.statValue}>{lifetimeXp.toLocaleString()} XP</span>
            <span className={styles.statSub}>Total points earned</span>
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
          <div className={styles.statIconWrap} style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa' }}>
            🎮
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Games Played</span>
            <span className={styles.statValue}>{gamesPlayed}</span>
            <span className={styles.statSub}>XP Catcher sessions</span>
          </div>
        </div>
      </section>

      <section className={styles.recordsSection}>
        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎮</span>
            <span className={styles.recordTitle}>XP Catcher Record</span>
          </div>
          <span className={styles.recordScore}>{miniGameHighScore} Pts</span>
          <span className={styles.recordTag}>Top arcade performance</span>
        </div>

        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎯</span>
            <span className={styles.recordTitle}>Quests Completed</span>
          </div>
          <span className={styles.recordScore}>{tasksCompleted} Tasks</span>
          <span className={styles.recordTag}>100% on-time completion</span>
        </div>

        <div className={styles.recordItem}>
          <div className={styles.recordHeader}>
            <span className={styles.recordEmoji}>🎁</span>
            <span className={styles.recordTitle}>Vouchers Claimed</span>
          </div>
          <span className={styles.recordScore}>{vouchersClaimed} Vouchers</span>
          <span className={styles.recordTag}>Claimed from catalog</span>
        </div>
      </section>

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

      <section className={styles.profileMenuCard}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionPill}>ACCOUNT</span>
            <h2 className={styles.sectionTitle}>Profile menu</h2>
          </div>
        </div>

        <div className={styles.profileMenuList}>
          <div className={styles.profileMenuRow}>
            <div className={styles.profileMenuIcon}>◉</div>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Account</span>
              <span className={styles.settingDesc}>{email}</span>
            </div>
          </div>
          <button type="button" className={styles.profileMenuRow} onClick={() => onNavigate && onNavigate('activity')}>
            <div className={styles.profileMenuIcon}>◌</div>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Notifications</span>
              <span className={styles.settingDesc}>Review your latest rewards and XP updates</span>
            </div>
            <span className={styles.profileMenuArrow}>→</span>
          </button>
          <button type="button" className={styles.profileMenuRow} onClick={() => setPreferencesOpen((value) => !value)}>
            <div className={styles.profileMenuIcon}>⚙</div>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Preferences</span>
              <span className={styles.settingDesc}>Game sounds, streak alerts, and reward drops</span>
            </div>
            <span className={styles.profileMenuArrow}>{preferencesOpen ? '−' : '+'}</span>
          </button>
          {preferencesOpen && (
            <div className={styles.preferencePanel}>
              <div className={styles.preferenceRow}>
                <span>Game sound effects</span>
                <button type="button" className={`${styles.toggleSwitch} ${soundEnabled ? styles.toggleActive : ''}`} onClick={() => setSoundEnabled(!soundEnabled)} aria-label="Toggle sound effects"><span className={styles.toggleThumb} /></button>
              </div>
              <div className={styles.preferenceRow}>
                <span>Streak reminders</span>
                <button type="button" className={`${styles.toggleSwitch} ${streakAlerts ? styles.toggleActive : ''}`} onClick={() => setStreakAlerts(!streakAlerts)} aria-label="Toggle streak alerts"><span className={styles.toggleThumb} /></button>
              </div>
              <div className={styles.preferenceRow}>
                <span>Reward drop alerts</span>
                <button type="button" className={`${styles.toggleSwitch} ${rewardDrops ? styles.toggleActive : ''}`} onClick={() => setRewardDrops(!rewardDrops)} aria-label="Toggle reward notifications"><span className={styles.toggleThumb} /></button>
              </div>
            </div>
          )}
          <button type="button" className={styles.profileMenuRow} onClick={() => window.alert('VELOOP Support is available from your account team.') }>
            <div className={styles.profileMenuIcon}>?</div>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Help &amp; Support</span>
              <span className={styles.settingDesc}>Get help with rewards and your account</span>
            </div>
            <span className={styles.profileMenuArrow}>→</span>
          </button>
          <button type="button" className={`${styles.profileMenuRow} ${styles.logoutRow}`} onClick={handleLogout}>
            <div className={styles.profileMenuIcon}>↪</div>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Logout</span>
              <span className={styles.settingDesc}>Sign out of this device</span>
            </div>
            <span className={styles.profileMenuArrow}>→</span>
          </button>
        </div>
      </section>

      <AvatarVault
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
        currentAvatarId={activeAvatarId}
        onSelectAvatar={handleSelectAvatar}
      />
    </div>
  )
}
