import { useState } from 'react';
import * as Location from 'expo-location';
import getErrorMessage from '@/utils/getErrorMessage';
import type { Region } from '@/utils/types';

// Funcion que retorna la ubicacion por defecto y es llamada para actualizar esa ubicacion en caso de tener permisos del usuario
const useGetCurrentLocation = () => {
	const [origin, setOrigin] = useState<Region>();

	// funcion que obtiene la ubicacion actual (actualiza la variable origin)
	const getCurrentLocation = async () => {
		try {
			let result = await Location.getCurrentPositionAsync({});
			const current: Region = {
				latitude: result.coords.latitude,
				longitude: result.coords.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			setOrigin(current);
		} catch (error) {
			console.warn(
				'Error en useGetCurrentLocation, ' +
					'mensaje: ' +
					getErrorMessage(error),
			);
		}
	};

	return { origin, getCurrentLocation };
};

export default useGetCurrentLocation;
