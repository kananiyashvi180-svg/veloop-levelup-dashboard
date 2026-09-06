import styles from './TodaysBoost.module.css'

const boostItems = (progression) => [
  {
    icon: '⭐',
    label: 'XP Earned Today',
    value: '215 XP',
    badge: '+12%',
    iconBg: '#f5ba31',
  },
  {
    icon: '📋',
    label: 'Tasks Completed',
    value: '4 / 8',
    badge: '50%',
    iconBg: '#3b82f6',
  },
  {
    icon: '🔥',
    label: 'Current Streak',
    value: '7 Days',
    badge: 'Active',
    iconBg: '#ef4444',
  },
]

export default function TodaysBoost({ progression }) {
  const items = boostItems(progression)

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
    </section>
  )
}
