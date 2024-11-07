import { useState, useEffect } from "react";
import * as Location from "expo-location";
import useGetCurrentLocation from "./useGetCurrentLocation";

const useLocation = () => {
  // este hook obtiene la ubicacion actual del usuario (1 sola vez)
  const { origin, getCurrentLocation } = useGetCurrentLocation();
  // estado del permiso de uso de ubicacion
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  // Funcion que solicita permisos de ubicacion al usuario
  const getLocationPermission = async () => {
    if (!permissionGranted) {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionGranted(status === "granted");
        if (status === "granted") {
          getCurrentLocation();
        }
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  useEffect(() => {
    // se piden permisos de ubicacion al iniciar la app
    getLocationPermission();
  }, []);

  return { permissionGranted, origin };
};

export default useLocation;
