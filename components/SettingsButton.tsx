import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

type SettingsButtonProps = {
	onPress: () => void;
	iconName: ComponentProps<typeof Icon>['name'];
	iconColor: string;
	text: string;
};

const SettingsButton = (props: SettingsButtonProps) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
			<Icon name={props.iconName} size={40} color={props.iconColor} />
			<Text style={styles.buttonText}>{props.text}</Text>
			<Icon name='arrow-forward' size={30} color='black' />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		marginBottom: 20,
		elevation: 10,
	},
	buttonText: {
		flex: 1,
		fontSize: 18,
		marginLeft: 10,
		color: 'black',
	},
});

export default SettingsButton;
