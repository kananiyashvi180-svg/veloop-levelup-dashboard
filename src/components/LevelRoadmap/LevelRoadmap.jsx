import React, { useState } from 'react'
import { Check, Lock, Sparkles, X, Award } from 'lucide-react'
import styles from './LevelRoadmap.module.css'

export default function LevelRoadmap({ roadmap = [], currentLevel = 11 }) {
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <section className={styles.roadmapSection} aria-label="Level Progression Roadmap">
      <div className={styles.roadmapHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.iconTag}>
            <Sparkles size={16} className={styles.sparkleIcon} aria-hidden="true" />
          </div>
          <div>
            <h2 className={styles.roadmapTitle}>Level Roadmap</h2>
            <p className={styles.roadmapSubtitle}>Complete &amp; Unlock Rewards</p>
          </div>
        </div>

        <div className={styles.progressCounterBadge}>
          <span className={styles.counterLabel}>Your Progress</span>
          <strong className={styles.counterValue}>Level {currentLevel} / 20</strong>
        </div>
      </div>

      <div className={styles.roadmapTrackContainer}>
        {/* Continuous Neon Connection Line */}
        <div className={styles.connectorLineBg} />
        <div
          className={styles.connectorLineActive}
          style={{
            width: `${Math.min(100, Math.max(10, ((roadmap.findIndex(r => r.level === currentLevel) + 0.5) / roadmap.length) * 100))}%`
          }}
        />

        {/* Milestone Badges Grid */}
        <div className={styles.nodesContainer}>
          {roadmap.map((item) => {
            const isCompleted = item.status === 'Completed'
            const isCurrent = item.status === 'Current'
            const isLocked = item.status === 'Locked'

            return (
              <div
                key={item.level}
                className={`${styles.milestoneItem} ${
                  isCurrent ? styles.itemCurrent : isCompleted ? styles.itemCompleted : styles.itemLocked
                }`}
                onClick={() => setSelectedNode(item)}
                role="button"
                tabIndex={0}
                title={`Level ${item.level}: ${item.name} (${item.status})`}
              >
                {/* Milestone Node Badge */}
                <div className={styles.nodeEmblem}>
                  {isCurrent && <div className={styles.currentPulseRing} />}

                  <div className={styles.hexBadge}>
                    <svg viewBox="0 0 64 64" className={styles.hexSvg}>
                      <defs>
                        <linearGradient id={`hexGrad-${item.level}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            stopColor={isCurrent ? '#f472b6' : isCompleted ? '#c084fc' : '#334155'}
                          />
                          <stop
                            offset="100%"
                            stopColor={isCurrent ? '#9333ea' : isCompleted ? '#6b21a8' : '#0f172a'}
                          />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="32,4 58,18 58,46 32,60 6,46 6,18"
                        fill={`url(#hexGrad-${item.level})`}
                        stroke={isCurrent ? '#fef08a' : isCompleted ? '#a855f7' : 'rgba(255,255,255,0.1)'}
                        strokeWidth={isCurrent ? 2.5 : 1.5}
                      />
                    </svg>

                    <div className={styles.badgeContent}>
                      {isCompleted && <Check size={16} className={styles.checkIcon} aria-hidden="true" />}
                      {isCurrent && <span className={styles.currentLvlNum}>L{item.level}</span>}
                      {isLocked && <Lock size={14} className={styles.lockIcon} aria-hidden="true" />}
                    </div>
                  </div>
                </div>

                {/* Milestone Labels */}
                <div className={styles.milestoneText}>
                  <span className={styles.milestoneLevel}>Level {String(item.level).padStart(2, '0')}</span>
                  <span className={styles.milestoneName}>{item.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestone Details Modal */}
      {selectedNode && (
        <div className={styles.modalOverlay} onClick={() => setSelectedNode(null)} role="dialog" aria-modal="true">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleRow}>
                <Award size={20} className={styles.awardIcon} aria-hidden="true" />
                <h3 className={styles.modalTitle}>
                  {selectedNode.title} — {selectedNode.name}
                </h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedNode(null)}
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>Tier Status:</span>
                <span className={`${styles.statusPill} ${styles[`status_${selectedNode.status.toLowerCase()}`]}`}>
                  {selectedNode.status}
                </span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>Threshold Required:</span>
                <span className={styles.modalValue}>{selectedNode.xpThreshold.toLocaleString()} XP</span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>Milestone Reward:</span>
                <span className={styles.modalRewardValue}>
                  {typeof selectedNode.reward === 'object' ? selectedNode.reward.label : selectedNode.reward}
                </span>
              </div>
              {selectedNode.benefits && selectedNode.benefits.length > 0 && (
                <div className={styles.benefitsSection}>
                  <span className={styles.benefitsHeading}>Tier Perks:</span>
                  <ul className={styles.perksList}>
                    {selectedNode.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
