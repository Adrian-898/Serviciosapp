import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  ActivityIndicator,
  StatusBar,
  Linking,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import QRInput from "@/components/QRInput";

// altura de la barra superior del dispositivo
const barHeight = StatusBar.currentHeight;

const QRCodeScanner = () => {
  // estado del permiso de uso de la camara
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  // estado de visibilidad del input manual de datos
  const [inputState, setInputState] = useState<boolean>(false);

  // funcion ejecutada al leer un QR
  const handleBarCodeScanned = async (Scan: BarcodeScanningResult) => {
    setScanned(true);
    const { data } = Scan;
    const URL = "https://" + data;

    try {
      const canOpen = await Linking.canOpenURL(URL);
      if (canOpen) {
        await Linking.openURL(URL);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // boton para abrir la ventana de ingresar datos manualmente
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
    setInputState(true);
  };

  // control de los datos ingresados
  const handleCloseInput = () => {
    setInputState(false);
  };

  // se piden permisos de uso de cámara al montar el componente principal QRCodeScanner
  useEffect(() => {
    const loadCamera = async () => {
      try {
        setLoading(true);
        await requestPermission();
        setLoading(false);
      } catch (error) {
        console.log(error);
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
        <Text style={styles.message} adjustsFontSizeToFit={true}>
          Se ha negado el permiso para usar la cámara, puede ingresar
          manualmente los datos con el botón de abajo, o conceder los permisos
          en la configuración de la App.
        </Text>

        <View style={{ flex: 1 }}>
          <InputButton />
        </View>

        <QRInput visible={inputState} onClose={handleCloseInput} />
      </SafeAreaView>
    );
  }

  // al aceptar permisos de uso de camara se carga la misma con los demas componentes.
  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        autofocus="on"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      <View style={styles.back}>
        <Text style={styles.title}>Escanea un código QR</Text>
      </View>

      <View>
        <InputButton />
      </View>

      <QRInput visible={inputState} onClose={handleCloseInput} />

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
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 20,
  },
  camera: {
    flex: 1,
  },
  back: {
    marginTop: barHeight,
    position: "absolute",
    backgroundColor: "black",
    alignSelf: "center",
    opacity: 0.7,
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
    opacity: 0.7,
    padding: 10,
    borderRadius: 20,
    right: 20,
    bottom: 20,
  },
});

export default QRCodeScanner;
