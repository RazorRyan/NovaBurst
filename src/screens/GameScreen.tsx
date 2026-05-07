import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { GameCanvas } from "../game/components/GameCanvas";
import { GameCanvasWeb } from "../game/components/GameCanvasWeb";
import { GameHud } from "../game/components/GameHud";
import { GameOverOverlay } from "../game/components/GameOverOverlay";
import { useNovaBurstGame } from "../game/hooks/useNovaBurstGame";
import { useTouchControls } from "../game/hooks/useTouchControls";
import { cosmicPalette } from "../game/utils/palette";

export function GameScreen() {
  const {
    snapshot,
    score,
    combo,
    health,
    highScore,
    gameState,
    rotateLeft,
    rotateRight,
    setInputDirection,
    restart,
    shakeX,
    shakeY,
    leftPress,
    rightPress,
  } = useNovaBurstGame();

  const controls = useTouchControls({
    onTapLeft: rotateLeft,
    onTapRight: rotateRight,
    onDirectionChange: setInputDirection,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { translateY: shakeY.value },
    ],
  }));

  const leftGlowStyle = useAnimatedStyle(() => ({
    opacity: 0.08 + leftPress.value * 0.28,
    transform: [{ scale: 0.98 + leftPress.value * 0.02 }],
  }));

  const rightGlowStyle = useAnimatedStyle(() => ({
    opacity: 0.08 + rightPress.value * 0.28,
    transform: [{ scale: 0.98 + rightPress.value * 0.02 }],
  }));

  const dangerOpacity = 1 - health / 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.stage, animatedStyle]}>
        {Platform.OS === "web" ? (
          <GameCanvasWeb snapshot={snapshot} />
        ) : (
          <GameCanvas snapshot={snapshot} />
        )}

        <GameHud
          score={score}
          combo={combo}
          health={health}
          highScore={highScore}
        />

        <View style={styles.controlHints} pointerEvents="none">
          <Text style={styles.hintText}>Tap left to rotate counterclockwise</Text>
          <Text style={styles.hintText}>Tap right to rotate clockwise</Text>
        </View>

        {dangerOpacity > 0 ? (
          <View
            pointerEvents="none"
            style={[styles.dangerVignette, { opacity: dangerOpacity * 0.45 }]}
          />
        ) : null}

        <View style={styles.touchLayer}>
          <Pressable
            style={styles.touchHalf}
            onPressIn={controls.pressLeftIn}
            onPressOut={controls.releaseLeft}
          >
            <Animated.View style={[styles.touchGlow, styles.leftGlow, leftGlowStyle]} />
            <View pointerEvents="none" style={styles.touchLabelWrap}>
              <Text style={styles.touchTitle}>Left Arc</Text>
              <Text style={styles.touchLabel}>Tap or hold</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.touchHalf}
            onPressIn={controls.pressRightIn}
            onPressOut={controls.releaseRight}
          >
            <Animated.View style={[styles.touchGlow, styles.rightGlow, rightGlowStyle]} />
            <View pointerEvents="none" style={[styles.touchLabelWrap, styles.touchLabelRight]}>
              <Text style={styles.touchTitle}>Right Arc</Text>
              <Text style={styles.touchLabel}>Tap or hold</Text>
            </View>
          </Pressable>
        </View>

        <GameOverOverlay
          visible={gameState === "gameOver"}
          score={score}
          highScore={highScore}
          onRestart={restart}
        />
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
  touchLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  touchHalf: {
    flex: 1,
    justifyContent: "flex-end",
  },
  controlHints: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  hintText: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(6, 10, 24, 0.58)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  touchGlow: {
    position: "absolute",
    top: "18%",
    bottom: "10%",
    width: "84%",
    borderRadius: 999,
  },
  leftGlow: {
    left: "-16%",
    backgroundColor: "rgba(89,246,255,0.16)",
  },
  rightGlow: {
    right: "-16%",
    backgroundColor: "rgba(255,126,251,0.16)",
  },
  touchLabelWrap: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 72,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "rgba(6, 10, 24, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  touchLabelRight: {
    alignSelf: "flex-end",
    marginLeft: 0,
    marginRight: 16,
  },
  touchTitle: {
    color: cosmicPalette.text,
    fontSize: 13,
    fontWeight: "700",
  },
  touchLabel: {
    color: cosmicPalette.textDim,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  dangerVignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,80,106,0.18)",
  },
});
