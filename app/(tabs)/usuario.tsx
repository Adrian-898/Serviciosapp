import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { StatusBar } from "react-native";

const Usuario = () => {
  const barHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: barHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Pantalla Registro de Usuarios</Text>
    </SafeAreaView>
  );
};

export default Usuario;
