import {
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView,
	View,
	TouchableOpacity,
	Alert,
	Platform,
	useColorScheme,
} from 'react-native';
import { ThemedText } from './ThemedText';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from '@expo/vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as WebBrowser from 'expo-web-browser';
import getErrorMessage from '@/utils/getErrorMessage';

// parametros del componente principal
type QRInputProps = {
	visible: boolean;
	onClose: () => void;
};

// esquema de validacion de datos
const validationSchema = yup.object().shape({
	parquimetro: yup
		.string()
		.required('Se requiere seleccionar un parquímetro')
		.label('Parquimetro'),
	puesto: yup
		.number()
		.typeError('Debe ser un número')
		.required('Se requiere ingresar un puesto')
		.positive('El número de puesto debe ser mayor a 0')
		.integer('El número de puesto debe ser un número entero')
		.label('Puesto'),
});

// componente que retorna una vista de tipo input para que el usuario ingrese los datos de parquimetro y puesto
const QRInput = ({ visible, onClose }: QRInputProps) => {
	const colorScheme = useColorScheme();

	// array de prueba
	const park = [
		'',
		'parquimetro 1',
		'parquimetro 2',
		'parquimetro 3',
		'parquimetro A4',
		'parquimetro B5',
		'parquimetro C6',
	];

	// submit al presionar el boton "Buscar"
	const handleLoadInput = async (
		parquimetro: string,
		puesto: number | undefined,
	) => {
		const url = `https://${parquimetro}/${puesto}`;

		try {
			let result = await WebBrowser.openBrowserAsync(url);
			if (result.type !== 'opened') {
				Alert.alert('Error:', 'Algo salió mal, intente de nuevo');
			}
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	/*
  if (status === "pending") {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          style={{
            flex: 1,
            position: "relative",
            alignSelf: "center",
          }}
          size="large"
          color="#001f7e"
        />
      </SafeAreaView>
    );
  }

  if (error && visible) {
    Alert.alert("Ha ocurrido un error: ", error?.message);
  }
  */

	if (!visible) return null;

	return (
		<KeyboardAvoidingView
			style={
				colorScheme === 'light'
					? styles.container
					: styles.containerDark
			}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Icon
				name='close'
				color={'#d00b27'}
				size={50}
				onPress={onClose}
				style={styles.closeButton}
			/>

			{/*Formulario Parquimetro y Puesto con Formik y Yup*/}
			<SafeAreaView style={styles.container2}>
				<Formik
					initialValues={{ parquimetro: '', puesto: undefined }}
					onSubmit={(values) => {
						console.log(values);
						handleLoadInput(values.parquimetro, values.puesto);
					}}
					validationSchema={validationSchema}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
					}) => (
						<View>
							<ThemedText type='subtitle' style={styles.label}>
								Parquímetro
							</ThemedText>
							<SelectDropdown
								data={park}
								statusBarTranslucent
								defaultValueByIndex={0}
								onBlur={() => handleBlur('parquimetro')}
								onSelect={(selectedItem, index) => {
									values.parquimetro = selectedItem;
									handleChange('parquimetro');
								}}
								renderButton={(selectedItem, isOpen) => {
									return (
										<View style={styles.dropdownButton}>
											<Text
												style={
													selectedItem
														? styles.dropdownButtonTextSelected
														: styles.dropdownButtonText
												}
											>
												{selectedItem ||
													'Seleccionar parquímetro'}
											</Text>
											<Icon
												name={
													isOpen
														? 'chevron-left'
														: 'chevron-down'
												}
												size={25}
												color='#333'
											/>
										</View>
									);
								}}
								renderItem={(item, index, isSelected) => {
									return (
										<View
											style={{
												...styles.dropdownItem,
												...(isSelected && {
													backgroundColor: '#D2D9DF',
												}),
											}}
										>
											<Text
												style={styles.dropdownItemText}
											>
												{item}
											</Text>
										</View>
									);
								}}
								showsVerticalScrollIndicator={false}
								dropdownStyle={styles.dropdown}
								search={true}
								searchPlaceHolder='Busca tu parquímetro'
								searchPlaceHolderColor='#888'
								searchInputStyle={styles.search}
								searchInputTxtColor='#151E26'
								searchInputTxtStyle={styles.searchText}
								renderSearchInputLeftIcon={() => {
									return (
										<Icon
											name='search'
											color={'#72808D'}
											size={18}
										/>
									);
								}}
							/>

							{errors.parquimetro && (
								<Text style={styles.errorText}>
									{errors.parquimetro}
								</Text>
							)}

							<ThemedText type='subtitle' style={styles.label}>
								Puesto
							</ThemedText>
							<TextInput
								style={styles.input}
								placeholder='Ingresar puesto'
								placeholderTextColor={'#888'}
								onChangeText={handleChange('puesto')}
								onBlur={handleBlur('puesto')}
								value={values.puesto}
								keyboardType='number-pad'
							/>

							{errors.puesto && (
								<Text style={styles.errorText}>
									{errors.puesto}
								</Text>
							)}

							<TouchableOpacity
								style={styles.button}
								onPress={() => handleSubmit()}
							>
								<ThemedText
									type='subtitle'
									style={styles.buttonText}
								>
									Buscar
								</ThemedText>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		position: 'absolute',
		alignSelf: 'center',
		minWidth: '90%',
		padding: 20,
		borderRadius: 20,
		elevation: 5,
	},
	containerDark: {
		flex: 1,
		backgroundColor: '#222',
		position: 'absolute',
		alignSelf: 'center',
		minWidth: '90%',
		padding: 20,
		borderRadius: 20,
		elevation: 5,
	},
	container2: {
		position: 'relative',
		flex: 1,
		minWidth: '90%',
	},
	label: {
		marginBottom: 5,
	},
	input: {
		backgroundColor: '#EAEAEA',
		marginBottom: 20,
		fontSize: 18,
		padding: 10,
		borderRadius: 10,
	},
	closeButton: {
		alignSelf: 'flex-end',
	},
	dropdown: {
		position: 'relative',
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	dropdownButton: {
		backgroundColor: '#EAEAEA',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		borderRadius: 10,
		padding: 10,
	},
	dropdownButtonText: {
		color: '#888',
		fontSize: 18,
		flex: 1,
	},
	dropdownButtonTextSelected: {
		color: '#333',
		fontSize: 18,
		flex: 1,
	},
	dropdownItem: {
		padding: 10,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		borderRadius: 10,
	},
	dropdownItemText: {
		color: '#333',
		fontSize: 18,
	},
	search: {
		backgroundColor: '#EAEAEA',
		padding: 10,
		borderRadius: 10,
	},
	searchText: {
		fontSize: 18,
	},
	button: {
		marginVertical: 5,
		padding: 10,
		backgroundColor: '#001f7e',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 5,
		shadowRadius: 20,
		elevation: 5,
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
});

export default QRInput;
