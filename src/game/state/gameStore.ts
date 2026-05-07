import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GAME_CONFIG } from "../utils/difficulty";
import { GameRunState } from "../types";

type GameStoreState = {
  score: number;
  combo: number;
  health: number;
  highScore: number;
  bestCombo: number;
  totalRuns: number;
  gameState: GameRunState;
  setScore: (score: number) => void;
  setCombo: (combo: number) => void;
  setHealth: (health: number) => void;
  setGameState: (gameState: GameRunState) => void;
  registerGameOver: (finalScore: number, finalCombo: number) => void;
  resetRun: () => void;
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      score: 0,
      combo: 0,
      health: GAME_CONFIG.lives,
      highScore: 0,
      bestCombo: 0,
      totalRuns: 0,
      gameState: "running",
      setScore: (score) => set({ score }),
      setCombo: (combo) => set({ combo }),
      setHealth: (health) => set({ health }),
      setGameState: (gameState) => set({ gameState }),
      registerGameOver: (finalScore, finalCombo) =>
        set({
          gameState: "gameOver",
          highScore: Math.max(get().highScore, finalScore),
          bestCombo: Math.max(get().bestCombo, finalCombo),
          totalRuns: get().totalRuns + 1,
        }),
      resetRun: () =>
        set({
          score: 0,
          combo: 0,
          health: GAME_CONFIG.lives,
          gameState: "running",
        }),
    }),
    {
      name: "novaburst-hypercasual-meta",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        highScore: state.highScore,
        bestCombo: state.bestCombo,
        totalRuns: state.totalRuns,
      }),
    },
  ),
);
