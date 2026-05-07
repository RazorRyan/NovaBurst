import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  getUpgradeCost,
  UPGRADE_DEFINITIONS,
} from "../systems/progression";
import { UpgradeKey, UpgradeLevels } from "../types/progression";
import { cosmicPalette } from "../utils/palette";

type ProgressionTrayProps = {
  credits: number;
  totalRuns: number;
  upgrades: UpgradeLevels;
  onBuyUpgrade: (key: UpgradeKey) => void;
};

function ProgressionTrayComponent({
  credits,
  totalRuns,
  upgrades,
  onBuyUpgrade,
}: ProgressionTrayProps) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Progression</Text>
          <Text style={styles.title}>Nova Credits: {credits}</Text>
        </View>
        <Text style={styles.meta}>Runs: {totalRuns}</Text>
      </View>

      <View style={styles.upgrades}>
        {UPGRADE_DEFINITIONS.map((upgrade) => {
          const level = upgrades[upgrade.key];
          const cost = getUpgradeCost(upgrade.key, level);
          const maxed = cost === null;
          const canAfford = cost !== null && credits >= cost;

          return (
            <View key={upgrade.key} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{upgrade.title}</Text>
                <Text style={styles.levelText}>
                  Lv {level}/{upgrade.maxLevel}
                </Text>
              </View>
              <Text style={styles.cardBody}>{upgrade.description}</Text>
              <Pressable
                onPress={() => onBuyUpgrade(upgrade.key)}
                disabled={!canAfford || maxed}
                style={[
                  styles.button,
                  (!canAfford || maxed) && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.buttonText}>
                  {maxed ? "Maxed" : `Upgrade ${cost}`}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export const ProgressionTray = memo(ProgressionTrayComponent);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 20,
    padding: 14,
    borderRadius: 22,
    backgroundColor: "rgba(7, 11, 25, 0.82)",
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: {
    color: cosmicPalette.textDim,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: cosmicPalette.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  meta: {
    color: cosmicPalette.core,
    fontSize: 12,
    fontWeight: "700",
  },
  upgrades: {
    gap: 10,
  },
  card: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: cosmicPalette.surface,
    borderWidth: 1,
    borderColor: cosmicPalette.border,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    color: cosmicPalette.text,
    fontSize: 15,
    fontWeight: "800",
  },
  levelText: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    fontWeight: "700",
  },
  cardBody: {
    color: cosmicPalette.textDim,
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: cosmicPalette.core,
  },
  buttonDisabled: {
    backgroundColor: "rgba(116, 135, 178, 0.24)",
  },
  buttonText: {
    color: "#03131f",
    fontSize: 12,
    fontWeight: "800",
  },
});
