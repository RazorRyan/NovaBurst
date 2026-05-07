import {
  BASE_OBJECT_SPEED,
  BASE_SPAWN_INTERVAL_MS,
  MAX_OBJECT_SPEED,
  MIN_SPAWN_INTERVAL_MS,
} from "./gameConstants";
import { ColorIndex, IncomingObject, Vector2 } from "../types/game";
import { clamp } from "../utils/math";

type SpawnOptions = {
  id: number;
  width: number;
  height: number;
  center: Vector2;
  difficulty: number;
};

export function getSpawnIntervalMs(elapsedMs: number) {
  const difficulty = clamp(elapsedMs / 60000, 0, 1);
  return BASE_SPAWN_INTERVAL_MS - (BASE_SPAWN_INTERVAL_MS - MIN_SPAWN_INTERVAL_MS) * difficulty;
}

export function createIncomingObject(options: SpawnOptions): IncomingObject {
  const { id, width, height, center, difficulty } = options;
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
  const speed = BASE_OBJECT_SPEED + (MAX_OBJECT_SPEED - BASE_OBJECT_SPEED) * difficulty;
  const variance = 0.8 + Math.random() * 0.45;

  return {
    id,
    x,
    y,
    previousX: x,
    previousY: y,
    vx: (dx / length) * speed * variance,
    vy: (dy / length) * speed * variance,
    radius: 10 + Math.random() * 8,
    colorIndex: Math.floor(Math.random() * 3) as ColorIndex,
    breachedShield: false,
  };
}

export function getDifficultyProgress(elapsedMs: number) {
  return clamp(elapsedMs / 90000, 0, 1);
}
