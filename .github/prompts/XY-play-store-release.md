# Prompt 07: Play Store Release

## Goal

Prepare NovaBurst for Android release readiness with the minimum viable release workflow: package naming, assets, store-facing requirements, and EAS build preparation. Keep this task release-focused and avoid mixing in new gameplay scope.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `README.md`
- `docs/skills/play-store-release.md`
- `app.json`
- `app.config.ts`
- `eas.json`
- `assets/`

Inspect only the files and directories that exist, plus direct release-related dependencies.

## Constraints

- Stay focused on release prep.
- Do not add gameplay systems.
- Do not add backend or account systems as a side effect of release work.

## Acceptance Criteria

- Android release requirements are clearly represented in config and documentation.
- Package naming and build assumptions are stable enough for EAS-based release work.
- Store asset and privacy policy requirements are visible and actionable.
- Internal testing and signed AAB flow are documented or configured as appropriate.
- `CHANGELOG.md` is updated to reflect completed release prep work.

## Completion Rule

Do not add features outside this scope. When the release-prep task is complete, update `CHANGELOG.md` with a concise summary of the changes.
