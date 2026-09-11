import styles from './GameResult.module.css'

function getPerformanceMessage(score) {
  if (score >= 200) return { label: 'LEGENDARY', msg: 'Sensational reflexes! You conquered the arena!', color: '#f5ba31' }
  if (score >= 140) return { label: 'ELITE', msg: 'Outstanding performance! Top-tier catching!', color: '#a78bfa' }
  if (score >= 90) return { label: 'GREAT', msg: 'Solid reflexes! You timed every drop nicely.', color: '#10b981' }
  if (score >= 50) return { label: 'GOOD', msg: 'Good job! Keep building up that multiplier!', color: '#60a5fa' }
  return { label: 'KEEP GOING', msg: 'Every round sharpens your reflexes. Go again!', color: '#94a3b8' }
}

export default function GameResult({ finalRewards, onPlayAgain }) {
  const score = finalRewards?.score ?? 0
  const xp = finalRewards?.xp ?? 0
  const ves = finalRewards?.ves ?? 0
  const gems = finalRewards?.gems ?? 0
  const maxMultiplier = finalRewards?.maxMultiplier ?? 1
  const itemsCaught = finalRewards?.itemsCaught ?? 0
  const bestStreak = finalRewards?.bestStreak ?? maxMultiplier
  const didLevelUp = finalRewards?.didLevelUp
  const newLevel = finalRewards?.newLevel
  const previousLevel = finalRewards?.previousLevel
  const rewardUnlocked = finalRewards?.rewardUnlocked

  const perf = getPerformanceMessage(score)

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trophyIcon}>🏆</div>
        <h2 className={styles.completeTitle}>GAME COMPLETE</h2>
        <div
          className={styles.perfBadge}
          style={{
            borderColor: `${perf.color}55`,
            color: perf.color,
            background: `${perf.color}18`,
          }}
        >
          {perf.label}
        </div>
        <p className={styles.perfDesc}>{perf.msg}</p>
      </div>

      <div className={styles.scoreBox}>
        <span className={styles.scoreLabel}>YOUR SCORE</span>
        <span className={styles.scoreValue}>{score}</span>
        {maxMultiplier > 1 && (
          <div className={styles.multiplierPeak}>
            <span>🚀</span>
            <span>Peak {maxMultiplier}X Multiplier (Best Streak: {bestStreak})</span>
          </div>
        )}
      </div>

      {didLevelUp && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(245, 186, 49, 0.15), rgba(168, 85, 247, 0.15))',
            border: '1px solid rgba(245, 186, 49, 0.4)',
            borderRadius: '12px',
            padding: '10px 14px',
            textAlign: 'center',
            margin: '4px 0'
          }}
        >
          <div style={{ color: '#f5ba31', fontWeight: '900', fontSize: '13px', letterSpacing: '0.08em' }}>
            🎉 LEVEL UP!
          </div>
          <div style={{ color: '#ffffff', fontSize: '12px', marginTop: '2px', fontWeight: '700' }}>
            Level {previousLevel} → Level {newLevel}
          </div>
          {rewardUnlocked && (
            <div style={{ color: '#a78bfa', fontSize: '11px', marginTop: '3px' }}>
              Reward Unlocked: {rewardUnlocked.label || rewardUnlocked}
            </div>
          )}
        </div>
      )}

      <div className={styles.rewardsColumn}>
        <div className={styles.rewardRow}>
          <div className={styles.rewardIconPurple}>XP</div>
          <div className={styles.rewardMeta}>
            <span className={styles.rewardLabel}>XP Earned</span>
            <span className={styles.rewardAmount} style={{ color: '#c084fc' }}>+{xp} XP</span>
          </div>
        </div>

        <div className={styles.rewardRow}>
          <div className={styles.rewardIconGold}>V</div>
          <div className={styles.rewardMeta}>
            <span className={styles.rewardLabel}>VEs Earned</span>
            <span className={styles.rewardAmount} style={{ color: '#fcd34d' }}>+{ves} VEs</span>
          </div>
        </div>

        <div className={styles.rewardRow}>
          <div className={styles.rewardIconGreen}>◆</div>
          <div className={styles.rewardMeta}>
            <span className={styles.rewardLabel}>Gems Earned</span>
            <span className={styles.rewardAmount} style={{ color: '#4ade80' }}>+{gems} Gems</span>
          </div>
        </div>

        <div className={styles.rewardRow}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.3)',
              border: '1.5px solid #60a5fa',
              color: '#60a5fa',
              fontSize: '11px',
              fontWeight: '900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🎯
          </div>
          <div className={styles.rewardMeta}>
            <span className={styles.rewardLabel}>Items Caught</span>
            <span className={styles.rewardAmount} style={{ color: '#60a5fa' }}>{itemsCaught} Items</span>
          </div>
        </div>
      </div>

      <div className={styles.footerActions}>
        <button
          className={styles.playAgainBtn}
          type="button"
          onClick={onPlayAgain}
          id="xp-catcher-play-again"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.95" />
          </svg>
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}
