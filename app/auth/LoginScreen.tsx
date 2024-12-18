import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { login, loadUser } from "@/services/AuthService";
import AuthContext from "@/contexts/AuthContext";
import * as yup from "yup";
import getErrorMessage from "@/utils/getErrorMessage";
import type { LoginCredentials } from "@/utils/types";

// esquema de validacion de datos
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Se requiere una dirección de correo válida")
    .email("Se requiere una dirección de correo válida")
    .label("Correo electrónico"),
  password: yup
    .string()
    .required("Se requiere una contraseña")
    .min(6, "La contraseña debe poseer al menos 6 caracteres")
    .label("Contraseña"),
});

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");

  // control del login al presionar "Iniciar sesion"
  const handleLogin = async (values: LoginCredentials) => {
    setError("");
    try {
      // post
      const postStatus = await login({
        email: values.email,
        password: values.password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      // control de errores y redireccion a inicio en caso de login exitoso
      if (postStatus === "OK") {
        router.replace("/(tabs)/Home");
      } else {
        setError(postStatus);
        console.log("statusText: ", postStatus);
      }

      // get
      const user = await loadUser();
      setUser(user);
      console.log("get: ", user);
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
    }
  };

  return (
    <ThemedView
      style={colorScheme === "light" ? styles.container : styles.containerDark}
    >
      <ThemedText type="title" style={styles.title}>
        Inicio de sesión
      </ThemedText>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ThemedView
            style={colorScheme === "light" ? styles.form : styles.formDark}
          >
            <TextInput
              style={colorScheme === "light" ? styles.input : styles.inputDark}
              placeholder="Correo electrónico"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {errors.email && touched.email && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                {errors.email}
              </ThemedText>
            )}

            <TextInput
              style={colorScheme === "light" ? styles.input : styles.inputDark}
              placeholder="Contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />

            {errors.password && touched.password && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                {errors.password}
              </ThemedText>
            )}

            {error && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                Ha ocurrido un error: {error}
              </ThemedText>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/auth/ForgotPasswordScreen")}
            >
              <ThemedText type="link" style={styles.link}>
                Olvidaste tu contraseña?
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </Formik>
    </ThemedView>
  );
};

/** !EDITAR ESTILOS DE MODO OSCURO, USAR UN SOLO STYLESHEET PARA CADA COMPONENTE CON LA VARIABLE COLORSCHEME GLOBAL! **/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#222",
  },
  title: {
    marginBottom: 24,
  },
  form: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  formDark: {
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputDark: {
    height: 50,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: "#001f7e",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999",
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    margin: 5,
    alignSelf: "center",
  },
});

export default LoginScreen;
