import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import getErrorMessage from '@/utils/getErrorMessage';

// propiedades del boton: titulo y url a la que enlaza
type LinkButtonProps = {
	title: string;
	url: string;
};

const HomeLinkButton = ({ title, url }: LinkButtonProps) => {
	// abre la url del boton seleccionado
	const handlePress = async (url: string) => {
		try {
			let result = await WebBrowser.openBrowserAsync(url);
			if (result.type !== 'opened') {
				Alert.alert('Error:', 'Algo salió mal, intente de nuevo');
			}
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	return (
		// Boton a renderizar
		<TouchableOpacity onPress={() => handlePress(url)} style={styles.button}>
			<Text style={styles.text} adjustsFontSizeToFit>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: '50%',
		padding: 10,
		backgroundColor: '#001f7e',
		borderRadius: 10,
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
});

export default HomeLinkButton;
