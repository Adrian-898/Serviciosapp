import React, { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import {
  SafeAreaView,
  useWindowDimensions,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// interfaz para almacenar y utilizar informacion obtenida de las funciones de expo-location
interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// interfaz para almacenar informacion de los lugares que se quiere marcar en el mapa
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

// componente principal
const Map = () => {
  const barHeight = StatusBar.currentHeight;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const { origin, getCurrentLocation } = useGetCurrentLocation();

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

  useEffect(() => {
    // se piden permisos de ubicacion al iniciar la app
    getLocationPermission();

    // check cada 3 segundos del estado de la ubicacion, si esta activada o no por el usuario (distinto a permisos de uso de ubicacion)
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
      <Callout>
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

  //Icono de alerta
  const Alerta = () => {
    return (
      <Icon
        name="exclamation"
        color={"red"}
        size={80}
        style={styles.alertIcon}
      />
    );
  };

  // renderiza el mapa y los Pins
  return (
    <SafeAreaView style={{ paddingTop: barHeight }}>
      <MapView
        style={{ width: windowWidth, height: windowHeight }}
        userLocationUpdateInterval={10000}
        showsUserLocation
        showsMyLocationButton
        loadingEnabled
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
      {
        // muestra un mensaje si no se otorgan permisos de ubicacion
        permissionGranted && !locationEnabled && (
          <ThemedView style={styles.alertContainer}>
            <Alerta />
            <ThemedText
              type="defaultSemiBold"
              style={styles.alertMessage}
              adjustsFontSizeToFit={true}
            >
              El acceso a la ubicación está desactivado, actívalo en la
              configuración de tu dispositivo.
            </ThemedText>
          </ThemedView>
        )
      }
      {
        // muestra un mensaje si hay permisos pero no esta activado el uso de la ubicacion
        !permissionGranted && (
          <ThemedView style={styles.alertContainer}>
            <Alerta />
            <ThemedText
              type="defaultSemiBold"
              style={styles.alertMessage}
              adjustsFontSizeToFit={true}
            >
              Los permisos de ubicación fueron negados, ve a la configuración de
              la App para otorgar los permisos
            </ThemedText>
          </ThemedView>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: "95%",
    maxHeight: "30%",
    borderRadius: 10,
    bottom: 50,
    paddingRight: 10,
  },
  alertIcon: { margin: 10 },
  alertMessage: { flex: 1 },
});

export default Map;
