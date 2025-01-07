import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

const Multas = () => {
  const colorScheme = useColorScheme();
  // cedula ingresada por el usuario
  const [cedula, setCedula] = useState<string>("");

  // navegacion con expo-router
  const router = useRouter();

  // Handle form submission
  const handleForm = () => {
    router.push({
      pathname: "/PagarMultas",
      params: { cedula },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Consultar Multas</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle" style={styles.label}>
          Ingresa tu cédula de identidad (sin letras ni separadores de cifras)
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 25345678"
          placeholderTextColor={colorScheme === "dark" ? "#555" : "#333"}
          keyboardType="numeric"
          value={cedula}
          onChangeText={(text) => setCedula(text)}
        />
      </ThemedView>

      <TouchableOpacity style={styles.button} onPress={() => handleForm()}>
        <ThemedText type="subtitle" style={styles.buttonText}>
          Buscar
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
    borderColor: "#555",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    elevation: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#001f7e",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Multas;
