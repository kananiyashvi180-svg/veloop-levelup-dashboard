import { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext(null)

const NOTIF_KEY = 'veloop_notifications'

const seedNotifications = [
  {
    id: 'notif-001',
    type: 'xp',
    icon: '⚡',
    title: '+50 XP Earned',
    body: 'Daily Task Completed — Goal: Reach 10k steps sync',
    timestamp: 'Yesterday, 5:48 PM',
    read: false
  },
  {
    id: 'notif-002',
    type: 'level',
    icon: '🚀',
    title: 'Almost at Level 05!',
    body: 'You need only 1,580 XP more to unlock Vanguard Master tier.',
    timestamp: 'Yesterday, 4:20 PM',
    read: false
  },
  {
    id: 'notif-003',
    type: 'reward',
    icon: '🎁',
    title: 'New Reward Unlocked',
    body: 'Gold Tier Exclusive Drop is now available. Claim before it expires!',
    timestamp: 'Sep 9, 3:00 PM',
    read: false
  },
  {
    id: 'notif-004',
    type: 'game',
    icon: '🎮',
    title: 'XP Catcher Reward',
    body: 'You earned +25 XP from your last XP Catcher run. Keep it up!',
    timestamp: 'Sep 8, 11:45 AM',
    read: true
  },
  {
    id: 'notif-005',
    type: 'daily',
    icon: '🌟',
    title: 'Daily XP Opportunity',
    body: 'Your daily earning window is open. Play, complete tasks, or refer a friend.',
    timestamp: 'Sep 8, 9:00 AM',
    read: true
  }
]

function loadNotifications() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIF_KEY))
    if (stored && Array.isArray(stored) && stored.length > 0) return stored
    return seedNotifications
  } catch {
    return seedNotifications
  }
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => loadNotifications())

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: 'Just now',
      ...notif
    }
    setNotifications((prev) => [newNotif, ...prev])
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}
