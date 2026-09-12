import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { getLevelConfig, getNextLevelConfig } from '../data/levelConfig'
import { useAuth } from './AuthContext'

const UserStateContext = createContext(null)

const INITIAL_ACTIVITIES = []
const INITIAL_NOTIFICATIONS = []
const INITIAL_UNLOCKED_REWARDS = []
const INITIAL_CLAIMED_REWARDS = []

function getStorageKey(userId) {
  return `veloop_progression_state_${userId || 'default'}`
}

function createDefaultState(userId, fullName, email) {
  return {
    userName: fullName || 'AlexRider',
    email: email || 'alex@veloop.io',
    avatarId: 'vanguard',
    bio: '',
    tag: '#VEL-7402',
    rank: 'Gold Tier',
    currentLevel: 1,
    currentXp: 0,
    totalXp: 0,
    ves: 0,
    gems: 0,
    currentStreak: 0,
    tasksCompleted: 0,
    completedTaskIds: [],
    xpEarnedToday: 0,
    todaysBoostClaimed: false,
    gamesPlayed: 0,
    totalGameScore: 0,
    miniGameHighScore: 0,
    activities: INITIAL_ACTIVITIES,
    notifications: INITIAL_NOTIFICATIONS,
    unlockedRewards: INITIAL_UNLOCKED_REWARDS,
    claimedRewards: INITIAL_CLAIMED_REWARDS,
    lastActiveDate: new Date().toISOString().split('T')[0]
  }
}

function loadState(userId, fullName, email) {
  try {
    const raw = localStorage.getItem(getStorageKey(userId))
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.currentLevel === 'number') {
        if (fullName && (!parsed.userName || parsed.userName === 'VeLooper' || parsed.userName === 'AlexRider')) {
          parsed.userName = fullName
        }
        if (email && (!parsed.email || parsed.email === 'alex@veloop.io')) {
          parsed.email = email
        }
        return parsed
      }
    }
  } catch {}
  return createDefaultState(userId, fullName, email)
}

export function UserStateProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.userId || 'guest'
  const fullName = user?.fullName
  const email = user?.email

  const [state, setState] = useState(() => loadState(userId, fullName, email))
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [levelUpData, setLevelUpData] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)

  useEffect(() => {
    setState(loadState(userId, fullName, email))
  }, [userId, fullName, email])

  useEffect(() => {
    if (!user) return
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(state))
    } catch {}
  }, [state, user, userId])

  const showToast = useCallback((text, type = 'xp') => {
    setToastMsg({ text, type })
    const timer = setTimeout(() => setToastMsg(null), 3200)
    return () => clearTimeout(timer)
  }, [])

  const currentLevelConfig = useMemo(() => getLevelConfig(state.currentLevel), [state.currentLevel])
  const nextLevelConfig = useMemo(() => getNextLevelConfig(state.currentLevel), [state.currentLevel])
  const requiredXp = currentLevelConfig.xpRequired
  const xpRemaining = Math.max(0, requiredXp - state.currentXp)
  const xpPercentage = Math.min(100, Math.round(((state.currentXp / requiredXp) * 100) * 10) / 10)

  const checkAndApplyLevelUp = useCallback((prev, addedXp) => {
    let currentXp = prev.currentXp + addedXp
    let currentLevel = prev.currentLevel
    let totalXp = prev.totalXp + addedXp
    let xpEarnedToday = prev.xpEarnedToday + addedXp
    let levelsGained = 0
    let lastUnlockedReward = null
    const newUnlockedRewards = [...prev.unlockedRewards]
    const extraActivities = []
    const extraNotifications = []

    while (true) {
      const config = getLevelConfig(currentLevel)
      if (currentXp >= config.xpRequired) {
        currentXp -= config.xpRequired
        currentLevel += 1
        levelsGained += 1
        const reachedConfig = getLevelConfig(currentLevel)
        lastUnlockedReward = reachedConfig.reward

        if (currentLevel >= 5 && !newUnlockedRewards.includes('vip-pass')) {
          newUnlockedRewards.push('vip-pass')
        }

        extraActivities.push({
          id: `act-lvl-${Date.now()}-${levelsGained}`,
          type: 'Level Up',
          title: `Level Up! Level ${currentLevel - 1} → Level ${currentLevel}`,
          subtitle: `Achieved ${reachedConfig.name} • Unlocked ${reachedConfig.reward.label}`,
          xpAmount: 0,
          timestamp: 'Just now',
          status: 'completed'
        })

        extraNotifications.push({
          id: `notif-lvl-${Date.now()}-${levelsGained}`,
          type: 'level',
          icon: '🚀',
          title: `You reached Level ${String(currentLevel).padStart(2, '0')}!`,
          body: `${reachedConfig.reward.label} reward unlocked. Claim your milestone bonus!`,
          timestamp: 'Just now',
          read: false
        })
      } else {
        break
      }
    }

    return {
      currentXp,
      currentLevel,
      totalXp,
      xpEarnedToday,
      levelsGained,
      lastUnlockedReward,
      newUnlockedRewards,
      extraActivities,
      extraNotifications
    }
  }, [])

  const earnXP = useCallback((amount, source = 'Bonus XP', category = 'Tasks') => {
    if (!amount || amount <= 0) return

    let celebrationLevel = null
    let celebrationReward = null

    setState((prev) => {
      const {
        currentXp,
        currentLevel,
        totalXp,
        xpEarnedToday,
        levelsGained,
        lastUnlockedReward,
        newUnlockedRewards,
        extraActivities,
        extraNotifications
      } = checkAndApplyLevelUp(prev, amount)

      if (levelsGained > 0) {
        celebrationLevel = currentLevel
        celebrationReward = lastUnlockedReward
      }

      const newActivity = {
        id: `act-${Date.now()}`,
        type: category,
        title: source,
        subtitle: `${category} completed`,
        xpAmount: amount,
        timestamp: 'Just now',
        status: 'completed'
      }

      const newNotification = {
        id: `notif-${Date.now()}`,
        type: category === 'Game' ? 'game' : 'xp',
        icon: category === 'Game' ? '🎮' : '⚡',
        title: `+${amount} XP Earned`,
        body: `${source} • ${category}`,
        timestamp: 'Just now',
        read: false
      }

      return {
        ...prev,
        currentLevel,
        currentXp,
        totalXp,
        xpEarnedToday,
        unlockedRewards: newUnlockedRewards,
        activities: [...extraActivities, newActivity, ...prev.activities],
        notifications: [...extraNotifications, newNotification, ...prev.notifications]
      }
    })

    showToast(`+${amount} XP (${source})`, 'xp')

    if (celebrationLevel) {
      setTimeout(() => {
        setLevelUpData({ newLevel: celebrationLevel, reward: celebrationReward })
        setShowLevelUpModal(true)
      }, 300)
    }
  }, [checkAndApplyLevelUp, showToast])

  const recordGameComplete = useCallback((gameStats) => {
    const {
      score = 0,
      xp = 0,
      ves = 0,
      gems = 0,
      maxMultiplier = 1,
      itemsCaught = 0,
      bestStreak = 0,
      duration = 20
    } = gameStats || {}

    let celebrationLevel = null
    let celebrationReward = null

    setState((prev) => {
      const {
        currentXp,
        currentLevel,
        totalXp,
        xpEarnedToday,
        levelsGained,
        lastUnlockedReward,
        newUnlockedRewards,
        extraActivities,
        extraNotifications
      } = checkAndApplyLevelUp(prev, xp)

      if (levelsGained > 0) {
        celebrationLevel = currentLevel
        celebrationReward = lastUnlockedReward
      }

      const newGamesPlayed = prev.gamesPlayed + 1
      const newTotalGameScore = prev.totalGameScore + score
      const newHighScore = Math.max(prev.miniGameHighScore, score)
      const newVes = prev.ves + ves
      const newGems = prev.gems + gems

      const gameActivity = {
        id: `act-game-${Date.now()}`,
        type: 'Game',
        title: 'XP Catcher Completed',
        subtitle: `Score: ${score} • Caught: ${itemsCaught} • Streak: ${bestStreak || maxMultiplier}x • +${ves} VEs, +${gems} Gems`,
        xpAmount: xp,
        timestamp: 'Just now',
        status: 'completed'
      }

      const gameNotification = {
        id: `notif-game-${Date.now()}`,
        type: 'game',
        icon: '🎮',
        title: 'XP Catcher Completed!',
        body: `You earned +${xp} XP, +${ves} VEs, +${gems} Gems (Score: ${score}).`,
        timestamp: 'Just now',
        read: false
      }

      return {
        ...prev,
        currentLevel,
        currentXp,
        totalXp,
        xpEarnedToday,
        ves: newVes,
        gems: newGems,
        gamesPlayed: newGamesPlayed,
        totalGameScore: newTotalGameScore,
        miniGameHighScore: newHighScore,
        unlockedRewards: newUnlockedRewards,
        activities: [...extraActivities, gameActivity, ...prev.activities],
        notifications: [...extraNotifications, gameNotification, ...prev.notifications]
      }
    })

    showToast(`🎮 Game Finished! +${xp} XP, +${ves} VEs, +${gems} Gems`, 'xp')

    if (celebrationLevel) {
      setTimeout(() => {
        setLevelUpData({ newLevel: celebrationLevel, reward: celebrationReward })
        setShowLevelUpModal(true)
      }, 400)
    }
  }, [checkAndApplyLevelUp, showToast])

  const getGameCompletionPreview = useCallback((gameStats) => {
    const addedXp = gameStats?.xp || 0
    let previewXp = state.currentXp + addedXp
    let previewLevel = state.currentLevel
    let previousLevel = previewLevel
    let rewardUnlocked = null

    while (previewXp >= getLevelConfig(previewLevel).xpRequired) {
      previewXp -= getLevelConfig(previewLevel).xpRequired
      previewLevel += 1
      rewardUnlocked = getLevelConfig(previewLevel).reward
    }

    return {
      didLevelUp: previewLevel > previousLevel,
      previousLevel,
      newLevel: previewLevel,
      rewardUnlocked
    }
  }, [state.currentLevel, state.currentXp])

  const earnVEs = useCallback((amount) => {
    setState((prev) => ({ ...prev, ves: prev.ves + amount }))
  }, [])

  const earnGems = useCallback((amount) => {
    setState((prev) => ({ ...prev, gems: prev.gems + amount }))
  }, [])

  const spendVEs = useCallback((amount) => {
    setState((prev) => ({ ...prev, ves: Math.max(0, prev.ves - amount) }))
  }, [])

  const claimTodaysBoost = useCallback(() => {
    if (state.todaysBoostClaimed) return
    earnXP(150, "Today's 2.5X Streak Boost", 'Challenge')
    setState((prev) => ({ ...prev, todaysBoostClaimed: true }))
  }, [state.todaysBoostClaimed, earnXP])

  const completeTask = useCallback((taskId, xp, title) => {
    setState((prev) => {
      if (prev.completedTaskIds?.includes(taskId)) return prev
      return {
        ...prev,
        tasksCompleted: prev.tasksCompleted + 1,
        completedTaskIds: [...(prev.completedTaskIds || []), taskId]
      }
    })
    earnXP(xp, title, 'Daily Task')
  }, [earnXP])

  const claimReward = useCallback((reward) => {
    if (!reward) return
    const rewardId = reward.id

    setState((prev) => {
      if (prev.claimedRewards.includes(rewardId)) return prev
      let updatedVes = prev.ves
      let updatedGems = prev.gems

      if (reward.cost && reward.cost > 0) {
        updatedVes = Math.max(0, updatedVes - reward.cost)
      }

      if (reward.amount && typeof reward.amount === 'string') {
        if (reward.amount.includes('VE') || reward.unit === 'VEs') {
          const num = parseInt(reward.amount.replace(/\D/g, ''), 10) || 500
          updatedVes += num
        } else if (reward.amount.includes('Gem') || reward.unit === 'Gems') {
          const num = parseInt(reward.amount.replace(/\D/g, ''), 10) || 25
          updatedGems += num
        }
      }

      const claimActivity = {
        id: `act-reward-${Date.now()}`,
        type: 'Reward',
        title: `Reward Claimed: ${reward.title}`,
        subtitle: reward.note || 'Milestone reward credited',
        xpAmount: 0,
        timestamp: 'Just now',
        status: 'claimed'
      }

      const claimNotif = {
        id: `notif-reward-${Date.now()}`,
        type: 'reward',
        icon: '🎁',
        title: 'Reward Unlocked & Claimed',
        body: `${reward.title} has been added to your inventory.`,
        timestamp: 'Just now',
        read: false
      }

      return {
        ...prev,
        ves: updatedVes,
        gems: updatedGems,
        claimedRewards: [...prev.claimedRewards, rewardId],
        activities: [claimActivity, ...prev.activities],
        notifications: [claimNotif, ...prev.notifications]
      }
    })

    showToast(`Claimed: ${reward.title}`, 'milestone')
  }, [showToast])

  const claimLevelUpReward = useCallback(() => {
    const config = levelUpData?.reward || currentLevelConfig.reward
    const vesAwarded = config?.amount || 500
    const gemsAwarded = config?.gems || 25

    setState((prev) => ({
      ...prev,
      ves: prev.ves + vesAwarded,
      gems: prev.gems + gemsAwarded
    }))

    showToast(`🎉 Level Up Bonus Claimed! (+${vesAwarded} VEs & +${gemsAwarded} Gems)`, 'milestone')
    setShowLevelUpModal(false)
    setLevelUpData(null)
  }, [levelUpData, currentLevelConfig, showToast])

  const closeLevelUpModal = useCallback(() => {
    setShowLevelUpModal(false)
    setLevelUpData(null)
  }, [])

  const updateUserProfile = useCallback((fields) => {
    setState((prev) => ({ ...prev, ...fields }))
  }, [])

  const markNotificationRead = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    }))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true }))
    }))
  }, [])

  const addNotification = useCallback((notification) => {
    if (!notification) return
    const nextNotification = {
      id: notification.id || `notif-${Date.now()}`,
      type: notification.type || 'system',
      icon: notification.icon || '🔔',
      title: notification.title || 'New update',
      body: notification.body || '',
      timestamp: notification.timestamp || 'Just now',
      read: false
    }
    setState((prev) => ({
      ...prev,
      notifications: [nextNotification, ...prev.notifications]
    }))
  }, [])

  const resetProgression = useCallback(() => {
    const cleanState = createDefaultState(userId, fullName, email)
    setState(cleanState)
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(cleanState))
    } catch {}
    showToast('Demo Progression Reset Successfully', 'xp')
  }, [userId, fullName, email, showToast])

  const userSummary = useMemo(() => ({
    username: state.userName,
    email: state.email,
    avatarId: state.avatarId,
    tag: state.tag,
    bio: state.bio,
    title: `Level ${String(state.currentLevel).padStart(2, '0')} ${currentLevelConfig.name}`,
    rank: currentLevelConfig.tier,
    memberSince: 'August 2026',
    totalEarnedVEs: state.ves,
    totalGems: state.gems,
    lifetimeXp: state.totalXp,
    longestStreak: state.currentStreak,
    miniGameHighScore: state.miniGameHighScore,
    tasksCompleted: state.tasksCompleted,
    vouchersClaimed: state.claimedRewards?.length || 0,
    gamesPlayed: state.gamesPlayed
  }), [state, currentLevelConfig])

  const activeProgression = useMemo(() => ({
    currentLevel: state.currentLevel,
    currentXp: state.currentXp,
    requiredXp,
    nextLevel: state.currentLevel + 1,
    xpRemaining,
    xpPercentage,
    currentLevelConfig,
    nextLevelConfig,
    nextLevelReward: nextLevelConfig.reward,
    userSummary
  }), [state.currentLevel, state.currentXp, requiredXp, xpRemaining, xpPercentage, currentLevelConfig, nextLevelConfig, userSummary])

  return (
    <UserStateContext.Provider
      value={{
        state,
        progression: state,
        activeProgression,
        userProfile: userSummary,
        activities: state.activities,
        notifications: state.notifications,
        unlockedRewards: state.unlockedRewards,
        claimedRewards: state.claimedRewards,
        completedTaskIds: state.completedTaskIds || [],
        showLevelUpModal,
        levelUpData,
        toastMsg,
        earnXP,
        earnVEs,
        earnGems,
        spendVEs,
        recordGameComplete,
        getGameCompletionPreview,
        claimReward,
        claimLevelUpReward,
        claimTodaysBoost,
        completeTask,
        closeLevelUpModal,
        updateUserProfile,
        resetProgression,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        setShowLevelUpModal
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}

export function useUserState() {
  return useContext(UserStateContext)
}
