import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { GameCanvas } from "../game/components/GameCanvas";
import { GameHud } from "../game/components/GameHud";
import { GameOverOverlay } from "../game/components/GameOverOverlay";
import { useNovaBurstGame } from "../game/hooks/useNovaBurstGame";
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
    restart,
    shakeX,
    shakeY,
  } = useNovaBurstGame();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { translateY: shakeY.value },
    ],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.stage, animatedStyle]}>
        <GameCanvas snapshot={snapshot} />

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

        <View style={styles.touchLayer}>
          <Pressable style={styles.touchHalf} onPress={rotateLeft} />
          <Pressable style={styles.touchHalf} onPress={rotateRight} />
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
});
