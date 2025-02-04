import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import Constants from 'expo-constants';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import QRInput from '@/components/QRInput';
import * as WebBrowser from 'expo-web-browser';
import getErrorMessage from '@/utils/getErrorMessage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const QRScanner = () => {
	// Hook para solicitar y obtener estado de los permisos de uso de la cámara.
	const [permission, requestPermission] = useCameraPermissions();

	// estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
	const [scanned, setScanned] = useState<boolean>(false);

	// estado de la linterna, se usa para mostrar el botón de encender/apagar la linterna
	const [torch, setTorch] = useState<boolean>(false);

	// estado de visibilidad del input manual de datos
	const [inputState, setInputState] = useState<boolean>(false);

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

	// boton para abrir la ventana de ingresar datos manualmente
	const InputButton = () => {
		return (
			<Icon
				name={!inputState ? 'form-textbox' : 'form-textbox-lock'}
				color={!inputState ? 'white' : 'lightblue'}
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
				name={!torch ? 'flashlight' : 'flashlight-off'}
				color={!torch ? 'white' : 'lightblue'}
				size={60}
				onPress={() => setTorch(!torch)}
				style={styles.torchButton}
			/>
		);
	};

	// boton para escanear de nuevo un codigo QR
	const ScanAgainButton = () => {
		return (
			<TouchableOpacity onPress={() => setScanned(false)} style={styles.tryAgainButton}>
				<Text style={styles.tryAgainButtonText}>Presiona para escanear de nuevo</Text>
			</TouchableOpacity>
		);
	};

	// si se niega el permiso de uso de la camara o no se responde a la solicitud se muestra el mensaje siguiente
	if (!permission || permission.status !== 'granted') {
		return (
			<ThemedView style={styles.container}>
				<ThemedView style={styles.centered}>
					<ThemedText style={styles.message} adjustsFontSizeToFit>
						No hubo respuesta a la solicitud de permisos o se ha negado la misma, para usar la cámara, puede
						conceder los permisos de uso, o puede ingresar manualmente los datos con el botón en la esquina
						inferior derecha.
					</ThemedText>

					<ThemedText
						type='link'
						style={styles.link}
						onPress={() => {
							requestPermission();
						}}
					>
						Conceder permisos
					</ThemedText>
				</ThemedView>

				<View style={styles.noPermissionInput}>
					<InputButton />
				</View>
				<Portal>
					<Modal visible={inputState}>
						<QRInput onClose={() => setInputState(false)} />
					</Modal>
				</Portal>
			</ThemedView>
		);
	}

	// al aceptar permisos de uso de camara se carga la misma con los demas componentes.
	return (
		<SafeAreaView style={styles.container}>
			<CameraView
				style={styles.camera}
				autofocus='on'
				enableTorch={torch}
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
					<TorchButton />
					<InputButton />
				</View>
				{scanned && <ScanAgainButton />}
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
	centered: {
		flex: 1,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		textAlign: 'justify',
		fontSize: 18,
		marginHorizontal: 20,
	},
	link: {
		textDecorationLine: 'underline',
		fontSize: 20,
		margin: 20,
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
	torchButton: {
		backgroundColor: 'black',
		opacity: 0.7,
		padding: 10,
		borderRadius: 20,
	},
	inputButton: {
		backgroundColor: 'black',
		opacity: 0.7,
		padding: 10,
		borderRadius: 20,
	},
	tryAgainButton: {
		backgroundColor: '#001f7e',
		borderWidth: 0.5,
		borderRadius: 15,
		elevation: 10,
		paddingVertical: 10,
		marginTop: 20,
	},
	tryAgainButtonText: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	noPermissionInput: {
		flex: 1,
		position: 'relative',
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		padding: 20,
	},
});

export default QRScanner;
