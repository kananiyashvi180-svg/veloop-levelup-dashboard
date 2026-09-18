import React, { useState } from 'react'
import { Bell, ChevronDown, Flame, Menu } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import NotificationPanel from '../Notifications/NotificationPanel'
import styles from './AppHeader.module.css'

export default function AppHeader({
  progression,
  onOpenMenu,
  onSelectSection
}) {
  const { unreadCount } = useNotifications()
  const [notifOpen, setNotifOpen] = useState(false)

  const userSummary = progression?.userSummary
  const username = userSummary?.username || 'Yashvi Kanani'

  // Extract initials (e.g. YK)
  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'YK'

  return (
    <header className={styles.header}>
      {/* Left Branding */}
      <div className={styles.headerLeft}>
        <button
          className={styles.menuBtn}
          onClick={onOpenMenu}
          aria-label="Open mobile menu"
          type="button"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div
          className={styles.brandGroup}
          onClick={() => onSelectSection && onSelectSection('home')}
          role="button"
          tabIndex={0}
        >
          {/* Neon Crystal Polygon Logo */}
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className={styles.brandIcon}>
            <polygon points="20,3 36,12 30,34 20,38 10,34 4,12" fill="#13082b" stroke="#c084fc" strokeWidth="2" />
            <polygon points="20,6 31,14 20,23" fill="#f0abfc" opacity="0.9" />
            <polygon points="20,6 9,14 20,23" fill="#c084fc" opacity="0.85" />
            <polygon points="9,14 12,32 20,23" fill="#6b21a8" />
            <polygon points="31,14 28,32 20,23" fill="#9333ea" />
            <circle cx="20" cy="23" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 5px #fff)" />
          </svg>

          <span className={styles.brandTitle}>VELOOP</span>
        </div>

        {/* Motto / Subtitle */}
        <div className={styles.tagline}>
          <span>REWARDS</span>
          <span className={styles.dot}>•</span>
          <span>LEVEL UP</span>
          <span className={styles.dot}>•</span>
          <span>EARN MORE</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className={styles.headerRight}>
        {/* Top 5% VeLooper Pill */}
        <button
          type="button"
          className={styles.rankPill}
          onClick={() => onSelectSection && onSelectSection('level')}
        >
          <Flame size={14} className={styles.fireEmoji} aria-hidden="true" />
          <span className={styles.rankLabel}>Top 5% VeLooper</span>
          <span className={styles.rankArrow}>›</span>
        </button>

        {/* Notification Bell */}
        <div className={styles.bellWrap}>
          <button
            type="button"
            className={`${styles.bellBtn} ${notifOpen ? styles.bellActive : ''}`}
            onClick={() => setNotifOpen((prev) => !prev)}
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
            <span className={styles.bellRedDot} />
          </button>
          <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User Initials Avatar with Dropdown */}
        <button
          type="button"
          className={styles.userAvatarBtn}
          onClick={() => onSelectSection && onSelectSection('profile')}
          title="Account Profile"
        >
          <div className={styles.avatarCircle}>
            <span>{initials}</span>
          </div>
          <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}