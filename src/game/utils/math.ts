import { Vector2 } from "../types";

const TAU = Math.PI * 2;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function distance(a: Vector2, b: Vector2) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function normalizeAngle(angle: number) {
  let next = angle % TAU;
  if (next < 0) {
    next += TAU;
  }
  return next;
}

export function shortestAngleDifference(from: number, to: number) {
  const normalizedFrom = normalizeAngle(from);
  const normalizedTo = normalizeAngle(to);
  let diff = normalizedTo - normalizedFrom;
  if (diff > Math.PI) {
    diff -= TAU;
  } else if (diff < -Math.PI) {
    diff += TAU;
  }
  return diff;
}

export function angleBetweenPoints(origin: Vector2, point: Vector2) {
  return normalizeAngle(Math.atan2(point.y - origin.y, point.x - origin.x));
}

export function pointOnCircle(center: Vector2, radius: number, angle: number) {
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
  };
}
