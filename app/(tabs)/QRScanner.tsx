import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import QRInput from "@/components/QRInput";

// altura de la barra superior del dispositivo
const barHeight = StatusBar.currentHeight;

interface InputState {
  visible: boolean;
}

const QRCodeScanner = () => {
  // estado del permiso de uso de la camara
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  // estado de visibilidad del input manual de datos
  const [inputState, setInputState] = useState<InputState>({
    visible: false,
  });

  // funcion ejecutada al leer un QR
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }): void => {
    setScanned(true);
    Alert.alert(
      "Información:",
      `Código QR de tipo ${type} con los datos: ${data} ha sido escaneado`
    );
  };

  // boton para ingresar datos manualmente
  const InputButton = () => {
    return (
      <Icon
        name="form-textbox"
        color={"white"}
        size={60}
        onPress={handleOpenInput}
        style={styles.inputButton}
      />
    );
  };

  // función ejecutada al presionar el boton de ingresar datos manualmente
  const handleOpenInput = () => {
    setInputState({ visible: true });
  };

  const handleSubmitInput = () => {
    setInputState({ visible: false });
  };

  // se piden permisos de uso de cámara al montar el componente principal QRCodeScanner
  useEffect(() => {
    const loadCamera = async () => {
      try {
        setLoading(true);
        await requestPermission();
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadCamera();
  }, []);

  // se muestra un indicador de carga si no se ha respondido a la solicitud de permisos
  if (loading || !permission) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#001f7e" />
      </SafeAreaView>
    );
  }

  // si se niega el permiso de uso de la camara se muestra el mensaje siguiente
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Se ha negado el permiso para usar la cámara, puede ingresar
          manualmente el dato con el boton, o conceder los permisos.
        </Text>
        <InputButton />
        <QRInput visible={inputState.visible} onSubmit={handleSubmitInput} />
      </SafeAreaView>
    );
  }

  // al aceptar permisos de uso de camara se carga la misma con los demas componentes.
  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      <View style={styles.back}>
        <Text style={styles.title}>Escanea un código QR</Text>
      </View>

      <InputButton />
      <QRInput visible={inputState.visible} onSubmit={handleSubmitInput} />

      {scanned && (
        <Button
          title="Presiona para escanear de nuevo"
          onPress={() => setScanned(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  back: {
    marginTop: barHeight,
    position: "absolute",
    backgroundColor: "black",
    alignSelf: "center",
    opacity: 0.5,
    top: 20,
    padding: 15,
    borderRadius: 15,
  },
  title: {
    position: "relative",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
  },
  inputButton: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    padding: 10,
    borderRadius: 20,
    right: 20,
    bottom: 60,
  },
});

export default QRCodeScanner;
