import { Trophy } from 'lucide-react'
import LevelRewardCard from '../LevelRewardCard/LevelRewardCard'
import styles from './NextLevelReward.module.css'

export default function NextLevelReward({ progression }) {
  const { nextLevelReward, nextLevel, xpPercentage } = progression

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <Trophy size={20} color="var(--accent-gold)" /> Next-Level Reward
        </h2>
        <span className={styles.tagline}>Reach Level {String(nextLevel).padStart(2, '0')}</span>
      </div>

      <LevelRewardCard
        reward={nextLevelReward}
        nextLevel={nextLevel}
        xpPercentage={xpPercentage}
      />
    </div>
  )
}
