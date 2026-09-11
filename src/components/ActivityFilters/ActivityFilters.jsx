import styles from './ActivityFilters.module.css'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'xp', label: 'XP' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'games', label: 'Games' },
  { id: 'tasks', label: 'Tasks' },
]

export default function ActivityFilters({ active, onChange }) {
  return (
    <div className={styles.bar} role="tablist" aria-label="Activity filters">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={active === f.id}
          className={`${styles.pill} ${active === f.id ? styles.pillActive : ''}`}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
