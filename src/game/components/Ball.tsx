import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { BallEntity } from "../types";
import { hazardColor, shieldColorMap } from "../utils/palette";

type BallProps = {
  ball: BallEntity;
};

function BallComponent({ ball }: BallProps) {
  const color = ball.kind === "hazard" ? hazardColor : shieldColorMap[ball.colorKey];
  const trailWidth = Math.max(10, Math.hypot(ball.x - ball.previousX, ball.y - ball.previousY));
  const trailAngle = (Math.atan2(ball.y - ball.previousY, ball.x - ball.previousX) * 180) / Math.PI;

  return (
    <>
      <View
        style={[
          styles.trail,
          {
            width: trailWidth,
            left: ball.previousX,
            top: ball.previousY,
            backgroundColor: color,
            transform: [{ rotate: `${trailAngle}deg` }],
          },
        ]}
      />
      <View
        style={[
          styles.glow,
          {
            width: ball.radius * 4.2,
            height: ball.radius * 4.2,
            borderRadius: ball.radius * 2.1,
            left: ball.x - ball.radius * 2.1,
            top: ball.y - ball.radius * 2.1,
            backgroundColor: color,
          },
        ]}
      />
      <View
        style={[
          styles.body,
          {
            width: ball.radius * 2,
            height: ball.radius * 2,
            borderRadius: ball.radius,
            left: ball.x - ball.radius,
            top: ball.y - ball.radius,
            backgroundColor: color,
          },
        ]}
      >
        <View style={styles.highlight} />
      </View>
    </>
  );
}

export const Ball = memo(BallComponent);

const styles = StyleSheet.create({
  trail: {
    position: "absolute",
    height: 3,
    borderRadius: 999,
    opacity: 0.45,
  },
  glow: {
    position: "absolute",
    opacity: 0.2,
    shadowOpacity: 0.45,
    shadowRadius: 18,
  },
  body: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.45,
    shadowRadius: 14,
  },
  highlight: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    transform: [{ translateX: -2 }, { translateY: -2 }],
  },
});
