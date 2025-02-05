import { StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type QRTorchButtonProps = {
	onToggle: () => void;
	torchState: boolean;
};

// boton para encender y apagar la linterna
const QRTorchButton = (props: QRTorchButtonProps) => {
	return (
		<Icon
			name={!props.torchState ? 'flashlight' : 'flashlight-off'}
			color={!props.torchState ? 'white' : 'lightblue'}
			size={60}
			onPress={() => props.onToggle()}
			style={styles.torchButton}
		/>
	);
};

export default QRTorchButton;

const styles = StyleSheet.create({
	torchButton: {
		backgroundColor: 'black',
		opacity: 0.7,
		padding: 10,
		borderRadius: 20,
	},
});
