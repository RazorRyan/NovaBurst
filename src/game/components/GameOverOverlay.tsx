import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { cosmicPalette } from "../utils/palette";

const RETRY_HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 } as const;
const RETRY_PRESS_RETENTION = { top: 18, bottom: 18, left: 18, right: 18 } as const;

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

        <Pressable
          style={styles.button}
          onPress={onRestart}
          hitSlop={RETRY_HIT_SLOP}
          pressRetentionOffset={RETRY_PRESS_RETENTION}
        >
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
    maxWidth: 340,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: "rgba(8, 12, 28, 0.95)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    alignItems: "center",
    gap: 12,
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
    marginTop: 12,
    minWidth: 220,
    borderRadius: 999,
    minHeight: 56,
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: cosmicPalette.core,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonText: {
    color: "#041220",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
});
