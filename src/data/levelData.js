export const levelProgressionData = {
  currentLevel: 4,
  currentXp: 6420,
  requiredXp: 8000,
  nextLevel: 5,
  xpRemaining: 1580,
  xpPercentage: 80.25,
  nextLevelReward: {
    amount: 500,
    currency: 'VEs',
    label: '500 VEs',
    description: 'Level 05 Milestone Bonus'
  },
  userSummary: {
    username: 'AlexRider',
    avatarId: 'vanguard',
    tag: '#VEL-7402',
    bio: 'Pushing for Level 5 Vanguard Master • Daily Streak Hunter ⚡',
    title: 'Level 04 Vanguard',
    memberSince: 'August 2026',
    totalEarnedVEs: 1850,
    totalGems: 48,
    lifetimeXp: 18450,
    rank: 'Gold Tier',
    longestStreak: 7,
    miniGameHighScore: 165,
    tasksCompleted: 24,
    vouchersClaimed: 5
  }
}

export const gamerAvatars = [
  {
    id: 'vanguard',
    name: 'Golden Vanguard',
    tier: 'Gold Tier',
    theme: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    desc: 'Armored cyber crest with radiant gold visor.'
  },
  {
    id: 'phoenix',
    name: 'Cyber Phoenix',
    tier: 'Elite',
    theme: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.4)',
    desc: 'Blazing flame armor with hypersonic ocular optics.'
  },
  {
    id: 'cosmic',
    name: 'Cosmic Pilot',
    tier: 'Astral',
    theme: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    desc: 'Deep space explorer with nebula quantum visor.'
  },
  {
    id: 'ronin',
    name: 'Shadow Ronin',
    tier: 'Stealth',
    theme: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    desc: 'Tactical stealth shinobi with crimson energy mask.'
  },
  {
    id: 'crystal',
    name: 'Crystal Sentinel',
    tier: 'Prism',
    theme: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    desc: 'Emerald crystalline defender with reinforced plating.'
  },
  {
    id: 'synth',
    name: 'Quantum Synth',
    tier: 'Cyber',
    theme: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    desc: 'High-frequency AI cyber pilot with cyan luminescence.'
  }
]

export const profileAchievements = [
  {
    id: 'first-flight',
    title: 'First Flight',
    desc: 'Completed Level 1 progression milestone',
    icon: '🚀',
    category: 'Progression',
    unlocked: true,
    date: 'Aug 14, 2026',
    xpReward: '+100 XP'
  },
  {
    id: 'streak-master',
    title: '7-Day Streak Master',
    desc: 'Maintained a consecutive 7-day login streak',
    icon: '🔥',
    category: 'Engagement',
    unlocked: true,
    date: 'Sep 02, 2026',
    xpReward: '+250 XP'
  },
  {
    id: 'arcade-champion',
    title: 'XP Catcher Ace',
    desc: 'Scored 150+ in a single Play & Earn run',
    icon: '🎮',
    category: 'Mini-Game',
    unlocked: true,
    date: 'Sep 06, 2026',
    xpReward: '+200 XP'
  },
  {
    id: 'gem-hoarder',
    title: 'Crystal Hunter',
    desc: 'Accumulated 40+ Rare Gems',
    icon: '💎',
    category: 'Assets',
    unlocked: true,
    date: 'Sep 08, 2026',
    xpReward: '+150 XP'
  },
  {
    id: 'master-tier',
    title: 'Vanguard Master',
    desc: 'Reach Level 05 to unlock VIP lounge access',
    icon: '👑',
    category: 'Progression',
    unlocked: false,
    progress: 80,
    progressLabel: '6,420 / 8,000 XP',
    xpReward: '+500 VEs'
  },
  {
    id: 'social-ambassador',
    title: 'Community Ambassador',
    desc: 'Invite 3 teammates to VELOOP Rewards',
    icon: '🤝',
    category: 'Social',
    unlocked: false,
    progress: 66,
    progressLabel: '2 / 3 Friends Joined',
    xpReward: '+300 XP'
  }
]

export const levelRoadmapData = [
  {
    level: 1,
    title: 'Level 01',
    name: 'Explorer',
    xpThreshold: 1000,
    reward: '100 VEs',
    status: 'Completed',
    isUnlocked: true
  },
  {
    level: 2,
    title: 'Level 02',
    name: 'Seeker',
    xpThreshold: 2500,
    reward: '200 VEs',
    status: 'Completed',
    isUnlocked: true
  },
  {
    level: 3,
    title: 'Level 03',
    name: 'Achiever',
    xpThreshold: 4500,
    reward: '350 VEs',
    status: 'Completed',
    isUnlocked: true
  },
  {
    level: 4,
    title: 'Level 04',
    name: 'Champion',
    xpThreshold: 8000,
    reward: '500 VEs',
    status: 'Current',
    isUnlocked: true
  },
  {
    level: 5,
    title: 'Level 05',
    name: 'Master',
    xpThreshold: 12000,
    reward: '750 VEs',
    status: 'Next',
    isUnlocked: false
  },
  {
    level: 6,
    title: 'Level 06',
    name: 'Grandmaster',
    xpThreshold: 18000,
    reward: '1,000 VEs',
    status: 'Locked',
    isUnlocked: false
  },
  {
    level: 7,
    title: 'Level 07',
    name: 'Legend',
    xpThreshold: 25000,
    reward: '1,500 VEs',
    status: 'Locked',
    isUnlocked: false
  },
  {
    level: 8,
    title: 'Level 08',
    name: 'Mythic',
    xpThreshold: 35000,
    reward: '2,500 VEs',
    status: 'Locked',
    isUnlocked: false
  }
]

export const xpActivityData = [
  {
    id: 'act-001',
    type: 'Referral',
    title: 'Referral Bonus',
    subtitle: 'Friend joined via your invite link',
    xpAmount: 20,
    timestamp: 'Yesterday, 6:48 PM',
    status: 'completed'
  },
  {
    id: 'act-002',
    type: 'Daily Task',
    title: 'Daily Task Completed',
    subtitle: 'Goal: Reach 10k steps sync',
    xpAmount: 50,
    timestamp: 'Yesterday, 5:48 PM',
    status: 'completed'
  },
  {
    id: 'act-003',
    type: 'Game',
    title: 'Mini-Game Challenge',
    subtitle: 'VE Coin Catch high-score bonus',
    xpAmount: 25,
    timestamp: 'Sep 2, 8:48 PM',
    status: 'completed'
  },
  {
    id: 'act-004',
    type: 'Challenge',
    title: 'Weekend Warrior Quest',
    subtitle: 'Completed 3 consecutive daily goals',
    xpAmount: 100,
    timestamp: 'Sep 1, 11:30 AM',
    status: 'completed'
  },
  {
    id: 'act-005',
    type: 'Bonus Mission',
    title: 'Profile Boost Milestone',
    subtitle: 'Verified reward account preferences',
    xpAmount: 40,
    timestamp: 'Aug 30, 4:15 PM',
    status: 'completed'
  }
]

export const earningOpportunitiesData = [
  {
    id: 'earn-play',
    title: 'Play & Earn',
    category: 'Interactive Game',
    description: 'Catch falling VE coins to earn instant XP and boost your progression.',
    rewardTag: '+25 to +100 XP',
    badge: 'Active',
    isAvailable: true,
    actionText: 'Play Now'
  },
  {
    id: 'earn-tasks',
    title: 'Daily Tasks',
    category: 'Daily Activity',
    description: 'Complete quick routine challenges to stack reliable daily XP boosts.',
    rewardTag: '+50 XP / task',
    badge: 'Daily',
    isAvailable: true,
    actionText: 'View Tasks'
  },
  {
    id: 'earn-refer',
    title: 'Refer & Earn',
    category: 'Community',
    description: 'Invite your friends to VELOOP and earn bonus rewards when they level up.',
    rewardTag: '+20 XP per invite',
    badge: 'Popular',
    isAvailable: true,
    actionText: 'Invite Friends'
  },
  {
    id: 'earn-watch',
    title: 'Watch & Earn',
    category: 'Media Partner',
    description: 'View partner videos and product releases to collect promotional XP.',
    rewardTag: '+30 XP',
    badge: 'Coming Soon',
    isAvailable: false,
    actionText: 'Coming Soon'
  },
  {
    id: 'earn-streak',
    title: 'Streak XP',
    category: 'Retention Bonus',
    description: 'Log in and interact consistently each day to build a multiplier streak.',
    rewardTag: 'Up to 3x XP',
    badge: 'Coming Soon',
    isAvailable: false,
    actionText: 'Coming Soon'
  },
  {
    id: 'earn-challenge',
    title: 'Daily Challenge',
    category: 'Timed Event',
    description: 'Complete high-yield timed challenges renewed every 24 hours.',
    rewardTag: '+150 XP',
    badge: 'Coming Soon',
    isAvailable: false,
    actionText: 'Coming Soon'
  },
  {
    id: 'earn-bonus',
    title: 'Bonus Missions',
    category: 'Seasonal',
    description: 'Special seasonal missions tailored to your activity milestones.',
    rewardTag: '+250 XP',
    badge: 'Coming Soon',
    isAvailable: false,
    actionText: 'Coming Soon'
  }
]

export const miniGameConfig = {
  gameId: 've-coin-catch',
  title: 'VE Coin Catch',
  tagline: 'Catch Coins, Earn XP & Power Up Your Level',
  durationSeconds: 20,
  maxAttemptsPerDay: 5,
  skillBased: true,
  baseScorePerCoin: 10,
  goldCoinBonus: 25,
  dangerPenalty: 15,
  demoXpReward: 25,
  replayEnabled: true,
  instructions: [
    'Move your catcher basket left and right',
    'Catch falling VE Gold coins before time runs out',
    'Avoid red hazard blocks to protect your streak',
    'Score above 100 points to claim +25 bonus XP'
  ]
}
