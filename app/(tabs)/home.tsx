import { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import Icon from '@expo/vector-icons/MaterialIcons';
import HomeModalInfo from '@/components/HomeModalInfo';
import HomeLinkButton from '@/components/HomeLinkButton';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
// import useAuthContext from '@/contexts/AuthContext';

const Home = () => {
	// Navegacion con expo-router
	const router = useRouter();

	// estado del modal, visible o no visible
	const [modalState, setModalState] = useState<boolean>(false);

	// Usuario loggeado
	// const { user, setUser } = useContext(AuthContext);

	return (
		<ThemedView style={styles.container}>
			<Portal>
				<Modal visible={modalState} onDismiss={() => setModalState(false)} contentContainerStyle={styles.modal}>
					<HomeModalInfo onClose={() => setModalState(false)} />
				</Modal>
			</Portal>

			<View style={styles.header}>
				<ThemedText type='subtitle' style={styles.welcome} adjustsFontSizeToFit>
					Bienvenido Usuario!
				</ThemedText>
				<Icon
					name='info-outline'
					color='black'
					size={50}
					onPress={() => setModalState(true)}
					style={styles.info}
				/>
			</View>

			<ScrollView contentContainerStyle={styles.container2}>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='emergency' size={40} color={'black'} style={styles.icon} />
					<HomeLinkButton title='Emergencias' url='https://www.google.com' />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='directions-car' size={40} style={styles.icon} />
					<HomeLinkButton title='Parquímetro' url='https://www.google.com' />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='electrical-services' size={40} style={styles.icon} />
					<HomeLinkButton title='Servicios' url='https://www.google.com' />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='currency-exchange' size={40} style={styles.icon} />
					<HomeLinkButton title='Comercio' url='https://www.google.com' />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='crisis-alert' size={40} style={styles.icon} />
					<HomeLinkButton title='Denuncias' url='https://www.google.com' />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Icon name='taxi-alert' size={40} style={styles.icon} />
					<TouchableOpacity onPress={() => router.push('/multas')} style={styles.button}>
						<Text style={styles.text} adjustsFontSizeToFit>
							Multas
						</Text>
					</TouchableOpacity>
				</ThemedView>
			</ScrollView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	header: {
		margin: 10,
		padding: 5,
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
	welcome: {
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	info: {
		verticalAlign: 'middle',
		textAlign: 'center',
		padding: 4,
		backgroundColor: 'white',
		borderRadius: 12,
		elevation: 10,
	},
	container2: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	buttonContainer: {
		backgroundColor: 'white',
		flexDirection: 'row',
		borderRadius: 12,
		elevation: 10,
	},
	icon: {
		color: 'black',
		backgroundColor: 'white',
		borderRadius: 10,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		verticalAlign: 'middle',
		textAlign: 'center',
	},
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
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;
