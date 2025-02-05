import { StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type QRInputButtonProps = {
	onOpen: () => void;
	inputState: boolean;
};

// boton para abrir la ventana de ingresar datos manualmente
const QRInputButton = (props: QRInputButtonProps) => {
	return (
		<Icon
			name={!props.inputState ? 'form-textbox' : 'form-textbox-lock'}
			color={!props.inputState ? 'white' : 'lightblue'}
			size={60}
			onPress={() => {
				props.onOpen();
			}}
			style={styles.inputButton}
		/>
	);
};

const styles = StyleSheet.create({
	inputButton: {
		backgroundColor: 'black',
		opacity: 0.7,
		padding: 10,
		borderRadius: 20,
	},
});

export default QRInputButton;
