export const setupNotes = {
  packages: [
    "@shopify/react-native-skia",
    "react-native-reanimated",
    "zustand",
    "react-native-mmkv",
    "expo-haptics",
    "expo-av",
  ],
  structure: [
    "src/game/components for gameplay visuals and overlays",
    "src/game/systems for loop logic and collisions",
    "src/game/state for lightweight shared state",
    "src/game/hooks for gameplay lifecycle helpers",
    "src/game/utils and src/game/types for helpers and contracts",
    "src/screens for app-level screens without premature navigation",
  ],
} as const;
