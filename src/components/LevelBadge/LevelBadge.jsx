import React from 'react'
import styles from './LevelBadge.module.css'

export default function LevelBadge({
  level = 11,
  tierName = 'Platinum II',
  size = 'default',
  showGlow = true
}) {
  const isLarge = size === 'large' || size === 'podium'
  const isPodium = size === 'podium'
  const isSmall = size === 'small' || size === 'mini'

  // Determine tier colors based on level
  let primaryColor = '#a855f7'
  let secondaryColor = '#ec4899'
  let accentColor = '#f5ba31'

  if (level >= 20) {
    primaryColor = '#ec4899'
    secondaryColor = '#f5ba31'
    accentColor = '#60a5fa'
  } else if (level >= 15) {
    primaryColor = '#3b82f6'
    secondaryColor = '#a855f7'
    accentColor = '#93c5fd'
  } else if (level >= 10) {
    primaryColor = '#a855f7'
    secondaryColor = '#c084fc'
    accentColor = '#fef08a'
  } else if (level >= 5) {
    primaryColor = '#f59e0b'
    secondaryColor = '#fbbf24'
    accentColor = '#fed7aa'
  }

  return (
    <div
      className={`${styles.badgeWrapper} ${styles[size] || styles.default} ${
        showGlow ? styles.withGlow : ''
      }`}
      aria-label={`Level ${level} ${tierName} Badge`}
    >
      {/* Ambient background aura */}
      <div
        className={styles.ambientAura}
        style={{
          background: `radial-gradient(circle, ${primaryColor}66 0%, ${secondaryColor}22 55%, transparent 75%)`
        }}
      />

      {/* 3D-style Crystal SVG Emblem */}
      <svg
        className={styles.crystalSvg}
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`coreGlow-${level}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#4c1d95" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1e1035" />
          </radialGradient>

          <linearGradient id={`crystalFacet1-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id={`crystalFacet2-${level}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor="#4a044e" />
          </linearGradient>

          <linearGradient id={`goldTrim-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <filter id={`emblemGlow-${level}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Wing Shards */}
        <g className={styles.wings}>
          {/* Left Wings */}
          <path d="M 40 90 L 10 120 L 55 145 Z" fill={`url(#crystalFacet2-${level})`} opacity="0.85" />
          <path d="M 50 65 L 20 95 L 65 115 Z" fill={`url(#crystalFacet1-${level})`} opacity="0.9" />
          <path d="M 65 45 L 35 70 L 80 90 Z" fill="#9333ea" opacity="0.8" />

          {/* Right Wings */}
          <path d="M 200 90 L 230 120 L 185 145 Z" fill={`url(#crystalFacet2-${level})`} opacity="0.85" />
          <path d="M 190 65 L 220 95 L 175 115 Z" fill={`url(#crystalFacet1-${level})`} opacity="0.9" />
          <path d="M 175 45 L 205 70 L 160 90 Z" fill="#9333ea" opacity="0.8" />
        </g>

        {/* Outer Crest Shield */}
        <polygon
          points="120,15 205,65 205,175 120,240 35,175 35,65"
          fill="#130e33"
          stroke={`url(#goldTrim-${level})`}
          strokeWidth="3.5"
          filter={`url(#emblemGlow-${level})`}
        />

        {/* Outer Crystal Facets */}
        <polygon points="120,25 195,70 120,115" fill={`url(#crystalFacet1-${level})`} opacity="0.75" />
        <polygon points="120,25 45,70 120,115" fill={`url(#crystalFacet2-${level})`} opacity="0.75" />
        <polygon points="45,70 35,170 120,155" fill="#3b0764" opacity="0.85" />
        <polygon points="195,70 205,170 120,155" fill="#2e1065" opacity="0.85" />
        <polygon points="35,170 120,230 120,155" fill={`url(#crystalFacet1-${level})`} opacity="0.7" />
        <polygon points="205,170 120,230 120,155" fill={`url(#crystalFacet2-${level})`} opacity="0.7" />

        {/* Secondary Layer - Inner Diamond Shield */}
        <polygon
          points="120,45 180,85 180,165 120,210 60,165 60,85"
          fill={`url(#coreGlow-${level})`}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
        />

        {/* Geometric Light Creases */}
        <line x1="120" y1="45" x2="120" y2="210" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="60" y1="125" x2="180" y2="125" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

        {/* Star Sparkle Top Crest */}
        <path
          d="M 120 30 L 123 40 L 133 43 L 123 46 L 120 56 L 117 46 L 107 43 L 117 40 Z"
          fill="#ffffff"
          filter={`url(#emblemGlow-${level})`}
        />

        {/* Triple Chevron Stars / Accents */}
        <path
          d="M 90 95 L 120 115 L 150 95"
          fill="none"
          stroke={`url(#goldTrim-${level})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 96 108 L 120 124 L 144 108"
          fill="none"
          stroke={`url(#goldTrim-${level})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Center Level Number Plate */}
        <circle cx="120" cy="148" r="34" fill="#0f0c29" stroke={`url(#goldTrim-${level})`} strokeWidth="2.5" />
        <circle cx="120" cy="148" r="30" fill="rgba(124, 58, 237, 0.35)" />

        {/* Level text inside badge */}
        <text
          x="120"
          y="140"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fontFamily="'Montserrat', sans-serif"
          letterSpacing="2"
          fill="#cbd5e1"
        >
          LVL
        </text>
        <text
          x="120"
          y="163"
          textAnchor="middle"
          fontSize="24"
          fontWeight="900"
          fontFamily="'Montserrat', sans-serif"
          fill="#ffffff"
          filter={`url(#emblemGlow-${level})`}
        >
          {String(level).padStart(2, '0')}
        </text>
      </svg>
    </div>
  )
}
