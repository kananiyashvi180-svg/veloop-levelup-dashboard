# 🚀 VELOOP Rewards — Level-Up Dashboard

<p align="center">
  <strong>A Premium Gamified Progression & Rewards Experience</strong>
</p>

<p align="center">
  A frontend-only redesign of the VELOOP Rewards Level-Up Dashboard,
  built to transform progression into an engaging reward-driven experience.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/CSS%20Modules-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Modules" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-live-demo">Live Demo</a>
</p>

---

## 📌 Overview

**VELOOP Rewards — Level-Up Dashboard** is a premium frontend redesign focused on user progression, XP, rewards, engagement, and gamified experiences.

The dashboard is designed to answer five important questions immediately:

| User Question                 | Dashboard Experience                |
| ----------------------------- | ----------------------------------- |
| 📍 Where am I?                | Current Level                       |
| ⚡ How far have I come?        | Current XP                          |
| 🎯 Where am I going?          | Next Level                          |
| 🎁 What will I unlock?        | Next-Level Reward                   |
| 🚀 How can I progress faster? | Play & Earn + Earning Opportunities |

The experience transforms the dashboard from a passive progress screen into an **action-oriented progression hub**.

### Core Progression Loop

```text
┌──────────┐
│   PLAY   │
└────┬─────┘
     ↓
┌──────────┐
│   EARN   │
│    XP    │
└────┬─────┘
     ↓
┌──────────┐
│ PROGRESS │
└────┬─────┘
     ↓
┌──────────┐
│  UNLOCK  │
│  REWARD  │
└────┬─────┘
     ↓
┌──────────┐
│ LEVEL UP │
└────┬─────┘
     ↓
┌──────────┐
│ DISCOVER │
│   MORE   │
└────┬─────┘
     ↓
   RETURN
```

---

# 🎯 Project Vision

The objective is to create a **premium gamified progression center** combining:

* Fintech dashboard aesthetics
* Achievement systems
* Reward progression
* Interactive experiences
* Mini-game engagement
* Earning opportunities

The interface is intentionally designed to feel:

> **Premium • Modern • Trusted • Interactive • Reward-Focused**

Gamification is used to motivate users without making the product feel like a casino or conventional gaming platform.

---

# ✨ Features

## 🏆 Level Progression

The dashboard provides a clear representation of the user's progression.

It displays:

* Current level
* Current XP
* Required XP
* XP remaining
* Next level
* Progress percentage
* Level roadmap
* Completed levels
* Locked levels

---

## ⚡ XP Progress System

XP progression is represented through a highly visual progress experience.

### XP Information

```text
Current XP
     ↓
Progress
     ↓
XP Required
     ↓
XP Remaining
     ↓
Next Level
```

The XP progress indicator includes animation to provide visual feedback during progression.

---

## 🎁 Next-Level Rewards

The next-level reward is presented as a major motivational element.

The reward experience communicates:

* Upcoming reward
* Unlock requirement
* Progress toward unlock
* Reward information
* Locked/unlocked state

### Example Development Data

```text
Current Level : Level 04
Current XP    : 6,420 XP
Next Level    : Level 05
Required XP   : 8,000 XP
Remaining XP  : 1,580 XP
```

> **Note:** These values are development/demo values only and do not represent official VELOOP reward values.

---

# 🗺️ Level Roadmap

The Level Roadmap provides a visual journey through the user's progression.

### Level States

| State       | Description                  |
| ----------- | ---------------------------- |
| ✅ Completed | Previously achieved level    |
| 🟡 Current  | User's current level         |
| 🎯 Next     | Immediate progression target |
| 🔒 Locked   | Future level                 |

Example:

```text
LEVEL 01 ── LEVEL 02 ── LEVEL 03 ── LEVEL 04 ── LEVEL 05 ── LEVEL 06
                                      ↑
                                  YOU ARE HERE
```

The roadmap can provide additional level information through interaction where supported.

---

# 🎮 Play & Earn

A dedicated **Play & Earn** area is included as a core part of the dashboard.

The purpose of this section is to give users something engaging to do while progressing toward their next level.

### Experience

```text
PLAY
  ↓
ENGAGE
  ↓
SCORE
  ↓
EARN
  ↓
PROGRESS
```

The game experience is:

* Skill-based
* Interactive
* Frontend functional
* Reward-oriented
* Designed to match the VELOOP visual language

The game does **not** use gambling, betting, casino, jackpot, or chance-based mechanics.

---

# 🕹️ Mini-Game

The dashboard includes a functional frontend mini-game rather than a static game illustration.

### Game States

```text
START
  ↓
GAMEPLAY
  ↓
SCORE / PROGRESS
  ↓
COMPLETION
  ↓
REWARD RESULT
  ↓
REPLAY
```

### Game Architecture

```text
PlayAndEarn/
│
├── GameContainer/
├── GameStart/
├── GamePlay/
├── GameResult/
└── Game.module.css
```

The mini-game uses **React state and hooks** for frontend interaction.

Backend reward processing is not required for the prototype.

---

# 📜 Game Rules

The game interface clearly communicates:

* Objective
* How to play
* Time or attempt limit
* Scoring
* Reward concept
* Eligibility
* Replay availability

No hidden game mechanics are used.

> Game rewards shown during development are demo values only.

---

# 💰 Earn More XP & Rewards

The dashboard includes a dedicated:

## **Earn More XP & Rewards**

section.

Potential earning opportunities include:

* 🎯 Daily Tasks
* ▶️ Watch & Earn
* 👥 Refer & Earn
* 🎮 Play & Earn
* 🔥 Streak XP
* 🏅 Daily Challenges
* 🚀 Bonus Missions

Only supported mechanisms should be presented as active functionality.

Future or unsupported concepts are clearly labelled:

```text
COMING SOON
```

---

# 📈 XP Activity

The dashboard can provide a history of XP earned from different activities.

Possible sources include:

* Tasks
* Referrals
* Games
* Streaks
* Daily bonuses
* Challenges

Example:

```text
+20 XP    Referral
+50 XP    Daily Task
+100 XP   Watch & Earn
+25 XP    Game Challenge
```

> XP amounts shown during development are illustrative demo values.

If XP activity is unavailable, the dashboard provides a meaningful empty state.

---

# 🎉 Level-Up Celebration

When the user reaches a new level, a premium celebration state is displayed.

Example:

```text
╔══════════════════════════════╗
║                              ║
║          LEVEL UP!           ║
║                              ║
║           LEVEL 05           ║
║                              ║
║       +500 VEs Reward        ║
║                              ║
║      Achievement Unlocked    ║
║                              ║
║          [ Continue ]        ║
║                              ║
╚══════════════════════════════╝
```

### Animation Concepts

* Badge reveal
* XP bar completion
* Level number transition
* Reward reveal
* Subtle particles
* Reward movement

Animations are intentionally subtle rather than excessive.

---

# 🧩 UX States

The dashboard includes dedicated states for different application conditions.

## Loading

Skeleton loaders are provided for:

* Current Level
* XP
* Next Reward
* Level Roadmap
* Game
* Earning Features

## Empty

Example:

```text
Your XP journey starts here.

Start earning XP to begin your
progression journey.

[ Start Earning XP ]
```

## Game Unavailable

```text
New challenge coming soon.
```

## Error

```text
Unable to Load Level Progress

We couldn't load your level information
right now.

[ Try Again ]
```

Raw server/API errors are not displayed to users.

---

# 🖱️ Interaction Design

The dashboard includes meaningful interactions throughout the experience.

| Element       | Interaction                       |
| ------------- | --------------------------------- |
| XP Bar        | Animated progression              |
| Level Cards   | Hover / information reveal        |
| Reward        | Hover / reveal                    |
| Mini-Game     | Fully playable                    |
| Earning Cards | Hover + CTA emphasis              |
| Roadmap       | Click for details where supported |
| Level-Up      | Celebration animation             |

---

# 🎨 Design Direction

The interface follows a **premium fintech-inspired reward aesthetic**.

### Visual Principles

* Premium cards
* Strong typography
* Controlled gradients
* Sophisticated illustrations
* Clean statistics
* Subtle animations
* Clear visual hierarchy

### Background

```css
#161827
```

### Color Direction

The interface uses a controlled palette based around:

* Deep Navy
* Gold
* Silver
* White
* Soft Blue
* Warm Yellow
* Muted Purple
* Subtle Green

### Avoided

❌ Casino aesthetics
❌ Neon-heavy visuals
❌ Flashing effects
❌ Excessive cartoon styling
❌ Cheap gaming UI
❌ Rainbow gradients

---

# 🖼️ Illustration Strategy

Illustrations are meaningful and connected to the functionality.

| Feature           | Illustration Concept                |
| ----------------- | ----------------------------------- |
| Level Progression | Character climbing a reward tower   |
| XP                | Glowing XP orb                      |
| Rewards           | Premium reward chest                |
| Game              | Character interacting with the game |
| Earning           | Coins moving toward a wallet        |

---

# 📱 Responsive Design

The dashboard is designed for:

```text
Mobile       → 320px+
Tablet       → 768px+
Laptop       → 1280px+
Desktop      → 1440px+
Large Screen → 1920px+
```

The mobile layout is designed independently rather than simply shrinking the desktop layout.

### Mobile Priority

```text
Level Hero
    ↓
Current XP
    ↓
Next-Level Reward
    ↓
Level Roadmap
    ↓
Play & Earn
    ↓
Earn More XP
    ↓
XP Activity
```

---

# ♿ Accessibility

Accessibility considerations include:

* Semantic HTML
* Keyboard-friendly interactions
* Visible focus states
* Accessible labels
* Descriptive buttons
* Sufficient contrast
* Non-color-only status communication
* Clear interactive states
* Reduced dependence on animation

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| React.js     | UI development                 |
| Vite         | Development & build tooling    |
| Bootstrap    | Responsive utilities           |
| CSS Modules  | Component-level styling        |
| React Hooks  | State & interaction management |
| React Icons  | Interface icons                |
| Lucide React | Modern icon system             |

---

# 🏗️ Component Architecture

The application follows a modular component-driven architecture.

```text
LevelDashboard
│
├── LevelHero
│   ├── CurrentLevel
│   └── XPProgress
│
├── NextLevelReward
│   └── LevelRewardCard
│
├── LevelRoadmap
│
├── PlayAndEarn
│   ├── GameContainer
│   ├── GameStart
│   ├── GamePlay
│   └── GameResult
│
├── EarnMoreXP
│
├── XPActivity
│
├── LevelInfo
│
└── LevelUpModal
```

Components are kept reusable instead of implementing the entire dashboard as one large component.

---

# 📂 Folder Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── LevelHero/
│   ├── CurrentLevel/
│   ├── XPProgress/
│   ├── NextLevelReward/
│   ├── LevelRoadmap/
│   ├── LevelRewardCard/
│   │
│   ├── PlayAndEarn/
│   │   ├── GameContainer/
│   │   ├── GameStart/
│   │   ├── GamePlay/
│   │   ├── GameResult/
│   │   └── Game.module.css
│   │
│   ├── EarnMoreXP/
│   ├── XPActivity/
│   ├── LevelInfo/
│   └── LevelUpModal/
│
├── data/
│
├── hooks/
│
├── pages/
│   └── LevelDashboard/
│
├── styles/
│
├── App.jsx
└── main.jsx
```

---

# 🔒 Frontend-Only Architecture

This project is intentionally implemented as a **frontend-only internship project**.

### Included

```text
React
React Hooks
Local State
Static/Demo Data
CSS Modules
Bootstrap
Frontend Game Logic
Animations
Responsive UI
```

### Not Included

```text
❌ Backend
❌ Database
❌ Server
❌ Authentication
❌ API implementation
❌ Backend reward processing
❌ Payment processing
```

The architecture keeps development data separated from UI components so that real product data can be integrated in the future.

---

# 🧪 Demo Data

During development, local demo data is used for:

* Current XP
* Current level
* Next level
* Required XP
* Next-level reward
* Game score
* Game reward
* XP history
* Earning opportunities

Example:

```js
const levelData = {
  currentLevel: 4,
  currentXP: 6420,
  nextLevel: 5,
  requiredXP: 8000,
  nextLevelReward: {
    type: "VEs",
    amount: 500
  }
};
```

> These values are examples for frontend development only.

---

# 💻 Installation

## 1. Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

## 2. Navigate to Project

```bash
cd veloop-level-up-dashboard
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

---

# ⚙️ Development Commands

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm install`     | Install project dependencies |
| `npm run dev`     | Start development server     |
| `npm run build`   | Create production build      |
| `npm run preview` | Preview production build     |

---

# 🧹 Code Quality & Development

Before deployment, the project should be checked for:

* Console errors
* Broken components
* Responsive issues
* Missing assets
* Broken routes
* Interaction bugs
* Build errors
* Accessibility issues

The production build should complete successfully before deployment.

---

# 📸 Screenshots

## 🖥️ Desktop Dashboard

![Desktop Dashboard](./screenshots/desktop-dashboard.png)

---

## 📱 Mobile Dashboard

![Mobile Dashboard](./screenshots/mobile-dashboard.png)

---

## 📟 Tablet Dashboard

![Tablet Dashboard](./screenshots/tablet-dashboard.png)

---

## 🏆 Current Level & XP

![Current Level](./screenshots/current-level.png)

---

## 🎁 Next-Level Reward

![Next Level Reward](./screenshots/next-reward.png)

---

## 🗺️ Level Roadmap

![Level Roadmap](./screenshots/level-roadmap.png)

---

## 🎮 Game — Start

![Game Start](./screenshots/game-start.png)

---

## 🕹️ Game — Gameplay

![Game Gameplay](./screenshots/gameplay.png)

---

## 🏅 Game — Result

![Game Result](./screenshots/game-result.png)

---

## 💰 Earn More XP

![Earn More XP](./screenshots/earn-more-xp.png)

---

## 📈 XP Activity

![XP Activity](./screenshots/xp-activity.png)

---

## 🎉 Level-Up Celebration

![Level Up](./screenshots/level-up.png)

---

## ⏳ Loading State

![Loading State](./screenshots/loading-state.png)

---

## 📭 Empty State

![Empty State](./screenshots/empty-state.png)

---

## ⚠️ Error State

![Error State](./screenshots/error-state.png)

---

# 🌐 Live Demo

### Live Application

🔗 **[Open Live Demo](YOUR_VERCEL_URL_HERE)**

### Level Dashboard Route

```text
/Lvl-Dashboard
```

> The deployed `/Lvl-Dashboard` route should be tested after deployment.

---

# 📦 GitHub Repository

🔗 **[View Source Code](YOUR_GITHUB_REPOSITORY_URL)**

The repository contains:

* Source code
* React components
* CSS Modules
* Game components
* Assets
* Development data
* Configuration files
* Documentation

### Excluded from Repository

```text
node_modules/
.env
API keys
Passwords
Sensitive credentials
```

---

# 🚀 Deployment

The application is intended to be deployed using:

* Vercel
* Netlify

**Vercel is recommended for deployment.**

After deployment, the following route must be verified:

```text
https://YOUR-DOMAIN.com/Lvl-Dashboard
```

---

# 📝 Development Timeline

| Phase    | Focus                        |
| -------- | ---------------------------- |
| Phase 01 | Project setup & architecture |
| Phase 02 | Level Hero & XP progression  |
| Phase 03 | Rewards & roadmap            |
| Phase 04 | Play & Earn mini-game        |
| Phase 05 | Earning opportunities        |
| Phase 06 | XP activity & UX states      |
| Phase 07 | Animations & interactions    |
| Phase 08 | Responsive optimization      |
| Phase 09 | Accessibility & QA           |
| Phase 10 | Documentation & deployment   |

### Project Timeline

```text
Project Start : 04 September 2026
Submission     : 28 September 2026
Submission Time: 5:30 PM IST
```

---

# 🧠 Design Philosophy

The dashboard is not designed to simply display:

```text
Level 04
6,420 XP
```

Instead, it should answer:

```text
"You are here."
        ↓
Current Level

"This is how far you've come."
        ↓
Current XP

"This is where you're going."
        ↓
Next Level

"This is what you'll unlock."
        ↓
Next-Level Reward

"This is how you can get there faster."
        ↓
Earning Opportunities

"Here's something fun to do right now."
        ↓
Play & Earn
```

The final objective is to create a **reason to return**.

---

# 🔮 Future Enhancements

Potential future improvements include:

* Real user progression data
* Backend-connected XP tracking
* Dynamic reward configuration
* Personalized recommendations
* Additional mini-games
* Advanced XP analytics
* Achievement system
* Dynamic level configuration
* Real-time XP activity
* Expanded reward catalog

These features are considered future enhancements unless officially implemented.

---

# ✅ Project Checklist

## Level System

* [ ] Current Level displayed
* [ ] Current XP displayed
* [ ] XP required for next level
* [ ] Next Level clearly shown
* [ ] Next-Level Reward displayed
* [ ] Level progression
* [ ] Current level highlighted
* [ ] Future levels represented
* [ ] Locked states
* [ ] Level-up state

## Game

* [ ] Play & Earn section
* [ ] Functional frontend mini-game
* [ ] Start state
* [ ] Gameplay state
* [ ] Score/progress
* [ ] Completion state
* [ ] Reward result
* [ ] Replay/reset
* [ ] Skill-based gameplay
* [ ] No gambling/casino mechanics

## Earning

* [ ] Earn More XP section
* [ ] Multiple earning opportunities
* [ ] Interactive cards
* [ ] Supported routes preserved
* [ ] Unsupported concepts marked Coming Soon

## UX

* [ ] Loading state
* [ ] Empty state
* [ ] Error state
* [ ] Tooltips
* [ ] Animations
* [ ] Responsive design
* [ ] Accessibility

## Technical

* [ ] React.js
* [ ] Vite
* [ ] Bootstrap
* [ ] CSS Modules
* [ ] React Hooks
* [ ] React Icons / Lucide
* [ ] Local development tested
* [ ] Production build tested
* [ ] GitHub updated
* [ ] README completed
* [ ] Deployment completed
* [ ] `/Lvl-Dashboard` tested live

---

# 👩‍💻 Author

## Yashvi Kanani

**Computer Science Student | Frontend Developer**

### Project

**VELOOP Rewards — Level-Up Dashboard**

### Built With

```text
React.js
Vite
Bootstrap
CSS Modules
React Hooks
React Icons
Lucide React
```

---

# ⭐ Final Thought

> **Don't just show users their level. Give them a reason to reach the next one.**

```text
PLAY
  ↓
EARN XP
  ↓
PROGRESS
  ↓
UNLOCK REWARD
  ↓
LEVEL UP
  ↓
DISCOVER NEW OPPORTUNITIES
  ↓
RETURN
```

---

<p align="center">
  <strong>VELOOP Rewards — Level Up. Earn More. Keep Going. 🚀</strong>
</p>
