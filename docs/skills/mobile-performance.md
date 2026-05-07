# Mobile Performance Skill

## Purpose

Use this guide when building NovaBurst systems that must stay responsive on real phones. The target is a polished 60 FPS feel where possible, especially on Android hardware likely to represent the first real audience.

## Keep Game State Lightweight

- Store only the data needed for simulation, rendering, and feedback.
- Favor small numeric structs and simple arrays over deeply nested object graphs in hot paths.
- Avoid copying large state trees per frame.

## Avoid `setState` in Fast Loops

- Do not use React state updates as the heartbeat of the game loop.
- Reserve React state for low-frequency UI concerns such as pause, menu visibility, score summary, and settings.
- If a value changes every frame, it probably belongs in a ref, shared value, or loop-owned data structure.

## Use Refs and Shared Values

- Use refs for mutable simulation state that should not rerender the component tree.
- Use Reanimated shared values for frame-sensitive visual transforms and interpolated presentation.
- Keep synchronization between simulation and render layers deliberate and minimal.

## Test on a Real Android Device

- Validate touch feel, frame pacing, heat, and battery behavior on actual Android hardware early.
- Do not trust simulator smoothness as proof of production readiness.
- Check legibility in bright environments and on mid-range screens.

## Target Smooth 60 FPS Where Possible

- Build with a 60 FPS goal in mind, then scale visual complexity to what devices can hold consistently.
- Short frame spikes matter in arcade games because they hurt control trust.
- Prefer predictable performance over occasional flashy effects.

## Optimize Particles and Effects

- Cap burst counts and lifetime lengths.
- Reuse materials, gradients, and particle styles.
- Be careful with blur, transparency stacks, and oversized full-screen effects.
- Profile enemy counts and effect density together, not in isolation.

## Practical Performance Rules

- Measure before making complicated optimizations.
- Remove the most expensive eye candy first when performance dips.
- Keep the core loop fun even with reduced effect density.
- Performance is part of game feel, not a separate polish phase.
