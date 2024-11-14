import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

// propiedades del modal
type ModalInfoProps = {
  visible: boolean;
  onClose: () => void;
};

// componente modal, retorna el bloque de informacion y el boton de cerrar si la variable visible es true
const ModalInfo = ({ visible, onClose }: ModalInfoProps) => {
  if (!visible) return null;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text} adjustsFontSizeToFit>
        Bienvenido a tu App La Guaira, aquí encontrarás distintos servicios a
        los que puedes acceder desde los enlaces disponibles en esta pantalla.
      </ThemedText>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <ThemedText type="subtitle" style={styles.closeButtonText}>
          CERRAR
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#CCC",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#d00b27",
    alignSelf: "center",
  },
});

export default ModalInfo;
