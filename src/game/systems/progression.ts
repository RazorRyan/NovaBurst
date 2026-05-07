import { BLOCK_SCORE_BONUS, MAX_HEALTH, SHIELD_SEGMENT_SWEEP } from "./gameConstants";
import {
  ProgressionEffects,
  UpgradeDefinition,
  UpgradeKey,
  UpgradeLevels,
} from "../types/progression";

export const DEFAULT_UPGRADES: UpgradeLevels = {
  shieldArc: 0,
  scoreFlow: 0,
  corePlating: 0,
};

export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  {
    key: "shieldArc",
    title: "Wider Arc",
    shortLabel: "Arc",
    description: "Slightly widens each shield segment for cleaner interceptions.",
    maxLevel: 4,
    costs: [6, 10, 15, 21],
  },
  {
    key: "scoreFlow",
    title: "Score Flow",
    shortLabel: "Score",
    description: "Boosts passive score gain and successful block payouts.",
    maxLevel: 4,
    costs: [5, 9, 14, 20],
  },
  {
    key: "corePlating",
    title: "Core Plating",
    shortLabel: "Core",
    description: "Adds extra core health so slips are less punishing.",
    maxLevel: 3,
    costs: [8, 14, 22],
  },
];

export function getUpgradeEffects(upgrades: UpgradeLevels): ProgressionEffects {
  return {
    shieldSweepBonus: upgrades.shieldArc * 0.09,
    scoreMultiplier: 1 + upgrades.scoreFlow * 0.08,
    blockBonusMultiplier: 1 + upgrades.scoreFlow * 0.16,
    maxHealth: MAX_HEALTH + upgrades.corePlating,
  };
}

export function getUpgradeDefinition(key: UpgradeKey) {
  return UPGRADE_DEFINITIONS.find((upgrade) => upgrade.key === key)!;
}

export function getUpgradeCost(key: UpgradeKey, currentLevel: number) {
  const definition = getUpgradeDefinition(key);
  return definition.costs[currentLevel] ?? null;
}

export function calculateRunCurrency(score: number, combo: number) {
  return Math.max(1, Math.floor(score / 180) + Math.floor(combo / 3));
}

export function getShieldSweepForUpgrades(upgrades: UpgradeLevels) {
  return SHIELD_SEGMENT_SWEEP + getUpgradeEffects(upgrades).shieldSweepBonus;
}

export function getBlockBonusForUpgrades(upgrades: UpgradeLevels) {
  return Math.round(BLOCK_SCORE_BONUS * getUpgradeEffects(upgrades).blockBonusMultiplier);
}
