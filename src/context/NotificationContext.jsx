import { createContext, useContext, useMemo } from 'react'
import { useUserState } from './UserStateContext'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const userState = useUserState()

  const notifications = userState?.notifications || []
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const markRead = (id) => {
    if (userState?.markNotificationRead) {
      userState.markNotificationRead(id)
    }
  }

  const markAllRead = () => {
    if (userState?.markAllNotificationsRead) {
      userState.markAllNotificationsRead()
    }
  }

  const addNotification = (notification) => {
    if (userState?.addNotification) {
      userState.addNotification(notification)
    }
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
