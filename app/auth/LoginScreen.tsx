import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { login, loadUser } from '@/services/AuthService';
import AuthContext from '@/contexts/AuthContext';
import * as yup from 'yup';
import getErrorMessage from '@/utils/getErrorMessage';
import type { LoginCredentials } from '@/utils/types';

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
});

const LoginScreen = () => {
	const router = useRouter();
	const { setUser } = useContext(AuthContext);
	const [error, setError] = useState<string>('');

	// control del login al presionar "Iniciar sesion"
	const handleLogin = async (values: LoginCredentials) => {
		if (!setUser) {
			console.error('Login ERROR: setUser = NULL');
			return;
		}

		setError('');
		try {
			// post
			const postStatus = await login({
				email: values.email,
				password: values.password,
				device_name: `${Platform.OS} ${Platform.Version}`,
			});

			// control de errores y redireccion a inicio en caso de login exitoso
			if (postStatus === 'OK') {
				router.replace('/(tabs)/home');
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
		<ThemedView style={styles.container}>
			<ThemedText type='title' style={styles.title}>
				Inicio de sesión
			</ThemedText>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={(values) => {
					handleLogin(values);
				}}
				validationSchema={validationSchema}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<ThemedView style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder='Correo electrónico'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							keyboardType='email-address'
							autoCapitalize='none'
							autoCorrect={false}
						/>

						{errors.email && touched.email && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								{errors.email}
							</ThemedText>
						)}

						<TextInput
							style={styles.input}
							placeholder='Contraseña'
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							autoCapitalize='none'
							autoCorrect={false}
							secureTextEntry
						/>

						{errors.password && touched.password && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								{errors.password}
							</ThemedText>
						)}

						{error && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								Ha ocurrido un error: {error}
							</ThemedText>
						)}

						<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
							<Text style={styles.buttonText}>Iniciar sesión</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => router.push('/auth/forgotPasswordScreen')}>
							<ThemedText type='link' style={styles.link}>
								Olvidaste tu contraseña?
							</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				)}
			</Formik>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		marginBottom: 24,
	},
	form: {
		width: '100%',
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
	link: {
		marginTop: 10,
		fontSize: 18,
		alignSelf: 'center',
	},
});

export default LoginScreen;
