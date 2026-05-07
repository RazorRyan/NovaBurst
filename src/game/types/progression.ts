export type UpgradeKey = "shieldArc" | "scoreFlow" | "corePlating";

export type UpgradeLevels = Record<UpgradeKey, number>;

export type UpgradeDefinition = {
  key: UpgradeKey;
  title: string;
  shortLabel: string;
  description: string;
  maxLevel: number;
  costs: number[];
};

export type ProgressionEffects = {
  shieldSweepBonus: number;
  scoreMultiplier: number;
  blockBonusMultiplier: number;
  maxHealth: number;
};
