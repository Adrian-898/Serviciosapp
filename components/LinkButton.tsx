import React from "react";
import { Text, TouchableOpacity, Linking, StyleSheet } from "react-native";

// propiedades del boton: titulo y url a la que enlaza
interface Props {
  title: string;
  url: string;
}

const Button: React.FC<Props> = ({ title, url }) => {
  // al presionar se verifica que la url se puede abrir, de no poder se envia un error a la consola
  const handlePress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
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
