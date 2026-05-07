# NovaBurst

NovaBurst is a neon cosmic arcade survival game built for mobile-first gameplay.

The game should feel:
- responsive
- smooth
- visually satisfying
- instantly replayable
- easy to learn
- difficult to master

---

# Project Profile

- Project name: NovaBurst
- Genre: Neon Cosmic Arcade Survival
- Platform: Android-first mobile game
- Stack:
  - React Native
  - Expo
  - TypeScript
  - React Native Skia
  - Reanimated
  - Zustand
  - MMKV

---

# Core Product Rule

Build simple, polished, addictive gameplay first.

Gameplay feel always takes priority over feature count.

Prioritize:
- responsive controls
- readable combat feedback
- satisfying score-chasing loops
- smooth Android performance
- low-friction replayability
- clean visual clarity
- modular systems that stay easy to iterate on

---

# Core Gameplay Philosophy

NovaBurst is:
- one-screen gameplay
- fast restart loops
- score chasing
- visual dopamine
- reactive neon feedback
- short-session mobile gameplay

Avoid:
- unnecessary complexity
- slow onboarding
- deep menus
- excessive setup friction
- feature bloat

The first playable version should feel fun within seconds.

---

# MVP Rules

For MVP:
- avoid overengineering
- avoid backend services
- avoid cloud sync
- avoid login/auth systems
- avoid multiplayer
- avoid analytics initially
- avoid battle passes
- avoid live-service architecture

Focus ONLY on:
- gameplay loop
- controls
- collisions
- score systems
- visual feedback
- performance
- replayability

Keep the first playable loop focused on:
- one-screen survival
- replayability
- satisfying progression
- smooth game feel

Prefer local persistence for:
- settings
- high scores
- unlocks
- progression

---

# Rendering & Performance Rules

Performance is a first-class requirement.

Always:
- minimize React re-renders
- avoid per-frame React state updates
- prefer refs/shared values for active gameplay state
- use Reanimated shared values where appropriate
- use Skia for rendering-heavy visuals
- optimize particle counts
- optimize collision checks
- test for smooth gameplay on Android devices

Avoid:
- unnecessary abstraction
- deeply nested state updates
- expensive re-render chains
- large physics systems unless required

Target:
- responsive controls
- stable gameplay feel
- visually smooth animation

---

# State Management Rules

Use:
- Zustand for meta/game state
- MMKV for persistence
- shared values/refs for high-frequency runtime state

Do NOT:
- store active frame simulation state in React component state
- introduce Redux
- introduce unnecessary global state systems

---

# Visual Direction

Visual style:
- neon cosmic
- synthwave-inspired
- glowing energy effects
- dark space backgrounds
- high-contrast visuals
- readable gameplay silhouettes

Gameplay readability must always be prioritized over visual clutter.

Effects should feel:
- satisfying
- punchy
- reactive
- polished

---

# Audio & Feedback Direction

Prioritize:
- responsive haptics
- satisfying hit feedback
- impactful collisions
- reactive particle bursts
- subtle screen shake
- arcade-style responsiveness

Feedback should enhance gameplay clarity.

---

# Folder Structure Guidance

Prefer clean modular structure:

src/
  game/
    components/
    systems/
    state/
    hooks/
    utils/
    types/
  screens/
  theme/
  assets/

Avoid premature deep architecture.

---

# AI Workflow Rules

- Prompts are stored in `.github/prompts`
- Use one prompt at a time
- Finish the active prompt scope before starting another
- Do not add features outside acceptance criteria
- Every completed task MUST update `CHANGELOG.md`
- Keep implementations focused and shippable
- Prefer iterative delivery over speculative systems

Before implementing:
- inspect AGENTS.md
- inspect docs/skills/*
- inspect CHANGELOG.md

---

# Skill References

Always inspect and follow:
- docs/skills/react-native-expo.md
- docs/skills/react-native-skia.md
- docs/skills/game-loop.md
- docs/skills/mobile-performance.md
- docs/skills/play-store-release.md

---

# Package Guidance

Keep dependencies minimal.

Preferred packages:
- @shopify/react-native-skia
- react-native-reanimated
- zustand
- react-native-mmkv
- expo-haptics
- expo-av

Do not add packages unless clearly justified.

---

# Working Style

Favor:
- small testable slices
- fast gameplay iteration
- direct implementations
- maintainable code
- visible gameplay improvements

Avoid:
- speculative abstractions
- enterprise-style architecture
- premature optimization outside gameplay hotspots
- unnecessary indirection

Treat:
- game feel
- responsiveness
- visual polish
- feedback clarity

as first-class requirements.