import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Coins,
  Gem,
  Gamepad2,
  ChevronRight,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Sparkles,
  Edit3,
  X,
  Check
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import GamerAvatar from '../../components/Profile/GamerAvatar'
import AvatarVault from '../../components/Profile/AvatarVault'
import LevelBadge from '../../components/LevelBadge/LevelBadge'
import styles from './ProfilePage.module.css'

export default function ProfilePage({
  progression,
  userProfile,
  onUpdateProfile,
  onNavigate
}) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [vaultOpen, setVaultOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [notifSettingsOpen, setNotifSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  // Profile data
  const username = userProfile?.username || progression?.userSummary?.username || 'Yashwi Kanani'
  const email = userProfile?.email || progression?.userSummary?.email || 'yashwi@example.com'
  const activeAvatarId = userProfile?.avatarId || progression?.userSummary?.avatarId || 'vanguard'
  const currentLevel = progression?.currentLevel ?? 11
  const currentXp = progression?.currentXp ?? 6420
  const requiredXp = progression?.requiredXp ?? 8000
  const xpPercentage = progression?.xpPercentage ?? 80
  const tierName = progression?.currentLevelConfig?.tier || 'Platinum II'
  const totalEarnedVEs = progression?.userSummary?.totalEarnedVEs ?? 2450
  const totalGems = progression?.userSummary?.totalGems ?? 120
  const gamesPlayed = progression?.userSummary?.gamesPlayed ?? 28

  // Form states
  const [editName, setEditName] = useState(username)
  const [editBio, setEditBio] = useState(userProfile?.bio || 'Elite Miner • Pushing for Diamond Rank')
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [streakAlerts, setStreakAlerts] = useState(true)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    if (onUpdateProfile) {
      onUpdateProfile({ username: editName, bio: editBio })
    }
    setEditProfileOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.pageContainer}>
      {/* 1. Top User Profile Header */}
      <section className={styles.userHeaderCard}>
        <div className={styles.avatarWrap} onClick={() => setVaultOpen(true)} role="button" tabIndex={0} title="Change Avatar">
          <div className={styles.avatarRingGlow}>
            <GamerAvatar avatarId={activeAvatarId} size={72} />
          </div>
          <span className={styles.changeAvatarPill}>Change</span>
        </div>

        <div className={styles.userHeaderMeta}>
          <h1 className={styles.displayName}>{username}</h1>
          <span className={styles.displayEmail}>{email}</span>
        </div>
      </section>

      {/* 2. Level 11 Summary Card */}
      <section
        className={styles.levelCard}
        onClick={() => onNavigate && onNavigate('level')}
        role="button"
        tabIndex={0}
        title="View Level Details"
      >
        <div className={styles.levelCardHeader}>
          <div className={styles.miniBadgeBox}>
            <LevelBadge level={currentLevel} size="small" showGlow={false} />
          </div>
          <div className={styles.levelMetaText}>
            <span className={styles.levelTitle}>Level {currentLevel}</span>
            <span className={styles.tierName}>{tierName}</span>
          </div>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressNumRow}>
            <span><strong>{currentXp.toLocaleString()}</strong> / {requiredXp.toLocaleString()} XP</span>
            <span className={styles.percentText}>{Math.round(xpPercentage)}%</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${Math.min(100, Math.max(0, xpPercentage))}%` }} />
          </div>
        </div>
      </section>

      {/* 3. Three Stat Cards (VEs, Gems, Games Played) */}
      <section className={styles.statsRow}>
        <div className={`${styles.statTile} ${styles.statVEs}`}>
          <Coins size={20} className={styles.coinIcon} aria-hidden="true" />
          <div className={styles.statTileText}>
            <strong className={styles.statTileVal}>{totalEarnedVEs.toLocaleString()}</strong>
            <span className={styles.statTileLabel}>VEs</span>
          </div>
        </div>

        <div className={`${styles.statTile} ${styles.statGems}`}>
          <Gem size={20} className={styles.gemIcon} aria-hidden="true" />
          <div className={styles.statTileText}>
            <strong className={styles.statTileVal}>{totalGems.toLocaleString()}</strong>
            <span className={styles.statTileLabel}>Gems</span>
          </div>
        </div>

        <div className={`${styles.statTile} ${styles.statGames}`}>
          <Gamepad2 size={20} className={styles.gameIcon} aria-hidden="true" />
          <div className={styles.statTileText}>
            <strong className={styles.statTileVal}>{gamesPlayed}</strong>
            <span className={styles.statTileLabel}>Games Played</span>
          </div>
        </div>
      </section>

      {/* 4. Account Options Glass List */}
      <section className={styles.accountOptionsSection}>
        <h2 className={styles.sectionHeading}>Account Options</h2>

        <div className={styles.optionsList}>
          {/* Edit Profile */}
          <button
            type="button"
            className={styles.optionRow}
            onClick={() => setEditProfileOpen(true)}
            id="profile-edit-btn"
          >
            <div className={styles.optionIconBox}>
              <Edit3 size={17} aria-hidden="true" />
            </div>
            <span className={styles.optionLabel}>Edit Profile</span>
            <ChevronRight size={17} className={styles.chevron} aria-hidden="true" />
          </button>

          {/* Notification Settings */}
          <button
            type="button"
            className={styles.optionRow}
            onClick={() => setNotifSettingsOpen(true)}
            id="profile-notif-settings-btn"
          >
            <div className={styles.optionIconBox}>
              <Bell size={17} aria-hidden="true" />
            </div>
            <span className={styles.optionLabel}>Notification Settings</span>
            <ChevronRight size={17} className={styles.chevron} aria-hidden="true" />
          </button>

          {/* Help & Support */}
          <button
            type="button"
            className={styles.optionRow}
            onClick={() => setHelpOpen(true)}
            id="profile-help-btn"
          >
            <div className={styles.optionIconBox}>
              <HelpCircle size={17} aria-hidden="true" />
            </div>
            <span className={styles.optionLabel}>Help &amp; Support</span>
            <ChevronRight size={17} className={styles.chevron} aria-hidden="true" />
          </button>

          {/* Log Out */}
          <button
            type="button"
            className={`${styles.optionRow} ${styles.logoutRow}`}
            onClick={handleLogout}
            id="profile-logout-btn"
          >
            <div className={`${styles.optionIconBox} ${styles.logoutIconBox}`}>
              <LogOut size={17} aria-hidden="true" />
            </div>
            <span className={styles.logoutLabel}>Log Out</span>
            <ChevronRight size={17} className={styles.chevron} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Modals: Edit Profile */}
      {editProfileOpen && (
        <div className={styles.modalOverlay} onClick={() => setEditProfileOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Profile</h3>
              <button type="button" onClick={() => setEditProfileOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveProfile} className={styles.modalForm}>
              <div className={styles.fieldGroup}>
                <label>Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={styles.textInput}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Player Bio</label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className={styles.textInput}
                  maxLength={120}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setEditProfileOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals: Notification Settings */}
      {notifSettingsOpen && (
        <div className={styles.modalOverlay} onClick={() => setNotifSettingsOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Notification Settings</h3>
              <button type="button" onClick={() => setNotifSettingsOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className={styles.toggleList}>
              <div className={styles.toggleRow}>
                <span>Sound effects &amp; audio cues</span>
                <button
                  type="button"
                  className={`${styles.toggle} ${soundAlerts ? styles.toggleOn : ''}`}
                  onClick={() => setSoundAlerts(!soundAlerts)}
                >
                  <span className={styles.thumb} />
                </button>
              </div>
              <div className={styles.toggleRow}>
                <span>Daily streak reminders</span>
                <button
                  type="button"
                  className={`${styles.toggle} ${streakAlerts ? styles.toggleOn : ''}`}
                  onClick={() => setStreakAlerts(!streakAlerts)}
                >
                  <span className={styles.thumb} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals: Help & Support */}
      {helpOpen && (
        <div className={styles.modalOverlay} onClick={() => setHelpOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Help &amp; Support</h3>
              <button type="button" onClick={() => setHelpOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <p className={styles.helpText}>
              Need assistance with your VELOOP account, rewards, or level progression?
              Contact support at <strong>support@veloop.io</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Avatar Vault Picker */}
      <AvatarVault
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
        currentAvatarId={activeAvatarId}
        onSelectAvatar={(avatarId) => {
          if (onUpdateProfile) onUpdateProfile({ avatarId })
        }}
      />
    </div>
  )
}
