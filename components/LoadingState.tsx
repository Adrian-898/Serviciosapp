import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

// Indicador de Actividad (Cargando...)
const LoadingState = () => {
	return (
		<ThemedView style={styles.container}>
			<ActivityIndicator color={'#001f7e'} size={50} />
			<ThemedText type='subtitle' style={styles.message}>
				Cargando...
			</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		textAlign: 'center',
		marginTop: 20,
	},
});

export default LoadingState;
