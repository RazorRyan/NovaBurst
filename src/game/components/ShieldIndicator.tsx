import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ShieldColorKey } from "../types";
import { shieldColorMap, shieldLabels } from "../utils/palette";

type ShieldIndicatorProps = {
  colorKey: ShieldColorKey;
  previousColorKey: ShieldColorKey;
  radius: number;
  x: number;
  y: number;
  pulse: number;
  switchFlash: number;
};

function ShieldIndicatorComponent({
  colorKey,
  previousColorKey,
  radius,
  x,
  y,
  pulse,
  switchFlash,
}: ShieldIndicatorProps) {
  const color = shieldColorMap[colorKey];
  const previousColor = shieldColorMap[previousColorKey];
  const size = radius * 2;

  return (
    <>
      {switchFlash > 0 ? (
        <View
          style={[
            styles.transitionRing,
            {
              width: size + 8 + switchFlash * 16,
              height: size + 8 + switchFlash * 16,
              borderRadius: (size + 8 + switchFlash * 16) / 2,
              left: x - (size + 8 + switchFlash * 16) / 2,
              top: y - (size + 8 + switchFlash * 16) / 2,
              borderColor: previousColor,
              opacity: switchFlash * 0.24,
              transform: [{ scale: 1 + switchFlash * 0.12 }],
            },
          ]}
        />
      ) : null}
      <View
        style={[
          styles.outerGlow,
          {
            width: size + 28 + pulse * 12 + switchFlash * 12,
            height: size + 28 + pulse * 12 + switchFlash * 12,
            borderRadius: (size + 28 + pulse * 12 + switchFlash * 12) / 2,
            left: x - (size + 28 + pulse * 12 + switchFlash * 12) / 2,
            top: y - (size + 28 + pulse * 12 + switchFlash * 12) / 2,
            backgroundColor: color,
            opacity: 0.12 + pulse * 0.14 + switchFlash * 0.1,
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
            transform: [{ scale: 1 + pulse * 0.045 + switchFlash * 0.05 }],
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
            shadowColor: color,
            shadowOpacity: 0.12 + switchFlash * 0.18,
            transform: [{ scale: 1 + switchFlash * 0.04 }],
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
  transitionRing: {
    position: "absolute",
    borderWidth: 4,
  },
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
    shadowRadius: 14,
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
