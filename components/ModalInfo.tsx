import {
	StyleSheet,
	View,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

type modalInfoProps = {
	onClose: () => void;
};

const ModalInfo = (props: modalInfoProps) => {
	const colorScheme = useColorScheme();

	// Contenido del modal mostrando la informacion en el Home de la app
	return (
		<ThemedView
			style={
				colorScheme === 'light'
					? styles.modalContainer
					: styles.modalContainerDark
			}
		>
			<ThemedText style={styles.modalText}>
				Bienvenido a tu App La Guaira, aquí encontrarás distintos
				servicios a los que puedes acceder desde los enlaces disponibles
				en la pantalla de inicio, en la barra de navegación inferior
				podrás acceder a distintas secciones con información y
				funcionalidades de interés para ti como un lector QR y un mapa
				con tu ubicación actual.
			</ThemedText>
			<TouchableOpacity
				style={styles.modalCloseButton}
				onPress={() => props.onClose()}
			>
				<ThemedText type='subtitle' style={styles.modalCloseButtonText}>
					OK
				</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
};

/** !EDITAR ESTILOS DE MODO OSCURO, USAR UN SOLO STYLESHEET PARA CADA COMPONENTE CON LA VARIABLE COLORSCHEME GLOBAL! **/

const styles = StyleSheet.create({
	modalContainer: {
		backfaceVisibility: 'visible',
		width: '90%',
		padding: 20,
		borderRadius: 10,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalContainerDark: {
		backgroundColor: '#222',
		width: '90%',
		padding: 20,
		borderRadius: 10,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 20,
	},
	modalCloseButton: {
		backgroundColor: '#ddd',
		padding: 10,
		borderRadius: 10,
		elevation: 4,
	},
	modalCloseButtonText: {
		fontSize: 18,
		color: '#001f7e',
		alignSelf: 'center',
	},
});

export default ModalInfo;
