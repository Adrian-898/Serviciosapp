import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Formik } from 'formik';
import { sendPasswordResetLink } from '@/services/AuthService';
import * as yup from 'yup';
import getErrorMessage from '@/utils/getErrorMessage';

// esquema de validacion de datos
const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Se requiere una dirección de correo válida')
		.email('Se requiere una dirección de correo válida')
		.label('Correo electrónico'),
});

const ForgotPasswordScreen = () => {
	const [resetStatus, setResetStatus] = useState('');
	const [error, setError] = useState<string>('');

	// control del login al presionar "Iniciar sesion"
	const handleForgotPassword = async (value: string) => {
		setError('');
		setResetStatus('');
		try {
			// post
			const { data, statusText } = await sendPasswordResetLink(value);
			setResetStatus(data.status);

			// control de errores y redireccion a inicio en caso de login exitoso
			if (statusText !== 'OK') {
				setError(statusText);
				console.log('statusText: ', statusText);
			}
		} catch (error) {
			console.warn(error + ' Mensaje: ' + getErrorMessage(error));
		}
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText type='title' style={styles.title}>
				Restablecer contraseña
			</ThemedText>
			<Formik
				initialValues={{ email: '' }}
				onSubmit={(values) => {
					handleForgotPassword(values.email);
				}}
				validationSchema={validationSchema}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<ThemedView style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder='Ingresa tu correo electrónico'
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

						<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
							<Text style={styles.buttonText}>Enviar código</Text>
						</TouchableOpacity>

						{error && (
							<ThemedText type='defaultSemiBold' style={styles.errorText}>
								Ha ocurrido un error: {error}
							</ThemedText>
						)}

						{resetStatus && (
							<ThemedText type='defaultSemiBold' style={styles.statusText}>
								Se ha enviado un correo de recuperación: {resetStatus}
							</ThemedText>
						)}
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
	statusText: {
		color: 'green',
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

export default ForgotPasswordScreen;
