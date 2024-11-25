import React, { useState, Suspense } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import Constants from "expo-constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import QRInput from "@/components/QRInput";
import useCamera from "@/hooks/useCamera";
import * as WebBrowser from "expo-web-browser";
import getErrorMessage from "@/utils/getErrorMessage";
import { useIsFocused } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const QRScanner = () => {
  const colorScheme = useColorScheme();

  // permisos de uso de camara
  const permission = useCamera();

  // estado de la pantalla activa o no, se usa para el renderizado condicional de la camara (Solo si esta el usuario en la pantalla de QRScanner)
  const isFocused = useIsFocused();

  // estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
  const [scanned, setScanned] = useState<boolean>(false);

  // estado de la linterna, se usa para mostrar el botón de encender/apagar la linterna
  const [torch, setTorch] = useState<boolean>(false);

  // estado de visibilidad del input manual de datos
  const [inputState, setInputState] = useState<boolean>(false);

  // funcion ejecutada al leer un QR
  const handleBarCodeScanned = async (Scan: BarcodeScanningResult) => {
    setScanned(true);
    const { data } = Scan;
    const url = "https://" + data;

    try {
      const result = await WebBrowser.openBrowserAsync(url);
      if (result.type !== "opened") {
        Alert.alert("Error:", "Algo salió mal, intente de nuevo");
      }
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
    }
  };

  // boton para abrir la ventana de ingresar datos manualmente
  const InputButton = () => {
    return (
      <Icon
        name="form-textbox"
        color={"white"}
        size={60}
        onPress={() => setInputState(true)}
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

  // si se niega el permiso de uso de la camara se muestra el mensaje siguiente
  if (!permission || !permission.granted) {
    return (
      <ThemedView
        style={
          colorScheme === "light" ? styles.container : styles.containerDark
        }
      >
        <ThemedText style={styles.message} adjustsFontSizeToFit>
          No hubo respuesta a la solicitud de permisos o se ha negado la misma,
          para usar la cámara, puede conceder los permisos de uso en la
          configuración de la App en su dispositivo, o puede ingresar
          manualmente los datos con el botón de abajo.
        </ThemedText>

        <View style={styles.noPermissionInput}>
          <InputButton />
        </View>

        <QRInput visible={inputState} onClose={() => setInputState(false)} />
      </ThemedView>
    );
  }

  // al aceptar permisos de uso de camara se carga la misma con los demas componentes.
  return (
    <SafeAreaView style={styles.container}>
      <Suspense
        fallback={<ActivityIndicator size={"large"} color={"#001f7e"} />}
      >
        {isFocused && (
          <CameraView
            style={styles.camera}
            autofocus="on"
            enableTorch={torch}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        )}

        <View style={styles.back}>
          <Text style={styles.title}>Escanea un código QR</Text>
        </View>

        <View style={styles.footer}>
          <TorchButton />
          <InputButton />
        </View>

        <QRInput visible={inputState} onClose={() => setInputState(false)} />

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
  containerDark: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#222",
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
    marginTop: Constants.statusBarHeight,
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

export default QRScanner;
