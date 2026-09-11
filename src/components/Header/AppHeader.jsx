import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import GamerAvatar from '../Profile/GamerAvatar'
import NotificationPanel from '../Notifications/NotificationPanel'
import styles from './AppHeader.module.css'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function AppHeader({ progression, onOpenMenu, onSelectSection }) {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const [notifOpen, setNotifOpen] = useState(false)

  const currentLevel = progression?.currentLevel ?? 4
  const userSummary = progression?.userSummary
  const avatarId = userSummary?.avatarId || 'vanguard'
  const username = user?.fullName || userSummary?.username || 'VeLooper'
  const greeting = getGreeting()
  const greetEmoji = greeting === 'Good Morning' ? '☀️' : greeting === 'Good Afternoon' ? '👋' : '🌙'
  const totalEarnedVEs = userSummary?.totalEarnedVEs !== undefined ? userSummary.totalEarnedVEs : 1850

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onOpenMenu}
          aria-label="Open menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={styles.greetingBlock}>
          <h1 className={styles.greeting}>{greeting}, {username}! {greetEmoji}</h1>
          <p className={styles.subtitle}>Level up your journey and unlock epic rewards every day.</p>
        </div>
      </div>

      <div className={styles.rightActions}>
        <div className={styles.statPill}>
          <span className={styles.statPillIcon}>⚡</span>
          <span className={styles.statPillText}>Level {String(currentLevel).padStart(2, '0')}</span>
        </div>

        <div className={styles.balancePill}>
          <span className={styles.balanceIcon}>🪙</span>
          <span className={styles.balanceAmount}>{totalEarnedVEs.toLocaleString()}</span>
          <span className={styles.balanceUnit}>VEs</span>
        </div>

        <div className={styles.bellWrap}>
          <button
            className={`${styles.bellBtn} ${notifOpen ? styles.bellBtnActive : ''}`}
            aria-label="Notifications"
            type="button"
            id="header-notifications-btn"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 ? (
              <span className={styles.bellCount}>{unreadCount > 9 ? '9+' : unreadCount}</span>
            ) : (
              <span className={styles.bellDot} />
            )}
          </button>
          <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <button
          className={styles.profileBadge}
          type="button"
          onClick={() => onSelectSection && onSelectSection('profile')}
          aria-label="Open profile"
          title="Open Profile"
        >
          <GamerAvatar avatarId={avatarId} size={38} />
        </button>
      </div>
    </header>
  )
}
