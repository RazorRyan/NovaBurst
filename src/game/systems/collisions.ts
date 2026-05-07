import { IncomingObject, ShieldSegment, Vector2 } from "../types/game";
import { angleBetweenPoints, distance, normalizeAngle, shortestAngleDifference } from "../utils/math";

export function findShieldSegmentHit(
  object: IncomingObject,
  center: Vector2,
  shieldRadius: number,
  shieldThickness: number,
  segments: ShieldSegment[],
) {
  const radialDistance = distance(center, { x: object.x, y: object.y });
  const inShieldBand =
    radialDistance >= shieldRadius - shieldThickness * 0.8 &&
    radialDistance <= shieldRadius + shieldThickness * 0.8;

  if (!inShieldBand) {
    return null;
  }

  const objectAngle = angleBetweenPoints(center, { x: object.x, y: object.y });

  for (const segment of segments) {
    const segmentCenter = normalizeAngle(segment.startAngle + segment.sweepAngle / 2);
    const diff = Math.abs(shortestAngleDifference(segmentCenter, objectAngle));
    if (diff <= segment.sweepAngle / 2) {
      return segment;
    }
  }

  return null;
}

export function hasReachedCore(
  object: IncomingObject,
  center: Vector2,
  coreRadius: number,
) {
  return distance(center, { x: object.x, y: object.y }) <= coreRadius + object.radius;
}
