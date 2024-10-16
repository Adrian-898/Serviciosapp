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
  const [url, setUrl] = useState<string>("");

  const handleTextChange = (newText: string) => {
    setUrl(newText);
  };

  const handleLoadInput = async () => {
    const URL = "https://" + url;

    try {
      const canOpen = await Linking.canOpenURL(URL);
      if (canOpen) {
        await Linking.openURL(URL);
      }
    } catch (error) {
      console.log(error);
    }

    setUrl("");
  };

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeButton}>
        <Icon name="close" color={"red"} size={50} onPress={onClose} />
      </View>

      <Text style={styles.label}>Dato</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu dato"
        value={url}
        onChangeText={handleTextChange}
      ></TextInput>
      <Button title="Buscar" onPress={handleLoadInput} />
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
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#eaeaea",
    fontSize: 18,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea",
    position: "absolute",
    borderRadius: 10,
    top: 10,
    right: 10,
  },
});

export default QRInput;
