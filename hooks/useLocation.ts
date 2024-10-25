import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

// interfaz para almacenar y utilizar informacion obtenida de las funciones de expo-location
interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// Funcion que retorna la ubicacion por defecto y es llamada para actualizar esa ubicacion en caso de tener permisos del usuario
const useGetCurrentLocation = () => {
  // Ubicacion inicial donde se carga el mapa (coordenadas de la guaira), se actualiza al obtener la ubicacion actual
  const [origin, setOrigin] = useState<Location>({
    latitude: 10.597032,
    longitude: -66.930431,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  // funcion que obtiene la ubicacion actual (actualiza la variable origin)
  const getCurrentLocation = useCallback(async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const current: Location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };
      setOrigin(current);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { origin, getCurrentLocation };
};

const useLocation = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const { origin, getCurrentLocation } = useGetCurrentLocation();

  // Funcion que solicita permisos de ubicacion al usuario
  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === "granted");
      if (status === "granted") {
        checkLocationServices();
        getCurrentLocation();
      } else {
        Alert.alert(
          "Atención:",
          "Se ha negado el permiso para acceder a la ubicación"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLocationServices = async () => {
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(servicesEnabled);
    if (servicesEnabled) {
      getCurrentLocation();
    }
  };

  useEffect(() => {
    // se piden permisos de ubicacion al iniciar la app
    getLocationPermission();

    // check cada 3 segundos del estado de la ubicacion, si esta activada o no por el usuario (distinto a permisos de uso de ubicacion)
    if (permissionGranted) {
      const interval = setInterval(() => {
        checkLocationServices();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [permissionGranted]);

  return { permissionGranted, locationEnabled, origin };
};

export default useLocation;
