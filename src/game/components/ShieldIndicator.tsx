import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ShieldColorKey } from "../types";
import { shieldColorMap, shieldLabels } from "../utils/palette";

type ShieldIndicatorProps = {
  colorKey: ShieldColorKey;
  radius: number;
  x: number;
  y: number;
  pulse: number;
};

function ShieldIndicatorComponent({
  colorKey,
  radius,
  x,
  y,
  pulse,
}: ShieldIndicatorProps) {
  const color = shieldColorMap[colorKey];
  const size = radius * 2;

  return (
    <>
      <View
        style={[
          styles.outerGlow,
          {
            width: size + 28 + pulse * 12,
            height: size + 28 + pulse * 12,
            borderRadius: (size + 28 + pulse * 12) / 2,
            left: x - (size + 28 + pulse * 12) / 2,
            top: y - (size + 28 + pulse * 12) / 2,
            backgroundColor: color,
            opacity: 0.12 + pulse * 0.14,
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: radius,
            left: x - radius,
            top: y - radius,
            borderColor: color,
            shadowColor: color,
            transform: [{ scale: 1 + pulse * 0.045 }],
          },
        ]}
      />
      <View
        style={[
          styles.labelPill,
          {
            left: x - 42,
            top: y + radius + 18,
            borderColor: color,
          },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.label}>{shieldLabels[colorKey]}</Text>
      </View>
    </>
  );
}

export const ShieldIndicator = memo(ShieldIndicatorComponent);

const styles = StyleSheet.create({
  outerGlow: {
    position: "absolute",
    shadowOpacity: 0.4,
    shadowRadius: 28,
  },
  ring: {
    position: "absolute",
    borderWidth: 10,
    shadowOpacity: 0.55,
    shadowRadius: 20,
  },
  labelPill: {
    position: "absolute",
    width: 84,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(6, 10, 24, 0.72)",
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  label: {
    color: "#f3f7ff",
    fontSize: 12,
    fontWeight: "800",
  },
});
