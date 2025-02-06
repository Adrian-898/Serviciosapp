import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SettingsButton from '@/components/SettingsButton';
import getErrorMessage from '@/utils/getErrorMessage';
// import { useRouter } from "expo-router";
import { logout } from '@/services/AuthService';
import { useAuthContext } from '@/contexts/AuthContext';

const Settings = () => {
	// const router = useRouter();
	const { setUser } = useAuthContext();

	const handleLogout = async () => {
		try {
			await logout();
			setUser(null);
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText type='title' style={styles.header}>
				Configuración
			</ThemedText>

			<SettingsButton iconName='person' iconColor='#0caf50' text='Usuario' onPress={() => {}} />

			<SettingsButton
				iconName='information-circle'
				iconColor='#001f7e'
				text='Sobre nosotros'
				onPress={() => {}}
			/>

			<SettingsButton
				iconName='log-out'
				iconColor='#d00b27'
				text='Cerrar sesión'
				onPress={() => handleLogout()}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Constants.statusBarHeight,
	},
	header: {
		marginVertical: 20,
		textAlign: 'center',
	},
});

export default Settings;
