import React, { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import {
  SafeAreaView,
  useWindowDimensions,
  Alert,
  Text,
  View,
  StyleSheet,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

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

// componente principal
const Mapa = () => {
  const barHeight = StatusBar.currentHeight;
  const { origin, getCurrentLocation } = useGetCurrentLocation();

  // estos dos hooks obtienen las dimensiones actuales de la pantalla
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);

  // Funcion que solicita permisos de ubicacion al usuario
  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === "granted");
      if (status === "granted") {
        getCurrentLocation();
        checkLocationServices();
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
  };

  // se piden permisos de ubicacion al iniciar la app
  useEffect(() => {
    getLocationPermission();
    const interval = setInterval(() => {
      if (permissionGranted) {
        checkLocationServices();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [permissionGranted]);

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
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        mapPadding={{ bottom: 50, left: 0, right: 0, top: 0 }}
        initialRegion={{
          latitude: 10.597032,
          longitude: -66.930431,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        region={origin}
      >
        {
          // itera el arreglo lugares y renderiza un pin para cada instancia existente
          lugares.map((coord, index) => (
            <MarkerComponent key={index} coord={coord} />
          ))
        }
      </MapView>
      {permissionGranted && !locationEnabled && (
        <View style={styles.alertContainer}>
          <Icon
            name="exclamation"
            color={"red"}
            size={80}
            style={styles.alertIcon}
          />
          <Text style={styles.alertMessage}>
            El acceso a la ubicación está desactivado, actívalo en la
            configuración de tu dispositivo.
          </Text>
        </View>
      )}
      {!permissionGranted && (
        <View style={styles.alertContainer}>
          <Icon
            name="exclamation"
            color={"red"}
            size={80}
            style={styles.alertIcon}
          />
          <Text style={styles.alertMessage} adjustsFontSizeToFit={true}>
            Los permisos de ubicación fueron negados, ve a la configuración de
            la App para otorgar los permisos
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    bottom: 50,
    maxWidth: "95%",
    maxHeight: "30%",
  },
  alertIcon: { margin: 10 },
  alertMessage: { color: "black", fontSize: 18, flex: 1 },
});

export default Mapa;
