# Changelog

## 2026-05-07

- Added NovaBurst AI development scaffold with project rules in `AGENTS.md`.
- Added reusable skill docs for Expo, Skia, game loop design, mobile performance, and Play Store release prep under `docs/skills`.
- Added seven scoped Codex prompt files under `.github/prompts`.
- Added `README.md` guidance for the AI development workflow.
- Executed Prompt 01 by adding a minimal Expo app shell, TypeScript config, Babel config, and Android-first `app.json` setup.
- Added `src` scaffolding for future gameplay modules without introducing non-MVP systems or gameplay logic.
- Documented the expected core gameplay packages in setup-facing docs instead of installing dependencies.
- Removed the Reanimated Babel plugin from setup config so the base Expo scaffold can bundle before gameplay dependencies are added.
- Added a project `.gitignore` for Expo, React Native, TypeScript, local env files, and machine-specific artifacts.
- Expanded `.gitignore` with Expo local files, package manager caches, editor swap files, and mobile signing credential ignores.
- Aligned Prompt 02 native package versions with Expo SDK 54 compatibility and added `react-native-worklets` to avoid runtime TurboModule issues.
- Executed Prompt 02 by replacing the setup placeholder with a one-screen NovaBurst gameplay prototype in `src/game` and `src/screens/GameScreen.tsx`.
- Added a modular loop split across systems, hooks, store, render components, and typed gameplay entities to keep hot-path logic outside general React UI state.
- Added Skia rendering, Reanimated shield motion and screen shake, Zustand run state, spawn scaling, shield matching, combo scoring, haptic feedback, and restart flow.
- Assumption: high score currently persists only in memory for the prototype; local MMKV persistence is deferred until a later prompt.
- Added a web-safe gameplay renderer fallback so the prototype runs in browser even when Skia path creation is unavailable during web startup.
- Executed Prompt 03 by deepening the render layer with enemy trails, shockwaves, combo and damage screen washes, orbital background rings, and stronger neon ambience across native and web renderers.
- Executed Prompt 04 by upgrading touch control feel with press-and-hold rotation, immediate tap bursts, animated touch-zone feedback, and a dedicated input hook that keeps fast control state outside React rerender loops.
