import styles from './GamerAvatar.module.css'

export default function GamerAvatar({ avatarId = 'vanguard', size = 44, showGlow = false, className = '' }) {
  const getAvatarContent = () => {
    switch (avatarId) {
      case 'phoenix':
        return {
          theme: '#f43f5e',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="phoenixBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#1e112a" />
                </linearGradient>
                <linearGradient id="phoenixFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="phoenixVisor" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#phoenixBg)" />
              {/* Wings / Crest */}
              <path d="M 22 45 C 22 25 36 18 50 12 C 64 18 78 25 78 45 C 78 68 50 86 50 86 C 50 86 22 68 22 45 Z" fill="url(#phoenixFlame)" />
              {/* Helm plate */}
              <polygon points="50,22 68,36 62,64 50,74 38,64 32,36" fill="#2d1222" stroke="#fda4af" strokeWidth="2.5" />
              {/* Visor */}
              <polygon points="36,44 64,44 60,54 50,58 40,54" fill="url(#phoenixVisor)" />
              {/* Optical Glint */}
              <line x1="42" y1="48" x2="58" y2="48" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <circle cx="50" cy="30" r="3" fill="#f43f5e" />
            </svg>
          )
        }
      case 'cosmic':
        return {
          theme: '#8b5cf6',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="cosmicBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2e1065" />
                  <stop offset="100%" stopColor="#0f0920" />
                </linearGradient>
                <linearGradient id="cosmicVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#cosmicBg)" />
              {/* Helmet Shell */}
              <ellipse cx="50" cy="50" rx="32" ry="34" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
              {/* Astral Visor */}
              <path d="M 28 42 C 28 32 72 32 72 42 C 72 60 62 68 50 68 C 38 68 28 60 28 42 Z" fill="url(#cosmicVisor)" />
              {/* Glint Reflection */}
              <path d="M 34 38 Q 50 33 66 38" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              {/* Ear Pods */}
              <rect x="14" y="42" width="6" height="16" rx="3" fill="#c084fc" />
              <rect x="80" y="42" width="6" height="16" rx="3" fill="#c084fc" />
              {/* Forehead Beacon */}
              <polygon points="50,20 54,26 50,30 46,26" fill="#38bdf8" />
            </svg>
          )
        }
      case 'ronin':
        return {
          theme: '#ef4444',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="roninBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#450a0a" />
                  <stop offset="100%" stopColor="#140505" />
                </linearGradient>
                <linearGradient id="roninBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#roninBg)" />
              {/* Crest horns */}
              <polygon points="50,14 62,32 38,32" fill="#ef4444" />
              <polygon points="26,24 38,34 30,40" fill="#991b1b" />
              <polygon points="74,24 62,34 70,40" fill="#991b1b" />
              {/* Mask face */}
              <polygon points="50,28 72,42 66,74 50,86 34,74 28,42" fill="#1f1416" stroke="#ef4444" strokeWidth="2.5" />
              {/* Narrow Cyber Eyes */}
              <polygon points="34,48 45,46 44,52 35,53" fill="url(#roninBlade)" />
              <polygon points="66,48 55,46 56,52 65,53" fill="url(#roninBlade)" />
              {/* Mouth Guard Slits */}
              <line x1="43" y1="65" x2="57" y2="65" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="46" y1="71" x2="54" y2="71" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )
        }
      case 'crystal':
        return {
          theme: '#10b981',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="crystalBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#052e16" />
                </linearGradient>
                <linearGradient id="prismVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#crystalBg)" />
              {/* Emerald Crystal Shield */}
              <polygon points="50,12 80,30 80,68 50,88 20,68 20,30" fill="#063226" stroke="#34d399" strokeWidth="2.5" />
              {/* Internal Facets */}
              <polygon points="50,12 50,52 20,30" fill="rgba(52,211,153,0.18)" />
              <polygon points="50,12 80,30 50,52" fill="rgba(52,211,153,0.35)" />
              <polygon points="50,52 80,68 50,88" fill="rgba(16,185,129,0.45)" />
              <polygon points="50,52 50,88 20,68" fill="rgba(16,185,129,0.2)" />
              {/* Central Prism Visor */}
              <polygon points="32,45 68,45 62,57 50,62 38,57" fill="url(#prismVisor)" />
              <line x1="38" y1="48" x2="62" y2="48" stroke="#ecfdf5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )
        }
      case 'synth':
        return {
          theme: '#06b6d4',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="synthBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#083344" />
                  <stop offset="100%" stopColor="#031d28" />
                </linearGradient>
                <linearGradient id="synthVisor" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#synthBg)" />
              {/* Cyber Headplate */}
              <polygon points="32,20 68,20 78,40 74,74 50,86 26,74 22,40" fill="#0e2938" stroke="#06b6d4" strokeWidth="2.5" />
              {/* Visor Bar */}
              <rect x="26" y="42" width="48" height="14" rx="4" fill="url(#synthVisor)" />
              {/* Neural Nodes */}
              <line x1="30" y1="49" x2="70" y2="49" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="5,3" />
              <circle cx="36" cy="28" r="2.5" fill="#38bdf8" />
              <circle cx="50" cy="28" r="2.5" fill="#38bdf8" />
              <circle cx="64" cy="28" r="2.5" fill="#38bdf8" />
              {/* Chin speaker vents */}
              <line x1="42" y1="67" x2="58" y2="67" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="73" x2="55" y2="73" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )
        }
      case 'vanguard':
      default:
        return {
          theme: '#f59e0b',
          svg: (
            <svg viewBox="0 0 100 100" width={size} height={size} className={styles.svg}>
              <defs>
                <linearGradient id="vanguardBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#451a03" />
                  <stop offset="50%" stopColor="#271103" />
                  <stop offset="100%" stopColor="#120601" />
                </linearGradient>
                <linearGradient id="vanguardGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="vanguardVisor" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" rx="24" fill="url(#vanguardBg)" />
              {/* Crest */}
              <polygon points="50,10 60,26 40,26" fill="url(#vanguardGold)" />
              {/* Shield Helmet */}
              <polygon points="50,18 76,32 72,68 50,86 28,68 24,32" fill="#1e1008" stroke="url(#vanguardGold)" strokeWidth="3" />
              {/* Wing Flanges */}
              <polygon points="18,34 26,30 25,50" fill="#f59e0b" />
              <polygon points="82,34 74,30 75,50" fill="#f59e0b" />
              {/* Visor */}
              <polygon points="32,42 68,42 62,56 50,60 38,56" fill="url(#vanguardVisor)" />
              {/* Golden Core */}
              <line x1="37" y1="46" x2="63" y2="46" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              <circle cx="50" cy="72" r="3.5" fill="#f59e0b" />
            </svg>
          )
        }
    }
  }

  const { theme, svg } = getAvatarContent()

  return (
    <div
      className={`${styles.avatarWrapper} ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: showGlow ? `0 0 20px ${theme}66` : undefined,
      }}
    >
      {svg}
    </div>
  )
}
