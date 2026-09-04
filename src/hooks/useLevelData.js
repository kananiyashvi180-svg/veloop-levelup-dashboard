import { useState, useCallback } from 'react'
import {
  levelProgressionData,
  levelRoadmapData,
  xpActivityData,
  earningOpportunitiesData,
  miniGameConfig
} from '../data/levelData'

export function useLevelData() {
  const [progression, setProgression] = useState(levelProgressionData)
  const [roadmap, setRoadmap] = useState(levelRoadmapData)
  const [activities, setActivities] = useState(xpActivityData)
  const [earningOpportunities, setEarningOpportunities] = useState(earningOpportunitiesData)
  const [gameConfig] = useState(miniGameConfig)
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [recentLevelUp, setRecentLevelUp] = useState(null)
  const [uiState, setUiState] = useState('normal') // 'normal' | 'loading' | 'empty' | 'error'
  const [selectedRoadmapNode, setSelectedRoadmapNode] = useState(null)

  // Add XP and check for level up
  const earnXp = useCallback((amount, sourceTitle = 'Bonus XP', category = 'Tasks') => {
    setProgression((prev) => {
      const newXp = prev.currentXp + amount
      const isLevelUp = newXp >= prev.requiredXp

      let updatedLevel = prev.currentLevel
      let updatedNextLevel = prev.nextLevel
      let updatedRequiredXp = prev.requiredXp
      let currentXpInLevel = newXp

      if (isLevelUp) {
        updatedLevel = prev.currentLevel + 1
        updatedNextLevel = updatedLevel + 1
        updatedRequiredXp = Math.round(prev.requiredXp * 1.5)
        currentXpInLevel = newXp - prev.requiredXp

        setRecentLevelUp({
          previousLevel: prev.currentLevel,
          newLevel: updatedLevel,
          rewardUnlocked: prev.nextLevelReward,
          achievedXp: newXp
        })
        setShowLevelUpModal(true)

        // Update roadmap statuses
        setRoadmap((prevRoadmap) =>
          prevRoadmap.map((item) => {
            if (item.level < updatedLevel) {
              return { ...item, status: 'Completed', isUnlocked: true }
            }
            if (item.level === updatedLevel) {
              return { ...item, status: 'Current', isUnlocked: true }
            }
            if (item.level === updatedLevel + 1) {
              return { ...item, status: 'Next', isUnlocked: false }
            }
            return { ...item, status: 'Locked', isUnlocked: false }
          })
        )
      }

      const xpRemaining = Math.max(0, updatedRequiredXp - currentXpInLevel)
      const xpPercentage = Math.min(100, Math.round((currentXpInLevel / updatedRequiredXp) * 1000) / 10)

      return {
        ...prev,
        currentLevel: updatedLevel,
        currentXp: currentXpInLevel,
        requiredXp: updatedRequiredXp,
        nextLevel: updatedNextLevel,
        xpRemaining,
        xpPercentage,
        userSummary: {
          ...prev.userSummary,
          totalEarnedVEs: prev.userSummary.totalEarnedVEs + (isLevelUp ? prev.nextLevelReward.amount : 0)
        }
      }
    })

    // Prepend to activity feed
    const newActivity = {
      id: `act-${Date.now()}`,
      type: category,
      title: sourceTitle,
      subtitle: `Instant reward processed • ${category}`,
      xpAmount: amount,
      timestamp: 'Just now',
      status: 'completed'
    }
    setActivities((prev) => [newActivity, ...prev])
  }, [])

  // Quick level up trigger for demo
  const triggerLevelUpDemo = useCallback(() => {
    earnXp(progression.xpRemaining, 'Level Up Instant Boost', 'Milestone')
  }, [earnXp, progression.xpRemaining])

  const closeLevelUpModal = useCallback(() => {
    setShowLevelUpModal(false)
  }, [])

  const resetToDefault = useCallback(() => {
    setProgression(levelProgressionData)
    setRoadmap(levelRoadmapData)
    setActivities(xpActivityData)
    setEarningOpportunities(earningOpportunitiesData)
    setShowLevelUpModal(false)
    setRecentLevelUp(null)
    setUiState('normal')
  }, [])

  return {
    progression,
    setProgression,
    roadmap,
    setRoadmap,
    activities,
    setActivities,
    earningOpportunities,
    setEarningOpportunities,
    gameConfig,
    earnXp,
    triggerLevelUpDemo,
    showLevelUpModal,
    closeLevelUpModal,
    recentLevelUp,
    uiState,
    setUiState,
    selectedRoadmapNode,
    setSelectedRoadmapNode,
    resetToDefault
  }
}
