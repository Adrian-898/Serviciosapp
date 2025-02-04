import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

// Indicador de Actividad (Cargando...)
const Loading = () => {
	return (
		<ThemedView style={styles.container}>
			<ActivityIndicator color={'#001f7e'} size={50} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Loading;
