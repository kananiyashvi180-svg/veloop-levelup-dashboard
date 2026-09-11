import { useEffect, useRef } from 'react'
import { useNotifications } from '../../context/NotificationContext'
import styles from './NotificationPanel.module.css'

const typeIcons = {
  xp: '⚡',
  level: '🚀',
  reward: '🎁',
  game: '🎮',
  daily: '🌟'
}

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.panel} ref={panelRef} role="dialog" aria-label="Notifications">
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.headerTitle}>Notifications</span>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
        </div>
        <div className={styles.headerActions}>
          {unreadCount > 0 && (
            <button type="button" className={styles.markAllBtn} onClick={markAllRead}>
              Mark all read
            </button>
          )}
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close notifications">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔔</span>
            <span className={styles.emptyText}>All caught up!</span>
          </div>
        )}
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
            onClick={() => markRead(n.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && markRead(n.id)}
          >
            <div className={`${styles.iconWrap} ${styles[`type_${n.type}`]}`}>
              <span className={styles.notifIcon}>{n.icon || typeIcons[n.type] || '🔔'}</span>
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTop}>
                <span className={styles.itemTitle}>{n.title}</span>
                {!n.read && <span className={styles.dot} />}
              </div>
              <p className={styles.itemBody}>{n.body}</p>
              <span className={styles.itemTime}>{n.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
