import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Pantalla no encontrada" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Esta pantalla no existe</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Ve a la pantalla de inicio</ThemedText>
        </Link>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

