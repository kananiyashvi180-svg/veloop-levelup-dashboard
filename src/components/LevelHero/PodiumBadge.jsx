import React from 'react'
import LevelBadge from '../LevelBadge/LevelBadge'
import styles from './PodiumBadge.module.css'

export default function PodiumBadge({
  level = 11,
  tierName = 'Platinum II',
  subName = 'Elite Miner'
}) {
  return (
    <div className={styles.podiumContainer} aria-label={`Level ${level} Podium Showcase`}>
      {/* Dynamic Purple/Violet Ambient Light Flare */}
      <div className={styles.radialBacklight} />
      <div className={styles.particlesContainer}>
        <span className={`${styles.sparkle} ${styles.sp1}`} />
        <span className={`${styles.sparkle} ${styles.sp2}`} />
        <span className={`${styles.sparkle} ${styles.sp3}`} />
        <span className={`${styles.sparkle} ${styles.sp4}`} />
      </div>

      {/* Floating 3D Crystal Badge */}
      <div className={styles.badgeAnchor}>
        <LevelBadge level={level} tierName={tierName} size="podium" showGlow={true} />
      </div>

      {/* 3D Tiered Podium Pedestal */}
      <div className={styles.podiumStructure}>
        {/* Tier Nameplate on the Podium */}
        <div className={styles.nameplateWrapper}>
          <div className={styles.nameplatePlate}>
            <span className={styles.nameplateAccentLeft} />
            <span className={styles.nameplateText}>{tierName.toUpperCase()}</span>
            <span className={styles.nameplateAccentRight} />
          </div>
        </div>

        {/* Podium Base Stepped Rings SVG */}
        <div className={styles.podiumBaseSvgWrap}>
          <svg
            className={styles.podiumSvg}
            viewBox="0 0 340 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="podiumMetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2e2154" />
                <stop offset="50%" stopColor="#150f2e" />
                <stop offset="100%" stopColor="#080616" />
              </linearGradient>

              <linearGradient id="rimGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#e879f9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
              </linearGradient>

              <radialGradient id="floorGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#070812" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Bottom Floor Glow Pool */}
            <ellipse cx="170" cy="65" rx="160" ry="32" fill="url(#floorGlowGrad)" />

            {/* Outer Ground Neon Ring */}
            <ellipse
              cx="170"
              cy="65"
              rx="155"
              ry="26"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              opacity="0.65"
            />
            <ellipse
              cx="170"
              cy="65"
              rx="135"
              ry="22"
              stroke="#e879f9"
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Stepped Pedestal Body */}
            <path
              d="M 55 52 C 55 52 100 70 170 70 C 240 70 285 52 285 52 L 275 62 C 275 62 235 78 170 78 C 105 78 65 62 65 62 Z"
              fill="#0e0a24"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="1"
            />

            {/* Upper Podium Rim & Platform */}
            <ellipse
              cx="170"
              cy="48"
              rx="105"
              ry="18"
              fill="url(#podiumMetalGrad)"
              stroke="url(#rimGlowGrad)"
              strokeWidth="2.5"
            />
            <ellipse
              cx="170"
              cy="46"
              rx="95"
              ry="15"
              fill="#100b2b"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
