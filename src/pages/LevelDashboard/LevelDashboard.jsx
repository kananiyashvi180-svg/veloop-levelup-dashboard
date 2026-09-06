import { useState } from 'react'
import { useLevelData } from '../../hooks/useLevelData'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppHeader from '../../components/Header/AppHeader'
import HeroSection from '../../components/LevelHero/HeroSection'
import TodaysBoost from '../../components/TodaysBoost/TodaysBoost'
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP'
import LevelRewards from '../../components/LevelRewardCard/LevelRewards'
import BottomNav from '../../components/BottomNav/BottomNav'
import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  const { progression, earningOpportunities } = useLevelData()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className={styles.appContainer}>
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        userSummary={progression?.userSummary}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      <div className={styles.mainWrapper}>
        <AppHeader
          progression={progression}
          onOpenMenu={() => setMobileMenuOpen(true)}
        />

        <main className={styles.contentArea}>
          <div className={styles.layoutDeck}>
            <div className={styles.heroColumn}>
              <HeroSection progression={progression} />
            </div>
            <div className={styles.boostColumn}>
              <TodaysBoost progression={progression} />
            </div>
          </div>

          <div className={styles.mainDeck}>
            <div className={styles.activitiesColumn}>
              <EarnMoreXP opportunities={earningOpportunities} />
            </div>
            <div className={styles.rewardsColumn}>
              <LevelRewards progression={progression} />
            </div>
          </div>
        </main>

        <BottomNav
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>
    </div>
  )
}
