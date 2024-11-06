import React, { Suspense } from "react";
import useLocation from "@/hooks/useLocation";
import {
  SafeAreaView,
  useWindowDimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const barHeight = StatusBar.currentHeight;

// interfaz para almacenar informacion de los lugares que se quiere marcar en el mapa
interface Lugar {
  lat: number;
  lng: number;
  name: string;
}

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    lat: 10.600645,
    lng: -66.930551,
    name: "Lugar 1",
  },
  {
    lat: 10.60062,
    lng: -66.922652,
    name: "Lugar 2",
  },
];

// componente principal
const Map = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const location = useLocation();

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
    <SafeAreaView style={styles.container}>
      <Suspense
        fallback={<ActivityIndicator size={"large"} color={"#001f7e"} />}
      >
        <MapView
          style={{ width: windowWidth, height: windowHeight }}
          userLocationUpdateInterval={5000}
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
          region={location.origin}
        >
          {
            // itera el arreglo lugares y renderiza un pin para cada instancia existente
            lugares.map((coord, index) => (
              <MarkerComponent key={index} coord={coord} />
            ))
          }
        </MapView>
        {
          // muestra un mensaje si no hay permisos de uso de ubicacion
          !location.permissionGranted && (
            <ThemedView style={styles.alertContainer}>
              <Alerta />
              <ThemedText
                type="defaultSemiBold"
                style={styles.alertMessage}
                adjustsFontSizeToFit={true}
              >
                Los permisos de ubicación fueron negados, ve a la configuración
                de la App para otorgar los permisos
              </ThemedText>
            </ThemedView>
          )
        }
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: barHeight,
  },
  alertContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: "98%",
    maxHeight: "30%",
    borderRadius: 10,
    bottom: 50,
    paddingRight: 10,
  },
  alertIcon: { margin: 10 },
  alertMessage: { flex: 1 },
});

export default Map;
