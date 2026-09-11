import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import GamerAvatar from '../Profile/GamerAvatar'
import styles from './Sidebar.module.css'

const navSections = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    active: true,
  },
  {
    id: 'rewards',
    label: 'Rewards',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    active: false,
  },
  {
    id: 'play-earn',
    label: 'Play & Earn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <circle cx="17" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    active: false,
  },
  {
    id: 'earn-xp',
    label: 'Earn XP',
    badge: 'Hot',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    active: false,
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    active: false,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    active: false,
  },
]

export default function Sidebar({ isOpen, onClose, userSummary, activeSection = 'home', onSelectSection }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [confirmLogout, setConfirmLogout] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <span className={styles.brandHex}>V</span>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>
                VELOOP<span className={styles.brandAccent}>.</span>
              </span>
              <span className={styles.brandSub}>REWARDS</span>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.navGroup}>
          <p className={styles.navCategory}>MAIN MENU</p>
          {navSections.map((item) => {
            const isActive = (activeSection === item.id) || (activeSection === 'home' && item.id === 'home')
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => {
                  if (onSelectSection) onSelectSection(item.id)
                  if (onClose) onClose()
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                {isActive && <span className={styles.activeIndicator} />}
              </button>
            )
          })}
        </nav>

        <div className={styles.sidebarPromo}>
          <div className={styles.promoHeader}>
            <span className={styles.promoIcon}>⚡</span>
            <span className={styles.promoTag}>CURRENT TIER</span>
          </div>
          <p className={styles.promoTitle}>Gold Tier</p>
          <p className={styles.promoDesc}>Earn 1.2x XP on all tasks and access exclusive drops.</p>
        </div>

        <div className={styles.sidebarFooter}>
          <div
            className={styles.userCard}
            onClick={() => {
              if (onSelectSection) onSelectSection('profile')
              if (onClose) onClose()
            }}
            role="button"
            tabIndex={0}
            title="Go to Profile"
            style={{ cursor: 'pointer' }}
          >
            <GamerAvatar avatarId={userSummary?.avatarId || 'vanguard'} size={42} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userSummary?.username || 'AlexRider'}</span>
              <span className={styles.userBalance}>
                <span className={styles.balanceCoin}>🪙</span>
                {userSummary?.totalEarnedVEs?.toLocaleString() || '1,850'} VEs
              </span>
            </div>
          </div>

          {confirmLogout ? (
            <div className={styles.logoutConfirm}>
              <span className={styles.logoutConfirmText}>Sign out?</span>
              <div className={styles.logoutConfirmBtns}>
                <button
                  type="button"
                  className={styles.logoutYesBtn}
                  id="sidebar-logout-confirm-btn"
                  onClick={handleLogout}
                >
                  Yes, Sign Out
                </button>
                <button
                  type="button"
                  className={styles.logoutCancelBtn}
                  onClick={() => setConfirmLogout(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className={styles.logoutBtn}
              id="sidebar-logout-btn"
              onClick={() => setConfirmLogout(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
