import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Constants from "expo-constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon2 from "@expo/vector-icons/MaterialIcons";
import LinkButton from "@/components/LinkButton";
import Fondo from "@/assets/images/cinta-costera.jpg";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// import AuthContext from "@/contexts/AuthContext";

const Home = () => {
  const colorScheme = useColorScheme();
  /*
  // informacion de usuario logeado
  const { user } = useContext(AuthContext);
  */

  // estado del modal, visible o no visible
  const [modalState, setModalState] = useState<boolean>(false);

  // Contenido del modal info
  const ModalInfo = () => {
    return (
      <View style={styles.modal}>
        <ThemedView
          style={
            colorScheme === "light"
              ? styles.modalContainer
              : styles.modalContainerDark
          }
        >
          <ThemedText style={styles.modalText} adjustsFontSizeToFit>
            Bienvenido a tu App La Guaira, aquí encontrarás distintos servicios
            a los que puedes acceder desde los enlaces disponibles en esta
            pantalla.
          </ThemedText>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalState(false)}
          >
            <ThemedText type="subtitle" style={styles.modalCloseButtonText}>
              OK
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Fondo}
        style={styles.fondo}
        resizeMode="cover"
        onError={() => console.log("Error cargando imagen de fondo...")}
      >
        <Modal
          visible={modalState}
          onRequestClose={() => setModalState(false)}
          animationType="slide"
          transparent={true}
        >
          <ModalInfo />
        </Modal>

        <View style={styles.header}>
          {/*
          <ThemedText type="defaultSemiBold" style={styles.welcome}>
            Bienvenido {user.name}.
          </ThemedText>
          */}

          <Icon
            name="information-outline"
            color="black"
            size={50}
            onPress={() => setModalState(true)}
            style={styles.info}
          />
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
            <Icon name="car-brake-parking" size={40} style={styles.icon} />
            <LinkButton title="Parquímetro" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon2 name="electrical-services" size={40} style={styles.icon} />
            <LinkButton title="Servicios" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon2 name="currency-exchange" size={40} style={styles.icon} />
            <LinkButton title="Comercio" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon name="account-alert" size={40} style={styles.icon} />
            <LinkButton title="Denuncias" url="https://www.google.com" />
          </View>
          <View style={styles.buttonContainer}>
            <Icon name="alert-rhombus" size={40} style={styles.icon} />
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
    paddingTop: Constants.statusBarHeight,
  },
  fondo: {
    flex: 1,
  },
  header: {
    margin: 20,
    padding: 20,
    alignContent: "space-evenly",
  },
  container2: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: {
    color: "black",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    verticalAlign: "middle",
    textAlign: "center",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  welcome: {
    alignSelf: "flex-start",
    color: "black",
    verticalAlign: "middle",
    padding: 5,
  },
  info: {
    alignSelf: "flex-end",
    verticalAlign: "middle",
    textAlign: "center",
    padding: 2,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainerDark: {
    backgroundColor: "#222",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: "#001f7e",
    alignSelf: "center",
  },
});

export default Home;

