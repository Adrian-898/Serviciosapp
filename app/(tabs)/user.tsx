// import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
// import getErrorMessage from "@/utils/getErrorMessage";
// import { useRouter } from "expo-router";
// import { logout } from "@/services/AuthService";
// import AuthContext from "@/contexts/AuthContext";

const User = () => {
	const colorScheme = useColorScheme();
	// const router = useRouter();
	// const { setUser } = useContext(AuthContext);

	const handleLogout = async () => {
		/*
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
    }
    */
	};

	return (
		<ThemedView
			style={
				colorScheme === 'light'
					? styles.container
					: styles.containerDark
			}
		>
			<ThemedText type='title' style={styles.header}>
				Usuario
			</ThemedText>
			<TouchableOpacity
				style={
					colorScheme === 'light' ? styles.option : styles.optionDark
				}
			>
				<Icon name='person' size={24} color='#0caf50' />
				<Text style={styles.optionText}>Cuenta</Text>
				<Icon
					name='arrow-forward'
					size={24}
					color='black'
					style={styles.optionIcon}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={
					colorScheme === 'light' ? styles.option : styles.optionDark
				}
			>
				<Icon name='information-circle' size={24} color='#001f7e' />
				<Text style={styles.optionText}>Sobre nosotros</Text>
				<Icon
					name='arrow-forward'
					size={24}
					color='black'
					style={styles.optionIcon}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={
					colorScheme === 'light' ? styles.option : styles.optionDark
				}
				onPress={handleLogout}
			>
				<Icon name='log-out' size={24} color='#d00b27' />
				<Text style={styles.optionText}>Cerrar sesión</Text>
				<Icon
					name='arrow-forward'
					size={24}
					color='black'
					style={styles.optionIcon}
				/>
			</TouchableOpacity>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: StatusBar.currentHeight,
	},
	containerDark: {
		backgroundColor: '#222',
		flex: 1,
		padding: StatusBar.currentHeight,
	},
	header: {
		fontSize: 32,
		marginVertical: 20,
		textAlign: 'center',
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		marginBottom: 15,
		elevation: 5,
	},
	optionDark: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: '#ddd',
		borderColor: 'black',
		marginBottom: 15,
		elevation: 5,
	},
	optionText: {
		flex: 1,
		fontSize: 18,
		marginLeft: 10,
		color: 'black',
	},
	optionIcon: {
		marginLeft: 'auto',
	},
});

export default User;
