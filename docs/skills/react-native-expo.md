# React Native Expo Skill

## Purpose

Use this guide when building NovaBurst features with React Native and Expo. The goal is to keep the codebase fast to iterate on, Android-friendly, and ready for eventual EAS delivery without dragging MVP work into unnecessary infrastructure.

## Expo TypeScript Standards

- Use TypeScript by default and keep strict, explicit types around game configuration, entities, upgrades, and persistent data.
- Prefer simple functional components and small modules over deeply nested abstractions.
- Keep screen-level files thin by moving gameplay logic, math helpers, and config into separate modules when they start to grow.
- Use shared constants for timing, difficulty, colors, and tuning values so balancing work stays centralized.
- Document any non-obvious gameplay math with short comments.

## Recommended Folder Structure

Use a structure that separates app shell code from high-frequency game systems:

```text
app/
components/
features/game/
features/meta/
store/
hooks/
lib/
assets/
```

Suggested ownership:

- `app/`: Expo app entry and only the screens actually needed
- `components/`: reusable UI outside the real-time loop
- `features/game/`: loop logic, entities, collisions, spawn rules, tuning
- `features/meta/`: menus, high scores, unlock summaries, settings
- `store/`: Zustand stores for non-frame-critical state
- `hooks/`: input, lifecycle, haptics, audio, device helpers
- `lib/`: math helpers, serialization, utilities
- `assets/`: sprites, sounds, fonts, icons

## Navigation Only When Needed

- Start with a one-screen experience plus minimal overlays or modal flows.
- Do not introduce router complexity just to separate title, gameplay, and game-over states.
- Add navigation only when the app genuinely gains multiple durable destinations such as settings, loadout, tutorial, or progression screens.

## Android-First Play Store Approach

- Optimize layouts and touch targets for common Android aspect ratios first.
- Test interaction latency, readability, and particle load on a physical Android device early.
- Keep permissions minimal and avoid features that complicate Play Store review unless clearly needed.
- Favor robust fallback behavior for lower-end Android hardware.

## Asset Handling

- Keep the initial asset set small and readable: core ship, enemies, projectiles, UI icons, short SFX.
- Use compressed assets and avoid large texture sheets unless profiling proves they help.
- Name assets consistently by feature and purpose.
- Keep neon visual identity strong through color, contrast, glow, and motion instead of oversized art pipelines.

## EAS Build Readiness

- Keep app config tidy from the start even before building.
- Choose a stable package name early to avoid store migration pain later.
- Keep environment assumptions minimal for MVP.
- Track signing, icons, splash assets, and versioning as release tasks rather than mixing them into core gameplay work.

## Suggested Packages

If `package.json` exists, document these as the expected core packages for this project stack:

- `@shopify/react-native-skia`
- `react-native-reanimated`
- `zustand`
- `react-native-mmkv`
- `expo-haptics`
- `expo-av`
