export type GameRunState = "running" | "paused" | "gameOver";

export type ShieldColorKey = "cyan" | "magenta" | "green" | "yellow";

export type BallKind = "normal" | "hazard";

export type Vector2 = {
  x: number;
  y: number;
};

export type BallEntity = {
  id: number;
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  vx: number;
  vy: number;
  radius: number;
  colorKey: ShieldColorKey;
  kind: BallKind;
};

export type ParticleEntity = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  colorKey: ShieldColorKey;
};

export type ScorePopup = {
  id: number;
  x: number;
  y: number;
  label: string;
  life: number;
  maxLife: number;
};

export type Star = {
  id: number;
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

export type GameSnapshot = {
  width: number;
  height: number;
  center: Vector2;
  elapsedMs: number;
  availableColorCount: number;
  shieldRadius: number;
  coreRadius: number;
  activeColor: ShieldColorKey;
  activeColorIndex: number;
  balls: BallEntity[];
  particles: ParticleEntity[];
  scorePopups: ScorePopup[];
  stars: Star[];
  damageFlash: number;
  shieldPulse: number;
  invinciblePulse: number;
  lowHealthPulse: number;
};
