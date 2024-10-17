import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  Linking,
  SafeAreaView,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// propiedades y tipos de dato
interface QRInputProps {
  visible: boolean;
  onClose: () => void;
}

// componente que retorna una vista de tipo input para que el usuario ingrese los datos de parquimetro
const QRInput: React.FC<QRInputProps> = ({ visible, onClose }) => {
  const [parquimetro, setParquimetro] = useState<string>("");
  const [puesto, setPuesto] = useState<string>("");

  const handleParquimetroChange = (newText: string) => {
    setParquimetro(newText);
  };

  const handlePuestoChange = (newText: string) => {
    setPuesto(newText);
  };

  const handleLoadInput = async () => {
    const URL = "https://" + parquimetro + puesto;

    try {
      const canOpen = await Linking.canOpenURL(URL);
      if (canOpen) {
        await Linking.openURL(URL);
      }
    } catch (error) {
      console.log(error);
    }

    setParquimetro("");
    setPuesto("");
  };

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeButton}>
        <Icon name="close" color={"#d00b27"} size={50} onPress={onClose} />
      </View>

      <Text style={styles.label}>Parquímetro</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu parquímetro"
        value={parquimetro}
        onChangeText={handleParquimetroChange}
      ></TextInput>
      <Text style={styles.label}>Puesto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu puesto"
        value={puesto}
        onChangeText={handlePuestoChange}
      ></TextInput>
      <View style={styles.buscarButton}>
        <Button title="Buscar" onPress={handleLoadInput} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 20,
    width: "90%",
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#EAEAEA",
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
  },
  buscarButton: {
    marginTop: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#EAEAEA",
    position: "absolute",
    borderRadius: 10,
    top: 10,
    right: 10,
  },
});

export default QRInput;
