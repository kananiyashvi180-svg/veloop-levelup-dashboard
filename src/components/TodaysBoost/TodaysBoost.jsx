import { useState } from 'react'
import styles from './TodaysBoost.module.css'

const boostItems = (progression, isClaimed) => [
  {
    icon: '⭐',
    label: 'XP Earned Today',
    value: isClaimed ? '365 XP' : '215 XP',
    badge: isClaimed ? '+38%' : '+12%',
    iconBg: '#f5ba31',
  },
  {
    icon: '📋',
    label: 'Tasks Completed',
    value: isClaimed ? '5 / 8' : '4 / 8',
    badge: isClaimed ? '62%' : '50%',
    iconBg: '#3b82f6',
  },
  {
    icon: '🔥',
    label: 'Current Streak',
    value: '7 Days',
    badge: 'Active 2.5X',
    iconBg: '#ef4444',
  },
]

export default function TodaysBoost({ progression, onClaimBoost }) {
  const [claimed, setClaimed] = useState(false)
  const items = boostItems(progression, claimed)

  const handleClaim = () => {
    if (claimed) return
    setClaimed(true)
    if (onClaimBoost) {
      onClaimBoost(150, "Today's 2.5X Streak Boost")
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <span className={styles.sectionIcon}>⚡</span>
          <h2 className={styles.sectionTitle}>TODAY'S BOOST</h2>
        </div>
        <span className={styles.boostStatus}>Daily Reset in 4h 12m</span>
      </div>

      <div className={styles.boostGrid}>
        {items.map((item) => (
          <div className={styles.boostCard} key={item.label}>
            <div className={styles.cardTop}>
              <div className={styles.iconWrap} style={{ background: `${item.iconBg}22`, border: `1px solid ${item.iconBg}44` }}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <span className={styles.badge} style={{ color: item.iconBg, background: `${item.iconBg}18` }}>
                {item.badge}
              </span>
            </div>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>{item.value}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.claimBoostBtn} ${claimed ? styles.claimedBoostBtn : ''}`}
        onClick={handleClaim}
        disabled={claimed}
        id="claim-todays-boost-btn"
      >
        {claimed ? '✓ Boost Active: +150 XP Claimed' : '⚡ Claim Today\'s 2.5X Boost (+150 XP)'}
      </button>
    </section>
  )
}

