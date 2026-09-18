import { useState, useCallback } from 'react'
import { ArrowLeft, Info, Volume2, VolumeX, Timer, X, Zap } from 'lucide-react'
import { useUserState } from '../../../context/UserStateContext'
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

export default function GameContainer({ onBack, onGameComplete }) {
  const userState = useUserState()
  const currentLevel = userState?.activeProgression?.currentLevel || 4

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

  const handleCatch = useCallback((type, multiplier = 2) => {
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
    const updatedResult = onGameComplete && finalState
      ? onGameComplete(finalState) || finalState
      : finalState
    setFinalRewards(updatedResult)
    setPhase('done')
  }, [onGameComplete])

  const handlePlayAgain = useCallback(() => {
    setRewards(initialScore())
    setTimeLeft(GAME_DURATION)
    setFinalRewards(null)
    setPhase('idle')
  }, [])

  return (
    <div className={styles.gameContainer}>
      {/* 1. Top Section / Game Header */}
      <header className={styles.topNavRow}>
        <button
          className={styles.backBtn}
          type="button"
          aria-label="Exit Game"
          onClick={onBack}
          id="xp-catcher-back-btn"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span className={styles.backText}>Exit Game</span>
        </button>

        <div className={styles.headerBlock}>
          <div className={styles.titleWithInfo}>
            <h1 className={styles.gameTitle}>XP CATCHER</h1>
            <button
              type="button"
              className={styles.infoButton}
              aria-label="Game instructions"
              onClick={() => setShowInfo((v) => !v)}
              id="xp-catcher-info-btn"
            >
              <Info size={16} aria-hidden="true" />
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
            id="xp-catcher-sound-btn"
          >
            {isMuted ? (
              <VolumeX size={17} aria-hidden="true" />
            ) : (
              <Volume2 size={17} aria-hidden="true" />
            )}
          </button>

          <div
            className={`${styles.timerPill} ${
              timeLeft <= 5 && phase === 'playing' ? styles.timerUrgent : ''
            }`}
            title="Session Countdown"
          >
            <Timer size={15} aria-hidden="true" />
            <span className={styles.timerDigits}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* 2. Info Modal / Game Rules Dialog */}
      {showInfo && (
        <div className={styles.infoModal} onClick={() => setShowInfo(false)}>
          <div className={styles.infoModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.infoModalHeader}>
              <div className={styles.infoModalTitleWrap}>
                <Zap size={18} color="#c084fc" aria-hidden="true" />
                <h3>How To Play XP Catcher</h3>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setShowInfo(false)}
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className={styles.infoModalIntro}>
              Control the glowing catcher platform at the bottom of the arena to gather falling collectibles before the 20-second timer runs out!
            </p>
            <ul className={styles.rulesList}>
              <li>
                <strong style={{ color: '#c084fc' }}>XP Orb:</strong> +10 XP base points, multiplied by active streak combo.
              </li>
              <li>
                <strong style={{ color: '#fde047' }}>VE Coin:</strong> +15 Score &amp; +5 VEs reward currency.
              </li>
              <li>
                <strong style={{ color: '#4ade80' }}>Rare Gem:</strong> +20 Score &amp; +2 Gems multiplier booster.
              </li>
              <li>
                <strong style={{ color: '#fb923c' }}>Combo Multipliers:</strong> You start immediately at 2X Multiplier! Catch 5 items consecutively without dropping to boost to 3X, and 10 items to trigger 4X MAX!
              </li>
            </ul>
            <button
              type="button"
              className={styles.modalGotItBtn}
              onClick={() => setShowInfo(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Stage Content Area */}
      <main className={styles.innerContent}>
        {phase === 'idle' && (
          <GameStart onStart={handleStart} />
        )}
        {phase === 'playing' && (
          <GamePlay
            duration={GAME_DURATION}
            rewards={rewards}
            isMuted={isMuted}
            currentLevel={currentLevel}
            onCatch={handleCatch}
            onTimerTick={handleTimerTick}
            onGameOver={handleGameOver}
          />
        )}
        {phase === 'done' && (
          <GameResult
            finalRewards={finalRewards}
            onPlayAgain={handlePlayAgain}
            onExit={onBack}
          />
        )}
      </main>
    </div>
  )
}