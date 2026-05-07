import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import * as Haptics from "expo-haptics";
import {
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useGameStore } from "../state/gameStore";
import {
  BallEntity,
  BallKind,
  GameSnapshot,
  ParticleEntity,
  ScorePopup,
  ShieldColorKey,
  Star,
} from "../types";
import { hasReachedShield } from "../utils/collision";
import { GAME_CONFIG, getDifficultyState, SHIELD_COLORS } from "../utils/difficulty";

const DEV_TEST_INVINCIBLE = __DEV__;

type SimState = {
  elapsedMs: number;
  spawnTimerMs: number;
  uiTimerMs: number;
  snapshotTimerMs: number;
  invincibilityMs: number;
  ballId: number;
  particleId: number;
  popupId: number;
  scoreAccumulator: number;
  activeColorIndex: number;
  previousColorIndex: number;
  balls: BallEntity[];
  particles: ParticleEntity[];
  scorePopups: ScorePopup[];
  damageFlash: number;
  shieldPulse: number;
  switchFlash: number;
  lastSelectionHapticMs: number;
  lastImpactHapticMs: number;
  lastErrorHapticMs: number;
};

const STAR_COUNT = 32;

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 1.6,
    alpha: 0.2 + Math.random() * 0.6,
  }));
}

function createSimState(): SimState {
  return {
    elapsedMs: 0,
    spawnTimerMs: 0,
    uiTimerMs: 0,
    snapshotTimerMs: 999,
    invincibilityMs: 0,
    ballId: 0,
    particleId: 0,
    popupId: 0,
    scoreAccumulator: 0,
    activeColorIndex: 0,
    previousColorIndex: 0,
    balls: [],
    particles: [],
    scorePopups: [],
    damageFlash: 0,
    shieldPulse: 0,
    switchFlash: 0,
    lastSelectionHapticMs: -9999,
    lastImpactHapticMs: -9999,
    lastErrorHapticMs: -9999,
  };
}

function createSnapshot(width: number, height: number, stars: Star[]): GameSnapshot {
  return {
    width,
    height,
    center: { x: width / 2, y: height / 2 },
    elapsedMs: 0,
    availableColorCount: 1,
    shieldRadius: Math.min(GAME_CONFIG.shieldRadius, Math.min(width, height) * 0.24),
    coreRadius: GAME_CONFIG.coreRadius,
    activeColor: SHIELD_COLORS[0],
    previousActiveColor: SHIELD_COLORS[0],
    activeColorIndex: 0,
    balls: [],
    particles: [],
    scorePopups: [],
    stars,
    damageFlash: 0,
    shieldPulse: 0,
    switchFlash: 0,
    invinciblePulse: 0,
    lowHealthPulse: 0,
  };
}

export function useGameLoop() {
  const { width, height } = useWindowDimensions();
  const [restartSeed, setRestartSeed] = useState(0);
  const [testInvincible, setTestInvincible] = useState(DEV_TEST_INVINCIBLE);
  const starsRef = useRef<Star[]>([]);
  const simRef = useRef<SimState>(createSimState());
  const lastFrameRef = useRef(0);
  const shakeX = useSharedValue(0);
  const shakeY = useSharedValue(0);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
    createSnapshot(Math.max(width, 1), Math.max(height, 1), createStars(Math.max(width, 1), Math.max(height, 1))),
  );

  const score = useGameStore((state) => state.score);
  const combo = useGameStore((state) => state.combo);
  const health = useGameStore((state) => state.health);
  const highScore = useGameStore((state) => state.highScore);
  const bestCombo = useGameStore((state) => state.bestCombo);
  const gameState = useGameStore((state) => state.gameState);

  const initialize = useCallback(() => {
    const nextWidth = Math.max(width, 1);
    const nextHeight = Math.max(height, 1);
    const stars = createStars(nextWidth, nextHeight);
    starsRef.current = stars;
    simRef.current = createSimState();
    lastFrameRef.current = 0;
    useGameStore.getState().resetRun();
    setSnapshot(createSnapshot(nextWidth, nextHeight, stars));
  }, [height, width]);

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
      const store = useGameStore.getState();
      const center = { x: width / 2, y: height / 2 };
      const difficulty = getDifficultyState(sim.elapsedMs, Math.round(sim.scoreAccumulator));
      const shieldRadius = Math.min(GAME_CONFIG.shieldRadius, Math.min(width, height) * 0.24);
      const activeColor = SHIELD_COLORS[sim.activeColorIndex];
      const previousActiveColor = SHIELD_COLORS[sim.previousColorIndex];

      if (store.gameState === "running") {
        sim.elapsedMs += deltaMs;
        sim.spawnTimerMs += deltaMs;
        sim.uiTimerMs += deltaMs;
        sim.snapshotTimerMs += deltaMs;
        sim.scoreAccumulator +=
          (deltaMs / 1000) *
          GAME_CONFIG.baseScorePerSecond *
          (1 + Math.max(0, store.combo - 1) * GAME_CONFIG.comboWindowBonus);

        while (sim.spawnTimerMs >= difficulty.spawnIntervalMs && sim.balls.length < difficulty.maxBalls) {
          sim.spawnTimerMs -= difficulty.spawnIntervalMs;
          sim.balls.push(
            createBall({
              id: sim.ballId++,
              width,
              height,
              center,
              speed: difficulty.speed,
              colorCount: difficulty.colorCount,
              hazardChance: difficulty.hazardChance,
            }),
          );
        }

        const removals = new Set<number>();
        let nextHealth = store.health;
        let nextCombo = store.combo;

        for (const ball of sim.balls) {
          ball.previousX = ball.x;
          ball.previousY = ball.y;
          ball.x += ball.vx * (deltaMs / 1000);
          ball.y += ball.vy * (deltaMs / 1000);

          if (!hasReachedShield(ball, center, shieldRadius)) {
            continue;
          }

          removals.add(ball.id);

          const isCorrectMatch = ball.kind === "normal" && ball.colorKey === activeColor;
          const canTakeDamage = sim.invincibilityMs <= 0;

          if (isCorrectMatch) {
            nextCombo += 1;
            sim.scoreAccumulator += GAME_CONFIG.absorbScore * Math.max(1, nextCombo);
            sim.shieldPulse = 1;
            emitParticles(sim.particles, ball.x, ball.y, ball.colorKey, 10, sim, sim.balls.length);
            emitPopup(sim.scorePopups, ball.x, ball.y, `+${GAME_CONFIG.absorbScore}`, sim);
            if (sim.elapsedMs - sim.lastImpactHapticMs >= 70) {
              sim.lastImpactHapticMs = sim.elapsedMs;
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
            }
          } else if (canTakeDamage) {
            if (!testInvincible) {
              nextHealth -= 1;
            }
            nextCombo = 0;
            sim.invincibilityMs = GAME_CONFIG.invincibilityMs;
            sim.damageFlash = 1;
            emitParticles(sim.particles, ball.x, ball.y, ball.colorKey, 14, sim, sim.balls.length);
            triggerShake(shakeX, shakeY);
            if (sim.elapsedMs - sim.lastErrorHapticMs >= 160) {
              sim.lastErrorHapticMs = sim.elapsedMs;
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
            }
          }
        }

        sim.balls = sim.balls.filter((ball) => !removals.has(ball.id));
        sim.invincibilityMs = Math.max(0, sim.invincibilityMs - deltaMs);
        sim.damageFlash = Math.max(0, sim.damageFlash - deltaMs / 220);
        sim.shieldPulse = Math.max(0, sim.shieldPulse - deltaMs / 180);
        sim.switchFlash = Math.max(0, sim.switchFlash - deltaMs / 240);

        sim.particles = sim.particles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * (deltaMs / 1000),
            y: particle.y + particle.vy * (deltaMs / 1000),
            life: particle.life - deltaMs,
          }))
          .filter((particle) => particle.life > 0)
          .slice(-getParticleBudget(sim.balls.length));

        sim.scorePopups = sim.scorePopups
          .map((popup) => ({
            ...popup,
            y: popup.y - deltaMs * 0.035,
            life: popup.life - deltaMs,
          }))
          .filter((popup) => popup.life > 0)
          .slice(-getScorePopupBudget(sim.balls.length));

        if (nextCombo !== store.combo) {
          store.setCombo(nextCombo);
        }

        if (nextHealth !== store.health) {
          store.setHealth(Math.max(0, nextHealth));
          if (nextHealth <= 0) {
            const finalScore = Math.round(sim.scoreAccumulator);
            store.setScore(finalScore);
            store.registerGameOver(finalScore, nextCombo);
          }
        }

        if (sim.uiTimerMs >= 120 && store.gameState === "running") {
          sim.uiTimerMs = 0;
          store.setScore(Math.round(sim.scoreAccumulator));
        }
      } else {
        sim.snapshotTimerMs += deltaMs;
      }

      const invinciblePulse =
        sim.invincibilityMs > 0 ? 0.45 + 0.25 * (0.5 + 0.5 * Math.sin(sim.elapsedMs / 90)) : 0;
      const lowHealthPulse =
        store.health <= 1 ? 0.35 + 0.25 * (0.5 + 0.5 * Math.sin(sim.elapsedMs / 160)) : 0;

      const renderIntervalMs = getRenderIntervalMs(sim.balls.length, sim.particles.length);
      const shouldPublishSnapshot =
        sim.snapshotTimerMs >= renderIntervalMs ||
        (store.gameState !== "running" && sim.snapshotTimerMs >= 32);
      if (shouldPublishSnapshot) {
        sim.snapshotTimerMs = 0;
        setSnapshot({
          width,
          height,
          center,
          elapsedMs: sim.elapsedMs,
          availableColorCount: difficulty.colorCount,
          shieldRadius,
          coreRadius: GAME_CONFIG.coreRadius,
          activeColor,
          previousActiveColor,
          activeColorIndex: sim.activeColorIndex,
          balls: sim.balls.map(cloneBallEntity),
          particles: sim.particles.map(cloneParticleEntity),
          scorePopups: sim.scorePopups.map(cloneScorePopup),
          stars: starsRef.current,
          damageFlash: sim.damageFlash,
          shieldPulse: sim.shieldPulse,
          switchFlash: sim.switchFlash,
          invinciblePulse,
          lowHealthPulse,
        });
      }

      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [height, restartSeed, shakeX, shakeY, width]);

  const cycleShieldColor = useCallback(() => {
    if (useGameStore.getState().gameState !== "running") {
      return;
    }
    const sim = simRef.current;
    const difficulty = getDifficultyState(sim.elapsedMs, Math.round(sim.scoreAccumulator));
    if (difficulty.colorCount <= 1) {
      return;
    }
    const nextColorIndex = (sim.activeColorIndex + 1) % difficulty.colorCount;
    if (nextColorIndex === sim.activeColorIndex) {
      return;
    }
    sim.previousColorIndex = sim.activeColorIndex;
    sim.activeColorIndex = nextColorIndex;
    sim.shieldPulse = 1.15;
    sim.switchFlash = 1;
    sim.snapshotTimerMs = Number.MAX_SAFE_INTEGER;
    if (sim.elapsedMs - sim.lastSelectionHapticMs >= 45) {
      sim.lastSelectionHapticMs = sim.elapsedMs;
      Haptics.selectionAsync().catch(() => undefined);
    }
  }, []);

  const togglePause = useCallback(() => {
    const state = useGameStore.getState();
    if (state.gameState === "gameOver") {
      return;
    }
    state.setGameState(state.gameState === "paused" ? "running" : "paused");
  }, []);

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
      bestCombo,
      gameState,
      testInvincible,
      toggleTestInvincible: () => {
        if (!__DEV__) {
          return;
        }
        setTestInvincible((value) => !value);
      },
      cycleShieldColor,
      togglePause,
      restart,
      shakeX,
      shakeY,
    }),
    [
      bestCombo,
      combo,
      cycleShieldColor,
      gameState,
      health,
      highScore,
      restart,
      score,
      shakeX,
      shakeY,
      snapshot,
      testInvincible,
      togglePause,
    ],
  );
}

function createBall(options: {
  id: number;
  width: number;
  height: number;
  center: { x: number; y: number };
  speed: number;
  colorCount: number;
  hazardChance: number;
}): BallEntity {
  const { id, width, height, center, speed, colorCount, hazardChance } = options;
  const side = Math.floor(Math.random() * 4);
  const padding = 40;
  let x = 0;
  let y = 0;

  if (side === 0) {
    x = Math.random() * width;
    y = -padding;
  } else if (side === 1) {
    x = width + padding;
    y = Math.random() * height;
  } else if (side === 2) {
    x = Math.random() * width;
    y = height + padding;
  } else {
    x = -padding;
    y = Math.random() * height;
  }

  const dx = center.x - x;
  const dy = center.y - y;
  const length = Math.max(Math.hypot(dx, dy), 0.001);
  const kind: BallKind = Math.random() < hazardChance ? "hazard" : "normal";
  const colorKey = kind === "hazard" ? "yellow" : SHIELD_COLORS[Math.floor(Math.random() * colorCount)];

  return {
    id,
    x,
    y,
    previousX: x,
    previousY: y,
    vx: (dx / length) * speed * (0.84 + Math.random() * 0.35),
    vy: (dy / length) * speed * (0.84 + Math.random() * 0.35),
    radius: kind === "hazard" ? 13 : 11 + Math.random() * 6,
    colorKey,
    kind,
  };
}

function emitParticles(
  particles: ParticleEntity[],
  x: number,
  y: number,
  colorKey: ShieldColorKey,
  count: number,
  sim: SimState,
  activeBallCount: number,
) {
  const burstCount = getParticleBurstCount(count, particles.length, activeBallCount);
  for (let index = 0; index < burstCount; index += 1) {
    const angle = (Math.PI * 2 * index) / burstCount + Math.random() * 0.55;
    const speed = 24 + Math.random() * 120;
    particles.push({
      id: sim.particleId++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 4,
      life: GAME_CONFIG.particleLifeMs + Math.random() * 180,
      maxLife: GAME_CONFIG.particleLifeMs + 180,
      colorKey,
    });
  }
}

function emitPopup(
  scorePopups: ScorePopup[],
  x: number,
  y: number,
  label: string,
  sim: SimState,
) {
  scorePopups.push({
    id: sim.popupId++,
    x,
    y,
    label,
    life: GAME_CONFIG.popupLifeMs,
    maxLife: GAME_CONFIG.popupLifeMs,
  });
}

function triggerShake(shakeX: ReturnType<typeof useSharedValue<number>>, shakeY: ReturnType<typeof useSharedValue<number>>) {
  const offsetX = (Math.random() - 0.5) * 10;
  const offsetY = (Math.random() - 0.5) * 10;
  shakeX.value = withSequence(withTiming(offsetX, { duration: 38 }), withTiming(0, { duration: 120 }));
  shakeY.value = withSequence(withTiming(offsetY, { duration: 38 }), withTiming(0, { duration: 120 }));
}

function getRenderIntervalMs(activeBallCount: number, particleCount: number) {
  if (activeBallCount >= 8 || particleCount >= 42) {
    return 32;
  }
  if (activeBallCount >= 5 || particleCount >= 24) {
    return 24;
  }
  return 16;
}

function getParticleBudget(activeBallCount: number) {
  if (activeBallCount >= 8) {
    return 42;
  }
  if (activeBallCount >= 5) {
    return 60;
  }
  return 84;
}

function getScorePopupBudget(activeBallCount: number) {
  return activeBallCount >= 6 ? 5 : 8;
}

function getParticleBurstCount(baseCount: number, particleCount: number, activeBallCount: number) {
  if (activeBallCount >= 8 || particleCount >= 42) {
    return Math.max(4, Math.floor(baseCount * 0.5));
  }
  if (activeBallCount >= 5 || particleCount >= 24) {
    return Math.max(6, Math.floor(baseCount * 0.75));
  }
  return baseCount;
}

function cloneBallEntity(ball: BallEntity): BallEntity {
  return { ...ball };
}

function cloneParticleEntity(particle: ParticleEntity): ParticleEntity {
  return { ...particle };
}

function cloneScorePopup(popup: ScorePopup): ScorePopup {
  return { ...popup };
}
