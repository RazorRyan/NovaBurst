# React Native Skia Skill

## Purpose

Use this guide when implementing NovaBurst visuals with Skia. The focus is smooth, bright, arcade-style rendering that looks premium without pushing heavy React rerender pressure onto the main gameplay loop.

## Canvas Usage

- Treat the Skia canvas as the main render surface for gameplay visuals.
- Keep UI overlays separate from the canvas when they do not need per-frame updates.
- Organize render code by visual layer: background, player core, shield, enemies, pickups, projectiles, particles, HUD accents.
- Keep drawing data compact and derived from the simulation state each frame.

## Neon Glow Effects

- Build the NovaBurst look from layered shapes, additive-feeling color choices, bloom-like blur, and strong contrast against dark space backgrounds.
- Use restrained glow around important objects: player core, shield arcs, elite enemies, pickups, combo bursts.
- Keep gameplay readability above style. Dangerous objects should remain legible even when effects are busy.

## Particles

- Use particles to reinforce hits, near-misses, shield parries, pickups, and death bursts.
- Keep particle lifetimes short and data structures simple.
- Reuse particle styles where possible instead of inventing custom emitters for every event.
- Cap particle counts on lower-end Android targets.

## Game Rendering Approach

- Separate simulation state from render interpolation where useful.
- Prefer render-friendly entity snapshots or derived arrays instead of binding the whole game tree into React state.
- Keep layered backgrounds, motion trails, and hit flashes consistent so the game feels cohesive.
- Favor repeatable visual systems over one-off flourishes.

## Avoid Excessive React Re-renders

- Do not drive frame-by-frame game motion through repeated React component state updates.
- Avoid `setState` inside fast loops unless the update frequency is intentionally low.
- Keep hot path values in refs, shared values, or purpose-built loop state.
- Let React handle menus, overlays, and slower UI state; let Skia and Reanimated handle motion.

## Use Skia and Reanimated for Smooth Visuals

- Use Reanimated shared values for motion-heavy visual properties when the effect benefits from UI-thread execution.
- Keep animations deterministic and readable before adding more flourish.
- Use Skia for direct drawing, effects, gradients, glow, and animated presentation.
- Profile the cost of blur, large translucent layers, and excessive offscreen work before scaling up effects.

## Practical NovaBurst Visual Rules

- Readability beats realism.
- Motion should communicate threat, reward, and timing windows.
- Every effect should either improve clarity or make the game feel more satisfying.
- If an effect hurts framerate or visual clarity, simplify it.
