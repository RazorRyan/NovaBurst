import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import * as Haptics from "expo-haptics";
import {
  SharedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import {
  BASE_CORE_RADIUS,
  BASE_SHIELD_RADIUS,
  BLOCK_SCORE_BONUS,
  MAX_HEALTH,
  MAX_PARTICLES,
  SCORE_PER_SECOND,
  SHIELD_ROTATION_DURATION_MS,
  SHIELD_ROTATION_STEP,
  SHIELD_SEGMENT_GAP,
  SHIELD_SEGMENT_SWEEP,
} from "../systems/gameConstants";
import { findShieldSegmentHit, hasReachedCore } from "../systems/collisions";
import { createIncomingObject, getDifficultyProgress, getSpawnIntervalMs } from "../systems/spawn";
import {
  ColorIndex,
  IncomingObject,
  Particle,
  RenderSnapshot,
  ShieldSegment,
  Star,
} from "../types/game";
import { clamp } from "../utils/math";
import { useGameStore } from "../state/gameStore";

type MutableSimulationState = {
  elapsedMs: number;
  spawnTimerMs: number;
  uiTimerMs: number;
  objectId: number;
  particleId: number;
  scoreAccumulator: number;
  incomingObjects: IncomingObject[];
  particles: Particle[];
};

const STAR_COUNT = 36;

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 1.8,
    alpha: 0.2 + Math.random() * 0.7,
  }));
}

function createEmptySimulation(): MutableSimulationState {
  return {
    elapsedMs: 0,
    spawnTimerMs: 0,
    uiTimerMs: 0,
    objectId: 0,
    particleId: 0,
    scoreAccumulator: 0,
    incomingObjects: [],
    particles: [],
  };
}

function createShieldSegments(angle: number): ShieldSegment[] {
  const segments: ShieldSegment[] = [];
  const spacing = (Math.PI * 2) / 3;
  for (let index = 0 as ColorIndex; index < 3; index = (index + 1) as ColorIndex) {
    segments.push({
      colorIndex: index,
      startAngle: angle + index * spacing + SHIELD_SEGMENT_GAP / 2,
      sweepAngle: SHIELD_SEGMENT_SWEEP,
    });
  }
  return segments;
}

function createBaseSnapshot(width: number, height: number, stars: Star[]): RenderSnapshot {
  const center = { x: width / 2, y: height / 2 };
  return {
    width,
    height,
    center,
    elapsedMs: 0,
    shieldAngle: 0,
    shieldSegments: createShieldSegments(0),
    shieldRadius: Math.min(BASE_SHIELD_RADIUS, Math.min(width, height) * 0.24),
    shieldThickness: 14,
    coreRadius: BASE_CORE_RADIUS,
    incomingObjects: [],
    particles: [],
    stars,
  };
}

function triggerImpactShake(translateX: SharedValue<number>, translateY: SharedValue<number>) {
  const offsetX = (Math.random() - 0.5) * 12;
  const offsetY = (Math.random() - 0.5) * 12;
  translateX.value = withSequence(withTiming(offsetX, { duration: 40 }), withTiming(0, { duration: 110 }));
  translateY.value = withSequence(withTiming(offsetY, { duration: 40 }), withTiming(0, { duration: 110 }));
}

export function useNovaBurstGame() {
  const { width, height } = useWindowDimensions();
  const [restartSeed, setRestartSeed] = useState(0);
  const starsRef = useRef<Star[]>([]);
  const simRef = useRef<MutableSimulationState>(createEmptySimulation());
  const lastFrameRef = useRef(0);
  const shieldAngle = useSharedValue(0);
  const shakeX = useSharedValue(0);
  const shakeY = useSharedValue(0);
  const [snapshot, setSnapshot] = useState<RenderSnapshot>(() =>
    createBaseSnapshot(Math.max(width, 1), Math.max(height, 1), createStars(Math.max(width, 1), Math.max(height, 1))),
  );

  const score = useGameStore((state) => state.score);
  const combo = useGameStore((state) => state.combo);
  const health = useGameStore((state) => state.health);
  const gameState = useGameStore((state) => state.gameState);
  const highScore = useGameStore((state) => state.highScore);

  const initialize = useCallback(() => {
    const nextWidth = Math.max(width, 1);
    const nextHeight = Math.max(height, 1);
    const stars = createStars(nextWidth, nextHeight);
    starsRef.current = stars;
    simRef.current = createEmptySimulation();
    lastFrameRef.current = 0;
    shieldAngle.value = 0;
    useGameStore.getState().resetRun();
    setSnapshot(createBaseSnapshot(nextWidth, nextHeight, stars));
  }, [height, shieldAngle, width]);

  useEffect(() => {
    initialize();
  }, [initialize, restartSeed]);

  useEffect(() => {
    if (width <= 0 || height <= 0) {
      return;
    }

    let active = true;
    let frameId = 0;

    const frame = (timestamp: number) => {
      if (!active) {
        return;
      }

      const deltaMs = lastFrameRef.current === 0 ? 16 : Math.min(timestamp - lastFrameRef.current, 32);
      lastFrameRef.current = timestamp;

      const sim = simRef.current;
      const state = useGameStore.getState();
      const center = { x: width / 2, y: height / 2 };
      const shieldRadius = Math.min(BASE_SHIELD_RADIUS, Math.min(width, height) * 0.24);
      const coreRadius = BASE_CORE_RADIUS;
      const shieldThickness = 14;

      if (state.gameState === "running") {
        sim.elapsedMs += deltaMs;
        sim.spawnTimerMs += deltaMs;
        sim.uiTimerMs += deltaMs;
        sim.scoreAccumulator += (deltaMs / 1000) * SCORE_PER_SECOND * (1 + Math.max(0, state.combo - 1) * 0.18);

        const difficulty = getDifficultyProgress(sim.elapsedMs);
        const nextSpawnInterval = getSpawnIntervalMs(sim.elapsedMs);

        while (sim.spawnTimerMs >= nextSpawnInterval) {
          sim.spawnTimerMs -= nextSpawnInterval;
          sim.incomingObjects.push(
            createIncomingObject({
              id: sim.objectId++,
              width,
              height,
              center,
              difficulty,
            }),
          );
        }

        const segments = createShieldSegments(shieldAngle.value);
        const blockedObjects = new Set<number>();
        let pendingHealth = state.health;
        let pendingCombo = state.combo;

        for (const object of sim.incomingObjects) {
          object.x += object.vx * (deltaMs / 1000);
          object.y += object.vy * (deltaMs / 1000);

          const segmentHit = findShieldSegmentHit(
            object,
            center,
            shieldRadius,
            shieldThickness,
            segments,
          );

          if (segmentHit && segmentHit.colorIndex === object.colorIndex) {
            blockedObjects.add(object.id);
            pendingCombo += 1;
            sim.scoreAccumulator += BLOCK_SCORE_BONUS * Math.max(1, pendingCombo);
            emitBurst(sim.particles, object.x, object.y, object.colorIndex, 10, sim);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
          } else if (segmentHit && !object.breachedShield) {
            object.breachedShield = true;
            pendingCombo = 0;
            emitBurst(sim.particles, object.x, object.y, object.colorIndex, 4, sim);
          }

          if (hasReachedCore(object, center, coreRadius)) {
            blockedObjects.add(object.id);
            pendingHealth -= 1;
            pendingCombo = 0;
            emitBurst(sim.particles, object.x, object.y, object.colorIndex, 14, sim);
            triggerImpactShake(shakeX, shakeY);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
          }
        }

        sim.incomingObjects = sim.incomingObjects.filter((object) => !blockedObjects.has(object.id));

        sim.particles = sim.particles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * (deltaMs / 1000),
            y: particle.y + particle.vy * (deltaMs / 1000),
            life: particle.life - deltaMs,
          }))
          .filter((particle) => particle.life > 0)
          .slice(-MAX_PARTICLES);

        if (pendingCombo !== state.combo) {
          state.setCombo(pendingCombo);
        }

        if (pendingHealth !== state.health) {
          const clampedHealth = clamp(pendingHealth, 0, MAX_HEALTH);
          state.setHealth(clampedHealth);
          if (clampedHealth <= 0) {
            const finalScore = Math.round(sim.scoreAccumulator);
            state.setScore(finalScore);
            state.registerGameOver(finalScore);
          }
        }

        if (sim.uiTimerMs >= 90 && state.gameState === "running") {
          sim.uiTimerMs = 0;
          state.setScore(Math.round(sim.scoreAccumulator));
        }
      }

      setSnapshot({
        width,
        height,
        center,
        elapsedMs: sim.elapsedMs,
        shieldAngle: shieldAngle.value,
        shieldSegments: createShieldSegments(shieldAngle.value),
        shieldRadius,
        shieldThickness,
        coreRadius,
        incomingObjects: sim.incomingObjects.map((object) => ({ ...object })),
        particles: sim.particles.map((particle) => ({ ...particle })),
        stars: starsRef.current,
      });

      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [height, restartSeed, shakeX, shakeY, shieldAngle, width]);

  const rotateLeft = useCallback(() => {
    if (useGameStore.getState().gameState !== "running") {
      return;
    }
    shieldAngle.value = withTiming(shieldAngle.value - SHIELD_ROTATION_STEP, {
      duration: SHIELD_ROTATION_DURATION_MS,
    });
  }, [shieldAngle]);

  const rotateRight = useCallback(() => {
    if (useGameStore.getState().gameState !== "running") {
      return;
    }
    shieldAngle.value = withTiming(shieldAngle.value + SHIELD_ROTATION_STEP, {
      duration: SHIELD_ROTATION_DURATION_MS,
    });
  }, [shieldAngle]);

  const restart = useCallback(() => {
    setRestartSeed((value) => value + 1);
  }, []);

  return useMemo(
    () => ({
      snapshot,
      score,
      combo,
      health,
      highScore,
      gameState,
      rotateLeft,
      rotateRight,
      restart,
      shakeX,
      shakeY,
    }),
    [
      combo,
      gameState,
      health,
      highScore,
      restart,
      rotateLeft,
      rotateRight,
      score,
      shakeX,
      shakeY,
      snapshot,
    ],
  );
}

function emitBurst(
  particles: Particle[],
  x: number,
  y: number,
  colorIndex: ColorIndex,
  count: number,
  sim: MutableSimulationState,
) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.5;
    const speed = 28 + Math.random() * 120;
    const life = 240 + Math.random() * 220;
    particles.push({
      id: sim.particleId++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
      radius: 2 + Math.random() * 4,
      colorIndex,
    });
  }
}
