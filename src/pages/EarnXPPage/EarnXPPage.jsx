import { useState, useMemo } from 'react'
import { useUserState } from '../../context/UserStateContext'
import styles from './EarnXPPage.module.css'

const initialTasks = [
  {
    id: 'checkin',
    title: 'Daily Check-In & Streak Boost',
    desc: 'Check in today to maintain your 7-day streak and active 2.5X multiplier.',
    xp: 100,
    icon: '🔥',
    badge: 'Daily',
    color: '#f97316',
    actionText: 'Claim +100 XP',
  },
  {
    id: 'catcher',
    title: 'Play XP Catcher Mini-Game',
    desc: 'Jump into the 20s arcade round and catch falling XP Orbs & VE coins.',
    xp: 75,
    icon: '🎮',
    badge: 'Arcade',
    color: '#3b82f6',
    actionText: 'Play Game Now',
    isGame: true,
  },
  {
    id: 'watch',
    title: 'Watch Partner Showcase',
    desc: 'Preview the 15-second teaser for upcoming VELOOP Season drops.',
    xp: 50,
    icon: '👁️',
    badge: 'Quick',
    color: '#8b5cf6',
    actionText: 'Watch & Claim +50 XP',
  },
  {
    id: 'refer',
    title: 'Invite Teammates & Friends',
    desc: 'Share your exclusive link with friends. Both of you earn bonus XP when they join.',
    xp: 250,
    icon: '🤝',
    badge: 'High Yield',
    color: '#10b981',
    actionText: 'Copy Link & Claim +250 XP',
  },
  {
    id: 'survey',
    title: 'Quick Community Feedback',
    desc: 'Give a 1-tap rating on the new dashboard design to help us improve.',
    xp: 75,
    icon: '⭐',
    badge: 'Instant',
    color: '#f59e0b',
    actionText: 'Submit Rating & Claim +75 XP',
  },
  {
    id: 'milestone',
    title: 'Daily Milestone Power-Up',
    desc: 'Complete 3 daily actions to trigger this extra XP bonus.',
    xp: 150,
    icon: '⚡',
    badge: 'Bonus',
    color: '#ec4899',
    actionText: 'Claim +150 XP',
  },
]

export default function EarnXPPage({ progression, onEarnXP, onNavigate }) {
  const userState = useUserState()
  const [watchingId, setWatchingId] = useState(null)

  const currentLevel = progression?.currentLevel ?? 4
  const nextLevel = progression?.nextLevel ?? 5
  const currentXp = progression?.currentXp ?? 2170
  const requiredXp = progression?.requiredXp ?? 3500
  const xpRemaining = progression?.xpRemaining ?? (requiredXp - currentXp)
  const username = progression?.userSummary?.username || 'AlexRider'
  const completedTaskIds = userState?.completedTaskIds || ['checkin']

  const tasks = useMemo(() => {
    return initialTasks.map((t) => ({
      ...t,
      completed: completedTaskIds.includes(t.id)
    }))
  }, [completedTaskIds])

  const handleTaskAction = (task) => {
    if (task.completed) return

    if (task.isGame) {
      if (onNavigate) onNavigate('play-earn')
      return
    }

    if (task.id === 'watch') {
      setWatchingId(task.id)
      setTimeout(() => {
        setWatchingId(null)
        if (userState?.completeTask) {
          userState.completeTask(task.id, task.xp, task.title)
        } else if (onEarnXP) {
          onEarnXP(task.xp, task.title)
        }
      }, 1500)
      return
    }

    if (task.id === 'refer') {
      navigator.clipboard?.writeText(`https://veloop.io/join/${username}`)
      if (userState?.completeTask) {
        userState.completeTask(task.id, task.xp, 'Referral Link Copied')
      } else if (onEarnXP) {
        onEarnXP(task.xp, 'Referral Link Copied')
      }
      return
    }

    if (userState?.completeTask) {
      userState.completeTask(task.id, task.xp, task.title)
    } else if (onEarnXP) {
      onEarnXP(task.xp, task.title)
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.titleGroup}>
            <span className={styles.headerIcon}>⚡</span>
            <div>
              <h1 className={styles.title}>Earn More XP</h1>
              <p className={styles.subtitle}>Complete quick activities to accelerate your level progression.</p>
            </div>
          </div>

          <div className={styles.statsPill}>
            <span className={styles.statsPillLabel}>Tasks Done Today</span>
            <span className={styles.statsPillVal}>{completedCount} / {tasks.length}</span>
          </div>
        </div>

        <div className={styles.progressionBanner}>
          <div className={styles.bannerInfo}>
            <span className={styles.bannerLabel}>Active Level {String(currentLevel).padStart(2, '0')} Progress</span>
            <span className={styles.bannerXp}>
              <strong>{currentXp.toLocaleString()}</strong> / {requiredXp.toLocaleString()} XP
              <span className={styles.bannerRemaining}>({xpRemaining.toLocaleString()} XP needed for Level {String(nextLevel).padStart(2, '0')})</span>
            </span>
          </div>
          <div className={styles.bannerTrack}>
            <div
              className={styles.bannerBar}
              style={{ width: `${Math.min(100, (currentXp / requiredXp) * 100)}%` }}
            />
          </div>
        </div>
      </header>

      <div className={styles.taskGrid}>
        {tasks.map((task) => {
          const isWatching = watchingId === task.id
          return (
            <div
              key={task.id}
              className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ''}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: `${task.color}22`, border: `1px solid ${task.color}44` }}>
                  <span>{task.icon}</span>
                </div>
                <div className={styles.badgeGroup}>
                  <span className={styles.categoryBadge} style={{ color: task.color, borderColor: `${task.color}55` }}>
                    {task.badge}
                  </span>
                  <span className={styles.xpRewardBadge}>+{task.xp} XP</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <p className={styles.taskDesc}>{task.desc}</p>
              </div>

              <div className={styles.cardAction}>
                <button
                  type="button"
                  className={`${styles.actionBtn} ${task.completed ? styles.actionBtnDone : ''}`}
                  onClick={() => handleTaskAction(task)}
                  disabled={task.completed || isWatching}
                >
                  {isWatching ? (
                    <span className={styles.loadingSpinner}>Watching Preview...</span>
                  ) : task.completed ? (
                    <span>✓ Claimed (+{task.xp} XP)</span>
                  ) : (
                    <span>{task.actionText}</span>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
