import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import useUsers from "@/hooks/api/repoData";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Usuario = () => {
  const barHeight = StatusBar.currentHeight;
  const { status, error, data, isFetching } = useUsers();

  if (status === "pending")
    return <ThemedText type="defaultSemiBold">Cargando...</ThemedText>;

  if (error)
    return (
      <ThemedText type="defaultSemiBold">
        Ha ocurrido un error: {error.message}
      </ThemedText>
    );

  const fullName = data?.full_name || "Nombre no disponible";
  const description = data?.description || "Descripción no disponible";
  const subscribersCount = data?.subscribers_count || 0;
  const stargazersCount = data?.stargazers_count || 0;
  const forksCount = data?.forks_count || 0;

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: barHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText type="title" style={styles.header}>
        {fullName}
      </ThemedText>
      <ThemedText>{description}</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Suscriptores: {subscribersCount}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Estrellas: {stargazersCount}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Forks: {forksCount}
      </ThemedText>
      {isFetching && (
        <ThemedText type="defaultSemiBold" style={styles.fetching}>
          "Actualizando..."
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    padding: 5,
    marginBottom: 20,
  },
  subtitle: {
    padding: 10,
  },
  fetching: {
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
  },
});

export default Usuario;
