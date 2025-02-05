import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import QRInputButton from './QRInputButton';
import QRInput from './QRInput';

type QRPermissionDeniedProps = {
	onRequestPermission: () => void;
};

const QRPermissionDenied = (props: QRPermissionDeniedProps) => {
	// estado de visibilidad del input manual de datos
	const [inputState, setInputState] = useState(false);

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
						props.onRequestPermission();
					}}
				>
					Conceder permisos
				</ThemedText>
			</ThemedView>

			<View style={styles.noPermissionInput}>
				<QRInputButton
					inputState={inputState}
					onOpen={() => {
						setInputState(true);
					}}
				/>
			</View>
			<Portal>
				<Modal visible={inputState}>
					<QRInput onClose={() => setInputState(false)} />
				</Modal>
			</Portal>
		</ThemedView>
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
	noPermissionInput: {
		flex: 1,
		position: 'relative',
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		padding: 20,
	},
});

export default QRPermissionDenied;
