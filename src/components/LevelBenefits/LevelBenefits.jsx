import styles from './LevelBenefits.module.css'

const benefits = [
  {
    id: 'xp-limit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Higher daily XP limit',
    detail: '+200 XP cap unlocked',
    accent: 'gold',
  },
  {
    id: 'new-challenges',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: 'Access to new challenges',
    detail: '3 new missions available',
    accent: 'purple',
  },
  {
    id: 'better-rewards',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: 'Better reward opportunities',
    detail: '1.15x VE earning multiplier',
    accent: 'gold',
  },
]

export default function LevelBenefits() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>LEVEL 05 BENEFITS</span>
        <span className={styles.sectionLine} />
      </div>

      <ul className={styles.list}>
        {benefits.map((benefit, i) => (
          <li
            key={benefit.id}
            className={styles.item}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className={`${styles.iconWrap} ${styles[`icon-${benefit.accent}`]}`}>
              {benefit.icon}
            </span>
            <div className={styles.textGroup}>
              <span className={styles.title}>{benefit.title}</span>
              <span className={styles.detail}>{benefit.detail}</span>
            </div>
            <span className={styles.checkmark}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
