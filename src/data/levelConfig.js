export const LEVEL_CONFIG = [
  {
    level: 1,
    title: 'Level 01',
    name: 'Novice',
    tier: 'Novice Tier',
    xpRequired: 1000,
    reward: {
      amount: 250,
      currency: 'VEs',
      label: '250 VEs',
      description: 'Starter Milestone Bonus',
      gems: 10
    },
    badge: 'Novice Explorer',
    benefits: ['Daily XP Cap: 1,000 XP', 'Standard Drop Access', 'Starter Avatar Unlocked'],
    gameDifficulty: { speedMin: 3.2, speedMax: 4.2, spawnInterval: 850 }
  },
  {
    level: 2,
    title: 'Level 02',
    name: 'Seeker',
    tier: 'Novice Tier',
    xpRequired: 1500,
    reward: {
      amount: 350,
      currency: 'VEs',
      label: '350 VEs',
      description: 'Level 02 Milestone Bonus',
      gems: 15
    },
    badge: 'Apprentice Seeker',
    benefits: ['Daily XP Cap: 1,500 XP', '1.1x Streak Multiplier', 'Community Chat Access'],
    gameDifficulty: { speedMin: 3.5, speedMax: 4.5, spawnInterval: 820 }
  },
  {
    level: 3,
    title: 'Level 03',
    name: 'Challenger',
    tier: 'Novice Tier',
    xpRequired: 2200,
    reward: {
      amount: 450,
      currency: 'VEs',
      label: '450 VEs',
      description: 'Level 03 Milestone Bonus',
      gems: 20
    },
    badge: 'Rising Challenger',
    benefits: ['Daily XP Cap: 2,000 XP', 'Unlocked Weekend Missions', 'Rare Avatar Palette'],
    gameDifficulty: { speedMin: 3.8, speedMax: 4.8, spawnInterval: 790 }
  },
  {
    level: 4,
    title: 'Level 04',
    name: 'Pathfinder',
    tier: 'Novice Tier',
    xpRequired: 3000,
    reward: {
      amount: 600,
      currency: 'VEs',
      label: '600 VEs',
      description: 'Level 04 Milestone Bonus',
      gems: 25
    },
    badge: 'Iron Pathfinder',
    benefits: ['Daily XP Cap: 2,500 XP', '1.2x Task Multiplier', 'Mystery Box Drop Chance'],
    gameDifficulty: { speedMin: 4.0, speedMax: 5.0, spawnInterval: 760 }
  },
  {
    level: 5,
    title: 'Level 05',
    name: 'Bronze',
    tier: 'Bronze Tier',
    xpRequired: 4000,
    reward: {
      amount: 800,
      currency: 'VEs',
      label: '800 VEs',
      description: 'Level 05 Bronze Milestone',
      gems: 35
    },
    badge: 'Bronze Elite',
    benefits: ['Exclusive Bronze Badge', '1.3x Multiplier Boost', 'VIP Store Access'],
    gameDifficulty: { speedMin: 4.2, speedMax: 5.2, spawnInterval: 730 }
  },
  {
    level: 6,
    title: 'Level 06',
    name: 'Bronze II',
    tier: 'Bronze Tier',
    xpRequired: 4600,
    reward: { amount: 950, currency: 'VEs', label: '950 VEs', description: 'Bronze II Bonus', gems: 40 },
    badge: 'Bronze Veteran',
    benefits: ['Daily XP Cap: 3,500 XP', 'Special Discord Role'],
    gameDifficulty: { speedMin: 4.4, speedMax: 5.5, spawnInterval: 710 }
  },
  {
    level: 7,
    title: 'Level 07',
    name: 'Bronze III',
    tier: 'Bronze Tier',
    xpRequired: 5200,
    reward: { amount: 1100, currency: 'VEs', label: '1,100 VEs', description: 'Bronze III Bonus', gems: 45 },
    badge: 'Bronze Specialist',
    benefits: ['Daily Drop Priority', 'Exclusive Avatar Aura'],
    gameDifficulty: { speedMin: 4.6, speedMax: 5.7, spawnInterval: 690 }
  },
  {
    level: 8,
    title: 'Level 08',
    name: 'Bronze IV',
    tier: 'Bronze Tier',
    xpRequired: 5800,
    reward: { amount: 1250, currency: 'VEs', label: '1,250 VEs', description: 'Bronze IV Bonus', gems: 50 },
    badge: 'Bronze Master',
    benefits: ['1.4x Streak Multiplier', 'Bonus Weekly Quests'],
    gameDifficulty: { speedMin: 4.8, speedMax: 5.9, spawnInterval: 670 }
  },
  {
    level: 9,
    title: 'Level 09',
    name: 'Bronze V',
    tier: 'Bronze Tier',
    xpRequired: 6500,
    reward: { amount: 1400, currency: 'VEs', label: '1,400 VEs', description: 'Silver Gate Bonus', gems: 55 },
    badge: 'Silver Candidate',
    benefits: ['Pre-Silver Boost', 'Exclusive Frame'],
    gameDifficulty: { speedMin: 5.0, speedMax: 6.1, spawnInterval: 650 }
  },
  {
    level: 10,
    title: 'Level 10',
    name: 'Silver',
    tier: 'Silver Tier',
    xpRequired: 7200,
    reward: {
      amount: 1750,
      currency: 'VEs',
      label: '1,750 VEs',
      description: 'Silver Milestone Bonus',
      gems: 70
    },
    badge: 'Silver Champion',
    benefits: ['Silver Emblem Unlocked', '1.5x Task Multiplier', 'Premium Crate Drop'],
    gameDifficulty: { speedMin: 5.2, speedMax: 6.4, spawnInterval: 630 }
  },
  {
    level: 11,
    title: 'Level 11',
    name: 'Elite Miner',
    tier: 'Platinum II',
    xpRequired: 8000,
    reward: {
      amount: 2000,
      currency: 'VEs',
      label: 'Premium Pack',
      description: 'Level 11 Platinum Milestone Bonus',
      gems: 100
    },
    badge: 'Platinum Miner',
    benefits: [
      'Platinum 3D Badge & Podium',
      '2.0x Streak Multiplier',
      'Instant Access to Premium Vault Drops'
    ],
    gameDifficulty: { speedMin: 5.4, speedMax: 6.6, spawnInterval: 610 }
  },
  {
    level: 12,
    title: 'Level 12',
    name: 'Platinum III',
    tier: 'Platinum Tier',
    xpRequired: 8800,
    reward: { amount: 2200, currency: 'VEs', label: '2,200 VEs', description: 'Platinum III Bonus', gems: 110 },
    badge: 'Platinum Vanguard',
    benefits: ['2.2x Game Multiplier Cap', 'VIP Lounge Access'],
    gameDifficulty: { speedMin: 5.5, speedMax: 6.8, spawnInterval: 590 }
  },
  {
    level: 13,
    title: 'Level 13',
    name: 'Platinum IV',
    tier: 'Platinum Tier',
    xpRequired: 9600,
    reward: { amount: 2400, currency: 'VEs', label: '2,400 VEs', description: 'Platinum IV Bonus', gems: 120 },
    badge: 'Platinum Sentinel',
    benefits: ['Exclusive Platinum Skin', 'Unlimited Quests'],
    gameDifficulty: { speedMin: 5.6, speedMax: 7.0, spawnInterval: 570 }
  },
  {
    level: 14,
    title: 'Level 14',
    name: 'Platinum V',
    tier: 'Platinum Tier',
    xpRequired: 10500,
    reward: { amount: 2700, currency: 'VEs', label: '2,700 VEs', description: 'Diamond Gate Bonus', gems: 135 },
    badge: 'Diamond Candidate',
    benefits: ['Diamond Entry Trial', 'Double Gem Boosts'],
    gameDifficulty: { speedMin: 5.8, speedMax: 7.2, spawnInterval: 550 }
  },
  {
    level: 15,
    title: 'Level 15',
    name: 'Diamond',
    tier: 'Diamond Tier',
    xpRequired: 12000,
    reward: {
      amount: 3500,
      currency: 'VEs',
      label: 'Mystery Box',
      description: 'Diamond Milestone Bonus',
      gems: 175
    },
    badge: 'Diamond Sovereign',
    benefits: ['Diamond Crystal Emblem', '2.5x Multiplier for 72 Hours', 'VIP Tournament Pass'],
    gameDifficulty: { speedMin: 6.0, speedMax: 7.5, spawnInterval: 530 }
  },
  {
    level: 16,
    title: 'Level 16',
    name: 'Diamond II',
    tier: 'Diamond Tier',
    xpRequired: 13500,
    reward: { amount: 3800, currency: 'VEs', label: '3,800 VEs', description: 'Diamond II Bonus', gems: 200 },
    badge: 'Diamond Lord',
    benefits: ['Custom Golden Aura', 'Direct Admin Support'],
    gameDifficulty: { speedMin: 6.2, speedMax: 7.7, spawnInterval: 510 }
  },
  {
    level: 17,
    title: 'Level 17',
    name: 'Diamond III',
    tier: 'Diamond Tier',
    xpRequired: 15000,
    reward: { amount: 4200, currency: 'VEs', label: '4,200 VEs', description: 'Diamond III Bonus', gems: 220 },
    badge: 'Diamond Monarch',
    benefits: ['Triple Drop Rates', 'Founder Recognition'],
    gameDifficulty: { speedMin: 6.4, speedMax: 7.9, spawnInterval: 490 }
  },
  {
    level: 18,
    title: 'Level 18',
    name: 'Diamond IV',
    tier: 'Diamond Tier',
    xpRequired: 16800,
    reward: { amount: 4600, currency: 'VEs', label: '4,600 VEs', description: 'Diamond IV Bonus', gems: 250 },
    badge: 'Diamond Apex',
    benefits: ['Master Key Pass', 'Exclusive Diamond NFT'],
    gameDifficulty: { speedMin: 6.6, speedMax: 8.1, spawnInterval: 470 }
  },
  {
    level: 19,
    title: 'Level 19',
    name: 'Ascendant',
    tier: 'Diamond Tier',
    xpRequired: 18500,
    reward: { amount: 5000, currency: 'VEs', label: '5,000 VEs', description: 'Master Gatekeeper Bonus', gems: 300 },
    badge: 'Ascendant Overlord',
    benefits: ['Pre-Master Crown', 'Global Leaderboard Highlight'],
    gameDifficulty: { speedMin: 6.8, speedMax: 8.4, spawnInterval: 450 }
  },
  {
    level: 20,
    title: 'Level 20',
    name: 'Master',
    tier: 'Master Tier',
    xpRequired: 22000,
    reward: {
      amount: 6000,
      currency: 'VEs',
      label: 'Exclusive Skin',
      description: 'Master Tier Milestone Bonus',
      gems: 500
    },
    badge: 'Immortal Master',
    benefits: ['Eternal Master 3D Crest', 'Lifetime 3.0x Multiplier', 'Hall of Fame Inductee'],
    gameDifficulty: { speedMin: 7.0, speedMax: 8.8, spawnInterval: 430 }
  }
]

export function getLevelConfig(level) {
  const found = LEVEL_CONFIG.find((item) => item.level === level)
  if (found) return found
  const maxConfig = LEVEL_CONFIG[LEVEL_CONFIG.length - 1]
  return {
    ...maxConfig,
    level,
    title: `Level ${String(level).padStart(2, '0')}`,
    name: `Grandmaster Tier ${level - 20 + 1}`,
    tier: 'Master Tier',
    xpRequired: 22000 + (level - 20) * 4000
  }
}

export function getNextLevelConfig(level) {
  return getLevelConfig(level + 1)
}

/**
 * Key milestones shown in reference image:
 * Level 01 — Novice
 * Level 05 — Bronze
 * Level 10 — Silver
 * Current Level (e.g. Level 11) — Platinum II
 * Level 15 — Diamond
 * Level 20 — Master
 */
export function generateRoadmapData(currentLevel) {
  const milestoneLevels = [1, 5, 10, currentLevel, 15, 20]
  // Remove duplicates and keep ordered
  const uniqueLevels = Array.from(new Set(milestoneLevels)).sort((a, b) => a - b)

  return uniqueLevels.map((lvl) => {
    const config = getLevelConfig(lvl)
    let status = 'Locked'
    let isUnlocked = false

    if (lvl < currentLevel) {
      status = 'Completed'
      isUnlocked = true
    } else if (lvl === currentLevel) {
      status = 'Current'
      isUnlocked = true
    } else if (lvl > currentLevel && lvl <= 20) {
      status = 'Locked'
      isUnlocked = false
    }

    return {
      ...config,
      status,
      isUnlocked,
      xpThreshold: config.xpRequired
    }
  })
}
