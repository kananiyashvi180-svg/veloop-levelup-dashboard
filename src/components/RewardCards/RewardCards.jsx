import { useState, useMemo } from 'react'
import { useUserState } from '../../context/UserStateContext'
import styles from './RewardCards.module.css'

const baseRewards = [
  {
    id: 've-pack',
    type: 'gold',
    badge: 'VE COINS',
    title: '500 VE Coins Pack',
    amount: '+500',
    unit: 'VEs',
    cost: 0,
    requiredLevel: 1,
    note: 'Starter Milestone Reward',
    icon: '🪙',
  },
  {
    id: 'gem-pack',
    type: 'purple',
    badge: 'GEMS',
    title: '25 Rare Gems Cluster',
    amount: '+25',
    unit: 'Gems',
    cost: 0,
    requiredLevel: 2,
    note: 'Premium Multiplier Currency',
    icon: '💎',
  },
  {
    id: 'discord-badge',
    type: 'cyan',
    badge: 'COMMUNITY',
    title: 'Master Discord & Profile Role',
    amount: 'VIP',
    unit: 'Role',
    cost: 150,
    costCurrency: 'VEs',
    requiredLevel: 3,
    note: 'Exclusive colored name & lounge access',
    icon: '🛡️',
  },
  {
    id: 'store-discount',
    type: 'emerald',
    badge: 'VOUCHER',
    title: '20% Partner Store Discount',
    amount: '20%',
    unit: 'Off',
    cost: 350,
    costCurrency: 'VEs',
    requiredLevel: 4,
    note: 'Applicable on gaming gears & merch',
    icon: '🎟️',
  },
  {
    id: 'mystery-crate',
    type: 'magenta',
    badge: 'MYSTERY',
    title: 'Cyber Mystery Drop Crate',
    amount: 'Loot',
    unit: 'Box',
    cost: 500,
    costCurrency: 'VEs',
    requiredLevel: 4,
    note: 'Guaranteed 250+ XP and rare collectibles',
    icon: '📦',
  },
  {
    id: 'vip-pass',
    type: 'locked',
    badge: 'LEVEL 05',
    title: 'VIP Tournament & Lounge Pass',
    amount: 'PASS',
    unit: 'Lvl 5',
    cost: 0,
    requiredLevel: 5,
    note: 'Unlocks upon reaching Level 05',
    icon: '👑',
  },
]

export default function RewardCards({ userBalance = 1850, onClaimReward }) {
  const userState = useUserState()
  const currentLevel = userState?.activeProgression?.currentLevel ?? 4
  const claimedRewards = userState?.claimedRewards || []
  const [redeemedToast, setRedeemedToast] = useState(null)

  const catalog = useMemo(() => {
    return baseRewards.map((r) => {
      const isLocked = currentLevel < r.requiredLevel
      const isClaimed = claimedRewards.includes(r.id)
      return {
        ...r,
        isLocked,
        claimed: isClaimed,
        type: isLocked ? 'locked' : r.type
      }
    })
  }, [currentLevel, claimedRewards])

  const handleClaim = (reward) => {
    if (reward.claimed || reward.isLocked) return

    if (reward.cost > 0 && userBalance < reward.cost) {
      alert(`Insufficient VEs! You need ${reward.cost} VEs to redeem this reward.`)
      return
    }

    if (userState?.claimReward) {
      userState.claimReward(reward)
    } else if (onClaimReward) {
      onClaimReward(reward)
    }

    setRedeemedToast(reward.title)
    setTimeout(() => setRedeemedToast(null), 3000)
  }

  return (
    <div className={styles.container}>
      {redeemedToast && (
        <div className={styles.toast}>
          <span>🎉 Successfully Claimed: <strong>{redeemedToast}</strong>!</span>
        </div>
      )}

      <div className={styles.grid}>
        {catalog.map((item) => (
          <div
            key={item.id}
            className={`${styles.card} ${styles[`card_${item.type}`]} ${
              item.claimed ? styles.cardClaimed : ''
            } ${item.isLocked ? styles.cardLocked : ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardBadge}>{item.badge}</span>
              <span className={styles.cardIcon}>{item.icon}</span>
            </div>

            <div className={styles.cardAmount}>
              <span className={styles.amountText}>{item.amount}</span>
              <span className={styles.unitText}>{item.unit}</span>
            </div>

            <div className={styles.cardBody}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.cardNote}>{item.note}</p>
            </div>

            <div className={styles.cardFooter}>
              {item.isLocked ? (
                <button type="button" className={styles.lockedBtn} disabled>
                  🔒 Unlocks at Level {String(item.requiredLevel).padStart(2, '0')}
                </button>
              ) : item.claimed ? (
                <button type="button" className={styles.claimedBtn} disabled>
                  ✓ Claimed
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.redeemBtn}
                  onClick={() => handleClaim(item)}
                >
                  {item.cost > 0 ? `Redeem (${item.cost} ${item.costCurrency})` : 'Claim Reward'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
