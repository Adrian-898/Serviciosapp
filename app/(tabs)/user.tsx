import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@expo/vector-icons/FontAwesome";

const Usuario = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Usuario</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Icon name="user" size={24} color="#4caf50" />
          <Text style={styles.optionText}>Cuenta</Text>
          <Icon
            name="angle-right"
            size={24}
            color="#999"
            style={styles.optionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="info-circle" size={24} color="#3f51b5" />
          <Text style={styles.optionText}>Sobre nosotros</Text>
          <Icon
            name="angle-right"
            size={24}
            color="#999"
            style={styles.optionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            router.navigate("/");
          }}
        >
          <Icon name="sign-out" size={24} color="#e91e63" />
          <Text style={styles.optionText}>Cerrar sesión</Text>
          <Icon
            name="angle-right"
            size={24}
            color="#999"
            style={styles.optionIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  optionIcon: {
    marginLeft: "auto",
  },
});
