import { Text, StyleSheet, TouchableOpacity } from 'react-native';

// boton para escanear de nuevo un codigo QR
const QRScanAgainButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<TouchableOpacity onPress={() => onPress()} style={styles.tryAgainButton}>
			<Text style={styles.tryAgainButtonText}>Presiona para escanear de nuevo</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	tryAgainButton: {
		backgroundColor: '#001f7e',
		borderWidth: 0.5,
		borderRadius: 10,
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
});

export default QRScanAgainButton;
