import styles from './AppHeader.module.css'

export default function AppHeader({ progression, onOpenMenu }) {
  const currentLevel = progression?.currentLevel || 4
  const userSummary = progression?.userSummary

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onOpenMenu}
          aria-label="Open menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={styles.greetingBlock}>
          <h1 className={styles.greeting}>Good Morning, VeLooper! 👋</h1>
          <p className={styles.subtitle}>Level up your journey and unlock epic rewards every day.</p>
        </div>
      </div>

      <div className={styles.rightActions}>
        <div className={styles.statPill}>
          <span className={styles.statPillIcon}>⚡</span>
          <span className={styles.statPillText}>Level {String(currentLevel).padStart(2, '0')}</span>
        </div>

        <div className={styles.balancePill}>
          <span className={styles.balanceIcon}>🪙</span>
          <span className={styles.balanceAmount}>{userSummary?.totalEarnedVEs?.toLocaleString() || '1,850'}</span>
          <span className={styles.balanceUnit}>VEs</span>
        </div>

        <button className={styles.bellBtn} aria-label="Notifications" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.bellDot} />
        </button>

        <div className={styles.profileBadge}>
          <img
            className={styles.profileAvatar}
            src={userSummary?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile"
          />
        </div>
      </div>
    </header>
  )
}
