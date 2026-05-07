import { create } from "zustand";

import { MAX_HEALTH } from "../systems/gameConstants";
import { GameRunState } from "../types/game";

type GameStoreState = {
  score: number;
  combo: number;
  health: number;
  gameState: GameRunState;
  highScore: number;
  setScore: (score: number) => void;
  setCombo: (combo: number) => void;
  setHealth: (health: number) => void;
  setGameState: (gameState: GameRunState) => void;
  registerGameOver: (finalScore: number) => void;
  resetRun: () => void;
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  score: 0,
  combo: 0,
  health: MAX_HEALTH,
  gameState: "running",
  highScore: 0,
  setScore: (score) => set({ score }),
  setCombo: (combo) => set({ combo }),
  setHealth: (health) => set({ health }),
  setGameState: (gameState) => set({ gameState }),
  registerGameOver: (finalScore) =>
    set({
      gameState: "gameOver",
      highScore: Math.max(get().highScore, finalScore),
    }),
  resetRun: () =>
    set({
      score: 0,
      combo: 0,
      health: MAX_HEALTH,
      gameState: "running",
    }),
}));
