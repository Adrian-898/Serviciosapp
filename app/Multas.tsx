import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

const Multas = () => {
  const [cedula, setCedula] = useState<string>("");
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
        <ThemedText style={styles.title}>Consultar Multas</ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <ThemedText style={styles.label}>
          Ingresa tu cédula de identidad (sin letras ni separadores de cifras)
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 25345678"
          keyboardType="numeric"
          value={cedula}
          onChangeText={(text) => setCedula(text)}
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleForm()}>
          <ThemedText type="subtitle" style={styles.buttonText}>
            Buscar
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginVertical: 5,
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
