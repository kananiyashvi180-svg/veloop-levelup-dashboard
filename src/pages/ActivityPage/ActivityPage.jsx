import { useState } from 'react'
import ActivitySummary from '../../components/ActivitySummary/ActivitySummary'
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed'
import ActivityFilters from '../../components/ActivityFilters/ActivityFilters'
import styles from './ActivityPage.module.css'

export default function ActivityPage({ progression, activities }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>

        <header className={styles.pageHeader}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <span className={styles.titleIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </span>
              <h1 className={styles.title}>Activity</h1>
            </div>
            <p className={styles.subtitle}>Track your XP, rewards and recent progress.</p>
          </div>

          <div className={styles.periodPill}>
            <span className={styles.periodDot} />
            <span className={styles.periodLabel}>Last 30 days</span>
          </div>
        </header>

        <ActivitySummary progression={progression} />

        <section className={styles.feedSection}>
          <div className={styles.feedHeader}>
            <div className={styles.feedTitleGroup}>
              <h2 className={styles.feedTitle}>Recent Activity</h2>
              <span className={styles.feedCount}>{activities ? `${showAll ? activities.length : Math.min(6, activities.length)} events` : showAll ? '12 events' : '6 recent'}</span>
            </div>
            <ActivityFilters active={activeFilter} onChange={setActiveFilter} />
          </div>

          <ActivityFeed filter={activeFilter} showAll={showAll} activities={activities} />
        </section>

        <div className={styles.viewAllRow}>
          <button
            className={styles.viewAllBtn}
            type="button"
            onClick={() => setShowAll(!showAll)}
            id="activity-view-all-btn"
          >
            <span>{showAll ? 'Show Fewer Events' : 'View Full History (12 Events)'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
