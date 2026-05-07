import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { setupNotes } from "./src/screens/setupNotes";
import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>NovaBurst</Text>
          <Text style={styles.title}>Project foundation ready</Text>
          <Text style={styles.body}>
            Expo and TypeScript scaffolding are in place for the next gameplay
            prompt. This screen is intentionally minimal and avoids adding any
            gameplay systems during setup.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Next core packages</Text>
          {setupNotes.packages.map((pkg) => (
            <Text key={pkg} style={styles.listItem}>
              {`\u2022 ${pkg}`}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Project structure</Text>
          {setupNotes.structure.map((item) => (
            <Text key={item} style={styles.listItem}>
              {`\u2022 ${item}`}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: colors.background,
    gap: 20,
  },
  hero: {
    gap: 10,
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kicker: {
    color: colors.cyan,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  body: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    gap: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  listItem: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
