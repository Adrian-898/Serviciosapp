import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import getErrorMessage from '@/utils/getErrorMessage';
import { type Region } from '@/utils/types';

const useLocation = () => {
	// estado del permiso de uso de ubicacion
	const [permissionGranted, setPermissionGranted] = useState(false);

	// Ubicacion actual (origen)
	const [origin, setOrigin] = useState<Region>();

	useEffect(() => {
		// se piden permisos de ubicacion al iniciar la app
		getLocationPermission();
	}, []);

	// Funcion que solicita permisos de ubicacion al usuario
	const getLocationPermission = async () => {
		if (!permissionGranted) {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();

				setPermissionGranted(status === 'granted');
				if (status === 'granted') {
					getCurrentLocation();
				}
			} catch (error) {
				console.warn('Error al solicitar permisos de ubicación: ' + getErrorMessage(error));
			}
		}
	};

	// funcion que obtiene la ubicacion actual (actualiza la variable origin)
	const getCurrentLocation = async () => {
		try {
			let result = await Location.getCurrentPositionAsync({});
			const current = {
				latitude: result.coords.latitude,
				longitude: result.coords.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			setOrigin(current);
		} catch (error) {
			console.warn('Error obteniendo la ubicación actual: ' + getErrorMessage(error));
		}
	};

	return { permissionGranted, getLocationPermission, origin };
};

export default useLocation;
