import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Icon from '@expo/vector-icons/FontAwesome';

// Mensaje de alerta cuando no esta activada la ubicacion pero SI hay permisos de uso
const MapLocationDeniedPermissions = ({ onPress }: { onPress: () => void }) => {
	return (
		<ThemedView style={styles.alertContainer}>
			<Icon name='exclamation' color={'red'} size={80} style={styles.alertIcon} />

			<ThemedText type='defaultSemiBold' style={styles.alertMessage} adjustsFontSizeToFit>
				Parece que los permisos de ubicación fueron negados, otorga los permisos para acceder a las funciones
				del mapa...{'\n'}
				<ThemedText
					type='link'
					style={styles.link}
					onPress={() => {
						onPress();
					}}
					adjustsFontSizeToFit
				>
					Conceder permisos
				</ThemedText>
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
		maxHeight: '40%',
		borderRadius: 10,
		bottom: 50,
		paddingRight: 10,
	},
	alertIcon: { margin: 10 },
	alertMessage: { flex: 1 },
	link: {
		fontSize: 20,
		textDecorationLine: 'underline',
	},
});

export default MapLocationDeniedPermissions;
