import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { cosmicPalette } from "../utils/palette";

type GameOverOverlayProps = {
  visible: boolean;
  score: number;
  highScore: number;
  combo: number;
  onRestart: () => void;
};

function GameOverOverlayComponent({
  visible,
  score,
  highScore,
  combo,
  onRestart,
}: GameOverOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.backdrop}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Core breached</Text>
        <Text style={styles.title}>Run over</Text>
        <Text style={styles.score}>Final score: {score}</Text>
        <Text style={styles.best}>High score: {highScore}</Text>
        <Text style={styles.combo}>Peak combo: {combo}</Text>

        <Pressable style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const GameOverOverlay = memo(GameOverOverlayComponent);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(2, 5, 14, 0.76)",
    padding: 24,
  },
  panel: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: "rgba(8, 12, 28, 0.95)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    alignItems: "center",
    gap: 10,
  },
  kicker: {
    color: cosmicPalette.danger,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    color: cosmicPalette.text,
    fontSize: 30,
    fontWeight: "900",
  },
  score: {
    color: cosmicPalette.text,
    fontSize: 20,
    fontWeight: "700",
  },
  best: {
    color: cosmicPalette.textDim,
    fontSize: 15,
    fontWeight: "600",
  },
  combo: {
    color: cosmicPalette.core,
    fontSize: 14,
    fontWeight: "700",
  },
  button: {
    marginTop: 8,
    minWidth: 180,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: cosmicPalette.core,
  },
  buttonText: {
    color: "#041220",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});
