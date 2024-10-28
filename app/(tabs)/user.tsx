import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import { StatusBar } from "react-native";
import { useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const Usuario = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemedView
      style={colorScheme === "light" ? styles.container : styles.containerDark}
    >
      <ThemedText type="title" style={styles.header}>
        Usuario
      </ThemedText>
      <TouchableOpacity
        style={colorScheme === "light" ? styles.option : styles.optionDark}
      >
        <Icon name="person" size={24} color="#0caf50" />
        <Text style={styles.optionText}>Cuenta</Text>
        <Icon
          name="arrow-forward"
          size={24}
          color="black"
          style={styles.optionIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={colorScheme === "light" ? styles.option : styles.optionDark}
      >
        <Icon name="information-circle" size={24} color="#001f7e" />
        <Text style={styles.optionText}>Sobre nosotros</Text>
        <Icon
          name="arrow-forward"
          size={24}
          color="black"
          style={styles.optionIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={colorScheme === "light" ? styles.option : styles.optionDark}
        onPress={() => {
          router.navigate("/");
        }}
      >
        <Icon name="log-out" size={24} color="#d00b27" />
        <Text style={styles.optionText}>Cerrar sesión</Text>
        <Icon
          name="arrow-forward"
          size={24}
          color="black"
          style={styles.optionIcon}
        />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight,
  },
  containerDark: {
    backgroundColor: "#333",
    flex: 1,
    padding: StatusBar.currentHeight,
  },
  header: {
    fontSize: 32,
    marginVertical: 20,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 15,
    elevation: 2,
  },
  optionDark: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#999",
    marginBottom: 15,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "black",
  },
  optionIcon: {
    marginLeft: "auto",
  },
});
