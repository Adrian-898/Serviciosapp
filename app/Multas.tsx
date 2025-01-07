import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

// esquema de validacion de datos
const validationSchema = yup.object().shape({
  cedula: yup
    .number()
    .typeError("Debe contener sólo números")
    .required("Debe ingresar un número de cédula válido")
    .positive("El número de cédula debe ser mayor a 0")
    .integer("El número de cédula debe ser un número entero")
    .label("Cedula"),
});

const Multas = () => {
  const colorScheme = useColorScheme();

  // navegacion con expo-router
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Consultar Multas</ThemedText>
      </ThemedView>
      <ThemedView>
        {/*Form para ingreso de cedula usando Formik y Yup*/}
        <Formik
          initialValues={{ cedula: "" }}
          onSubmit={(value) => {
            console.log(value);
            router.push({
              pathname: "/PagarMultas",
              params: { cedula: value.cedula },
            });
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <ThemedText type="subtitle" style={styles.label}>
                Ingresa tu número de cédula
              </ThemedText>

              <TextInput
                style={styles.input}
                placeholder="Ejemplo: 25345678"
                placeholderTextColor={"#888"}
                keyboardType="number-pad"
                value={values.cedula}
                onChangeText={handleChange("cedula")}
                onBlur={handleBlur("cedula")}
              />

              {errors.cedula && (
                <Text style={styles.errorText}>{errors.cedula}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <ThemedText type="subtitle" style={styles.buttonText}>
                  Buscar
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/*
        <ThemedText type="subtitle" style={styles.label}>
          Ingresa tu cédula de identidad (sin letras ni separadores de cifras)
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 25345678"
          placeholderTextColor={"#888"}
          keyboardType="numeric"
          value={cedula}
          onChangeText={(text) => setCedula(text)}
        />
        */}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
    borderColor: "#555",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#001f7e",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
  },
});

export default Multas;
