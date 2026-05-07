# NovaBurst

NovaBurst is a neon space arcade survival game for mobile, built around quick restarts, readable action, and satisfying score-chasing.

## AI Development Workflow

Use `AGENTS.md` as the global project rules before starting any task.

Run prompts from `.github/prompts` one at a time so each implementation pass stays focused and easy to verify.

Update `CHANGELOG.md` after every completed prompt or scoped task.

Build the MVP gameplay loop and polish before monetization, backend services, or non-essential platform features.

## Setup Notes

Prompt 01 establishes a minimal Expo + TypeScript app shell and a clean `src` layout without adding gameplay systems yet.

Expected core packages for later implementation work:

- `@shopify/react-native-skia`
- `react-native-reanimated`
- `zustand`
- `react-native-mmkv`
- `expo-haptics`
- `expo-av`
