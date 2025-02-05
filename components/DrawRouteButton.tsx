import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type DrawRouteButtonProps = {
	onPress: () => void;
	newDestinationName: string;
};

// boton para trazar rutas:
const DrawRouteButton = (props: DrawRouteButtonProps) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
			<Text style={styles.buttonText}>Mostrar el camino a {props.newDestinationName}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		backgroundColor: '#001f7e',
		justifyContent: 'center',
		alignSelf: 'center',
		borderColor: '#999',
		padding: 10,
		borderRadius: 10,
		bottom: 80,
		borderWidth: 0.5,
		elevation: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default DrawRouteButton;
