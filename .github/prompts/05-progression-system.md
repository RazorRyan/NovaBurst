# Prompt 05: Progression System

## Goal

Add a light progression layer to NovaBurst only after the base loop is already fun. Keep it compact, local-first, and supportive of replayability rather than bloating the MVP.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `docs/skills/game-loop.md`
- `docs/skills/react-native-expo.md`
- `features/game/`
- `features/meta/`
- `store/`
- `lib/`

Inspect only the files and directories that exist, plus direct dependencies needed for the progression work.

## Constraints

- Keep progression lightweight and local-first.
- Do not add backend sync, cloud save, accounts, or live-service systems.
- Do not undermine the fast restart loop with heavy menu friction.

## Acceptance Criteria

- Progression adds motivation without replacing core gameplay mastery.
- Persistent data remains simple and appropriate for local storage.
- The system is easy to tune and easy to extend later.
- Progression UI stays lightweight and readable on mobile.
- `CHANGELOG.md` is updated to reflect completed progression work.

## Completion Rule

Do not add features outside this scope. When the progression task is complete, update `CHANGELOG.md` with a concise summary of the changes.
