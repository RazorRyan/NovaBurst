# Prompt 01: Project Setup

## Goal

Set up the NovaBurst mobile game foundation for a React Native + Expo + TypeScript + Skia project without introducing non-MVP systems. Favor a clean starting structure, clear app ownership, and Android-first pragmatism.

## Files To Inspect

- `AGENTS.md`
- `CHANGELOG.md`
- `README.md`
- `package.json`
- `app.json`
- `app.config.ts`
- `tsconfig.json`
- `babel.config.js`
- `metro.config.js`

Inspect only the files that exist. Do not create missing platform or tooling files unless the task clearly requires them.

## Constraints

- Stay within project setup and configuration scope.
- Do not add gameplay systems yet.
- Do not add backend, cloud, login, analytics, or monetization work.
- Do not install dependencies as part of this prompt unless explicitly requested.

## Acceptance Criteria

- The project structure supports Expo + TypeScript development cleanly.
- Config choices reflect an Android-first mobile arcade MVP.
- Documentation or config notes identify the expected core packages without forcing immediate install work.
- The repo remains simple and easy to extend for the next gameplay prompts.
- `CHANGELOG.md` is updated to reflect completed setup work.

## Completion Rule

Do not add features outside this scope. When the setup task is complete, update `CHANGELOG.md` with a concise summary of what changed.
