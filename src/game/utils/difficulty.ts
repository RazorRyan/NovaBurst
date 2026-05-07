import { ShieldColorKey } from "../types";

export const SHIELD_COLORS: ShieldColorKey[] = ["cyan", "magenta", "green", "yellow"];

export const GAME_CONFIG = {
  lives: 3,
  baseScorePerSecond: 10,
  absorbScore: 18,
  comboWindowBonus: 0.2,
  startSpeed: 72,
  maxSpeed: 190,
  initialSpawnIntervalMs: 1100,
  minSpawnIntervalMs: 320,
  invincibilityMs: 900,
  easyWindowMs: 30000,
  colorUnlockTimeMs: 18000,
  colorUnlockScore: 180,
  secondColorCount: 2,
  thirdColorUnlockMs: 28000,
  fourthColorUnlockMs: 50000,
  hazardUnlockMs: 42000,
  hazardChanceMax: 0.18,
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
};

export function getDifficultyState(elapsedMs: number, score: number): DifficultyState {
  const ramp = Math.min(1, elapsedMs / 90000);
  const spawnIntervalMs =
    GAME_CONFIG.initialSpawnIntervalMs -
    (GAME_CONFIG.initialSpawnIntervalMs - GAME_CONFIG.minSpawnIntervalMs) * ramp;
  const speed = GAME_CONFIG.startSpeed + (GAME_CONFIG.maxSpeed - GAME_CONFIG.startSpeed) * ramp;

  let colorCount: number = GAME_CONFIG.secondColorCount;
  if (elapsedMs >= GAME_CONFIG.thirdColorUnlockMs || score >= GAME_CONFIG.colorUnlockScore) {
    colorCount = 3;
  }
  if (elapsedMs >= GAME_CONFIG.fourthColorUnlockMs || score >= GAME_CONFIG.colorUnlockScore * 2) {
    colorCount = 4;
  }

  const hazardChance =
    elapsedMs < GAME_CONFIG.hazardUnlockMs
      ? 0
      : Math.min(
          GAME_CONFIG.hazardChanceMax,
          ((elapsedMs - GAME_CONFIG.hazardUnlockMs) / 60000) * GAME_CONFIG.hazardChanceMax,
        );

  return {
    spawnIntervalMs,
    speed,
    colorCount,
    hazardChance,
  };
}
