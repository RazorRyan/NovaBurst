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
