import styles from './ActivitySummary.module.css'

const baseIcons = {
  xp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  rewards: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  streak: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  tasks: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
}

export default function ActivitySummary({ progression }) {
  const lifetimeXp = progression?.userSummary?.lifetimeXp ?? 6670
  const totalVEs = progression?.userSummary?.totalEarnedVEs ?? 1850
  const streak = progression?.userSummary?.longestStreak ?? 7
  const tasksCompleted = progression?.userSummary?.tasksCompleted ?? 4

  const summaryItems = [
    {
      id: 'xp-earned',
      label: 'XP Earned (Total)',
      value: lifetimeXp.toLocaleString(),
      unit: 'XP',
      delta: 'Active total',
      deltaUp: true,
      accent: 'purple',
      icon: baseIcons.xp,
    },
    {
      id: 'rewards-earned',
      label: 'Rewards Earned',
      value: totalVEs.toLocaleString(),
      unit: 'VEs',
      delta: 'Total balance',
      deltaUp: true,
      accent: 'gold',
      icon: baseIcons.rewards,
    },
    {
      id: 'streak',
      label: 'Current Streak',
      value: String(streak),
      unit: 'days',
      delta: 'Active streak',
      deltaUp: true,
      accent: 'orange',
      icon: baseIcons.streak,
    },
    {
      id: 'activities',
      label: 'Tasks Done',
      value: String(tasksCompleted),
      unit: 'total',
      delta: 'Completed',
      deltaUp: true,
      accent: 'green',
      icon: baseIcons.tasks,
    },
  ]

  return (
    <div className={styles.grid}>
      {summaryItems.map((item) => (
        <div key={item.id} className={`${styles.card} ${styles[`card-${item.accent}`]}`}>
          <div className={styles.cardTop}>
            <span className={`${styles.iconWrap} ${styles[`icon-${item.accent}`]}`}>
              {item.icon}
            </span>
            <span className={`${styles.delta} ${item.deltaUp ? styles.deltaUp : styles.deltaDown}`}>
              {item.deltaUp ? '↑' : '↓'} {item.delta}
            </span>
          </div>

          <div className={styles.valueRow}>
            <span className={`${styles.value} ${styles[`value-${item.accent}`]}`}>
              {item.value}
            </span>
            <span className={styles.unit}>{item.unit}</span>
          </div>

          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
