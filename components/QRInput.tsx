import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Button,
  StatusBar,
} from "react-native";

// propiedades y tipos de dato
interface QRInputProps {
  visible: boolean;
  onSubmit: () => void;
}

// componente que retorna una vista de tipo input para que el usuario ingrese los datos de parquimetro
const QRInput: React.FC<QRInputProps> = ({ visible, onSubmit }) => {
  const WindowWidth = useWindowDimensions().width;
  const barHeight = StatusBar.currentHeight;

  if (!visible) return null;

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        top: barHeight,
        alignSelf: "center",
        backgroundColor: "#FFFFFF",
        padding: 40,
        borderRadius: 20,
        width: WindowWidth,
      }}
    >
      <Text style={styles.label}>Dato</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu dato"></TextInput>
      <Button title="Buscar" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#eaeaea",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default QRInput;
