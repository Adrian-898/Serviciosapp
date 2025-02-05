import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import PermissionDeniedQR from '@/components/PermissionDeniedQR';
import QRInput from '@/components/QRInput';
import QRInputButton from '@/components/QRInputButton';
import QRTorchButton from '@/components/QRTorchButton';
import QRScanAgainButton from '@/components/QRScanAgainButton';
import getErrorMessage from '@/utils/getErrorMessage';

const QRScanner = () => {
	// Hook para solicitar y obtener estado de los permisos de uso de la cámara.
	const [permission, requestPermission] = useCameraPermissions();

	// estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
	const [scanned, setScanned] = useState(false);

	// estado de la linterna, se usa para mostrar el botón de encender/apagar la linterna
	const [torchState, setTorchState] = useState(false);

	// estado de visibilidad del input manual de datos
	const [inputState, setInputState] = useState(false);

	// solicita permisos de uso de camara al cargar el componente
	useEffect(() => {
		requestPermission();
	}, []);

	// funcion ejecutada al leer un QR
	const handleBarCodeScanned = async (Scan: BarcodeScanningResult) => {
		setScanned(true);
		const { data } = Scan;
		const url = 'https://' + data;

		try {
			const result = await WebBrowser.openBrowserAsync(url);
			if (result.type !== 'opened') {
				Alert.alert('Error:', 'Algo salió mal, intente de nuevo');
			}
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	// si se niega el permiso de uso de la camara o no se responde a la solicitud se muestra el mensaje siguiente
	if (!permission || permission.status !== 'granted') {
		return (
			<PermissionDeniedQR
				onRequestPermission={() => {
					requestPermission();
				}}
			/>
		);
	}

	// al aceptar permisos de uso de camara se carga la misma con los demas componentes.
	return (
		<SafeAreaView style={styles.container}>
			<CameraView
				style={styles.camera}
				autofocus='on'
				enableTorch={torchState}
				onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ['qr'],
				}}
			/>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Escanea un código QR</Text>
			</View>

			<View style={styles.footer}>
				<View style={styles.buttonContainer}>
					<QRTorchButton torchState={torchState} onToggle={() => setTorchState(!torchState)} />
					<QRInputButton inputState={inputState} onOpen={() => setInputState(true)} />
				</View>
				{scanned && <QRScanAgainButton onPress={() => setScanned(false)} />}
			</View>

			<Portal>
				<Modal visible={inputState}>
					<QRInput onClose={() => setInputState(false)} />
				</Modal>
			</Portal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	titleContainer: {
		marginTop: Constants.statusBarHeight,
		position: 'absolute',
		backgroundColor: 'black',
		alignSelf: 'center',
		opacity: 0.7,
		top: 20,
		padding: 15,
		borderRadius: 15,
	},
	title: {
		position: 'relative',
		textAlign: 'center',
		color: '#FFFFFF',
		fontSize: 20,
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default QRScanner;
