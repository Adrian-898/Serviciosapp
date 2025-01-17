import { useState } from 'react';
import {
	Text,
	ScrollView,
	View,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Icon2 from '@expo/vector-icons/MaterialIcons';
import ModalInfo from '@/components/ModalInfo';
import LinkButton from '@/components/LinkButton';
import Fondo from '@/assets/images/cinta-costera.jpg';

const Home = () => {
	// Navegacion con expo-router
	const router = useRouter();

	// estado del modal, visible o no visible
	const [modalState, setModalState] = useState<boolean>(false);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={Fondo}
				style={styles.fondo}
				resizeMode='cover'
				onError={() => console.log('Error cargando imagen de fondo...')}
			>
				<Portal>
					<Modal
						visible={modalState}
						onDismiss={() => setModalState(false)}
						contentContainerStyle={styles.modal}
					>
						<ModalInfo onClose={() => setModalState(false)} />
					</Modal>
				</Portal>

				<View style={styles.header}>
					<Icon
						name='information-outline'
						color='black'
						size={50}
						onPress={() => setModalState(true)}
						style={styles.info}
					/>
				</View>

				<ScrollView contentContainerStyle={styles.container2}>
					<View style={styles.buttonContainer}>
						<Icon
							name='car-emergency'
							size={40}
							color={'black'}
							style={styles.icon}
						/>
						<LinkButton
							title='Emergencias'
							url='https://www.google.com'
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Icon
							name='car-brake-parking'
							size={40}
							style={styles.icon}
						/>
						<LinkButton
							title='Parquímetro'
							url='https://www.google.com'
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Icon2
							name='electrical-services'
							size={40}
							style={styles.icon}
						/>
						<LinkButton
							title='Servicios'
							url='https://www.google.com'
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Icon2
							name='currency-exchange'
							size={40}
							style={styles.icon}
						/>
						<LinkButton
							title='Comercio'
							url='https://www.google.com'
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Icon
							name='account-alert'
							size={40}
							style={styles.icon}
						/>
						<LinkButton
							title='Denuncias'
							url='https://www.google.com'
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Icon
							name='alert-rhombus'
							size={40}
							style={styles.icon}
						/>
						<TouchableOpacity
							onPress={() => router.push('/Multas')}
							style={styles.button}
						>
							<Text style={styles.texto} adjustsFontSizeToFit>
								Multas
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	fondo: {
		flex: 1,
	},
	header: {
		margin: 10,
		padding: 5,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	container2: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	icon: {
		color: 'black',
		backgroundColor: 'white',
		borderWidth: 0.5,
		borderRadius: 10,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		verticalAlign: 'middle',
		textAlign: 'center',
		shadowOpacity: 5,
		shadowRadius: 20,
		elevation: 5,
	},
	welcome: {
		backgroundColor: 'white',
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: 'black',
		textAlign: 'center',
		textAlignVertical: 'center',
		color: 'black',
		margin: 5,
		padding: 5,
	},
	info: {
		verticalAlign: 'middle',
		textAlign: 'center',
		padding: 2,
		backgroundColor: 'white',
		borderRadius: 10,
		borderWidth: 0.5,
		shadowOpacity: 5,
		shadowRadius: 20,
		elevation: 5,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: '50%',
		padding: 10,
		backgroundColor: '#001f7e',
		borderWidth: 0.5,
		borderRadius: 15,
		elevation: 10,
	},
	texto: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;
