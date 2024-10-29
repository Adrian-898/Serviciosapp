import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon2 from "@expo/vector-icons/MaterialIcons";
import ModalInfo from "@/components/ModalInfo";
import LinkButton from "@/components/LinkButton";
import Fondo from "@/assets/images/cinta-costera.jpg";
import AuthContext from "@/contexts/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "react-native";

const barHeight = StatusBar.currentHeight;

const Home = () => {
  // informacion de usuario logeado
  const { user } = useContext(AuthContext);

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Fondo}
        style={styles.fondo}
        resizeMode="cover"
        onError={() => console.log("Error cargando imagen de fondo...")}
      >
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.welcome}>
            Bienvenido {user.name}.
          </ThemedText>

          <Icon
            name="information-outline"
            color="black"
            size={50}
            onPress={handleOpenModal}
            style={styles.info}
          />
        </View>

        <View style={styles.modal}>
          <ModalInfo visible={modalState} onClose={handleCloseModal} />
        </View>
        <ScrollView contentContainerStyle={styles.container2}>
          <View style={styles.buttonContainer}>
            <Icon
              name="car-emergency"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Emergencias" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon
              name="car-brake-parking"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Parquímetro" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon2
              name="electrical-services"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Servicios" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon2
              name="currency-exchange"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Comercio" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon
              name="account-alert"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Denuncias" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon
              name="alert-rhombus"
              size={40}
              color={"black"}
              style={styles.icon}
            />
            <LinkButton title="Multas" url="https://www.google.com" />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: barHeight,
  },
  fondo: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignContent: "space-evenly",
  },
  modal: {
    alignItems: "center",
    paddingBottom: 20,
  },
  container2: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
  welcome: {
    alignSelf: "flex-start",
    color: "black",
    verticalAlign: "middle",
    padding: 5,
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

