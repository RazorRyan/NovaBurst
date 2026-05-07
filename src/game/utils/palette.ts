import { ColorIndex } from "../types/game";

export const cosmicPalette = {
  background: "#040716",
  nebulaA: "#0d1838",
  nebulaB: "#1d0f34",
  text: "#f3f7ff",
  textDim: "#96aad8",
  surface: "rgba(10, 16, 37, 0.85)",
  border: "rgba(118, 154, 255, 0.2)",
  danger: "#ff6f7d",
  core: "#9efcff",
} as const;

export const energyColors: Record<ColorIndex, string> = {
  0: "#59f6ff",
  1: "#ff7efb",
  2: "#ffe96b",
};
