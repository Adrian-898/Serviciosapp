import React, { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { SafeAreaView, useWindowDimensions, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "react-native";

// interfaz para almacenar y utilizar informacion obtenida de las funciones de expo-location
interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// interfaz personalizada para almacenar informacion de los lugares que se quiere marcar en el mapa
interface Lugar {
  lat: number;
  lng: number;
  name: string;
}

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    lat: 10.487299,
    lng: -66.823366,
    name: "Lugar 1",
  },
  {
    lat: 10.482382,
    lng: -66.818409,
    name: "Lugar 2",
  },
];

// Funcion que retorna la ubicacion por defecto y es llamada para actualizar esa ubicacion en caso de tener permisos del usuario
const useGetCurrentLocation = () => {
  // Ubicacion inicial donde cargar el mapa (coordenadas de la guaira), se actualiza al obtener la ubicacion actual
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setOrigin(current);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error:",
        "No se pudo obtener tu ubicación actual, verifica que el botón de acceso está activado"
      );
    }
  }, []);

  return { origin, getCurrentLocation };
};

// componente principal
const Mapa = () => {
  const barHeight = StatusBar.currentHeight;
  const { origin, getCurrentLocation } = useGetCurrentLocation();

  // estos dos hooks obtienen las dimensiones actuales de la pantalla
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Funcion que solicita permisos de ubicacion al usuario
  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Atención:",
          "Se ha negado el permiso para acceder a la ubicación"
        );
        return;
      }

      getCurrentLocation();
    } catch (error) {
      console.log(error);
    }
  };

  // se piden permisos de ubicacion al iniciar la app
  useEffect(() => {
    try {
      getLocationPermission();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // componente Pin en el mapa
  const MarkerComponent = ({ coord }: { coord: Lugar }) => (
    <Marker
      coordinate={{ latitude: coord.lat, longitude: coord.lng }}
      pinColor="red"
    >
      <Callout style={{ width: 150 }}>
        <Text
          style={{
            alignSelf: "center",
            color: "black",
            fontStyle: "normal",
          }}
        >
          {coord.name}
        </Text>
      </Callout>
    </Marker>
  );

  // renderiza el mapa y los Pins
  return (
    <SafeAreaView style={{ paddingTop: barHeight }}>
      <MapView
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        toolbarEnabled={false}
        showsPointsOfInterest={false}
        showsIndoors={false}
        showsBuildings={false}
        showsScale={false}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {
          // itera el arreglo lugares y renderiza un pin para cada instancia existente
          lugares.map((coord, index) => (
            <MarkerComponent key={index} coord={coord} />
          ))
        }
      </MapView>
    </SafeAreaView>
  );
};

export default Mapa;
