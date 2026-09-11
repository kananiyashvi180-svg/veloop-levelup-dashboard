import { useState, useEffect } from 'react'
import { useLevelData } from '../../hooks/useLevelData'
import { useUserState } from '../../context/UserStateContext'
import { useNotifications } from '../../context/NotificationContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppHeader from '../../components/Header/AppHeader'
import HeroSection from '../../components/LevelHero/HeroSection'
import TodaysBoost from '../../components/TodaysBoost/TodaysBoost'
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP'
import LevelRewards from '../../components/LevelRewardCard/LevelRewards'
import BottomNav from '../../components/BottomNav/BottomNav'
import RewardsPage from '../RewardsPage/RewardsPage'
import ActivityPage from '../ActivityPage/ActivityPage'
import PlayAndEarnPage from '../PlayAndEarnPage/PlayAndEarnPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import EarnXPPage from '../EarnXPPage/EarnXPPage'
import LevelUpModal from '../../components/LevelUpModal/LevelUpModal'
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap'
import { levelRoadmapData } from '../../data/levelData'
import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  const { earningOpportunities } = useLevelData()
  const {
    activeProgression,
    activities,
    userProfile,
    toastMsg,
    showLevelUpModal,
    levelUpData,
    pendingNotification,
    consumePendingNotification,
    earnXP,
    claimReward,
    claimLevelUpReward,
    closeLevelUpModal,
    updateUserProfile,
    setShowLevelUpModal
  } = useUserState()
  const { addNotification } = useNotifications()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [roadmapOpen, setRoadmapOpen] = useState(false)

  useEffect(() => {
    if (pendingNotification) {
      addNotification(pendingNotification)
      consumePendingNotification()
    }
  }, [pendingNotification, addNotification, consumePendingNotification])

  const handleEarnXP = (amount, source) => {
    earnXP(amount, source)
  }

  const handleClaimReward = (reward) => {
    claimReward(reward)
    addNotification({
      type: 'reward',
      icon: '🎁',
      title: `Reward Unlocked!`,
      body: `${reward.title} has been added to your account.`
    })
  }

  const handleUpdateProfile = (fields) => {
    updateUserProfile(fields)
  }

  const isAltPage =
    activeSection === 'rewards' ||
    activeSection === 'activity' ||
    activeSection === 'play-earn' ||
    activeSection === 'profile' ||
    activeSection === 'earn-xp'

  return (
    <div className={styles.appContainer}>
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: toastMsg.type === 'milestone' ? 'linear-gradient(135deg, #f59e0b, #ec4899)' : 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          padding: '0.85rem 1.4rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.4)',
          fontWeight: '800',
          fontSize: '0.92rem',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideIn 0.3s ease-out',
        }}>
          <span>⚡</span>
          <span>{toastMsg.text}</span>
        </div>
      )}

      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        userSummary={activeProgression.userSummary}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      <div className={styles.mainWrapper}>
        <AppHeader
          progression={activeProgression}
          onOpenMenu={() => setMobileMenuOpen(true)}
          onSelectSection={setActiveSection}
        />

        <main className={isAltPage ? styles.contentAreaRewards : styles.contentArea}>
          {activeSection === 'rewards' ? (
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
              onGameComplete={(rewards) => {
                if (rewards.xp > 0) earnXP(rewards.xp, 'XP Catcher Game', 'Game')
                addNotification({
                  type: 'game',
                  icon: '🎮',
                  title: `XP Catcher Complete!`,
                  body: `You earned +${rewards.xp} XP, +${rewards.ves} VEs, +${rewards.gems} Gems.`
                })
              }}
            />
          ) : activeSection === 'profile' ? (
            <ProfilePage
              progression={activeProgression}
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={setActiveSection}
            />
          ) : (
            <>
              <div className={styles.layoutDeck}>
                <div className={styles.heroColumn}>
                  <HeroSection
                    progression={activeProgression}
                    onOpenRoadmap={() => setRoadmapOpen(true)}
                    onTriggerLevelUp={() => setShowLevelUpModal(true)}
                  />
                </div>
                <div className={styles.boostColumn}>
                  <TodaysBoost
                    progression={activeProgression}
                    onClaimBoost={handleEarnXP}
                  />
                </div>
              </div>

              <div className={styles.mainDeck}>
                <div className={styles.activitiesColumn}>
                  <EarnMoreXP
                    opportunities={earningOpportunities}
                    onNavigate={setActiveSection}
                    onEarnXP={handleEarnXP}
                  />
                </div>
                <div className={styles.rewardsColumn}>
                  <LevelRewards
                    progression={activeProgression}
                    onNavigate={setActiveSection}
                  />
                </div>
              </div>
            </>
          )}
        </main>

        <BottomNav
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>

      <LevelUpModal
        isOpen={showLevelUpModal}
        onClose={closeLevelUpModal}
        level={levelUpData?.newLevel || activeProgression.currentLevel}
        onClaim={claimLevelUpReward}
      />

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#f59e0b', letterSpacing: '0.1em' }}>
                PROGRESSION MAP
              </span>
              <button
                type="button"
                onClick={() => setRoadmapOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <LevelRoadmap roadmap={levelRoadmapData} currentLevel={activeProgression.currentLevel} />
          </div>
        </div>
      )}
    </div>
  )
}
