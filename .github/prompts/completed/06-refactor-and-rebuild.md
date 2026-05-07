# Neon Collector / NovaBurst — Core Gameplay Pivot for React Native + Expo

Refactor the current game into a simple, addictive, hyper-casual mobile game built with React Native + Expo.

The current gameplay is too hard because the player must control color-specific bars around incoming balls. Remove that complexity.

## New Core Gameplay

The player does NOT rotate bars around the ball.

Instead:
- Balls spawn automatically and move toward the center/core.
- The player controls ONE active shield color.
- Tap anywhere on screen to cycle the shield color.
- If the active shield color matches the incoming ball color when it reaches the core:
  - absorb the ball
  - add score
  - play satisfying visual feedback
- If the active shield color does not match:
  - lose 1 life
  - trigger damage feedback

## Controls

Mobile:
- Tap anywhere = cycle active shield color.

Desktop/web testing:
- Spacebar = cycle active shield color.

## MVP Rules

- Start with 2 colors only.
- First 30 seconds must be easy.
- Use 3 lives.
- Add brief invincibility after damage.
- Gradually increase speed and spawn rate.
- Add more colors only after the player reaches a safe score/time.
- Avoid precision timing and angle-based gameplay.

## Visual Style

Keep the neon arcade style:
- dark background
- glowing core
- glowing balls
- active shield color indicator
- particles or simple burst effects
- smooth animations

Use simple React Native shapes/views first.
Do not require complex art assets.

## Technical Requirements

Use React Native + Expo best practices.

Refactor cleanly:
- remove old rotating bar/color-ring logic if it exists
- keep components small
- keep game state predictable
- avoid overengineering
- preserve mobile layout
- preserve Expo start/build setup

Suggested structure:
- `src/game/GameScreen.tsx`
- `src/game/components/Core.tsx`
- `src/game/components/Ball.tsx`
- `src/game/components/ShieldIndicator.tsx`
- `src/game/components/HUD.tsx`
- `src/game/hooks/useGameLoop.ts`
- `src/game/utils/collision.ts`
- `src/game/utils/difficulty.ts`
- `src/game/types.ts`

## Game Feel

Add:
- score popup on correct match
- screen flash on damage
- small shake on wrong match
- combo counter
- game over screen
- retry button

## Config

All balancing values must be configurable:
- starting speed
- max speed
- spawn interval
- color unlock timing
- lives
- invincibility duration
- score values
- difficulty ramp speed

## Important

This is a gameplay pivot, not a small tweak.

Remove unused old gameplay logic.
Do not leave broken imports or dead components.
Make sure `npm run start` still works.
Update `CHANGELOG.md` with the gameplay pivot and changed files.