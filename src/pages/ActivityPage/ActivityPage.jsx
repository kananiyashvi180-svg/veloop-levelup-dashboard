import React, { useState, useMemo } from 'react'
import {
  Activity,
  Zap,
  Coins,
  Gem,
  Gift,
  Crown,
  Gamepad2,
  Calendar,
  CheckCircle2,
  Award
} from 'lucide-react'
import styles from './ActivityPage.module.css'

export default function ActivityPage({ progression, activities = [] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [timeframe, setTimeframe] = useState('7d')

  // Filter activities dynamically based on active filter
  const filteredActivities = useMemo(() => {
    if (!activities || activities.length === 0) return []
    if (activeFilter === 'all') return activities

    return activities.filter((act) => {
      const type = (act.type || '').toLowerCase()
      const title = (act.title || '').toLowerCase()

      if (activeFilter === 'xp') {
        return type.includes('xp') || type.includes('task') || act.xpAmount > 0
      }
      if (activeFilter === 'ves') {
        return type.includes('ve') || title.includes('ve') || act.vesAmount > 0
      }
      if (activeFilter === 'gems') {
        return type.includes('gem') || title.includes('gem') || act.gemsAmount > 0
      }
      if (activeFilter === 'rewards') {
        return type.includes('reward') || title.includes('claim') || type.includes('milestone')
      }
      return true
    })
  }, [activities, activeFilter])

  return (
    <div className={styles.pageContainer}>
      {/* Activity Page Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <Activity size={22} className={styles.headerIcon} aria-hidden="true" />
            <h1 className={styles.title}>Activity</h1>
          </div>
          <p className={styles.subtitle}>All your recent actions and rewards</p>
        </div>

        {/* Timeframe Dropdown */}
        <div className={styles.timeframePill}>
          <Calendar size={14} className={styles.calIcon} aria-hidden="true" />
          <select
            className={styles.timeframeSelect}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="14d">Last 14 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </header>

      {/* Filter Tabs: All, XP, VEs, Gems, Rewards */}
      <div className={styles.filtersBar}>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterActive : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'xp' ? styles.filterActive : ''}`}
          onClick={() => setActiveFilter('xp')}
        >
          XP
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'ves' ? styles.filterActive : ''}`}
          onClick={() => setActiveFilter('ves')}
        >
          VEs
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'gems' ? styles.filterActive : ''}`}
          onClick={() => setActiveFilter('gems')}
        >
          Gems
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'rewards' ? styles.filterActive : ''}`}
          onClick={() => setActiveFilter('rewards')}
        >
          Rewards
        </button>
      </div>

      {/* Timeline Cards List */}
      <div className={styles.timelineList}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((item) => (
            <div key={item.id} className={styles.timelineCard}>
              {/* Activity Category Icon */}
              <div className={`${styles.iconContainer} ${getCategoryStyle(item)}`}>
                {renderActivityIcon(item)}
              </div>

              {/* Title & Subtitle */}
              <div className={styles.cardContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemSubtitle}>{item.subtitle || item.description}</p>
              </div>

              {/* Timestamp & Delta Badges */}
              <div className={styles.cardMeta}>
                <span className={styles.itemTime}>{item.timestamp || item.time || 'Just now'}</span>
                {item.xpAmount > 0 && (
                  <span className={styles.xpDelta}>+{item.xpAmount} XP</span>
                )}
                {item.vesAmount > 0 && (
                  <span className={styles.vesDelta}>+{item.vesAmount} VEs</span>
                )}
                {item.gemsAmount > 0 && (
                  <span className={styles.gemsDelta}>+{item.gemsAmount} Gems</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyCard}>
            <p>No activity found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function renderActivityIcon(item) {
  const type = (item.type || '').toLowerCase()
  const title = (item.title || '').toLowerCase()

  if (type.includes('level') || title.includes('level')) {
    return <Crown size={18} aria-hidden="true" />
  }
  if (type.includes('task') || type.includes('xp') || title.includes('xp')) {
    return <Zap size={18} aria-hidden="true" />
  }
  if (type.includes('reward') || title.includes('reward')) {
    return <Gift size={18} aria-hidden="true" />
  }
  if (type.includes('game') || title.includes('game')) {
    return <Gamepad2 size={18} aria-hidden="true" />
  }
  if (type.includes('ve') || title.includes('ve')) {
    return <Coins size={18} aria-hidden="true" />
  }
  if (type.includes('gem') || title.includes('gem')) {
    return <Gem size={18} aria-hidden="true" />
  }
  return <Award size={18} aria-hidden="true" />
}

function getCategoryStyle(item) {
  const type = (item.type || '').toLowerCase()
  const title = (item.title || '').toLowerCase()

  if (type.includes('level') || title.includes('level')) return styles.iconLevel
  if (type.includes('task') || type.includes('xp') || title.includes('xp')) return styles.iconXp
  if (type.includes('reward') || title.includes('reward')) return styles.iconReward
  if (type.includes('game') || title.includes('game')) return styles.iconGame
  if (type.includes('ve') || title.includes('ve')) return styles.iconVe
  if (type.includes('gem') || title.includes('gem')) return styles.iconGem
  return styles.iconDefault
}
