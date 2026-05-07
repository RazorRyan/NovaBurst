# Game Loop Skill

## Purpose

Use this guide when designing or implementing NovaBurst's playable core. The MVP loop should be instantly understandable, highly replayable, and easy to tune.

## One-Screen Arcade Loop

- Keep the first loop on a single screen with immediate restart flow.
- The player should understand survival, defense, scoring, and failure within the first few seconds.
- Reduce downtime between death and replay.

## Core Interaction Model

- The player protects a central core in a neon space arena.
- A rotating shield, orbiting weapon, or directional defense tool creates the main skill expression.
- Enemy pressure ramps over time through count, speed, patterns, and target priority.

## Spawn Objects

- Spawn enemies and pickups using simple wave logic or time-based budget rules.
- Start with a small set of object types and tune their roles clearly.
- Use safe spawn distances and readable entry motion.
- Keep spawn pacing elastic so the game can escalate without chaos too early.

## Rotate Shield and Core Gameplay

- The main defensive mechanic should be learnable in seconds and deep enough to master through timing and positioning.
- Rotation must feel crisp on mobile touch input.
- Shield contact should produce strong audiovisual feedback.
- If the defense tool misses, the player should immediately understand why.

## Collision Checks

- Keep collision rules simple, deterministic, and easy to debug.
- Separate hurtboxes and feedback timing from raw art bounds.
- Prioritize collisions that affect moment-to-moment feel: shield deflects, enemy hits, pickup collection, core damage.

## Scoring

- Reward survival time, enemy destruction, clean defense, and risky recovery moments.
- Keep the base scoring model transparent so players can improve deliberately.
- Use short feedback bursts for score gains instead of burying them in menus.

## Combo Multiplier

- Use combo or streak systems to reward sustained precision.
- Drop combo on mistakes only if the penalty feels fair and readable.
- Make multiplier thresholds easy to communicate through HUD, sound, and effects.

## Death and Restart

- Death should be fast, readable, and satisfying.
- Show the cause of failure clearly.
- Offer instant restart with minimal friction.
- Preserve best score, recent run summary, and maybe one progression hook for retention.

## Upgrades Later

- Do not start with a heavy meta-progression tree.
- Add unlocks and upgrades after the base loop already feels good.
- Future upgrades can include shield width, pulse burst, score perks, weapon variants, and recovery tools.
- New progression should deepen choices without slowing the restart loop.
