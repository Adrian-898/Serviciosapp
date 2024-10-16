import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import useUsers from "@/api/users";

const Usuario = () => {
  const barHeight = StatusBar.currentHeight;
  const user = useUsers();

  if (user.status === "pending") return <Text>Cargando...</Text>;

  if (user.error)
    return <Text>Ha ocurrido un error: {user.error.message}</Text>;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: barHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.header}>{user.data.full_name}</Text>
      <Text>{user.data.description}</Text>
      <Text style={{ fontWeight: "bold", padding: 10 }}>
        Suscriptores: {user.data.subscribers_count}
      </Text>
      <Text style={{ fontWeight: "bold", padding: 10 }}>
        Estrellas: {user.data.stargazers_count}
      </Text>
      <Text style={{ fontWeight: "bold", padding: 10 }}>
        Forks: {user.data.forks_count}
      </Text>
      <Text style={{ fontWeight: "bold", padding: 10, marginTop: 20 }}>
        {user.isFetching ? "Actualizando..." : ""}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    padding: 5,
    marginBottom: 20,
  },
});

export default Usuario;
