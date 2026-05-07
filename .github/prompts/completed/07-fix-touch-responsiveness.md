# 07 — Fix Mobile Touch Responsiveness

You are working on the NovaBurst React Native mobile game.

Goal:
Fix unreliable touch controls when switching colors during gameplay.

Player feedback:
- taps do not always register
- rapid tapping sometimes fails
- controls feel delayed or inconsistent

Tasks:
- inspect touch handlers
- inspect gesture propagation
- inspect overlapping components
- reduce latency in touch updates
- avoid stale React state updates
- use refs/shared values where appropriate
- ensure touches are not blocked by overlays or Skia canvas layers

Requirements:
- taps must feel instant
- support fast repeated taps
- no dropped inputs during gameplay
- stable on Android devices

Acceptance criteria:
- rapid taps always switch colors
- no missed taps during active gameplay
- controls feel immediate and responsive

Update CHANGELOG.md.
