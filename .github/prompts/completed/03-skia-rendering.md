# Prompt 03: Skia Rendering

## Goal

Build or refine the NovaBurst render layer using Skia so the game reads as a premium neon arcade experience while staying performant on mobile. Focus on clarity, glow, motion, and feedback.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `docs/skills/react-native-skia.md`
- `docs/skills/mobile-performance.md`
- `features/game/`
- `components/`
- `assets/`

Inspect only the files and directories that exist, plus any direct visual dependencies you need to change.

## Constraints

- Stay focused on rendering and visual feedback.
- Do not expand gameplay scope.
- Do not add large new asset pipelines or non-essential libraries.

## Acceptance Criteria

- The game uses Skia in a way that improves readability and game feel.
- Important entities are visually distinct and easy to parse.
- Neon effects support the fantasy without tanking performance.
- Motion-heavy visuals prefer Skia and Reanimated over React rerender churn.
- `CHANGELOG.md` is updated to reflect completed rendering work.

## Completion Rule

Do not add features outside this scope. When the rendering task is complete, update `CHANGELOG.md` with a concise summary of the changes.
