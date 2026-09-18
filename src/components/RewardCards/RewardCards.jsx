import React, { useState, useMemo } from 'react'
import { Coins, Lock, Check, Sparkles, Zap, Package, Gem, Shield, Crown } from 'lucide-react'
import { useUserState } from '../../context/UserStateContext'
import styles from './RewardCards.module.css'

// 6 Exact Rewards matching Panel 3 of the reference image
const VAULT_REWARDS = [
  {
    id: 'prem-pack',
    title: 'Premium Pack',
    levelReq: 11,
    levelLabel: 'Level 11+',
    cost: 2000,
    category: 'premium',
    rewardAmount: '+500 VEs & 25 Gems',
    desc: 'High tier booster bundle with instant milestone bonuses.',
    iconType: 'pack'
  },
  {
    id: 'mystery-box',
    title: 'Mystery Box',
    levelReq: 15,
    levelLabel: 'Level 15+',
    cost: 3500,
    category: 'premium',
    rewardAmount: 'Rare Drop Box',
    desc: 'Contains guaranteed rare multiplier gems and secret items.',
    iconType: 'box'
  },
  {
    id: 'exclusive-skin',
    title: 'Exclusive Skin',
    levelReq: 20,
    levelLabel: 'Level 20+',
    cost: 5000,
    category: 'exclusive',
    rewardAmount: 'Master Aura',
    desc: 'Prestige holographic skin for your player profile.',
    iconType: 'skin'
  },
  {
    id: 'xp-boost',
    title: 'XP Boost (1h)',
    levelReq: 5,
    levelLabel: 'Level 5+',
    cost: 1000,
    category: 'all',
    rewardAmount: '2X XP for 1 hour',
    desc: 'Doubles all XP earned in games and completed tasks.',
    iconType: 'boost'
  },
  {
    id: 'gem-pack',
    title: 'Gem Pack',
    levelReq: 10,
    levelLabel: 'Level 10+',
    cost: 1500,
    category: 'premium',
    rewardAmount: '+50 Rare Gems',
    desc: 'Premium currency pack for unlocking multiplier perks.',
    iconType: 'gem'
  },
  {
    id: 'special-badge',
    title: 'Special Badge',
    levelReq: 15,
    levelLabel: 'Level 15+',
    cost: 2500,
    category: 'exclusive',
    rewardAmount: 'VIP Hex Crest',
    desc: 'Honorable collector badge displayed on public leaderboards.',
    iconType: 'badge'
  }
]

export default function RewardCards({ activeCategory = 'all', onClaimReward }) {
  const userState = useUserState()
  const currentLevel = userState?.activeProgression?.currentLevel ?? 11
  const userBalance = userState?.activeProgression?.userSummary?.totalEarnedVEs ?? 2450
  const claimedRewards = userState?.claimedRewards || []

  const filteredRewards = useMemo(() => {
    if (activeCategory === 'all') return VAULT_REWARDS
    return VAULT_REWARDS.filter((r) => r.category === activeCategory || (activeCategory === 'premium' && r.category === 'all'))
  }, [activeCategory])

  const handleClaim = (item) => {
    if (currentLevel < item.levelReq) {
      alert(`Level ${item.levelReq} required to unlock ${item.title}!`)
      return
    }
    if (claimedRewards.includes(item.id)) return
    if (userBalance < item.cost) {
      alert(`Insufficient VEs! You need ${item.cost.toLocaleString()} VEs to claim this reward.`)
      return
    }

    if (userState?.claimReward) {
      userState.claimReward({
        id: item.id,
        title: item.title,
        cost: item.cost,
        amount: item.rewardAmount,
        note: item.desc
      })
    } else if (onClaimReward) {
      onClaimReward(item)
    }
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.cardsGrid}>
        {filteredRewards.map((item) => {
          const isLocked = currentLevel < item.levelReq
          const isClaimed = claimedRewards.includes(item.id)

          return (
            <div
              key={item.id}
              className={`${styles.rewardCard} ${isLocked ? styles.cardLocked : styles.cardUnlocked} ${
                isClaimed ? styles.cardClaimed : ''
              }`}
            >
              {/* 3D Crystal / Vault Emblem Graphic */}
              <div className={styles.emblemContainer}>
                <div className={styles.emblemAura} />
                <div className={styles.emblemGraphic}>
                  {renderRewardIcon(item.iconType, isLocked)}
                </div>
              </div>

              {/* Title & Level Requirement */}
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.levelReqBadge}>{item.levelLabel}</span>
              </div>

              {/* Cost in VEs with Gold Coin Icon */}
              <div className={styles.costRow}>
                <Coins size={17} className={styles.coinIcon} aria-hidden="true" />
                <span className={styles.costAmount}>{item.cost.toLocaleString()} VEs</span>
              </div>

              {/* Action Button: Claim or Locked */}
              <div className={styles.btnRow}>
                {isClaimed ? (
                  <button type="button" className={styles.claimedBtn} disabled>
                    <Check size={15} aria-hidden="true" />
                    <span>Claimed</span>
                  </button>
                ) : isLocked ? (
                  <button type="button" className={styles.lockedBtn} disabled>
                    <Lock size={14} aria-hidden="true" />
                    <span>Locked</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.claimBtn}
                    onClick={() => handleClaim(item)}
                    id={`claim-reward-${item.id}-btn`}
                  >
                    <span>Claim</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function renderRewardIcon(type, isLocked) {
  const opacity = isLocked ? 0.6 : 1
  switch (type) {
    case 'pack':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <defs>
            <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>
          </defs>
          <polygon points="50,12 85,32 50,52 15,32" fill="#d8b4fe" stroke="#e879f9" strokeWidth="2" />
          <polygon points="15,32 50,52 50,90 15,70" fill="url(#boxGrad)" stroke="#a855f7" strokeWidth="2" />
          <polygon points="85,32 50,52 50,90 85,70" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
          <line x1="50" y1="12" x2="50" y2="52" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
        </svg>
      )
    case 'box':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <polygon points="50,12 88,32 50,52 12,32" fill="#fed7aa" stroke="#f59e0b" strokeWidth="2" />
          <polygon points="12,32 50,52 50,88 12,68" fill="#b45309" stroke="#d97706" strokeWidth="2" />
          <polygon points="88,32 50,52 50,88 88,68" fill="#78350f" stroke="#d97706" strokeWidth="2" />
          <circle cx="50" cy="52" r="8" fill="#fef08a" />
        </svg>
      )
    case 'skin':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <polygon points="50,10 90,32 90,72 50,92 10,72 10,32" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <polygon points="50,22 78,38 78,64 50,80 22,64 22,38" fill="#0284c7" opacity="0.6" />
          <circle cx="50" cy="51" r="14" fill="#e0f2fe" opacity="0.85" />
        </svg>
      )
    case 'boost':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <polygon points="50,8 75,38 58,38 72,92 28,52 44,52" fill="#ec4899" stroke="#f472b6" strokeWidth="2" />
        </svg>
      )
    case 'gem':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <polygon points="50,8 88,32 50,94 12,32" fill="#10b981" stroke="#34d399" strokeWidth="2" />
          <polygon points="50,8 88,32 50,42 12,32" fill="#6ee7b7" opacity="0.75" />
          <polygon points="12,32 50,42 50,94" fill="#047857" />
          <polygon points="88,32 50,42 50,94" fill="#065f46" />
        </svg>
      )
    case 'badge':
      return (
        <svg viewBox="0 0 100 100" className={styles.svgIcon} style={{ opacity }}>
          <circle cx="50" cy="50" r="42" fill="#1e1b4b" stroke="#a855f7" strokeWidth="3" />
          <circle cx="50" cy="50" r="34" fill="#4338ca" stroke="#fef08a" strokeWidth="2" />
          <polygon points="50,24 57,38 72,40 61,51 64,66 50,58 36,66 39,51 28,40 43,38" fill="#f5ba31" />
        </svg>
      )
    default:
      return <Package size={48} className={styles.fallbackIcon} />
  }
}
