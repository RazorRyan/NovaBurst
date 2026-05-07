import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MAX_HEALTH } from "../systems/gameConstants";
import {
  calculateRunCurrency,
  DEFAULT_UPGRADES,
  getUpgradeCost,
  getUpgradeEffects,
} from "../systems/progression";
import { GameRunState } from "../types/game";
import { ProgressionEffects, UpgradeKey, UpgradeLevels } from "../types/progression";

type GameStoreState = {
  score: number;
  combo: number;
  health: number;
  gameState: GameRunState;
  highScore: number;
  credits: number;
  totalRuns: number;
  bestCombo: number;
  lastRunCredits: number;
  upgrades: UpgradeLevels;
  setScore: (score: number) => void;
  setCombo: (combo: number) => void;
  setHealth: (health: number) => void;
  setGameState: (gameState: GameRunState) => void;
  registerGameOver: (finalScore: number, finalCombo: number) => void;
  resetRun: () => void;
  buyUpgrade: (key: UpgradeKey) => boolean;
  getProgressionEffects: () => ProgressionEffects;
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      score: 0,
      combo: 0,
      health: MAX_HEALTH,
      gameState: "running",
      highScore: 0,
      credits: 0,
      totalRuns: 0,
      bestCombo: 0,
      lastRunCredits: 0,
      upgrades: DEFAULT_UPGRADES,
      setScore: (score) => set({ score }),
      setCombo: (combo) => set({ combo }),
      setHealth: (health) => set({ health }),
      setGameState: (gameState) => set({ gameState }),
      registerGameOver: (finalScore, finalCombo) => {
        const currencyEarned = calculateRunCurrency(finalScore, finalCombo);
        set({
          gameState: "gameOver",
          highScore: Math.max(get().highScore, finalScore),
          bestCombo: Math.max(get().bestCombo, finalCombo),
          credits: get().credits + currencyEarned,
          totalRuns: get().totalRuns + 1,
          lastRunCredits: currencyEarned,
        });
      },
      resetRun: () =>
        set({
          score: 0,
          combo: 0,
          health: getUpgradeEffects(get().upgrades).maxHealth,
          gameState: "running",
          lastRunCredits: 0,
        }),
      buyUpgrade: (key) => {
        const { credits, upgrades } = get();
        const level = upgrades[key];
        const cost = getUpgradeCost(key, level);
        if (cost === null || credits < cost) {
          return false;
        }

        set({
          credits: credits - cost,
          upgrades: {
            ...upgrades,
            [key]: level + 1,
          },
        });

        return true;
      },
      getProgressionEffects: () => getUpgradeEffects(get().upgrades),
    }),
    {
      name: "novaburst-progression",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        highScore: state.highScore,
        credits: state.credits,
        totalRuns: state.totalRuns,
        bestCombo: state.bestCombo,
        upgrades: state.upgrades,
      }),
    },
  ),
);
