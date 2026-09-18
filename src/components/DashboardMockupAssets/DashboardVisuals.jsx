import React from 'react'

/**
 * High-fidelity animated SVG graphics tailored for the VELOOP dashboard
 */

// Embedded animations stylesheet for seamless vector motion
const SVG_STYLES = `
@keyframes trophyLevitate {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}
@keyframes auraBreathe {
  0%, 100% { opacity: 0.65; transform: scale(1); }
  50% { opacity: 0.92; transform: scale(1.03); }
}
@keyframes shardFloat1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-3px, -6px) rotate(-3deg); }
}
@keyframes shardFloat2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(3px, -5px) rotate(3deg); }
}
@keyframes rayFlicker {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.6; }
}
@keyframes padFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(-1.5deg); }
}
@keyframes lightningZap {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 14px rgba(216, 180, 254, 0.75));
  }
  50% {
    transform: scale(1.04);
    filter: drop-shadow(0 0 24px rgba(245, 186, 49, 0.85)) drop-shadow(0 0 10px #ffffff);
  }
}
@keyframes crystalClusterFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
@keyframes twinkleSparkle {
  0%, 100% { opacity: 0.35; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.3); }
}
@keyframes activeMilestonePulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(192, 132, 252, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.8);
    transform: scale(1.18);
  }
  50% {
    box-shadow: 0 0 32px rgba(236, 72, 153, 0.95), 0 0 16px rgba(245, 186, 49, 0.75), inset 0 0 14px rgba(255, 255, 255, 1);
    transform: scale(1.22);
  }
}
`

// Inject styles once
let stylesInjected = false
function ensureStyles() {
  if (typeof document !== 'undefined' && !stylesInjected) {
    if (!document.getElementById('veloop-svg-anim-styles')) {
      const tag = document.createElement('style')
      tag.id = 'veloop-svg-anim-styles'
      tag.textContent = SVG_STYLES
      document.head.appendChild(tag)
    }
    stylesInjected = true
  }
}

// 1. Crystal Shard Cluster (used in promo banner, sidebar footer, earn XP card)
export function CrystalCluster({ size = 120, className = '' }) {
  ensureStyles()
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.6))',
        animation: 'crystalClusterFloat 3.6s ease-in-out infinite'
      }}
    >
      <defs>
        <linearGradient id="cryst-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="35%" stopColor="#c084fc" />
          <stop offset="70%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="cryst-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e879f9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="cryst-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b21a8" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>
      </defs>

      {/* Background shards */}
      <polygon points="40,95 25,60 45,35 60,65" fill="url(#cryst-dark)" opacity="0.7" />
      <polygon points="120,95 135,55 115,30 100,65" fill="url(#cryst-dark)" opacity="0.7" />

      {/* Main Center Crystal */}
      <polygon points="80,10 60,50 80,125 100,50" fill="url(#cryst-main)" />
      <polygon points="80,10 60,50 80,125" fill="url(#cryst-light)" />
      <polygon points="80,10 100,50 80,125" fill="url(#cryst-dark)" opacity="0.6" />

      {/* Left Crystal */}
      <polygon points="52,38 30,70 55,120 70,72" fill="url(#cryst-main)" />
      <polygon points="52,38 30,70 55,120" fill="url(#cryst-light)" opacity="0.85" />

      {/* Right Crystal */}
      <polygon points="108,35 90,70 105,120 130,68" fill="url(#cryst-main)" />
      <polygon points="108,35 130,68 105,120" fill="url(#cryst-dark)" opacity="0.7" />

      {/* Tiny outer crystals */}
      <polygon points="25,75 10,95 28,122 38,98" fill="url(#cryst-main)" />
      <polygon points="135,72 150,92 132,122 122,96" fill="url(#cryst-light)" />

      {/* Sparkles with twinkling animation */}
      <circle cx="80" cy="10" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #fff)" style={{ animation: 'twinkleSparkle 2s ease-in-out infinite' }} />
      <circle cx="52" cy="38" r="2" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" style={{ animation: 'twinkleSparkle 2.5s ease-in-out infinite 0.5s' }} />
      <circle cx="108" cy="35" r="2" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" style={{ animation: 'twinkleSparkle 2.2s ease-in-out infinite 1s' }} />
    </svg>
  )
}

// 2. Large 3D Stepped Podium with Level 11 Platinum II Shield
export function PodiumHeroGraphic({ level = 11, tier = 'PLATINUM II' }) {
  ensureStyles()
  return (
    <div style={{ position: 'relative', width: '280px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 320 280"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="podium-glow" cx="50%" cy="65%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#090518" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shield-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d0fe" />
            <stop offset="30%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>
          <linearGradient id="ring-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="pillar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="50%" stopColor="#1e053a" />
            <stop offset="100%" stopColor="#0c0218" />
          </linearGradient>
        </defs>

        {/* Ambient Floor Glow with breathing animation */}
        <ellipse
          cx="160"
          cy="225"
          rx="140"
          ry="42"
          fill="url(#podium-glow)"
          opacity="0.75"
          style={{ animation: 'auraBreathe 3.5s ease-in-out infinite', transformOrigin: '160px 225px' }}
        />

        {/* Floating Crystal Shards around podium */}
        {/* Left shards */}
        <g style={{ animation: 'shardFloat1 3.8s ease-in-out infinite', transformOrigin: '45px 60px' }}>
          <polygon points="45,45 35,70 48,82 58,58" fill="#d8b4fe" opacity="0.85" style={{ filter: 'drop-shadow(0 0 8px #c084fc)' }} />
          <polygon points="68,95 55,115 65,125 78,105" fill="#a855f7" opacity="0.7" />
        </g>
        {/* Right shards */}
        <g style={{ animation: 'shardFloat2 4.2s ease-in-out infinite', transformOrigin: '270px 65px' }}>
          <polygon points="275,50 262,75 274,86 288,60" fill="#f0abfc" opacity="0.85" style={{ filter: 'drop-shadow(0 0 8px #c084fc)' }} />
          <polygon points="252,98 240,118 250,126 262,106" fill="#a855f7" opacity="0.7" />
        </g>

        {/* STEPPED 3D PODIUM BASE */}
        {/* Bottom Tier Platform */}
        <ellipse cx="160" cy="240" rx="130" ry="24" fill="#0c041f" stroke="#a855f7" strokeWidth="2" />
        <ellipse cx="160" cy="235" rx="124" ry="20" fill="url(#ring-glow)" />

        {/* Middle Tier Platform */}
        <path d="M 46 220 C 46 205, 274 205, 274 220 L 274 232 C 274 246, 46 246, 46 232 Z" fill="url(#pillar-grad)" />
        <ellipse cx="160" cy="220" rx="114" ry="18" fill="#1b0a3d" stroke="#c084fc" strokeWidth="2.5" />
        
        {/* Top Platform Disc */}
        <path d="M 64 205 C 64 192, 256 192, 256 205 L 256 216 C 256 228, 64 228, 64 216 Z" fill="url(#pillar-grad)" />
        <ellipse cx="160" cy="205" rx="96" ry="15" fill="#2e1065" stroke="#e879f9" strokeWidth="3" />
        <ellipse cx="160" cy="205" rx="86" ry="12" fill="url(#podium-glow)" />

        {/* Vertical light rays emanating from pedestal */}
        <polygon
          points="120,205 135,160 185,160 200,205"
          fill="url(#podium-glow)"
          style={{ animation: 'rayFlicker 2.6s ease-in-out infinite' }}
        />

        {/* GRAND SHIELD / TROPHY EMBLEM WITH FLOATING LEVITATION */}
        <g style={{
          filter: 'drop-shadow(0 0 24px rgba(192, 132, 252, 0.75))',
          animation: 'trophyLevitate 3.8s ease-in-out infinite'
        }}>
          {/* Outer Laurel Wreath / Wings */}
          {/* Left Wing Facets */}
          <path d="M 98 120 C 80 90, 85 50, 120 30 C 105 52, 108 85, 126 110 Z" fill="url(#shield-metal)" />
          <path d="M 88 140 C 72 110, 80 75, 108 55 C 96 78, 98 108, 116 130 Z" fill="url(#shield-metal)" opacity="0.8" />
          {/* Right Wing Facets */}
          <path d="M 222 120 C 240 90, 235 50, 200 30 C 215 52, 212 85, 194 110 Z" fill="url(#shield-metal)" />
          <path d="M 232 140 C 248 110, 240 75, 212 55 C 224 78, 222 108, 204 130 Z" fill="url(#shield-metal)" opacity="0.8" />

          {/* Central Shield Body */}
          <polygon
            points="160,25 215,55 210,135 160,175 110,135 105,55"
            fill="#12072b"
            stroke="url(#shield-metal)"
            strokeWidth="4"
          />
          {/* Inner Shield Bevel */}
          <polygon
            points="160,36 203,62 198,128 160,162 122,128 117,62"
            fill="#240e4f"
            stroke="#c084fc"
            strokeWidth="1.5"
          />
          
          {/* Diamond crest at top */}
          <polygon points="160,15 170,26 160,38 150,26" fill="#f5d0fe" filter="drop-shadow(0 0 6px #fff)" />

          {/* Text inside Shield */}
          <text
            x="160"
            y="65"
            textAnchor="middle"
            fill="#d8b4fe"
            fontSize="11"
            fontWeight="800"
            letterSpacing="2.5"
            fontFamily="'Montserrat', sans-serif"
          >
            LEVEL
          </text>

          <text
            x="160"
            y="112"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="46"
            fontWeight="900"
            fontFamily="'Montserrat', sans-serif"
            style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))' }}
          >
            {level}
          </text>

          {/* Tier Banner Pill */}
          <rect
            x="96"
            y="142"
            width="128"
            height="26"
            rx="6"
            fill="#0b031d"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text
            x="160"
            y="159"
            textAnchor="middle"
            fill="#f5d0fe"
            fontSize="10.5"
            fontWeight="900"
            letterSpacing="2"
            fontFamily="'Montserrat', sans-serif"
          >
            {tier}
          </text>
        </g>
      </svg>
    </div>
  )
}

// 3. Glowing Neon Game Controller (Play & Earn card)
export function GlowingGameController({ size = 130 }) {
  ensureStyles()
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.7))',
        animation: 'padFloat 4s ease-in-out infinite'
      }}
    >
      <defs>
        <linearGradient id="pad-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#1e043a" />
        </linearGradient>
      </defs>

      {/* Crystal behind controller */}
      <polygon points="125,15 140,40 120,55 105,30" fill="#c084fc" opacity="0.6" />
      <polygon points="140,40 155,65 138,78 120,55" fill="#7c3aed" opacity="0.5" />

      {/* Gamepad main body */}
      <path
        d="M 38 45 C 50 35, 110 35, 122 45 C 132 54, 142 85, 134 104 C 128 116, 110 112, 102 96 L 94 82 C 90 75, 70 75, 66 82 L 58 96 C 50 112, 32 116, 26 104 C 18 85, 28 54, 38 45 Z"
        fill="url(#pad-body)"
        stroke="#c084fc"
        strokeWidth="2.5"
      />

      {/* D-Pad (Left) */}
      <rect x="42" y="58" width="6" height="18" rx="2" fill="#d8b4fe" />
      <rect x="36" y="64" width="18" height="6" rx="2" fill="#d8b4fe" />

      {/* Action Buttons (Right) with neon glow */}
      <circle cx="112" cy="62" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)" />
      <circle cx="122" cy="71" r="3.5" fill="#f43f5e" filter="drop-shadow(0 0 5px #f43f5e)" />
      <circle cx="112" cy="80" r="3.5" fill="#34d399" filter="drop-shadow(0 0 5px #34d399)" />
      <circle cx="102" cy="71" r="3.5" fill="#fbbf24" filter="drop-shadow(0 0 5px #fbbf24)" />

      {/* Center Home / Touchpad */}
      <rect x="70" y="48" width="20" height="12" rx="3" fill="#1e043a" stroke="#a855f7" strokeWidth="1.5" />
      <circle cx="80" cy="54" r="2.5" fill="#c084fc" />

      {/* Thumbsticks */}
      <circle cx="62" cy="74" r="9" fill="#180330" stroke="#a855f7" strokeWidth="2" />
      <circle cx="62" cy="74" r="4.5" fill="#c084fc" />
      <circle cx="98" cy="74" r="9" fill="#180330" stroke="#a855f7" strokeWidth="2" />
      <circle cx="98" cy="74" r="4.5" fill="#c084fc" />
    </svg>
  )
}

// 4. Electric Lightning Crystal Art (Today's Boost card)
export function ElectricLightningArt({ size = 110 }) {
  ensureStyles()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'lightningZap 2.4s ease-in-out infinite'
      }}
    >
      <defs>
        <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f0abfc" />
          <stop offset="70%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Outer Glow Halo */}
      <circle cx="60" cy="60" r="45" fill="rgba(168, 85, 247, 0.15)" />

      {/* Back lightning facet */}
      <polygon points="68,10 32,60 56,60 40,110 88,52 64,52" fill="#581c87" opacity="0.6" />

      {/* Main Lightning Bolt */}
      <polygon
        points="70,8 36,58 60,58 44,112 92,50 68,50"
        fill="url(#bolt-grad)"
        stroke="#ffffff"
        strokeWidth="1.2"
      />

      {/* Sparkles */}
      <circle cx="70" cy="8" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)" />
      <circle cx="44" cy="112" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 5px #fff)" />
    </svg>
  )
}

// 5. Milestone Shield Badges for the Level Roadmap
export function MilestoneBadge({ level, tier, active = false, locked = false }) {
  ensureStyles()
  const mainColor = active ? 'var(--accent-purple-bright)' : 'var(--accent-purple)'
  const borderColor = locked ? 'var(--border-color)' : 'var(--border-color-active)'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        position: 'relative',
        zIndex: 2,
        opacity: locked ? 0.55 : 1,
        transform: active ? 'scale(1.18)' : 'scale(1)',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        style={{
          width: active ? '52px' : '40px',
          height: active ? '52px' : '40px',
          borderRadius: '12px',
          background: active
            ? 'linear-gradient(135deg, var(--accent-purple-deep), var(--accent-purple-bright))'
            : 'var(--bg-surface)',
          border: `2px solid ${active ? 'var(--text-primary)' : borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: active
            ? '0 0 24px rgba(192, 132, 252, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.9)'
            : locked
              ? 'none'
              : '0 0 12px rgba(168, 85, 247, 0.35)',
          animation: active ? 'activeMilestonePulse 2.6s ease-in-out infinite' : 'none'
        }}
      >
        <svg width={active ? 28 : 22} height={active ? 28 : 22} viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 21,7 21,17 12,22 3,17 3,7"
            fill={active ? '#ffffff' : mainColor}
            opacity={active ? 0.95 : locked ? 0.6 : 0.85}
          />
          <polygon
            points="12,5 18,8.5 18,15.5 12,19 6,15.5 6,8.5"
            fill="var(--bg-surface)"
          />
          <text
            x="12"
            y="14.5"
            textAnchor="middle"
            fill={active ? '#ffffff' : 'var(--accent-purple-bright)'}
            fontSize="7"
            fontWeight="900"
            fontFamily="'Montserrat', sans-serif"
          >
            {level.replace('Lv ', '')}
          </text>
        </svg>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: '800', color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
          {level}
        </div>
        <div style={{ fontSize: '0.66rem', fontWeight: '600', color: active ? 'var(--accent-purple-bright)' : 'var(--text-muted)' }}>
          {tier}
        </div>
      </div>
    </div>
  )
}