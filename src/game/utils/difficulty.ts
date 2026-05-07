import { ShieldColorKey } from "../types";

export const SHIELD_COLORS: ShieldColorKey[] = ["cyan", "magenta", "green", "yellow"];

export const GAME_CONFIG = {
  lives: 3,
  baseScorePerSecond: 10,
  absorbScore: 18,
  comboWindowBonus: 0.2,
  startSpeed: 56,
  maxSpeed: 188,
  initialSpawnIntervalMs: 1600,
  minSpawnIntervalMs: 420,
  invincibilityMs: 900,
  phaseOneEndMs: 20000,
  phaseTwoEndMs: 45000,
  phaseThreeEndMs: 90000,
  secondColorUnlockMs: 20000,
  thirdColorUnlockMs: 55000,
  fourthColorUnlockMs: 80000,
  hazardUnlockMs: 95000,
  hazardChanceMax: 0.16,
  shieldRadius: 110,
  coreRadius: 34,
  hitRadiusPadding: 6,
  popupLifeMs: 700,
  particleLifeMs: 460,
} as const;

export type DifficultyState = {
  spawnIntervalMs: number;
  speed: number;
  colorCount: number;
  hazardChance: number;
  maxBalls: number;
};

export function getDifficultyState(elapsedMs: number, _score: number): DifficultyState {
  const spawnIntervalMs = getSpawnIntervalMs(elapsedMs);
  const speed = getSpeed(elapsedMs);
  const colorCount = getColorCount(elapsedMs);
  const maxBalls = getMaxBalls(elapsedMs);
  const hazardChance = getHazardChance(elapsedMs);

  return {
    spawnIntervalMs,
    speed,
    colorCount,
    hazardChance,
    maxBalls,
  };
}

function getSpawnIntervalMs(elapsedMs: number): number {
  if (elapsedMs < GAME_CONFIG.phaseOneEndMs) {
    return lerp(1600, 1320, elapsedMs / GAME_CONFIG.phaseOneEndMs);
  }

  if (elapsedMs < GAME_CONFIG.phaseTwoEndMs) {
    return lerp(
      1320,
      1080,
      (elapsedMs - GAME_CONFIG.phaseOneEndMs) / (GAME_CONFIG.phaseTwoEndMs - GAME_CONFIG.phaseOneEndMs),
    );
  }

  if (elapsedMs < GAME_CONFIG.phaseThreeEndMs) {
    return lerp(
      1080,
      760,
      (elapsedMs - GAME_CONFIG.phaseTwoEndMs) / (GAME_CONFIG.phaseThreeEndMs - GAME_CONFIG.phaseTwoEndMs),
    );
  }

  return lerp(760, GAME_CONFIG.minSpawnIntervalMs, Math.min(1, (elapsedMs - GAME_CONFIG.phaseThreeEndMs) / 90000));
}

function getSpeed(elapsedMs: number): number {
  if (elapsedMs < GAME_CONFIG.phaseOneEndMs) {
    return lerp(56, 72, elapsedMs / GAME_CONFIG.phaseOneEndMs);
  }

  if (elapsedMs < GAME_CONFIG.phaseTwoEndMs) {
    return lerp(
      72,
      96,
      (elapsedMs - GAME_CONFIG.phaseOneEndMs) / (GAME_CONFIG.phaseTwoEndMs - GAME_CONFIG.phaseOneEndMs),
    );
  }

  if (elapsedMs < GAME_CONFIG.phaseThreeEndMs) {
    return lerp(
      96,
      132,
      (elapsedMs - GAME_CONFIG.phaseTwoEndMs) / (GAME_CONFIG.phaseThreeEndMs - GAME_CONFIG.phaseTwoEndMs),
    );
  }

  return lerp(132, GAME_CONFIG.maxSpeed, Math.min(1, (elapsedMs - GAME_CONFIG.phaseThreeEndMs) / 90000));
}

function getColorCount(elapsedMs: number): number {
  if (elapsedMs < GAME_CONFIG.secondColorUnlockMs) {
    return 1;
  }
  if (elapsedMs < GAME_CONFIG.thirdColorUnlockMs) {
    return 2;
  }
  if (elapsedMs < GAME_CONFIG.fourthColorUnlockMs) {
    return 3;
  }
  return 4;
}

function getMaxBalls(elapsedMs: number): number {
  if (elapsedMs < GAME_CONFIG.phaseOneEndMs) {
    return 3;
  }
  if (elapsedMs < GAME_CONFIG.phaseTwoEndMs) {
    return 5;
  }
  if (elapsedMs < GAME_CONFIG.phaseThreeEndMs) {
    return 7;
  }
  return 9 + Math.min(5, Math.floor((elapsedMs - GAME_CONFIG.phaseThreeEndMs) / 30000));
}

function getHazardChance(elapsedMs: number): number {
  if (elapsedMs < GAME_CONFIG.hazardUnlockMs) {
    return 0;
  }

  return Math.min(
    GAME_CONFIG.hazardChanceMax,
    ((elapsedMs - GAME_CONFIG.hazardUnlockMs) / 90000) * GAME_CONFIG.hazardChanceMax,
  );
}

function lerp(start: number, end: number, progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return start + (end - start) * clamped;
}
