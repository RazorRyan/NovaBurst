import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { RenderSnapshot } from "../types/game";
import { pointOnCircle } from "../utils/math";
import { cosmicPalette, energyColors } from "../utils/palette";

type GameCanvasWebProps = {
  snapshot: RenderSnapshot;
};

function GameCanvasWebComponent({ snapshot }: GameCanvasWebProps) {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.nebula,
          {
            width: snapshot.width * 1.2,
            height: snapshot.width * 1.2,
            left: snapshot.center.x - (snapshot.width * 1.2) / 2,
            top: snapshot.center.y - (snapshot.width * 1.2) / 2,
          },
        ]}
      />

      {snapshot.stars.map((star) => (
        <View
          key={star.id}
          style={[
            styles.star,
            {
              width: star.radius * 2,
              height: star.radius * 2,
              borderRadius: star.radius,
              left: star.x - star.radius,
              top: star.y - star.radius,
              opacity: star.alpha,
            },
          ]}
        />
      ))}

      {[0.45, 0.7, 0.95].map((ratio, index) => (
        <View
          key={ratio}
          style={[
            styles.orbitRing,
            {
              width: snapshot.shieldRadius * (2.5 + ratio) + ((snapshot.elapsedMs * 0.01 * (index + 1)) % 18),
              height: snapshot.shieldRadius * (2.5 + ratio) + ((snapshot.elapsedMs * 0.01 * (index + 1)) % 18),
              borderRadius:
                (snapshot.shieldRadius * (2.5 + ratio) + ((snapshot.elapsedMs * 0.01 * (index + 1)) % 18)) / 2,
              left:
                snapshot.center.x -
                (snapshot.shieldRadius * (2.5 + ratio) + ((snapshot.elapsedMs * 0.01 * (index + 1)) % 18)) / 2,
              top:
                snapshot.center.y -
                (snapshot.shieldRadius * (2.5 + ratio) + ((snapshot.elapsedMs * 0.01 * (index + 1)) % 18)) / 2,
            },
          ]}
        />
      ))}

      <View
        style={[
          styles.coreGlow,
          {
            width: snapshot.coreRadius * 5.6,
            height: snapshot.coreRadius * 5.6,
            borderRadius: snapshot.coreRadius * 2.8,
            left: snapshot.center.x - snapshot.coreRadius * 2.8,
            top: snapshot.center.y - snapshot.coreRadius * 2.8,
          },
        ]}
      />

      <View
        style={[
          styles.core,
          {
            width: snapshot.coreRadius * 2,
            height: snapshot.coreRadius * 2,
            borderRadius: snapshot.coreRadius,
            left: snapshot.center.x - snapshot.coreRadius,
            top: snapshot.center.y - snapshot.coreRadius,
          },
        ]}
      >
        <View style={styles.coreHighlight} />
      </View>

      <View
        style={[
          styles.shieldGuide,
          {
            width: snapshot.shieldRadius * 2,
            height: snapshot.shieldRadius * 2,
            borderRadius: snapshot.shieldRadius,
            left: snapshot.center.x - snapshot.shieldRadius,
            top: snapshot.center.y - snapshot.shieldRadius,
          },
        ]}
      />

      {snapshot.shieldSegments.map((segment) => {
        const segmentAngle = segment.startAngle + segment.sweepAngle / 2;
        const point = pointOnCircle(snapshot.center, snapshot.shieldRadius, segmentAngle);
        const width = snapshot.shieldRadius * 0.68;
        const height = snapshot.shieldThickness * 1.45;

        return (
          <View
            key={`${segment.colorIndex}-${segment.startAngle}`}
            style={[
              styles.segmentGlow,
              {
                width: width + 16,
                height: height + 12,
                borderRadius: snapshot.shieldThickness * 2,
                left: point.x - (width + 16) / 2,
                top: point.y - (height + 12) / 2,
                backgroundColor: energyColors[segment.colorIndex],
                transform: [{ rotate: `${(segmentAngle * 180) / Math.PI}deg` }],
              },
            ]}
          >
            <View
              style={[
                styles.segmentCore,
                {
                  width,
                  height,
                  borderRadius: snapshot.shieldThickness,
                  backgroundColor: energyColors[segment.colorIndex],
                },
              ]}
            />
          </View>
        );
      })}

      {snapshot.incomingObjects.map((object) => (
        <View key={object.id}>
          <View
            style={[
              styles.trail,
              {
                width: Math.max(8, Math.hypot(object.x - object.previousX, object.y - object.previousY)),
                height: Math.max(2, object.radius * 0.4),
                left: object.previousX,
                top: object.previousY,
                backgroundColor: energyColors[object.colorIndex],
                transform: [
                  {
                    rotate: `${(Math.atan2(object.y - object.previousY, object.x - object.previousX) * 180) / Math.PI}deg`,
                  },
                ],
              },
            ]}
          />
          <View
            style={[
              styles.objectGlow,
              {
                width: object.radius * 4.4,
                height: object.radius * 4.4,
                borderRadius: object.radius * 2.2,
                left: object.x - object.radius * 2.2,
                top: object.y - object.radius * 2.2,
                backgroundColor: energyColors[object.colorIndex],
              },
            ]}
          >
            <View
              style={[
                styles.objectCore,
                {
                  width: object.radius * 2,
                  height: object.radius * 2,
                  borderRadius: object.radius,
                  backgroundColor: energyColors[object.colorIndex],
                },
              ]}
            >
              <View style={styles.objectHighlight} />
            </View>
          </View>
        </View>
      ))}

      {snapshot.particles.map((particle) => {
        const alpha = particle.life / particle.maxLife;
        const radius = particle.radius * Math.max(alpha, 0.2);
        return (
          <View
            key={particle.id}
            style={[
              styles.particle,
              {
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                left: particle.x - radius,
                top: particle.y - radius,
                backgroundColor: energyColors[particle.colorIndex],
                opacity: alpha,
              },
            ]}
          />
        );
      })}

      {snapshot.shockwaves.map((wave) => {
        const alpha = wave.life / wave.maxLife;
        return (
          <View
            key={wave.id}
            style={[
              styles.shockwave,
              {
                width: wave.radius * 2,
                height: wave.radius * 2,
                borderRadius: wave.radius,
                left: wave.x - wave.radius,
                top: wave.y - wave.radius,
                borderColor: energyColors[wave.colorIndex],
                opacity: alpha * 0.65,
              },
            ]}
          />
        );
      })}

      {snapshot.comboPulse > 0 ? (
        <View
          pointerEvents="none"
          style={[
            styles.comboWash,
            { opacity: snapshot.comboPulse * 0.32 },
          ]}
        />
      ) : null}
      {snapshot.damageFlash > 0 ? (
        <View
          pointerEvents="none"
          style={[
            styles.damageWash,
            { opacity: snapshot.damageFlash * 0.26 },
          ]}
        />
      ) : null}
    </View>
  );
}

export const GameCanvasWeb = memo(GameCanvasWebComponent);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: cosmicPalette.background,
    overflow: "hidden",
  },
  nebula: {
    position: "absolute",
    borderRadius: 9999,
    backgroundColor: "rgba(92, 46, 180, 0.18)",
    shadowColor: "#5de8ff",
    shadowOpacity: 0.18,
    shadowRadius: 80,
  },
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  coreGlow: {
    position: "absolute",
    backgroundColor: "rgba(89, 246, 255, 0.18)",
    shadowColor: cosmicPalette.core,
    shadowOpacity: 0.55,
    shadowRadius: 50,
  },
  core: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cosmicPalette.core,
    shadowColor: cosmicPalette.core,
    shadowOpacity: 0.6,
    shadowRadius: 24,
  },
  coreHighlight: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    transform: [{ translateX: -5 }, { translateY: -6 }],
  },
  shieldGuide: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  orbitRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: cosmicPalette.ring,
  },
  segmentGlow: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.92,
    shadowOpacity: 0.5,
    shadowRadius: 18,
  },
  segmentCore: {
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  objectGlow: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.92,
    shadowOpacity: 0.45,
    shadowRadius: 18,
  },
  objectCore: {
    alignItems: "center",
    justifyContent: "center",
  },
  trail: {
    position: "absolute",
    opacity: 0.45,
  },
  objectHighlight: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    transform: [{ translateX: -2 }, { translateY: -2 }],
  },
  particle: {
    position: "absolute",
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  shockwave: {
    position: "absolute",
    borderWidth: 3,
  },
  comboWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(89,246,255,0.18)",
  },
  damageWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,95,116,0.28)",
  },
});
