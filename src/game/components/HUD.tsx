import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { cosmicPalette } from "../utils/palette";

type HUDProps = {
  score: number;
  combo: number;
  health: number;
  highScore: number;
  paused: boolean;
  onTogglePause: () => void;
};

function HUDComponent({
  score,
  combo,
  health,
  highScore,
  paused,
  onTogglePause,
}: HUDProps) {
  return (
    <View pointerEvents="box-none" style={styles.root}>
      <View style={styles.topRow}>
        <View style={styles.pill}>
          <Text style={styles.label}>Best</Text>
          <Text style={styles.value}>{highScore}</Text>
        </View>
        <View style={styles.centerPill}>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.combo}>{combo > 1 ? `${combo}x combo` : "Stay sharp"}</Text>
        </View>
        <Pressable style={styles.pauseButton} onPress={onTogglePause}>
          <Text style={styles.pauseText}>{paused ? "Resume" : "Pause"}</Text>
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.healthPill}>
          <Text style={styles.healthText}>Lives {health}</Text>
        </View>
        <View style={styles.tipPill}>
          <Text style={styles.tipText}>Tap anywhere or press Space to switch color</Text>
        </View>
      </View>
    </View>
  );
}

export const HUD = memo(HUDComponent);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  pill: {
    minWidth: 82,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  centerPill: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  label: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  value: {
    color: cosmicPalette.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  score: {
    color: cosmicPalette.text,
    fontSize: 34,
    fontWeight: "900",
  },
  combo: {
    color: cosmicPalette.core,
    fontSize: 13,
    fontWeight: "700",
  },
  pauseButton: {
    minWidth: 82,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  pauseText: {
    color: cosmicPalette.text,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
  },
  bottomRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  healthPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(7, 12, 28, 0.74)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  healthText: {
    color: cosmicPalette.text,
    fontSize: 12,
    fontWeight: "800",
  },
  tipPill: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(7, 12, 28, 0.74)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  tipText: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
