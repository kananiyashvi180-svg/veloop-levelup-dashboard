import { useState } from 'react'
import styles from './EarnMoreXP.module.css'

const earnItems = [
  { id: 'watch',   icon: '👁️',  label: 'Watch & Earn',  xpReward: 50,  desc: 'Watch partner streams', color: '#8b5cf6' },
  { id: 'tasks',   icon: '✅',  label: 'Daily Tasks',   xpReward: 120, desc: '4 tasks remaining',    color: '#3b82f6' },
  { id: 'refer',   icon: '🤝',  label: 'Refer & Earn',  xpReward: 250, desc: 'Invite teammates',       color: '#10b981' },
  { id: 'catcher', icon: '💰',  label: 'XP Catcher',    xpReward: 75,  desc: 'Catch falling tokens',  color: '#f5ba31' },
  { id: 'games',   icon: '🎮',  label: 'Mini Games',    xpReward: 180, desc: 'Play arcade rounds',    color: '#ef4444' },
  { id: 'streak',  icon: '🎬',  label: 'Streak Bonus',  xpReward: 100, desc: 'Day 7 milestone',       color: '#f97316' },
]

export default function EarnMoreXP({ opportunities, onNavigate, onEarnXP }) {
  const [claimedCards, setClaimedCards] = useState({})

  const handleCardClick = (item) => {
    if (item.id === 'catcher' || item.id === 'games') {
      if (onNavigate) onNavigate('play-earn')
      return
    }

    if (item.id === 'tasks') {
      if (onNavigate) onNavigate('earn-xp')
      return
    }

    if (claimedCards[item.id]) return

    setClaimedCards((prev) => ({ ...prev, [item.id]: true }))

    if (item.id === 'refer') {
      navigator.clipboard?.writeText('https://veloop.io/join/AlexRider')
    }

    if (onEarnXP) {
      onEarnXP(item.xpReward, item.label)
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>EARN MORE</h2>
          <p className={styles.sectionSub}>Explore fun activities and earn exciting rewards.</p>
        </div>
        <button
          className={styles.viewAllBtn}
          type="button"
          onClick={() => onNavigate && onNavigate('earn-xp')}
          id="earn-more-view-all-btn"
        >
          View All Activities →
        </button>
      </div>

      <div className={styles.earnGrid}>
        {earnItems.map((item) => {
          const isClaimed = claimedCards[item.id]
          return (
            <button
              className={styles.earnCard}
              key={item.id}
              type="button"
              onClick={() => handleCardClick(item)}
              style={isClaimed ? { borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.08)' } : undefined}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle} style={{ background: `${item.color}22`, border: `1.5px solid ${item.color}44` }}>
                  <span className={styles.earnIcon}>{item.icon}</span>
                </div>
                <span
                  className={styles.xpPill}
                  style={isClaimed ? { color: '#10b981', background: 'rgba(16, 185, 129, 0.2)' } : { color: item.color, background: `${item.color}15` }}
                >
                  {isClaimed ? '✓ Claimed' : `+${item.xpReward} XP`}
                </span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.earnLabel}>{item.label}</span>
                <span className={styles.earnDesc}>{item.desc}</span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

