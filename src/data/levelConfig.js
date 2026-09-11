export const LEVEL_CONFIG = [
  {
    level: 1,
    title: 'Level 01',
    name: 'Explorer',
    tier: 'Bronze Tier',
    xpRequired: 1000,
    reward: {
      amount: 100,
      currency: 'VEs',
      label: '100 VEs',
      description: 'Level 01 Explorer Milestone Bonus',
      gems: 10
    },
    badge: 'Bronze Explorer',
    benefits: [
      'Daily XP Cap: 500 XP',
      'Standard Drop Access',
      'Starter Avatar Unlocked'
    ],
    gameDifficulty: {
      speedMin: 2.0,
      speedMax: 2.8,
      spawnInterval: 950
    }
  },
  {
    level: 2,
    title: 'Level 02',
    name: 'Seeker',
    tier: 'Silver Tier',
    xpRequired: 1500,
    reward: {
      amount: 200,
      currency: 'VEs',
      label: '200 VEs',
      description: 'Level 02 Seeker Milestone Bonus',
      gems: 15
    },
    badge: 'Silver Seeker',
    benefits: [
      'Daily XP Cap: 750 XP',
      '1.1x Streak Multiplier',
      'Community Chat Access'
    ],
    gameDifficulty: {
      speedMin: 2.3,
      speedMax: 3.1,
      spawnInterval: 900
    }
  },
  {
    level: 3,
    title: 'Level 03',
    name: 'Achiever',
    tier: 'Silver Tier',
    xpRequired: 2000,
    reward: {
      amount: 350,
      currency: 'VEs',
      label: '350 VEs',
      description: 'Level 03 Achiever Milestone Bonus',
      gems: 20
    },
    badge: 'Silver Achiever',
    benefits: [
      'Daily XP Cap: 1,000 XP',
      'Unlocked Weekend Missions',
      'Rare Avatar Palette'
    ],
    gameDifficulty: {
      speedMin: 2.6,
      speedMax: 3.4,
      spawnInterval: 850
    }
  },
  {
    level: 4,
    title: 'Level 04',
    name: 'Champion',
    tier: 'Gold Tier',
    xpRequired: 3500,
    reward: {
      amount: 500,
      currency: 'VEs',
      label: '500 VEs',
      description: 'Level 04 Champion Milestone Bonus',
      gems: 25
    },
    badge: 'Gold Tier Champion',
    benefits: [
      'Daily XP Cap: 1,500 XP',
      '1.25x Task Multiplier',
      'Gold Drop Access'
    ],
    gameDifficulty: {
      speedMin: 2.9,
      speedMax: 3.8,
      spawnInterval: 800
    }
  },
  {
    level: 5,
    title: 'Level 05',
    name: 'Master',
    tier: 'Platinum Tier',
    xpRequired: 4000,
    reward: {
      amount: 750,
      currency: 'VEs',
      label: '750 VEs',
      description: 'Level 05 Master Milestone Bonus',
      gems: 35
    },
    badge: 'Vanguard Master',
    benefits: [
      'Exclusive Level 05 Badge',
      '1.5x Multiplier for 48 Hours',
      'Instant Access to Premium Drops'
    ],
    gameDifficulty: {
      speedMin: 3.2,
      speedMax: 4.2,
      spawnInterval: 750
    }
  },
  {
    level: 6,
    title: 'Level 06',
    name: 'Grandmaster',
    tier: 'Diamond Tier',
    xpRequired: 6000,
    reward: {
      amount: 1000,
      currency: 'VEs',
      label: '1,000 VEs',
      description: 'Level 06 Grandmaster Milestone Bonus',
      gems: 50
    },
    badge: 'Grandmaster Legend',
    benefits: [
      'Daily XP Cap: 2,500 XP',
      '2.0x Streak Multiplier',
      'VIP Tournament Access'
    ],
    gameDifficulty: {
      speedMin: 3.5,
      speedMax: 4.6,
      spawnInterval: 700
    }
  },
  {
    level: 7,
    title: 'Level 07',
    name: 'Legend',
    tier: 'Master Tier',
    xpRequired: 7000,
    reward: {
      amount: 1500,
      currency: 'VEs',
      label: '1,500 VEs',
      description: 'Level 07 Legend Milestone Bonus',
      gems: 75
    },
    badge: 'Apex Legend',
    benefits: [
      'Daily XP Cap: 4,000 XP',
      'Exclusive Discord Role',
      'Custom Avatar Aura'
    ],
    gameDifficulty: {
      speedMin: 3.8,
      speedMax: 5.0,
      spawnInterval: 650
    }
  },
  {
    level: 8,
    title: 'Level 08',
    name: 'Mythic',
    tier: 'Mythic Tier',
    xpRequired: 10000,
    reward: {
      amount: 2500,
      currency: 'VEs',
      label: '2,500 VEs',
      description: 'Level 08 Mythic Milestone Bonus',
      gems: 100
    },
    badge: 'Immortal Mythic',
    benefits: [
      'Unlimited XP Cap',
      '3.0x Universal Multiplier',
      'Custom Golden Crown Badge'
    ],
    gameDifficulty: {
      speedMin: 4.2,
      speedMax: 5.5,
      spawnInterval: 600
    }
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
    name: `Mythic Tier ${level - 8 + 1}`,
    xpRequired: 10000 + (level - 8) * 3000
  }
}

export function getNextLevelConfig(level) {
  return getLevelConfig(level + 1)
}

export function generateRoadmapData(currentLevel) {
  return LEVEL_CONFIG.map((item) => {
    let status = 'Locked'
    let isUnlocked = false
    if (item.level < currentLevel) {
      status = 'Completed'
      isUnlocked = true
    } else if (item.level === currentLevel) {
      status = 'Current'
      isUnlocked = true
    } else if (item.level === currentLevel + 1) {
      status = 'Next'
      isUnlocked = false
    }
    return {
      ...item,
      status,
      isUnlocked,
      xpThreshold: item.xpRequired
    }
  })
}
