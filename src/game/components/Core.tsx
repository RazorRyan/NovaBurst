import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { ShieldColorKey } from "../types";
import { cosmicPalette } from "../utils/palette";
import { shieldColorMap } from "../utils/palette";

type CoreProps = {
  size: number;
  x: number;
  y: number;
  invinciblePulse: number;
  activeColor: ShieldColorKey;
  switchFlash: number;
};

function CoreComponent({ size, x, y, invinciblePulse, activeColor, switchFlash }: CoreProps) {
  const color = shieldColorMap[activeColor];

  return (
    <>
      <View
        style={[
          styles.glow,
          {
            width: size * 4,
            height: size * 4,
            borderRadius: size * 2,
            left: x - size * 2,
            top: y - size * 2,
            opacity: 0.28 + invinciblePulse * 0.2 + switchFlash * 0.16,
            backgroundColor: color,
            shadowColor: color,
          },
        ]}
      />
      {switchFlash > 0 ? (
        <View
          style={[
            styles.switchHalo,
            {
              width: size * 3.2 + switchFlash * 16,
              height: size * 3.2 + switchFlash * 16,
              borderRadius: (size * 3.2 + switchFlash * 16) / 2,
              left: x - (size * 3.2 + switchFlash * 16) / 2,
              top: y - (size * 3.2 + switchFlash * 16) / 2,
              borderColor: color,
              opacity: switchFlash * 0.3,
              transform: [{ scale: 1 + switchFlash * 0.08 }],
            },
          ]}
        />
      ) : null}
      <View
        style={[
          styles.core,
          {
            width: size * 2,
            height: size * 2,
            borderRadius: size,
            left: x - size,
            top: y - size,
            borderColor: invinciblePulse > 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
            transform: [{ scale: 1 + switchFlash * 0.05 }],
            shadowColor: color,
          },
        ]}
      >
        <View style={styles.highlight} />
      </View>
    </>
  );
}

export const Core = memo(CoreComponent);

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    shadowColor: cosmicPalette.core,
    shadowOpacity: 0.65,
    shadowRadius: 36,
  },
  switchHalo: {
    position: "absolute",
    borderWidth: 2,
    shadowOpacity: 0.22,
    shadowRadius: 12,
  },
  core: {
    position: "absolute",
    backgroundColor: cosmicPalette.core,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: cosmicPalette.core,
    shadowOpacity: 0.65,
    shadowRadius: 20,
  },
  highlight: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.92)",
    transform: [{ translateX: -6 }, { translateY: -7 }],
  },
});
