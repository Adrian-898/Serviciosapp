import { useState } from "react";
import * as Location from "expo-location";
import getErrorMessage from "@/utils/getErrorMessage";

// interfaz para almacenar y utilizar informacion obtenida de las funciones de expo-location
type location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

// Funcion que retorna la ubicacion por defecto y es llamada para actualizar esa ubicacion en caso de tener permisos del usuario
const useGetCurrentLocation = () => {
  // Ubicacion inicial donde se carga el mapa (coordenadas de la guaira), se actualiza al obtener la ubicacion actual
  const [origin, setOrigin] = useState<location>({
    latitude: 10.597032,
    longitude: -66.930431,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  // funcion que obtiene la ubicacion actual (actualiza la variable origin)
  const getCurrentLocation = async () => {
    try {
      let result = await Location.getCurrentPositionAsync({});
      const current: location = {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };
      setOrigin(current);
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
      throw error;
    }
  };

  return { origin, getCurrentLocation };
};

export default useGetCurrentLocation;
