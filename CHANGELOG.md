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
- Executed Prompt 05 by adding persisted local progression with Nova Credits, three lightweight upgrades, upgrade effects applied to the core loop, and a compact post-run progression tray.
- Architecture decision: used persisted Zustand state with AsyncStorage for Expo-compatible local storage instead of MMKV so the progression system stays testable in the current Expo workflow.
- Executed the new Prompt 06 gameplay pivot by removing the rotating multicolor ring loop and rebuilding NovaBurst around a single active shield color, tap-to-cycle controls, center absorb checks, simpler hyper-casual pacing, and a React Native view-based render layer.
- Removed old rotation- and progression-specific gameplay files so the repo no longer carries the outdated ring-control model or upgrade tray in the active game flow.
- Balancing changes: runs now start with 2 colors, 3 lives, brief post-hit invincibility, easier early spawn pacing, gradual color unlocks, and later hazard balls.
- Replaced the browser-only `window.addEventListener` keyboard hook with a React Native `Keyboard` listener gated to web so the new Prompt 06 screen does not crash on Expo native runtimes.
- Executed Prompt 07 by replacing the full-screen gameplay `Pressable` tap handler with an immediate responder layer so shield color switches register on touch start instead of waiting for `onPress`.
- Tightened the stage overlay stacking so passive guidance layers stay above the arena visually without stealing gameplay taps, while pause and game-over states still block input intentionally.
- Architecture decision: kept the fast color-switch path outside React state and routed it straight into the existing ref-driven simulation callback for lower touch latency on Android.
- Executed Prompt 08 by increasing the pause and retry control sizes, widening their invisible hit areas, and adding more thumb-friendly spacing across the HUD and overlay actions.
- Improved mobile readability and comfort by slightly enlarging the bottom guidance chips and separating them farther from the active playfield edge without reducing the full-screen gameplay tap area.
- Architecture decision: kept the control-size pass purely in low-frequency UI layout and touch-target props so mobile usability improved without changing the simulation loop or input callback flow.
