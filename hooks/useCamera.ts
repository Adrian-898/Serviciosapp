import { useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import getErrorMessage from '@/utils/getErrorMessage';

const useCamera = () => {
	const [permission, requestPermission] = useCameraPermissions();

	useEffect(() => {
		const loadCamera = async () => {
			try {
				await requestPermission();
			} catch (error) {
				console.warn(error + ' Mensaje: ' + getErrorMessage(error));
			}
		};
		loadCamera();
	}, [requestPermission]);

	return permission;
};

export default useCamera;

// BUG: arreglar este hook, una opcion es usar useCameraPermissions directamente en qrScanner, eso o encontrar una forma de actualizar la vista de qrScanner cuando el usuario de los permisos
