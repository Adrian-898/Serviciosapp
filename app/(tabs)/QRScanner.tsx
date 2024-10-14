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

const barHeight = StatusBar.currentHeight;

const QRCodeScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

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

  if (loading || !permission) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#001f7e" />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          No se ha concedido el permiso para usar la cámara.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {scanned && (
        <Button
          title="Presiona para escanear nuevamente"
          onPress={() => setScanned(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: barHeight,
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
  top: {
    backgroundColor: "red",
    alignSelf: "center",
  },
  title: {
    position: "absolute",
    backgroundColor: "red",
    color: "white",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    fontSize: 20,
  },
});

export default QRCodeScanner;
