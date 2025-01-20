import { useContext, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Formik } from 'formik';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import AuthContext from '@/contexts/AuthContext';
import { register } from '@/services/AuthService';
import { loadUser } from '@/services/AuthService';
import * as yup from 'yup';
import getErrorMessage from '@/utils/getErrorMessage';
import type { RegisterCredentials } from '@/utils/types';

// esquema de validacion de datos
const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Se requiere una dirección de correo válida')
		.email('Se requiere una dirección de correo válida')
		.label('Correo electrónico'),
	password: yup
		.string()
		.required('Se requiere una contraseña')
		.min(6, 'La contraseña debe poseer al menos 6 caracteres')
		.label('Contraseña'),
	confirmPassword: yup
		.string()
		.required('Las contraseñas deben coincidir')
		.oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
});

const RegisterScreen = () => {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const { setUser } = useContext(AuthContext);
	const [error, setError] = useState<string>('');

	// control del registro al presionar "Registrar"
	const handleRegister = async (values: RegisterCredentials) => {
		// elimina el error al llamar a setUser (no se puede invocar un objeto posiblemente null)
		if (!setUser) {
			console.error('Login ERROR: setUser = NULL');
			return;
		}

		setError('');
		try {
			// post
			const postStatus = await register({
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
				device_name: `${Platform.OS} ${Platform.Version}`,
			});

			// control de errores y redireccion a inicio en caso de login exitoso
			if (postStatus === 'OK') {
				router.replace('/(tabs)/Home');
			} else {
				setError(postStatus);
				console.log('statusText: ', postStatus);
			}

			// get
			const user = await loadUser();
			setUser(user);
			console.log('get: ', user);
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	return (
		<ThemedView
			style={
				colorScheme === 'light'
					? styles.container
					: styles.containerDark
			}
		>
			<ThemedText type='title' style={styles.title}>
				Registro
			</ThemedText>
			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				onSubmit={(values) => {
					handleRegister(values);
				}}
				validationSchema={validationSchema}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					<ThemedView
						style={
							colorScheme === 'light'
								? styles.form
								: styles.formDark
						}
					>
						<TextInput
							style={
								colorScheme === 'light'
									? styles.input
									: styles.inputDark
							}
							placeholder='Correo electrónico'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							keyboardType='email-address'
						/>

						{errors.email && touched.email && (
							<ThemedText
								type='defaultSemiBold'
								style={styles.errorText}
							>
								{errors.email}
							</ThemedText>
						)}

						<TextInput
							style={
								colorScheme === 'light'
									? styles.input
									: styles.inputDark
							}
							placeholder='Contraseña'
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							secureTextEntry
						/>

						{errors.password && touched.password && (
							<ThemedText
								type='defaultSemiBold'
								style={styles.errorText}
							>
								{errors.password}
							</ThemedText>
						)}

						<TextInput
							style={
								colorScheme === 'light'
									? styles.input
									: styles.inputDark
							}
							placeholder='Confirmar contraseña'
							onChangeText={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							value={values.confirmPassword}
							secureTextEntry
						/>

						{errors.confirmPassword && touched.confirmPassword && (
							<ThemedText
								type='defaultSemiBold'
								style={styles.errorText}
							>
								{errors.confirmPassword}
							</ThemedText>
						)}

						{error && (
							<ThemedText
								type='defaultSemiBold'
								style={styles.errorText}
							>
								Ha ocurrido un error: {error}
							</ThemedText>
						)}

						<TouchableOpacity
							style={styles.button}
							onPress={() => handleSubmit()}
						>
							<Text style={styles.buttonText}>Registrarse</Text>
						</TouchableOpacity>
					</ThemedView>
				)}
			</Formik>
		</ThemedView>
	);
};

/** !EDITAR ESTILOS DE MODO OSCURO, USAR UN SOLO STYLESHEET PARA CADA COMPONENTE CON LA VARIABLE COLORSCHEME GLOBAL! **/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	containerDark: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#222',
	},
	title: {
		marginBottom: 24,
	},
	form: {
		width: '100%',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
	},
	formDark: {
		width: '100%',
		backgroundColor: '#222',
		borderRadius: 10,
	},
	input: {
		height: 50,
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 20,
		marginBottom: 15,
		backgroundColor: '#fff',
	},
	inputDark: {
		height: 50,
		borderColor: '#999',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 20,
		marginBottom: 15,
		backgroundColor: '#f5f5f5',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
	button: {
		height: 50,
		backgroundColor: '#001f7e',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#999',
		borderRadius: 10,
		marginTop: 10,
		elevation: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default RegisterScreen;
