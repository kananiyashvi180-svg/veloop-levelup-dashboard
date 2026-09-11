import { useState } from 'react'
import styles from './ActivityFeed.module.css'

const TaskIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)

const GameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="17" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="14" r="1" fill="currentColor" />
  </svg>
)

const StreakIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const ReferralIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const RewardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const WatchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const XpCatcherIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
)

const LevelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const allActivities = [
  {
    id: 'act-1',
    type: 'tasks',
    icon: <TaskIcon />,
    title: 'Daily Task Completed',
    description: 'Completed 3 daily challenges',
    amount: '+120 XP',
    amountType: 'xp',
    time: 'Today, 9:14 AM',
    timeGroup: 'Today',
    status: 'completed',
  },
  {
    id: 'act-2',
    type: 'games',
    icon: <XpCatcherIcon />,
    title: 'XP Catcher Played',
    description: 'Caught 18 orbs in one session',
    amount: '+75 XP',
    amountType: 'xp',
    time: 'Today, 8:02 AM',
    timeGroup: 'Today',
    status: 'completed',
  },
  {
    id: 'act-3',
    type: 'xp',
    icon: <WatchIcon />,
    title: 'Watch & Earn',
    description: 'Watched a sponsored video',
    amount: '+50 XP',
    amountType: 'xp',
    time: 'Today, 7:45 AM',
    timeGroup: 'Today',
    status: 'completed',
  },
  {
    id: 'act-4',
    type: 'xp',
    icon: <StreakIcon />,
    title: 'Daily Streak Bonus',
    description: '7-day streak maintained',
    amount: '+100 XP',
    amountType: 'xp',
    time: 'Yesterday, 11:59 PM',
    timeGroup: 'Yesterday',
    status: 'completed',
  },
  {
    id: 'act-5',
    type: 'tasks',
    icon: <TaskIcon />,
    title: 'Daily Missions Cleared',
    description: 'All 5 missions completed',
    amount: '+30 XP',
    amountType: 'xp',
    time: 'Yesterday, 6:30 PM',
    timeGroup: 'Yesterday',
    status: 'completed',
  },
  {
    id: 'act-6',
    type: 'xp',
    icon: <ReferralIcon />,
    title: 'Referral Bonus Earned',
    description: 'Friend joined via your link',
    amount: '+250 XP',
    amountType: 'xp',
    time: '2 days ago',
    timeGroup: '2 days ago',
    status: 'completed',
  },
  {
    id: 'act-7',
    type: 'games',
    icon: <GameIcon />,
    title: 'Mini Game Victory',
    description: 'Ranked #3 in today\'s leaderboard',
    amount: '+75 XP',
    amountType: 'xp',
    time: '2 days ago',
    timeGroup: '2 days ago',
    status: 'completed',
  },
  {
    id: 'act-8',
    type: 'rewards',
    icon: <RewardIcon />,
    title: 'Level Reward Unlocked',
    description: 'Reached Level 05 milestone',
    amount: '+500 VEs',
    amountType: 'ves',
    time: '3 days ago',
    timeGroup: '3 days ago',
    status: 'claimed',
  },
  {
    id: 'act-9',
    type: 'xp',
    icon: <LevelIcon />,
    title: 'Level Up!',
    description: 'Advanced to Level 05',
    amount: 'Level 05',
    amountType: 'level',
    time: '3 days ago',
    timeGroup: '3 days ago',
    status: 'completed',
  },
  {
    id: 'act-10',
    type: 'tasks',
    icon: <TaskIcon />,
    title: 'Weekly Challenge Done',
    description: 'Earned the weekly completion badge',
    amount: '+200 XP',
    amountType: 'xp',
    time: '5 days ago',
    timeGroup: '5 days ago',
    status: 'completed',
  },
  {
    id: 'act-11',
    type: 'rewards',
    icon: <RewardIcon />,
    title: 'Gem Pack Received',
    description: 'Milestone reward: 25 Gems',
    amount: '+25 Gems',
    amountType: 'gems',
    time: '5 days ago',
    timeGroup: '5 days ago',
    status: 'claimed',
  },
  {
    id: 'act-12',
    type: 'xp',
    icon: <WatchIcon />,
    title: 'Watch & Earn',
    description: 'Completed daily video session',
    amount: '+50 XP',
    amountType: 'xp',
    time: '7 days ago',
    timeGroup: '7 days ago',
    status: 'completed',
  },
]

function groupByTime(items) {
  const groups = []
  const seen = {}
  items.forEach((item) => {
    if (!seen[item.timeGroup]) {
      seen[item.timeGroup] = true
      groups.push({ label: item.timeGroup, items: [] })
    }
    groups[groups.length - 1].items.push(item)
  })
  return groups
}

export default function ActivityFeed({ filter, showAll = false, activities }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const liveItems = activities
    ? activities.map((a) => ({
        id: a.id,
        type: a.type?.toLowerCase() === 'game' ? 'games' : a.type?.toLowerCase() === 'tasks' || a.type?.toLowerCase() === 'daily task' ? 'tasks' : 'xp',
        icon: a.type?.toLowerCase() === 'game' ? <XpCatcherIcon /> : a.type?.toLowerCase() === 'referral' ? <ReferralIcon /> : <StreakIcon />,
        title: a.title,
        description: a.subtitle || '',
        amount: `+${a.xpAmount} XP`,
        amountType: 'xp',
        time: a.timestamp || 'Just now',
        timeGroup: a.timestamp || 'Just now',
        status: a.status || 'completed',
      }))
    : allActivities

  const rawList = showAll ? liveItems : liveItems.slice(0, 6)
  const filtered = filter === 'all'
    ? rawList
    : rawList.filter((a) => a.type === filter)

  const groups = groupByTime(filtered)


  if (filtered.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </span>
        <p className={styles.emptyText}>No activity in this category yet.</p>
      </div>
    )
  }

  return (
    <div className={styles.feed}>
      {groups.map((group) => (
        <div key={group.label} className={styles.group}>
          <div className={styles.groupLabel}>
            <span className={styles.groupLabelText}>{group.label}</span>
            <span className={styles.groupLine} />
          </div>

          <ul className={styles.list}>
            {group.items.map((item, i) => (
              <li
                key={item.id}
                className={styles.item}
                style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer' }}
                onClick={() => setSelectedItem(item)}
                title="Click to view details"
              >
                <span className={`${styles.iconWrap} ${styles[`icon-${item.type}`]}`}>
                  {item.icon}
                </span>

                <div className={styles.itemBody}>
                  <div className={styles.itemTop}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={`${styles.amount} ${styles[`amount-${item.amountType}`]}`}>
                      {item.amount}
                    </span>
                  </div>
                  <div className={styles.itemBottom}>
                    <span className={styles.itemDesc}>{item.description}</span>
                    <span className={styles.itemMeta}>
                      <span className={`${styles.statusDot} ${styles[`dot-${item.status}`]}`} />
                      <span className={styles.statusText}>{item.status}</span>
                      <span className={styles.metaSep}>·</span>
                      <span className={styles.timeText}>{item.time}</span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 22, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1f38, #0e1224)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '420px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#fbbf24', letterSpacing: '0.08em' }}>
                ACTIVITY RECEIPT
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#ffffff' }}>{selectedItem.title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>{selectedItem.description}</p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Reward Amount</span>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fbbf24' }}>{selectedItem.amount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
              <span>Status: <strong style={{ color: '#10b981' }}>{selectedItem.status}</strong></span>
              <span>Timestamp: {selectedItem.time}</span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
