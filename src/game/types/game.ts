export type GameRunState = "running" | "gameOver";

export type ColorIndex = 0 | 1 | 2;

export type Vector2 = {
  x: number;
  y: number;
};

export type IncomingObject = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: ColorIndex;
  breachedShield: boolean;
};

export type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  colorIndex: ColorIndex;
};

export type Star = {
  id: number;
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

export type ShieldSegment = {
  colorIndex: ColorIndex;
  startAngle: number;
  sweepAngle: number;
};

export type RenderSnapshot = {
  width: number;
  height: number;
  center: Vector2;
  elapsedMs: number;
  shieldAngle: number;
  shieldSegments: ShieldSegment[];
  shieldRadius: number;
  shieldThickness: number;
  coreRadius: number;
  incomingObjects: IncomingObject[];
  particles: Particle[];
  stars: Star[];
};
