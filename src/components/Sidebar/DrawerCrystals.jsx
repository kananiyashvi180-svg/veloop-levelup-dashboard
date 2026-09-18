import React from 'react'
import styles from './DrawerCrystals.module.css'

/**
 * Premium decorative VELOOP floating crystal composition for the mobile drawer.
 * Features:
 * - Purple & lavender faceted crystals
 * - Soft electric violet aura glow
 * - Specular white facet highlights
 * - Satellite floating diamond shards with subtle depth
 * - Slow, elegant floating, rotational drift, and soft sparkle twinkle
 */
export default function DrawerCrystals() {
  return (
    <div className={styles.crystalDecorContainer} aria-hidden="true">
      {/* 1. Ambient Violet Glow Halo */}
      <div className={styles.glowAura} />

      {/* 2. Floating Crystals Composition SVG */}
      <svg
        className={styles.crystalSvg}
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Crystal Gradients */}
          <linearGradient id="dcMainApex" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#f5d0fe" />
            <stop offset="70%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <linearGradient id="dcMainFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id="dcMainFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          <linearGradient id="dcShardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="40%" stopColor="#d8b4fe" />
            <stop offset="80%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id="dcGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND DEPTH SHARDS ── */}
        <g className={styles.backShardsGroup} opacity="0.45">
          {/* Deep shard left */}
          <polygon points="50,110 38,82 52,65 64,90" fill="#4c1d95" stroke="#9333ea" strokeWidth="0.8" />
          {/* Deep shard right */}
          <polygon points="170,115 182,85 168,70 156,95" fill="#4c1d95" stroke="#9333ea" strokeWidth="0.8" />
        </g>

        {/* ── LEFT SATELLITE FLOATING DIAMOND SHARD ── */}
        <g className={styles.leftShardGroup}>
          <polygon
            points="58,45 44,72 58,102 72,72"
            fill="url(#dcShardGrad)"
            stroke="#e9d5ff"
            strokeWidth="1.2"
          />
          {/* Left facet shadow */}
          <polygon points="58,45 44,72 58,102" fill="#581c87" opacity="0.45" />
          {/* Top highlight facet */}
          <polygon points="58,45 52,62 58,72 64,62" fill="#ffffff" opacity="0.7" />
          {/* Tiny spark */}
          <circle cx="58" cy="45" r="1.8" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" />
        </g>

        {/* ── RIGHT SATELLITE FLOATING CRYSTAL SHARD ── */}
        <g className={styles.rightShardGroup}>
          <polygon
            points="162,38 148,64 162,94 176,64"
            fill="url(#dcShardGrad)"
            stroke="#f5d0fe"
            strokeWidth="1.2"
          />
          {/* Right facet shadow */}
          <polygon points="162,38 176,64 162,94" fill="#3b0764" opacity="0.5" />
          {/* Specular edge */}
          <polygon points="162,38 156,54 162,64 168,54" fill="#ffffff" opacity="0.8" />
          {/* Tiny spark */}
          <circle cx="162" cy="38" r="1.8" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" />
        </g>

        {/* ── MAIN CENTER CRYSTAL (TALL & FACETED) ── */}
        <g className={styles.mainCrystalGroup}>
          {/* Outer glow ring base */}
          <ellipse cx="110" cy="132" rx="42" ry="8" fill="rgba(168,85,247,0.22)" filter="blur(6px)" />

          {/* Left facet */}
          <polygon
            points="110,18 84,65 92,126 110,140"
            fill="url(#dcMainFacetLeft)"
            stroke="#c084fc"
            strokeWidth="1.2"
          />

          {/* Right facet */}
          <polygon
            points="110,18 136,65 128,126 110,140"
            fill="url(#dcMainFacetRight)"
            stroke="#a855f7"
            strokeWidth="1.2"
          />

          {/* Center luminous facet / spine */}
          <polygon
            points="110,18 100,68 110,140 120,68"
            fill="url(#dcMainApex)"
            stroke="#f5d0fe"
            strokeWidth="1.2"
          />

          {/* Top specular glint highlight */}
          <polygon points="110,18 104,42 110,50 116,42" fill="#ffffff" opacity="0.9" />

          {/* Apex glowing star sparkle */}
          <circle cx="110" cy="18" r="2.8" fill="#ffffff" filter="drop-shadow(0 0 5px #fff)" />
        </g>

        {/* ── ACCENT FLOATING CRYSTAL (UPPER FLOAT) ── */}
        <g className={styles.topMiniShardGroup}>
          <polygon
            points="108,4 102,12 108,20 114,12"
            fill="url(#dcGoldAccent)"
            stroke="#fef08a"
            strokeWidth="0.8"
            opacity="0.8"
          />
        </g>

        {/* ── AMBIENT TWINKLE SPARKLES ── */}
        <circle cx="82" cy="38" r="1.4" fill="#ffffff" className={styles.sparkle1} />
        <circle cx="138" cy="30" r="1.6" fill="#f5d0fe" className={styles.sparkle2} />
        <circle cx="95" cy="100" r="1.2" fill="#c084fc" className={styles.sparkle3} />
        <circle cx="128" cy="95" r="1.3" fill="#ffffff" className={styles.sparkle1} />
      </svg>
    </div>
  )
}
