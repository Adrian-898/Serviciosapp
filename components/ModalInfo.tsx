import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

// propiedades del modal
interface ModalInfoProps {
  visible: boolean;
  onClose: () => void;
  text: string;
}

// componente modal, retorna el bloque de informacion y el boton de cerrar si la variable visible es true
const ModalInfo: React.FC<ModalInfoProps> = ({ visible, onClose, text }) => {
  // obtiene el ancho de la pantalla
  const WindowWidth = useWindowDimensions().width;

  if (!visible) return null;

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        width: WindowWidth - 50,
      }}
    >
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>CERRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#ccc",
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
