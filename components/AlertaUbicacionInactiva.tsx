import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Icon from '@expo/vector-icons/FontAwesome';

// Mensaje de alerta cuando no esta activada la ubicacion pero SI hay permisos de uso
const AlertaUbicacionInactiva = () => {
	return (
		<ThemedView style={styles.alertContainer}>
			<Icon name='exclamation' color={'red'} size={80} style={styles.alertIcon} />
			<ThemedText type='defaultSemiBold' style={styles.alertMessage} adjustsFontSizeToFit>
				La ubicación en tu dispositivo parece estar desactivada, actívala y carga el mapa nuevamente si deseas
				conocer tu ubicación actual y/o trazar una ruta...
			</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	alertContainer: {
		flexDirection: 'row',
		position: 'absolute',
		alignItems: 'center',
		alignSelf: 'center',
		maxWidth: '98%',
		maxHeight: '30%',
		borderRadius: 10,
		bottom: 50,
		paddingRight: 10,
	},
	alertIcon: { margin: 10 },
	alertMessage: { flex: 1 },
});

export default AlertaUbicacionInactiva;
