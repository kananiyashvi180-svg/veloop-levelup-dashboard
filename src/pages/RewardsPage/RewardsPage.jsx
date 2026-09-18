import React, { useState } from 'react'
import { Coins, Sparkles, Gift } from 'lucide-react'
import RewardCards from '../../components/RewardCards/RewardCards'
import styles from './RewardsPage.module.css'

export default function RewardsPage({ progression, onClaimReward }) {
  const [activeTab, setActiveTab] = useState('all')

  const totalEarnedVEs = progression?.userSummary?.totalEarnedVEs ?? 2450

  return (
    <div className={styles.page}>
      {/* Rewards Vault Top Header */}
      <header className={styles.vaultHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <Gift size={22} className={styles.headerGiftIcon} aria-hidden="true" />
            <h1 className={styles.pageTitle}>Rewards</h1>
          </div>
          <p className={styles.pageSubtitle}>Redeem your earned rewards</p>
        </div>

        <div className={styles.balancePill}>
          <Coins size={18} className={styles.balanceCoinIcon} aria-hidden="true" />
          <span className={styles.balanceLabel}>Your VEs:</span>
          <strong className={styles.balanceAmount}>{totalEarnedVEs.toLocaleString()}</strong>
        </div>
      </header>

      {/* Filter Tabs: All Rewards, Premium, Exclusive */}
      <div className={styles.tabFiltersRow}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Rewards
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'premium' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('premium')}
        >
          Premium
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'exclusive' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('exclusive')}
        >
          Exclusive
        </button>
      </div>

      {/* 6 High-Fidelity Vault Reward Cards */}
      <RewardCards
        activeCategory={activeTab}
        onClaimReward={onClaimReward}
      />
    </div>
  )
}
