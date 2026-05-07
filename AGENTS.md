# NovaBurst

NovaBurst is a neon space arcade survival game built for mobile-first play.

## Project Profile

- Project name: NovaBurst
- Game type: neon space arcade survival game
- Stack: React Native, Expo, TypeScript, Skia, Reanimated, Zustand, MMKV

## Core Product Rule

Build simple, polished, addictive gameplay first.

Prioritize:

- responsive controls
- readable combat feedback
- satisfying score-chasing loops
- smooth performance on Android devices
- modular systems that stay easy to iterate on

## MVP Rules

- Avoid overengineering.
- Avoid unnecessary backend, cloud services, accounts, or login flows for MVP.
- Keep the first playable loop focused on one-screen survival and replayability.
- Add systems only when they improve feel, clarity, or retention.
- Prefer local persistence for settings, high scores, unlocks, and progression.

## Implementation Guidance

- Use TypeScript throughout and keep types explicit around game state and render data.
- Keep fast loop state outside of React render churn where possible.
- Use Skia and Reanimated for motion-heavy visuals.
- Use Zustand for app and meta state, not per-frame simulation state.
- Use MMKV for lightweight local persistence when persistence is needed.
- Introduce navigation only when multiple screens clearly justify it.
- Design Android-first for input, performance, and Play Store release flow.

## AI Workflow Rules

- Prompts are stored in `.github/prompts`.
- Use one prompt at a time and finish its scope before starting the next.
- Do not add features outside the active prompt's acceptance criteria.
- Every completed task must update `CHANGELOG.md`.
- When suggesting packages in documentation, keep the recommended list limited to:
  - `@shopify/react-native-skia`
  - `react-native-reanimated`
  - `zustand`
  - `react-native-mmkv`
  - `expo-haptics`
  - `expo-av`

## Working Style

- Favor small, testable slices over large speculative frameworks.
- Keep architecture modular, but do not abstract ahead of real need.
- Prefer direct, shippable implementations with room for later upgrades.
- Treat visual polish, feedback, and game feel as first-class requirements.
