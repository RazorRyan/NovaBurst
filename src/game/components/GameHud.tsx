import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { MAX_HEALTH } from "../systems/gameConstants";
import { cosmicPalette, energyColors } from "../utils/palette";

type GameHudProps = {
  score: number;
  combo: number;
  health: number;
  highScore: number;
};

function GameHudComponent({ score, combo, health, highScore }: GameHudProps) {
  return (
    <View pointerEvents="none" style={styles.root}>
      <View style={styles.topBar}>
        <View style={styles.sideCard}>
          <Text style={styles.label}>Best</Text>
          <Text style={styles.value}>{highScore}</Text>
        </View>

        <View style={styles.centerCard}>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.combo}>
            {combo > 1 ? `${combo}x combo` : "Hold the line"}
          </Text>
        </View>

        <View style={styles.sideCard}>
          <Text style={styles.label}>Core</Text>
          <Text style={styles.value}>{health}/{MAX_HEALTH}</Text>
        </View>
      </View>

      <View style={styles.legend}>
        {Object.values(energyColors).map((color, index) => (
          <View key={color} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>Arc {index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const GameHud = memo(GameHudComponent);

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
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  sideCard: {
    minWidth: 82,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  centerCard: {
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
  legend: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(7, 12, 28, 0.72)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: cosmicPalette.textDim,
    fontSize: 11,
    fontWeight: "600",
  },
});
