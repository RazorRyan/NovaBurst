import { useCallback, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Ball } from "./components/Ball";
import { Core } from "./components/Core";
import { GameOverOverlay } from "./components/GameOverOverlay";
import { HUD } from "./components/HUD";
import { ShieldIndicator } from "./components/ShieldIndicator";
import { useGameLoop } from "./hooks/useGameLoop";
import { cosmicPalette, hazardColor, shieldColorMap } from "./utils/palette";

export function GameScreen() {
  const {
    snapshot,
    score,
    combo,
    health,
    highScore,
    bestCombo,
    totalRuns,
    gameState,
    cycleShieldColor,
    togglePause,
    restart,
    shakeX,
    shakeY,
  } = useGameLoop();

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const browserDocument = globalThis.document;
    if (!browserDocument?.addEventListener) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        cycleShieldColor();
      }
    };

    browserDocument.addEventListener("keydown", onKeyDown);
    return () => browserDocument.removeEventListener("keydown", onKeyDown);
  }, [cycleShieldColor]);

  const stageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }, { translateY: shakeY.value }],
  }));

  const handleStageTouchStart = useCallback(() => {
    if (gameState !== "running") {
      return;
    }
    cycleShieldColor();
  }, [cycleShieldColor, gameState]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.stage, stageStyle]}>
        <View style={styles.background}>
          <View style={styles.nebulaA} />
          <View style={styles.nebulaB} />
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

          {snapshot.lowHealthPulse > 0 ? (
            <View
              pointerEvents="none"
              style={[styles.lowHealthOverlay, { opacity: snapshot.lowHealthPulse }]}
            />
          ) : null}
          {snapshot.damageFlash > 0 ? (
            <View
              pointerEvents="none"
              style={[styles.damageOverlay, { opacity: snapshot.damageFlash * 0.28 }]}
            />
          ) : null}
          {snapshot.switchFlash > 0 ? (
            <View
              pointerEvents="none"
              style={[
                styles.switchOverlay,
                {
                  opacity: snapshot.switchFlash * 0.09,
                  backgroundColor: shieldColorMap[snapshot.activeColor],
                },
              ]}
            />
          ) : null}

          <Core
            size={snapshot.coreRadius}
            x={snapshot.center.x}
            y={snapshot.center.y}
            invinciblePulse={snapshot.invinciblePulse}
            activeColor={snapshot.activeColor}
            switchFlash={snapshot.switchFlash}
          />
          <ShieldIndicator
            colorKey={snapshot.activeColor}
            previousColorKey={snapshot.previousActiveColor}
            radius={snapshot.shieldRadius}
            x={snapshot.center.x}
            y={snapshot.center.y}
            pulse={snapshot.shieldPulse}
            switchFlash={snapshot.switchFlash}
          />

          {snapshot.balls.map((ball) => (
            <Ball key={ball.id} ball={ball} />
          ))}

          {snapshot.particles.map((particle) => {
            const alpha = particle.life / particle.maxLife;
            return (
              <View
                key={particle.id}
                style={[
                  styles.particle,
                  {
                    width: particle.radius * 2,
                    height: particle.radius * 2,
                    borderRadius: particle.radius,
                    left: particle.x - particle.radius,
                    top: particle.y - particle.radius,
                    opacity: alpha,
                    backgroundColor: shieldColorMap[particle.colorKey],
                  },
                ]}
              />
            );
          })}

          {snapshot.scorePopups.map((popup) => {
            const alpha = popup.life / popup.maxLife;
            return (
              <Text
                key={popup.id}
                style={[
                  styles.scorePopup,
                  {
                    left: popup.x - 24,
                    top: popup.y,
                    opacity: alpha,
                  },
                ]}
              >
                {popup.label}
              </Text>
            );
          })}
        </View>

        <View
          collapsable={false}
          style={styles.touchLayer}
          onStartShouldSetResponder={() => gameState === "running"}
          onResponderGrant={handleStageTouchStart}
          importantForAccessibility="no-hide-descendants"
        >
          <View style={styles.touchLayerFill} />
        </View>

        <HUD
          score={score}
          combo={combo}
          health={health}
          highScore={highScore}
          paused={gameState === "paused"}
          onTogglePause={togglePause}
        />

        <View pointerEvents="none" style={styles.colorGuide}>
          <Text style={styles.colorGuideText}>
            {getColorGuideText(snapshot.availableColorCount, snapshot.elapsedMs)}
          </Text>
        </View>

        <GameOverOverlay
          visible={gameState === "gameOver"}
          score={score}
          highScore={highScore}
          combo={bestCombo > combo ? bestCombo : combo}
          onRestart={restart}
        />

        {gameState === "paused" ? (
          <View style={styles.pauseOverlay}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <Text style={styles.pauseHint}>Tap the pause button to jump back in.</Text>
          </View>
        ) : null}

        <View pointerEvents="none" style={styles.legend}>
          {Object.entries(shieldColorMap).map(([key, color]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{key}</Text>
            </View>
          ))}
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: hazardColor }]} />
            <Text style={styles.legendText}>hazard</Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: cosmicPalette.background,
  },
  stage: {
    flex: 1,
    backgroundColor: cosmicPalette.background,
  },
  background: {
    flex: 1,
    backgroundColor: cosmicPalette.background,
    overflow: "hidden",
  },
  touchLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  touchLayerFill: {
    flex: 1,
  },
  nebulaA: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 999,
    left: -120,
    top: 50,
    backgroundColor: "rgba(20, 40, 96, 0.24)",
    shadowColor: "#47d9ff",
    shadowOpacity: 0.18,
    shadowRadius: 80,
  },
  nebulaB: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 999,
    right: -100,
    bottom: 80,
    backgroundColor: "rgba(96, 20, 118, 0.22)",
    shadowColor: "#ff60df",
    shadowOpacity: 0.18,
    shadowRadius: 80,
  },
  star: {
    position: "absolute",
    backgroundColor: "#fff",
  },
  particle: {
    position: "absolute",
  },
  scorePopup: {
    position: "absolute",
    color: "#fff6a8",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
  damageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 88, 88, 1)",
  },
  lowHealthOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 186, 72, 0.18)",
  },
  switchOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  colorGuide: {
    position: "absolute",
    bottom: 22,
    left: 18,
    right: 18,
    alignItems: "center",
    zIndex: 4,
  },
  colorGuideText: {
    color: cosmicPalette.textDim,
    fontSize: 13,
    fontWeight: "700",
    backgroundColor: "rgba(6, 10, 24, 0.62)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(5, 9, 20, 0.48)",
    zIndex: 5,
  },
  pauseTitle: {
    color: cosmicPalette.text,
    fontSize: 28,
    fontWeight: "900",
  },
  pauseHint: {
    color: cosmicPalette.textDim,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },
  legend: {
    position: "absolute",
    bottom: 66,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    zIndex: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(6, 10, 24, 0.52)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  legendText: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

function getColorGuideText(availableColorCount: number, elapsedMs: number) {
  if (availableColorCount === 1) {
    return "1-color warmup. Learn the rhythm before the rush builds.";
  }

  if (availableColorCount === 2) {
    return "Second color online. Stay calm and switch with intention.";
  }

  if (availableColorCount === 3) {
    return elapsedMs < 90000
      ? "The pace is building. Read the lane and switch early."
      : "Three colors active. Stay ahead of the rush.";
  }

  return "Full spectrum survival. Trust your rhythm and react fast.";
}
