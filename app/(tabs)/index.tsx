import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon2 from "@expo/vector-icons/MaterialIcons";
import ModalInfo from "@/components/ModalInfo";
import Button from "@/components/Button";
import Fondo from "@/assets/images/cinta-costera.jpg";

// propiedades de ModalInfo
interface ModalState {
  visible: boolean;
  text: string;
}

const Index = () => {
  const barHeight = StatusBar.currentHeight;

  const [state, setState] = useState<ModalState>({
    visible: false,
    text: "Bienvenido a tu App La Guaira, aquí encontrarás distintos servicios a los que puedes acceder desde los enlaces disponibles en esta pantalla.",
  });
  // al presionar el boton de informacion:
  const handleOpenModal = () => {
    setState({ ...state, visible: true });
  };
  // al presionar el boton CERRAR cuando esta abierto el boton informacion
  const handleCloseModal = () => {
    setState({ ...state, visible: false });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: barHeight }}>
      <ImageBackground
        source={Fondo}
        style={{ flex: 1 }}
        resizeMode="cover"
        onError={() => console.log("Error cargando imagen de fondo...")}
      >
        <View style={styles.header}>
          <Icon
            name="information-outline"
            color="black"
            size={50}
            onPress={handleOpenModal}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              borderWidth: 0.5,
              alignSelf: "flex-end",
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <ModalInfo
            visible={state.visible}
            onClose={handleCloseModal}
            text={state.text}
          />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{ flexDirection: "row", paddingTop: 20, marginBottom: 20 }}
          >
            <Icon
              name="car-emergency"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Emergencias" url="https://www.google.com" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Icon
              name="car-brake-parking"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Parquímetro" url="https://www.google.com" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Icon2
              name="electrical-services"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Servicios" url="https://www.google.com" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Icon2
              name="currency-exchange"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Comercio" url="https://www.google.com" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Icon
              name="account-alert"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Denuncias" url="https://www.google.com" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Icon
              name="alert-rhombus"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <Button title="Multas" url="https://www.google.com" />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
  },
  container: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    verticalAlign: "middle",
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default Index;

