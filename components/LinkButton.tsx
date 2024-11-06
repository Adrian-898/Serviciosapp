import React from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";

// propiedades del boton: titulo y url a la que enlaza
interface Props {
  title: string;
  url: string;
}

const Button: React.FC<Props> = ({ title, url }) => {
  // abre la url del boton seleccionado
  const handlePress = async (url: string) => {
    let result = await WebBrowser.openBrowserAsync(url);
    if (result.type !== "opened") {
      Alert.alert("Error:", "Algo salió mal, intente de nuevo");
    }
  };

  return (
    // Boton a renderizar
    <TouchableOpacity onPress={() => handlePress(url)} style={styles.button}>
      <Text style={styles.texto} adjustsFontSizeToFit>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: "50%",
    padding: 10,
    backgroundColor: "#001f7e",
    borderWidth: 0.5,
    borderRadius: 15,
    elevation: 10,
  },
  texto: {
    paddingLeft: 15,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Button;
