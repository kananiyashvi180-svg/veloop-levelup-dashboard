import React from 'react'
import { Home, Gift, Gamepad2, Activity, User } from 'lucide-react'
import styles from './BottomNav.module.css'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'play-earn', label: 'Play', icon: Gamepad2 },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'profile', label: 'Profile', icon: User },
]

export default function BottomNav({ activeSection = 'home', onSelectSection }) {
  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {navItems.map((item) => {
        const isActive =
          activeSection === item.id ||
          (activeSection === 'home' && item.id === 'home')
        const Icon = item.icon

        return (
          <button
            key={item.id}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            type="button"
            aria-label={item.label}
            onClick={() => onSelectSection && onSelectSection(item.id)}
          >
            <span className={styles.navIconWrap}>
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className={styles.navLabel}>{item.label}</span>
            {isActive && <span className={styles.activeGlowDot} />}
          </button>
        )
      })}
    </nav>
  )
}
