# Prompt 04: Touch Controls

## Goal

Implement or improve NovaBurst touch controls so they feel fast, fair, and intuitive on Android phones. The control scheme should deepen mastery without adding control complexity for its own sake.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `docs/skills/game-loop.md`
- `docs/skills/mobile-performance.md`
- `features/game/`
- `components/`
- `hooks/`

Inspect only the files and directories that exist, plus any direct dependencies required for the control implementation.

## Constraints

- Stay focused on player input and control feel.
- Do not add unrelated progression, monetization, or backend systems.
- Avoid layered gestures or menus that distract from the arcade loop.

## Acceptance Criteria

- The main input mechanic is responsive and readable on touch devices.
- The player can understand how to control defense within seconds.
- Control feedback supports timing, accuracy, and satisfaction.
- Input code avoids unnecessary fast-loop React state churn.
- `CHANGELOG.md` is updated to reflect completed control work.

## Completion Rule

Do not add features outside this scope. When the control task is complete, update `CHANGELOG.md` with a concise summary of the changes.
