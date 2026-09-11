import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { levelProgressionData, xpActivityData } from '../data/levelData'
import { useAuth } from './AuthContext'

const UserStateContext = createContext(null)

function getProgressionKey(userId) {
  return `veloop_progression_${userId}`
}

function getProfileKey(userId) {
  return `veloop_user_profile_${userId}`
}

function loadProgression(userId) {
  try {
    const stored = JSON.parse(localStorage.getItem(getProgressionKey(userId)))
    if (stored) return stored
  } catch {}
  return {
    currentLevel: levelProgressionData.currentLevel,
    currentXp: levelProgressionData.currentXp,
    requiredXp: levelProgressionData.requiredXp,
    totalEarnedVEs: levelProgressionData.userSummary.totalEarnedVEs,
    totalGems: levelProgressionData.userSummary.totalGems,
    activities: xpActivityData
  }
}

function loadProfile(userId, fullName) {
  try {
    const stored = JSON.parse(localStorage.getItem(getProfileKey(userId)))
    if (stored) return stored
  } catch {}
  return {
    avatarId: 'vanguard',
    bio: 'Pushing for Level 5 Vanguard Master • Daily Streak Hunter ⚡',
    username: fullName || 'VeLooper',
    tag: '#VEL-7402',
    rank: 'Gold Tier'
  }
}

export function UserStateProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.userId

  const [progression, setProgression] = useState(() =>
    userId ? loadProgression(userId) : loadProgression('guest')
  )
  const [userProfile, setUserProfile] = useState(() =>
    userId ? loadProfile(userId, user?.fullName) : loadProfile('guest', 'VeLooper')
  )
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [levelUpData, setLevelUpData] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)
  const [pendingNotification, setPendingNotification] = useState(null)

  useEffect(() => {
    if (userId) {
      const p = loadProgression(userId)
      const pr = loadProfile(userId, user?.fullName)
      setProgression(p)
      setUserProfile(pr)
    }
  }, [userId, user?.fullName])

  useEffect(() => {
    if (userId) {
      localStorage.setItem(getProgressionKey(userId), JSON.stringify(progression))
    }
  }, [progression, userId])

  useEffect(() => {
    if (userId) {
      localStorage.setItem(getProfileKey(userId), JSON.stringify(userProfile))
    }
  }, [userProfile, userId])

  const showToast = useCallback((text, type = 'xp') => {
    setToastMsg({ text, type })
    setTimeout(() => setToastMsg(null), 3500)
  }, [])

  const earnXP = useCallback((amount, source = 'Bonus XP', category = 'Tasks') => {
    let didLevelUp = false
    let newLevel = 0
    setProgression((prev) => {
      const newXp = prev.currentXp + amount
      const isLevelUp = newXp >= prev.requiredXp
      let updatedLevel = prev.currentLevel
      let updatedRequiredXp = prev.requiredXp
      let currentXpInLevel = newXp

      if (isLevelUp) {
        updatedLevel = prev.currentLevel + 1
        updatedRequiredXp = Math.round(prev.requiredXp * 1.5)
        currentXpInLevel = newXp - prev.requiredXp
        didLevelUp = true
        newLevel = updatedLevel
      }

      const xpRemaining = Math.max(0, updatedRequiredXp - currentXpInLevel)
      const xpPercentage = Math.min(100, Math.round((currentXpInLevel / updatedRequiredXp) * 1000) / 10)

      const newActivity = {
        id: `act-${Date.now()}`,
        type: category,
        title: source,
        subtitle: `Instant reward processed • ${category}`,
        xpAmount: amount,
        timestamp: 'Just now',
        status: 'completed'
      }

      return {
        ...prev,
        currentLevel: updatedLevel,
        currentXp: currentXpInLevel,
        requiredXp: updatedRequiredXp,
        xpRemaining,
        xpPercentage,
        totalEarnedVEs: isLevelUp ? prev.totalEarnedVEs + 500 : prev.totalEarnedVEs,
        activities: [newActivity, ...prev.activities]
      }
    })

    if (didLevelUp) {
      setTimeout(() => {
        setLevelUpData({ newLevel })
        setShowLevelUpModal(true)
      }, 50)
    }

    showToast(`+${amount} XP (${source})`, 'xp')

    setPendingNotification({
      type: 'xp',
      icon: '⚡',
      title: `+${amount} XP Earned`,
      body: `${source} • ${category}`
    })
  }, [showToast])

  const earnVEs = useCallback((amount) => {
    setProgression((prev) => ({ ...prev, totalEarnedVEs: prev.totalEarnedVEs + amount }))
  }, [])

  const earnGems = useCallback((amount) => {
    setProgression((prev) => ({ ...prev, totalGems: prev.totalGems + amount }))
  }, [])

  const spendVEs = useCallback((amount) => {
    setProgression((prev) => ({ ...prev, totalEarnedVEs: Math.max(0, prev.totalEarnedVEs - amount) }))
  }, [])

  const updateUserProfile = useCallback((fields) => {
    setUserProfile((prev) => ({ ...prev, ...fields }))
  }, [])

  const closeLevelUpModal = useCallback(() => {
    setShowLevelUpModal(false)
    setLevelUpData(null)
  }, [])

  const claimLevelUpReward = useCallback(() => {
    earnVEs(500)
    earnGems(25)
    showToast('🎉 Level Up Milestone Bonus! (+500 VEs & +25 Gems)', 'milestone')
    closeLevelUpModal()
  }, [earnVEs, earnGems, showToast, closeLevelUpModal])

  const claimReward = useCallback((reward) => {
    if (reward.cost && reward.cost > 0) spendVEs(reward.cost)
    if (reward.amount && reward.amount.includes('VEs')) {
      earnVEs(parseInt(reward.amount.replace(/\D/g, '')) || 500)
    }
    if (reward.amount && reward.amount.includes('Gems')) {
      earnGems(parseInt(reward.amount.replace(/\D/g, '')) || 25)
    }
    showToast(`Unlocked: ${reward.title}!`, 'reward')
  }, [spendVEs, earnVEs, earnGems, showToast])

  const consumePendingNotification = useCallback(() => {
    const n = pendingNotification
    setPendingNotification(null)
    return n
  }, [pendingNotification])

  const xpPercentage = Math.min(100, Math.round((progression.currentXp / progression.requiredXp) * 100 * 10) / 10)
  const xpRemaining = Math.max(0, progression.requiredXp - progression.currentXp)

  const activeProgression = {
    currentLevel: progression.currentLevel,
    currentXp: progression.currentXp,
    requiredXp: progression.requiredXp,
    nextLevel: progression.currentLevel + 1,
    xpRemaining,
    xpPercentage,
    userSummary: {
      ...userProfile,
      totalEarnedVEs: progression.totalEarnedVEs,
      totalGems: progression.totalGems
    }
  }

  return (
    <UserStateContext.Provider value={{
      progression,
      activeProgression,
      userProfile,
      activities: progression.activities,
      showLevelUpModal,
      levelUpData,
      toastMsg,
      pendingNotification,
      consumePendingNotification,
      earnXP,
      earnVEs,
      earnGems,
      spendVEs,
      claimReward,
      claimLevelUpReward,
      closeLevelUpModal,
      updateUserProfile,
      setShowLevelUpModal
    }}>
      {children}
    </UserStateContext.Provider>
  )
}

export function useUserState() {
  return useContext(UserStateContext)
}
