import { BallEntity, Vector2 } from "../types";
import { GAME_CONFIG } from "./difficulty";

export function distanceToCenter(ball: BallEntity, center: Vector2) {
  return Math.hypot(ball.x - center.x, ball.y - center.y);
}

export function hasReachedShield(ball: BallEntity, center: Vector2, shieldRadius: number) {
  return distanceToCenter(ball, center) <= shieldRadius + ball.radius + GAME_CONFIG.hitRadiusPadding;
}
