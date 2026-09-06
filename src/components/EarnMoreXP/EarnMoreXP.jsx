import styles from './EarnMoreXP.module.css'

const earnItems = [
  { id: 'watch',   icon: '👁️',  label: 'Watch & Earn',  xpReward: '+50 XP',  desc: 'Watch partner streams', color: '#8b5cf6' },
  { id: 'tasks',   icon: '✅',  label: 'Daily Tasks',   xpReward: '+120 XP', desc: '4 tasks remaining',    color: '#3b82f6' },
  { id: 'refer',   icon: '🤝',  label: 'Refer & Earn',  xpReward: '+250 XP', desc: 'Invite teammates',       color: '#10b981' },
  { id: 'catcher', icon: '💰',  label: 'XP Catcher',    xpReward: '+75 XP',  desc: 'Catch falling tokens',  color: '#f5ba31' },
  { id: 'games',   icon: '🎮',  label: 'Mini Games',    xpReward: '+180 XP', desc: 'Play arcade rounds',    color: '#ef4444' },
  { id: 'streak',  icon: '🎬',  label: 'Streak Bonus',  xpReward: '+100 XP', desc: 'Day 7 milestone',       color: '#f97316' },
]

export default function EarnMoreXP({ opportunities }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>EARN MORE</h2>
          <p className={styles.sectionSub}>Explore fun activities and earn exciting rewards.</p>
        </div>
        <button className={styles.viewAllBtn} type="button">
          View All Activities →
        </button>
      </div>

      <div className={styles.earnGrid}>
        {earnItems.map((item) => (
          <button className={styles.earnCard} key={item.id} type="button">
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle} style={{ background: `${item.color}22`, border: `1.5px solid ${item.color}44` }}>
                <span className={styles.earnIcon}>{item.icon}</span>
              </div>
              <span className={styles.xpPill} style={{ color: item.color, background: `${item.color}15` }}>
                {item.xpReward}
              </span>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.earnLabel}>{item.label}</span>
              <span className={styles.earnDesc}>{item.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
