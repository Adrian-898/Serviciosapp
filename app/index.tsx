import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Fondo from "@/assets/images/cinta-costera.jpg";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Fondo}
        style={{ flex: 1 }}
        resizeMode="cover"
        onError={() => console.log("Error cargando imagen de fondo...")}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.continue}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(tabs)/home")}
            >
              <ThemedText style={styles.buttonText}>
                Continuar sin iniciar sesión
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.loginRegister}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/auth/LoginScreen")}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/auth/RegisterScreen")}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  buttonContainer: { flex: 1, flexDirection: "column" },
  button: {
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#001f7e",
    borderWidth: 0.5,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
  },
  continue: {
    alignSelf: "center",
    marginVertical: 20,
  },
  loginRegister: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 0,
    margin: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Home;
