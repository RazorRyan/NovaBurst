import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { cosmicPalette } from "../utils/palette";

const PAUSE_HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 } as const;
const PAUSE_PRESS_RETENTION = { top: 16, bottom: 16, left: 16, right: 16 } as const;

type HUDProps = {
  score: number;
  combo: number;
  health: number;
  highScore: number;
  paused: boolean;
  testInvincible: boolean;
  showDebugControls?: boolean;
  onToggleTestInvincible?: () => void;
  onTogglePause: () => void;
};

function HUDComponent({
  score,
  combo,
  health,
  highScore,
  paused,
  testInvincible,
  showDebugControls = false,
  onToggleTestInvincible,
  onTogglePause,
}: HUDProps) {
  return (
    <View pointerEvents="box-none" style={styles.root}>
      <View style={styles.topRow}>
        <View style={styles.pill}>
          <Text style={styles.label}>Best</Text>
          <Text style={styles.value}>{highScore}</Text>
        </View>
        <View style={styles.centerPill}>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.combo}>{combo > 1 ? `${combo}x combo` : "Stay sharp"}</Text>
        </View>
        <Pressable
          style={styles.pauseButton}
          onPress={onTogglePause}
          hitSlop={PAUSE_HIT_SLOP}
          pressRetentionOffset={PAUSE_PRESS_RETENTION}
        >
          <Text style={styles.pauseText}>{paused ? "Resume" : "Pause"}</Text>
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.healthPill}>
          <Text style={styles.healthText}>
            {testInvincible ? "Lives INF" : `Lives ${health}`}
          </Text>
        </View>
        <View style={styles.tipPill}>
          <Text style={styles.tipText}>
            {testInvincible
              ? "TEST INVINCIBLE ON - Tap anywhere or press Space to switch color"
              : "Tap anywhere or press Space to switch color"}
          </Text>
        </View>
      </View>

      {showDebugControls ? (
        <View style={styles.debugRow}>
          <Pressable
            style={[
              styles.debugButton,
              testInvincible ? styles.debugButtonActive : styles.debugButtonInactive,
            ]}
            onPress={onToggleTestInvincible}
            hitSlop={PAUSE_HIT_SLOP}
            pressRetentionOffset={PAUSE_PRESS_RETENTION}
          >
            <Text style={styles.debugButtonText}>
              {testInvincible ? "Invincible: ON" : "Invincible: OFF"}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export const HUD = memo(HUDComponent);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingTop: 14,
    gap: 14,
  },
  topRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  pill: {
    minWidth: 92,
    minHeight: 60,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    justifyContent: "center",
  },
  centerPill: {
    flex: 1,
    alignItems: "center",
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    justifyContent: "center",
  },
  label: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  value: {
    color: cosmicPalette.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  score: {
    color: cosmicPalette.text,
    fontSize: 34,
    fontWeight: "900",
  },
  combo: {
    color: cosmicPalette.core,
    fontSize: 13,
    fontWeight: "700",
  },
  pauseButton: {
    minWidth: 104,
    minHeight: 60,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    justifyContent: "center",
  },
  pauseText: {
    color: cosmicPalette.text,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
  },
  bottomRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  debugRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  debugButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  debugButtonActive: {
    backgroundColor: "rgba(88, 255, 188, 0.18)",
    borderColor: "rgba(88, 255, 188, 0.4)",
  },
  debugButtonInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: cosmicPalette.border,
  },
  debugButtonText: {
    color: cosmicPalette.text,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  healthPill: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(7, 12, 28, 0.74)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    justifyContent: "center",
  },
  healthText: {
    color: cosmicPalette.text,
    fontSize: 13,
    fontWeight: "800",
  },
  tipPill: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(7, 12, 28, 0.74)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    justifyContent: "center",
  },
  tipText: {
    color: cosmicPalette.textDim,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});
