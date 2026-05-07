import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { cosmicPalette } from "../utils/palette";

type CoreProps = {
  size: number;
  x: number;
  y: number;
  invinciblePulse: number;
};

function CoreComponent({ size, x, y, invinciblePulse }: CoreProps) {
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
            opacity: 0.35 + invinciblePulse * 0.25,
          },
        ]}
      />
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
    backgroundColor: "rgba(94, 244, 255, 0.16)",
    shadowColor: cosmicPalette.core,
    shadowOpacity: 0.65,
    shadowRadius: 36,
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
