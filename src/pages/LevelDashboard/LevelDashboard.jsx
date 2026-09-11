import { useState } from 'react'
import { useLevelData } from '../../hooks/useLevelData'
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
  const { progression, earningOpportunities } = useLevelData()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Reactive user and progression state
  const [currentLevel, setCurrentLevel] = useState(4)
  const [currentXp, setCurrentXp] = useState(6420)
  const requiredXp = 8000
  const [totalEarnedVEs, setTotalEarnedVEs] = useState(1850)
  const [totalGems, setTotalGems] = useState(48)
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  
  const [userProfile, setUserProfile] = useState({
    avatarId: 'vanguard',
    bio: 'Pushing for Level 5 Vanguard Master • Daily Streak Hunter ⚡',
    username: 'AlexRider',
    tag: '#VEL-7402',
    rank: 'Gold Tier'
  })

  const handleUpdateProfile = (fields) => {
    setUserProfile((prev) => ({ ...prev, ...fields }))
  }

  const xpPercentage = Math.min(100, Math.round((currentXp / requiredXp) * 100 * 10) / 10)
  const xpRemaining = Math.max(0, requiredXp - currentXp)

  const handleEarnXP = (amount, source) => {
    setCurrentXp((prev) => {
      const nextXp = prev + amount
      if (nextXp >= requiredXp && currentLevel < 5) {
        setCurrentLevel(5)
        setLevelUpModalOpen(true)
      }
      return nextXp
    })
    setToastMsg({ text: `+${amount} XP (${source})`, type: 'xp' })
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleClaimReward = (reward) => {
    if (reward.cost && reward.cost > 0) {
      setTotalEarnedVEs((prev) => Math.max(0, prev - reward.cost))
    }
    if (reward.amount && reward.amount.includes('VEs')) {
      const added = parseInt(reward.amount.replace(/\D/g, '')) || 500
      setTotalEarnedVEs((prev) => prev + added)
    }
    if (reward.amount && reward.amount.includes('Gems')) {
      const added = parseInt(reward.amount.replace(/\D/g, '')) || 25
      setTotalGems((prev) => prev + added)
    }
    setToastMsg({ text: `Unlocked: ${reward.title}!`, type: 'reward' })
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleLevelUpClaim = () => {
    setTotalEarnedVEs((prev) => prev + 500)
    setTotalGems((prev) => prev + 25)
    setToastMsg({ text: '🎉 Level 05 Milestone Bonus Credited! (+500 VEs & +25 Gems)', type: 'milestone' })
    setTimeout(() => setToastMsg(null), 4000)
  }

  const activeProgression = {
    ...progression,
    currentLevel,
    currentXp,
    requiredXp,
    nextLevel: currentLevel >= 5 ? 6 : 5,
    xpRemaining,
    xpPercentage,
    userSummary: {
      ...progression?.userSummary,
      ...userProfile,
      totalEarnedVEs,
      totalGems
    }
  }

  const isAltPage =
    activeSection === 'rewards' ||
    activeSection === 'activity' ||
    activeSection === 'play-earn' ||
    activeSection === 'profile' ||
    activeSection === 'earn-xp'

  return (
    <div className={styles.appContainer}>
      {/* Floating Notification Toast */}
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
            <ActivityPage progression={activeProgression} />
          ) : activeSection === 'play-earn' ? (
            <PlayAndEarnPage onBack={() => setActiveSection('home')} />
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
                    onTriggerLevelUp={() => setLevelUpModalOpen(true)}
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

      {/* Level-Up Celebration Modal */}
      <LevelUpModal
        isOpen={levelUpModalOpen}
        onClose={() => setLevelUpModalOpen(false)}
        level={currentLevel >= 5 ? currentLevel : 5}
        onClaim={handleLevelUpClaim}
      />

      {/* Level Roadmap Modal Overlay */}
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

            <LevelRoadmap roadmap={levelRoadmapData} currentLevel={currentLevel} />
          </div>
        </div>
      )}
    </div>
  )
}


