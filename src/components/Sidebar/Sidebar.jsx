import React from 'react'
import {
  Home,
  Gift,
  Gamepad2,
  Activity,
  Crown,
  User,
  X
} from 'lucide-react'
import { CrystalCluster } from '../DashboardMockupAssets/DashboardVisuals'
import styles from './Sidebar.module.css'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'play-earn', label: 'Play & Earn', icon: Gamepad2 },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'level', label: 'Level', icon: Crown },
  { id: 'profile', label: 'Profile', icon: User },
]

export default function Sidebar({
  isOpen,
  onClose,
  activeSection = 'home',
  onSelectSection
}) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Mobile close button */}
        <div className={styles.mobileCloseBar}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon

            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`}
                onClick={() => {
                  if (onSelectSection) onSelectSection(item.id)
                  if (onClose) onClose()
                }}
              >
                <Icon size={19} className={styles.navIcon} aria-hidden="true" />
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Crystal Graphic & Motivation Text */}
        <div className={styles.sidebarFooterGraphic}>
          <div className={styles.crystalWrap}>
            <CrystalCluster size={105} />
          </div>
          <div className={styles.footerTexts}>
            <span className={styles.textLine}>Higher Levels</span>
            <span className={styles.textLine}>Bigger Rewards</span>
            <span className={styles.textLineBright}>Keep Going</span>
          </div>
        </div>
      </aside>
    </>
  )
}
