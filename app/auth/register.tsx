import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Formik } from "formik";
import { useColorScheme } from "react-native";
import * as yup from "yup";

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
  confirmPassword: yup
    .string()
    .required("Las contraseñas deben coincidir")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
});

const Register = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      style={colorScheme === "light" ? styles.container : styles.containerDark}
    >
      <ThemedText type="title" style={styles.title}>
        Registro
      </ThemedText>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => console.log(values)}
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
              secureTextEntry
            />

            {errors.password && touched.password && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                {errors.password}
              </ThemedText>
            )}

            <TextInput
              style={colorScheme === "light" ? styles.input : styles.inputDark}
              placeholder="Confirmar contraseña"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />

            {errors.confirmPassword && touched.confirmPassword && (
              <ThemedText type="defaultSemiBold" style={styles.errorText}>
                {errors.confirmPassword}
              </ThemedText>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </ThemedView>
        )}
      </Formik>
    </ThemedView>
  );
};

export default Register;

/*
#333: gris oscuro
#999 gris claro
*/

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
    backgroundColor: "#333",
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
    backgroundColor: "#333",
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputDark: {
    height: 50,
    borderColor: "#black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#999",
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
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
