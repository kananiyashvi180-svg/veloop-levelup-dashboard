import React, { useState, useEffect, useMemo } from 'react'
import { Zap, X, Crown } from 'lucide-react'
import { useUserState } from '../../context/UserStateContext'
import { generateRoadmapData } from '../../data/levelConfig'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppHeader from '../../components/Header/AppHeader'
import BottomNav from '../../components/BottomNav/BottomNav'
import LevelUpModal from '../../components/LevelUpModal/LevelUpModal'
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap'

import HomeView from './HomeView'
import LevelPage from '../LevelPage/LevelPage'
import RewardsPage from '../RewardsPage/RewardsPage'
import ActivityPage from '../ActivityPage/ActivityPage'
import PlayAndEarnPage from '../PlayAndEarnPage/PlayAndEarnPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import EarnXPPage from '../EarnXPPage/EarnXPPage'

import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  const {
    activeProgression,
    activities,
    userProfile,
    toastMsg,
    showLevelUpModal,
    levelUpData,
    earnXP,
    claimReward,
    claimLevelUpReward,
    closeLevelUpModal,
    updateUserProfile,
    recordGameComplete,
    getGameCompletionPreview,
  } = useUserState()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [roadmapOpen, setRoadmapOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.page = activeSection
  }, [activeSection])


  const currentLevel = activeProgression.currentLevel || 11
  const roadmap = useMemo(
    () => generateRoadmapData(currentLevel),
    [currentLevel]
  )

  const handleEarnXP = (amount, source) => {
    earnXP(amount, source)
  }

  const handleClaimReward = (reward) => {
    claimReward(reward)
  }

  const handleUpdateProfile = (fields) => {
    updateUserProfile(fields)
  }

  const handleGameComplete = (rewards) => {
    const completion = getGameCompletionPreview(rewards)
    recordGameComplete(rewards)
    return { ...rewards, ...completion }
  }

  return (
    <div className={styles.dashboardRoot}>
      {/* Toast notifications */}
      {toastMsg && (
        <div
          className={styles.toast}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background:
              toastMsg.type === 'milestone'
                ? 'linear-gradient(135deg, #f59e0b, #ec4899)'
                : 'linear-gradient(135deg, #a855f7, #7c3aed)',
            color: '#ffffff',
            padding: '0.85rem 1.4rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.4)',
            fontWeight: '800',
            fontSize: '0.92rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <Zap size={16} aria-hidden="true" />
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* 1. Full-Width Top Header */}
      <AppHeader
        progression={activeProgression}
        onOpenMenu={() => setMobileMenuOpen(true)}
        onSelectSection={setActiveSection}
      />

      {/* 2. Main Horizontal Body Layout (Sidebar on Left, Dynamic View on Right) */}
      <div className={styles.layoutBody}>
        {/* Left Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Dynamic Center/Right Content Area */}
        <main className={styles.contentArea}>
          {activeSection === 'level' ? (
            <LevelPage
              progression={activeProgression}
              onNavigate={setActiveSection}
              onOpenRoadmapModal={() => setRoadmapOpen(true)}
            />
          ) : activeSection === 'rewards' ? (
            <RewardsPage
              progression={activeProgression}
              onClaimReward={handleClaimReward}
            />
          ) : activeSection === 'earn-xp' ? (
            <EarnXPPage
              progression={activeProgression}
              onEarnXP={handleEarnXP}
              onNavigate={setActiveSection}
            />
          ) : activeSection === 'activity' ? (
            <ActivityPage
              progression={activeProgression}
              activities={activities}
            />
          ) : activeSection === 'play-earn' ? (
            <PlayAndEarnPage
              onBack={() => setActiveSection('home')}
              onGameComplete={handleGameComplete}
            />
          ) : activeSection === 'profile' ? (
            <ProfilePage
              progression={activeProgression}
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={setActiveSection}
            />
          ) : (
            <HomeView
              progression={activeProgression}
              activities={activities}
              onNavigate={setActiveSection}
              onOpenRoadmap={() => setRoadmapOpen(true)}
            />
          )}
        </main>
      </div>

      {/* 3. Bottom Progress Bar Footer Strip (Matching Mockup) */}
      <footer className={styles.bottomFooterStrip}>
        <div className={styles.footerLeftBranding}>
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <polygon points="20,3 36,12 30,34 20,38 10,34 4,12" fill="#13082b" stroke="#c084fc" strokeWidth="2.5" />
            <polygon points="20,6 31,14 20,23" fill="#f0abfc" />
            <polygon points="20,6 9,14 20,23" fill="#c084fc" />
          </svg>
          <span className={styles.footerBrand}>VELOOP</span>
          <span className={styles.footerTagline}>WATCH  •  EARN  •  GROW</span>
        </div>

        <div className={styles.footerRightProgress}>
          <span className={styles.footerProgressLabel}>Your Progress</span>
          <Crown size={15} className={styles.footerCrownIcon} aria-hidden="true" />
          <span className={styles.footerLevelVal}>Level {currentLevel} / 20</span>
        </div>
      </footer>

      {/* Fixed Glass Bottom Nav for Mobile */}
      <BottomNav
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={showLevelUpModal}
        onClose={closeLevelUpModal}
        level={levelUpData?.newLevel || activeProgression.currentLevel}
        onClaim={claimLevelUpReward}
      />

      {/* Roadmap Overlay Modal */}
      {roadmapOpen && (
        <div
          className={styles.roadmapOverlay}
          onClick={() => setRoadmapOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.roadmapModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.roadmapModalHeader}>
              <span className={styles.roadmapModalTag}>
                PROGRESSION MAP
              </span>
              <button
                type="button"
                onClick={() => setRoadmapOpen(false)}
                className={styles.roadmapCloseBtn}
                aria-label="Close roadmap"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <LevelRoadmap roadmap={roadmap} currentLevel={activeProgression.currentLevel} />
          </div>
        </div>
      )}
    </div>
  )
}
