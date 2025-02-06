import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';
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
	const router = useRouter();
	const { setUser } = useAuthContext();
	const [error, setError] = useState<string>('');

	// control del registro al presionar "Registrar"
	const handleRegister = async (values: RegisterCredentials) => {
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
		<ThemedView style={styles.container}>
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
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<ThemedView style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder='Correo electrónico'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							keyboardType='email-address'
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
							secureTextEntry
						/>

						{errors.password && touched.password && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								{errors.password}
							</ThemedText>
						)}

						<TextInput
							style={styles.input}
							placeholder='Confirmar contraseña'
							onChangeText={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							value={values.confirmPassword}
							secureTextEntry
						/>

						{errors.confirmPassword && touched.confirmPassword && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								{errors.confirmPassword}
							</ThemedText>
						)}

						{error && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								Ha ocurrido un error: {error}
							</ThemedText>
						)}

						<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
							<Text style={styles.buttonText}>Registrarse</Text>
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
		elevation: 5,
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
		elevation: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default RegisterScreen;
