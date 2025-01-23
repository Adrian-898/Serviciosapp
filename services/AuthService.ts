import AxiosInstance from '@/utils/axios';
import { setToken } from './TokenService';
import type { RequestLogin, RequestRegister } from '@/utils/types';

// solicitud de registro "post"
const register = async (credentials: RequestRegister) => {
	try {
		const { data, statusText } = await AxiosInstance.post('/register', credentials);
		await setToken(data.token);
		return statusText;
	} catch (error) {
		throw error;
	}
};

// solicitud de inicio de sesion "post"
const login = async (credentials: RequestLogin) => {
	try {
		const { data, statusText } = await AxiosInstance.post('/login', credentials);
		await setToken(data.token);
		return statusText;
	} catch (error) {
		throw error;
	}
};

// carga los datos del usuario al iniciar sesion "get"
const loadUser = async () => {
	try {
		const { data } = await AxiosInstance.get('/users/10');
		console.log('loadUserFN: ', data);
		return data;
	} catch (error) {
		console.warn('Ha ocurrido un error al cargar el usuario', error);
		return null;
	}
};

// Logout con un post, limpia el token a NULL
const logout = async () => {
	try {
		await AxiosInstance.post('/logout', {});
		await setToken(null);
	} catch (error) {
		throw error;
	}
};

// envia un link para resetear la contraseña
const sendPasswordResetLink = async (email: string) => {
	try {
		const { data, statusText } = await AxiosInstance.post('/forgot-password', {
			email,
		});
		console.log(data);
		return { data, statusText };
	} catch (error) {
		throw error;
	}
};

export { register, login, loadUser, logout, sendPasswordResetLink };
