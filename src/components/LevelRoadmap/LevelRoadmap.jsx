import { useState } from 'react'
import { MapPin, Check, Lock, ChevronRight, X, Sparkles, Award } from 'lucide-react'
import styles from './LevelRoadmap.module.css'

export default function LevelRoadmap({ roadmap = [], currentLevel = 4 }) {
  const [selectedNode, setSelectedNode] = useState(null)

  const completedCount = roadmap.filter((r) => r.status === 'Completed').length
  const trackPercentage = Math.round((completedCount / (roadmap.length - 1)) * 100)

  return (
    <section className={styles.roadmapSection} aria-label="Progression Roadmap">
      <div className={styles.roadmapHeader}>
        <div className={styles.headerTitleGroup}>
          <MapPin size={22} color="var(--accent-gold)" />
          <h2 className={styles.roadmapTitle}>Level Progression Roadmap</h2>
        </div>

        <div className={styles.legendList}>
          <div className={styles.legendItem}>
            <span className={styles.legendDotCompleted} />
            <span>Completed</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotCurrent} />
            <span>Current</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotNext} />
            <span>Next</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotLocked} />
            <span>Locked</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollContainer}>
        <div className={styles.trackLine}>
          <div
            className={styles.trackProgress}
            style={{ width: `${Math.min(100, Math.max(0, trackPercentage))}%` }}
          />
        </div>

        <div className={styles.nodesGrid}>
          {roadmap.map((item) => {
            const isCompleted = item.status === 'Completed'
            const isCurrent = item.status === 'Current'
            const isNext = item.status === 'Next'
            const isLocked = item.status === 'Locked'

            let nodeStatusClass = styles.nodeLocked
            if (isCompleted) nodeStatusClass = styles.nodeCompleted
            if (isCurrent) nodeStatusClass = styles.nodeCurrent
            if (isNext) nodeStatusClass = styles.nodeNext

            return (
              <button
                key={item.level}
                type="button"
                className={`${styles.nodeCard} ${nodeStatusClass}`}
                onClick={() => setSelectedNode(item)}
                title={`Level ${item.level}: ${item.name} (${item.status}) - Click for details`}
              >
                <div className={styles.nodeCircle}>
                  {isCurrent && <span className={styles.currentBeacon}>YOU ARE HERE</span>}
                  {isCompleted && <Check size={20} />}
                  {isCurrent && <span>L{item.level}</span>}
                  {isNext && <span>L{item.level}</span>}
                  {isLocked && <Lock size={18} />}
                </div>

                <div className={styles.nodeInfo}>
                  <span className={styles.nodeLevel}>{item.title}</span>
                  <span className={styles.nodeName}>{item.name}</span>
                  <span className={styles.nodeRewardPill}>{item.reward}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className={styles.detailBackdrop} onClick={() => setSelectedNode(null)}>
          <div className={styles.detailCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleGroup}>
                <Award size={24} color="var(--accent-gold)" />
                <h3 className={styles.roadmapTitle}>
                  {selectedNode.title} — {selectedNode.name}
                </h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedNode(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{selectedNode.status}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Threshold Required:</span>
                <span className={styles.detailValue}>
                  {selectedNode.xpThreshold.toLocaleString()} XP
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Milestone Reward:</span>
                <span className={styles.detailValue} style={{ color: 'var(--accent-gold-light)' }}>
                  {selectedNode.reward}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Access Level:</span>
                <span className={styles.detailValue}>
                  {selectedNode.isUnlocked ? 'Unlocked / Achieved' : 'Locked for Future Tiers'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
