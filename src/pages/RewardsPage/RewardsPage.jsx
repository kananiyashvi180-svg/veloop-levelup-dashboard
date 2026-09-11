import { useState } from 'react'
import { useUserState } from '../../context/UserStateContext'
import styles from './RewardsPage.module.css'
import RewardsHero from '../../components/RewardsHero/RewardsHero'
import RewardCards from '../../components/RewardCards/RewardCards'
import LevelBenefits from '../../components/LevelBenefits/LevelBenefits'

export default function RewardsPage({ progression, onClaimReward }) {
  const userState = useUserState()
  const [claimedAll, setClaimedAll] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)

  const currentLevel = progression?.currentLevel ?? 4
  const nextLevel = progression?.nextLevel ?? 5
  const userBalance = progression?.userSummary?.totalEarnedVEs ?? 1850

  const handleClaimAll = () => {
    setClaimedAll(true)
    if (userState?.claimReward) {
      userState.claimReward({ id: 'bundle-tier', title: `Tier ${String(currentLevel).padStart(2, '0')} Bundle`, amount: '+500 VEs', note: 'All active milestone rewards' })
    } else if (onClaimReward) {
      onClaimReward({ title: `Tier ${String(currentLevel).padStart(2, '0')} Bundle`, amount: '+500 VEs' })
    }
    setToastMsg(`All available Tier ${String(currentLevel).padStart(2, '0')} perks & milestone bonuses have been credited!`)
    setTimeout(() => setToastMsg(null), 4000)
  }

  return (
    <div className={styles.page}>
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          padding: '0.9rem 1.4rem',
          borderRadius: '14px',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          fontWeight: '800',
          zIndex: 9999,
          maxWidth: '420px',
        }}>
          🎉 {toastMsg}
        </div>
      )}

      <div className={styles.pageInner}>
        <RewardsHero nextLevel={nextLevel} />
        <RewardCards
          userBalance={userBalance}
          onClaimReward={onClaimReward}
        />
        <LevelBenefits level={nextLevel} />

        <div className={styles.ctaWrapper}>
          <button
            className={styles.claimBtn}
            type="button"
            onClick={handleClaimAll}
            disabled={claimedAll}
            id="rewards-claim-all-btn"
          >
            <span className={styles.claimBtnGlow} />
            <span className={styles.claimBtnText}>
              {claimedAll ? '✓ All Eligible Rewards Claimed' : 'Claim All Active Milestone Rewards'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
