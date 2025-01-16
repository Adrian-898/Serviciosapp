import axios from 'axios';
import { getToken } from '@/services/TokenService';
import getErrorMessage from './getErrorMessage';

const AxiosInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	headers: {
		Accept: 'application/json',
	},
});

axios.interceptors.request.use(async (req) => {
	let token: string | null = null;
	try {
		token = await getToken();
	} catch (error) {
		console.error(error + ' Mensaje: ' + getErrorMessage(error));
	}

	if (token !== null) {
		req.headers['Authorization'] = `Bearer ${token}`;
	}
	return req;
});

export default AxiosInstance;
