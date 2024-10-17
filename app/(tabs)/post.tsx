import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import useUsers from "@/hooks/api/users";

const Usuario = () => {
  const barHeight = StatusBar.currentHeight;
  const { status, error, data, isFetching } = useUsers();

  if (status === "pending") return <Text>Cargando...</Text>;

  if (error) return <Text>Ha ocurrido un error: {error.message}</Text>;

  const fullName = data?.full_name || "Nombre no disponible";
  const description = data?.description || "Descripción no disponible";
  const subscribersCount = data?.subscribers_count || 0;
  const stargazersCount = data?.stargazers_count || 0;
  const forksCount = data?.forks_count || 0;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: barHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.header}>{fullName}</Text>
      <Text>{description}</Text>
      <Text style={styles.title}>Suscriptores: {subscribersCount}</Text>
      <Text style={styles.title}>Estrellas: {stargazersCount}</Text>
      <Text style={styles.title}>Forks: {forksCount}</Text>
      {isFetching && <Text style={styles.fetching}>"Actualizando..."</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    padding: 5,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    padding: 10,
  },
  fetching: {
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
  },
});

export default Usuario;
