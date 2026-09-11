import { useState, useCallback } from 'react'
import GameStart from '../GameStart/GameStart'
import GamePlay from '../GamePlay/GamePlay'
import GameResult from '../GameResult/GameResult'
import styles from './GameContainer.module.css'

const GAME_DURATION = 20

const initialScore = () => ({ score: 0, xp: 0, ves: 0, gems: 0 })

function formatTime(s) {
  const mins = Math.floor(s / 60).toString().padStart(2, '0')
  const secs = (s % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export default function GameContainer({ onBack }) {
  const [phase, setPhase] = useState('idle')
  const [rewards, setRewards] = useState(initialScore())
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [finalRewards, setFinalRewards] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleStart = useCallback(() => {
    setRewards(initialScore())
    setTimeLeft(GAME_DURATION)
    setFinalRewards(null)
    setPhase('playing')
  }, [])

  const handleCatch = useCallback((type, multiplier = 1) => {
    setRewards((prev) => {
      if (type === 'xp-orb') {
        return {
          ...prev,
          score: prev.score + 10 * multiplier,
          xp: prev.xp + 10 * multiplier,
        }
      }
      if (type === 've-coin') {
        return {
          ...prev,
          score: prev.score + 15 * multiplier,
          ves: prev.ves + 5 * multiplier,
        }
      }
      if (type === 'gem') {
        return {
          ...prev,
          score: prev.score + 20 * multiplier,
          gems: prev.gems + 2 * multiplier,
        }
      }
      return prev
    })
  }, [])

  const handleTimerTick = useCallback((tick) => {
    setTimeLeft(tick)
  }, [])

  const handleGameOver = useCallback((finalState) => {
    setFinalRewards(finalState)
    setPhase('done')
  }, [])

  const handlePlayAgain = useCallback(() => {
    setPhase('idle')
  }, [])

  return (
    <div className={styles.gameContainer}>
      <div className={styles.topNavRow}>
        <button
          className={styles.backBtn}
          type="button"
          aria-label="Back"
          onClick={onBack}
          id="xp-catcher-back-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span className={styles.backText}>Exit Game</span>
        </button>

        <div className={styles.headerBlock}>
          <div className={styles.titleWithInfo}>
            <h1 className={styles.gameTitle}>XP CATCHER</h1>
            <button
              type="button"
              className={styles.infoButton}
              aria-label="Game info"
              onClick={() => setShowInfo((v) => !v)}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          </div>
          <p className={styles.subtitle}>Catch XP orbs &amp; coins — Score high for better rewards!</p>
        </div>

        <div className={styles.topActions}>
          <button
            className={styles.soundBtn}
            type="button"
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            onClick={() => setIsMuted((m) => !m)}
          >
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          <div className={`${styles.timerPill} ${timeLeft <= 5 && phase === 'playing' ? styles.timerUrgent : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className={styles.timerDigits}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className={styles.infoModal} onClick={() => setShowInfo(false)}>
          <div className={styles.infoModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.infoModalHeader}>
              <h3>How To Play XP Catcher</h3>
              <button type="button" onClick={() => setShowInfo(false)}>✕</button>
            </div>
            <p>Catch falling collectibles in your golden basket before the 20-second timer runs out!</p>
            <ul>
              <li><strong style={{ color: '#c084fc' }}>XP Orb:</strong> +10 XP multiplied by streak combo</li>
              <li><strong style={{ color: '#fcd34d' }}>VE Coin:</strong> +15 Score &amp; +5 VEs</li>
              <li><strong style={{ color: '#4ade80' }}>Gem:</strong> +20 Score &amp; +2 Gems</li>
              <li><strong style={{ color: '#fb923c' }}>Combo Multiplier:</strong> Catch items without dropping to reach 2X, 3X, and 4X!</li>
            </ul>
          </div>
        </div>
      )}

      <div className={styles.innerContent}>
        {phase === 'idle' && (
          <GameStart onStart={handleStart} />
        )}
        {phase === 'playing' && (
          <GamePlay
            duration={GAME_DURATION}
            rewards={rewards}
            isMuted={isMuted}
            onCatch={handleCatch}
            onTimerTick={handleTimerTick}
            onGameOver={handleGameOver}
          />
        )}
        {phase === 'done' && (
          <GameResult
            finalRewards={finalRewards}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  )
}
