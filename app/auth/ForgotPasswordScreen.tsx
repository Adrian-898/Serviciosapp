import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Formik } from "formik";
import { sendPasswordResetLink } from "@/services/AuthService";
import * as yup from "yup";
import getErrorMessage from "@/utils/getErrorMessage";

// esquema de validacion de datos
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Se requiere una dirección de correo válida")
    .email("Se requiere una dirección de correo válida")
    .label("Correo electrónico"),
});

const ForgotPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const [resetStatus, setResetStatus] = useState("");
  const [error, setError] = useState<string>("");

  // control del login al presionar "Iniciar sesion"
  const handleForgotPassword = async (value: string) => {
    setError("");
    setResetStatus("");
    try {
      // post
      const { data, statusText } = await sendPasswordResetLink(value);
      setResetStatus(data.status);

      // control de errores y redireccion a inicio en caso de login exitoso
      if (statusText !== "OK") {
        setError(statusText);
        console.log("statusText: ", statusText);
      }
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
    }
  };

  return (
    <ThemedView
      style={colorScheme === "light" ? styles.container : styles.containerDark}
    >
      <ThemedText type="title" style={styles.title}>
        Restablecer contraseña
      </ThemedText>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          handleForgotPassword(values.email);
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
              placeholder="Ingresa tu correo electrónico"
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>

            {error && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                Ha ocurrido un error: {error}
              </ThemedText>
            )}

            {resetStatus && (
              <ThemedText type="defaultSemiBold" style={styles.statusText}>
                Se ha enviado un correo de recuperación: {resetStatus}
              </ThemedText>
            )}
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
  statusText: {
    color: "green",
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
});

export default ForgotPasswordScreen;
