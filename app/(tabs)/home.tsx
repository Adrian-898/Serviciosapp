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

const Home = () => {
  const barHeight = StatusBar.currentHeight;

  // estado del modal, visible o no visible
  const [modalState, setModalState] = useState<boolean>(false);

  // al presionar el boton de informacion:
  const handleOpenModal = () => {
    setModalState(true);
  };
  // al presionar el boton CERRAR cuando esta abierto el modal informacion
  const handleCloseModal = () => {
    setModalState(false);
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
            style={styles.info}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <ModalInfo visible={modalState} onClose={handleCloseModal} />
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
    padding: 20,
  },
  container: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    verticalAlign: "middle",
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
  },
  info: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "flex-end",
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default Home;

