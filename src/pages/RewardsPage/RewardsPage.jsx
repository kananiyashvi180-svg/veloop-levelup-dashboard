import { useState } from 'react'
import styles from './RewardsPage.module.css'
import RewardsHero from '../../components/RewardsHero/RewardsHero'
import RewardCards from '../../components/RewardCards/RewardCards'
import LevelBenefits from '../../components/LevelBenefits/LevelBenefits'

export default function RewardsPage({ progression, onClaimReward }) {
  const [claimedAll, setClaimedAll] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)

  const handleClaimAll = () => {
    setClaimedAll(true)
    setToastMsg('All available Tier 4 perks & milestone bonuses have been credited to your account!')
    setTimeout(() => setToastMsg(null), 4000)
    if (onClaimReward) {
      onClaimReward({ title: 'Tier 04 Full Bundle', amount: '+500 VEs' })
    }
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
        <RewardsHero />
        <RewardCards
          userBalance={progression?.userSummary?.totalEarnedVEs ?? 1850}
          onClaimReward={onClaimReward}
        />
        <LevelBenefits />

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

