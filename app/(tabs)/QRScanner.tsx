import React, { useState, Suspense } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  StatusBar,
  Linking,
  ActivityIndicator,
} from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import QRInput from "@/components/QRInput";
import useCamera from "@/hooks/useCamera";

const barHeight = StatusBar.currentHeight;

const QRCodeScanner = () => {
  // permisos de uso de camara
  const permission = useCamera();

  const [scanned, setScanned] = useState<boolean>(false);
  const [torch, setTorch] = useState<boolean>(false);

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

  // boton para encender y apagar la linterna
  const TorchButton = () => {
    return (
      <Icon
        name="flashlight"
        color={"white"}
        size={60}
        onPress={() => setTorch(!torch)}
        style={styles.torchButton}
      />
    );
  };

  // Abre el menu del QRInput
  const handleOpenInput = () => {
    setInputState(true);
  };

  // cierra el menu del QRinput
  const handleCloseInput = () => {
    setInputState(false);
  };

  // si se niega el permiso de uso de la camara se muestra el mensaje siguiente
  if (!permission || !permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText style={styles.message} adjustsFontSizeToFit>
          No hubo respuesta a la solicitud de permisos o se ha negado la misma,
          para usar la cámara, puede conceder los permisos de uso en la
          configuración de la App en su dispositivo, o puede ingresar
          manualmente los datos con el botón de abajo.
        </ThemedText>

        <View style={styles.noPermissionInput}>
          <InputButton />
        </View>

        <QRInput visible={inputState} onClose={handleCloseInput} />
      </SafeAreaView>
    );
  }

  // al aceptar permisos de uso de camara se carga la misma con los demas componentes.
  return (
    <SafeAreaView style={styles.container}>
      <Suspense
        fallback={<ActivityIndicator size={"large"} color={"#001f7e"} />}
      >
        <CameraView
          style={styles.camera}
          autofocus="on"
          enableTorch={torch}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />

        <View style={styles.back}>
          <Text style={styles.title}>Escanea un código QR</Text>
        </View>

        <View style={styles.footer}>
          <TorchButton />
          <InputButton />
        </View>

        <QRInput visible={inputState} onClose={handleCloseInput} />

        {scanned && (
          <Button
            title="Presiona para escanear de nuevo"
            onPress={() => setScanned(false)}
          />
        )}
      </Suspense>
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
  footer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  torchButton: {
    backgroundColor: "black",
    opacity: 0.7,
    padding: 10,
    borderRadius: 20,
  },
  inputButton: {
    backgroundColor: "black",
    opacity: 0.7,
    padding: 10,
    borderRadius: 20,
  },
  noPermissionInput: {
    flex: 1,
    position: "relative",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    padding: 20,
  },
});

export default QRCodeScanner;
