# Prompt 02: Core Game Loop

## Goal

Implement the first playable NovaBurst loop: survive in a one-screen arena, defend the core, spawn threats, score points, die clearly, and restart quickly. Optimize for feel and readability over feature count.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `README.md`
- `docs/skills/game-loop.md`
- `docs/skills/mobile-performance.md`
- `docs/skills/react-native-skia.md`
- `app/`
- `components/`
- `features/game/`
- `store/`

Inspect only the files and directories that exist, plus any direct dependencies of the implementation you touch.

## Constraints

- Keep the game loop to a single-screen arcade survival experience.
- Do not add meta-progression trees, economy systems, accounts, or backend features.
- Do not introduce menu complexity beyond what is needed for play, game over, and restart clarity.

## Acceptance Criteria

- The player can start a run quickly and understand the core defensive mechanic.
- Threats spawn and escalate in a readable way.
- Collision, scoring, and death states work consistently.
- Restart flow is fast and encourages repeated runs.
- The implementation avoids per-frame React rerender patterns where possible.
- `CHANGELOG.md` is updated to reflect completed game loop work.

## Completion Rule

Do not add features outside this scope. When the loop is complete, update `CHANGELOG.md` with a concise summary of the implemented systems.
