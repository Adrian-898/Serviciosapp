import {
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/FontAwesome";
import { Formik } from "formik";
import * as yup from "yup";
import * as WebBrowser from "expo-web-browser";
import getErrorMessage from "@/utils/getErrorMessage";

// parametros del componente principal
type QRInputProps = {
  visible: boolean;
  onClose: () => void;
};

// esquema de validacion de datos
const validationSchema = yup.object().shape({
  parquimetro: yup
    .string()
    .required("Se requiere seleccionar un parquímetro")
    .label("Parquimetro"),
  puesto: yup
    .number()
    .typeError("Debe ser un número")
    .required("Se requiere ingresar un puesto")
    .positive("El número de puesto debe ser mayor a 0")
    .integer("El número de puesto debe ser un número entero")
    .label("Puesto"),
});

// componente que retorna una vista de tipo input para que el usuario ingrese los datos de parquimetro y puesto
const QRInput: React.FC<QRInputProps> = ({ visible, onClose }) => {
  // array de prueba
  const park = [
    "",
    "parquimetro 1",
    "parquimetro 2",
    "parquimetro 3",
    "parquimetro A4",
    "parquimetro B5",
    "parquimetro C6",
  ];

  // submit al presionar el boton "Buscar"
  const handleLoadInput = async (
    parquimetro: string,
    puesto: number | undefined
  ) => {
    const url = `https://${parquimetro}/${puesto}`;

    try {
      let result = await WebBrowser.openBrowserAsync(url);
      if (result.type !== "opened") {
        Alert.alert("Error:", "Algo salió mal, intente de nuevo");
      }
    } catch (error) {
      console.warn(error + " Mensaje: " + getErrorMessage(error));
    }
  };

  /*
  if (status === "pending") {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          style={{
            flex: 1,
            position: "relative",
            alignSelf: "center",
          }}
          size="large"
          color="#001f7e"
        />
      </SafeAreaView>
    );
  }

  if (error && visible) {
    Alert.alert("Ha ocurrido un error: ", error?.message);
  }
  */

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Icon
        name="close"
        color={"#d00b27"}
        size={50}
        onPress={onClose}
        style={styles.closeButton}
      />

      {/*Formulario Parquimetro y Puesto*/}
      <SafeAreaView style={styles.container2}>
        <Formik
          initialValues={{ parquimetro: "", puesto: undefined }}
          onSubmit={(values) => {
            console.log(values);
            handleLoadInput(values.parquimetro, values.puesto);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <Text style={styles.label}>Parquímetro</Text>
              <SelectDropdown
                data={park}
                statusBarTranslucent={true}
                defaultValueByIndex={0}
                onBlur={() => handleBlur("parquimetro")}
                onSelect={(selectedItem, index) => {
                  values.parquimetro = selectedItem;
                  handleChange("parquimetro");
                }}
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={styles.dropdownButton}>
                      <Text style={styles.dropdownButtonText}>
                        {selectedItem || "Seleccionar parquímetro"}
                      </Text>
                      <Icon
                        name={isOpen ? "chevron-left" : "chevron-down"}
                        size={25}
                        color="#444"
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItem,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdown}
                search={true}
                searchPlaceHolder="Busca tu parquímetro"
                searchPlaceHolderColor="black"
                searchInputStyle={styles.search}
                searchInputTxtColor="#151E26"
                searchInputTxtStyle={styles.searchText}
                renderSearchInputLeftIcon={() => {
                  return <Icon name="search" color={"#72808D"} size={18} />;
                }}
              />

              {errors.parquimetro && (
                <Text style={styles.errorText}>{errors.parquimetro}</Text>
              )}

              <Text style={styles.label}>Puesto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresar puesto"
                placeholderTextColor={"black"}
                onChangeText={handleChange("puesto")}
                onBlur={handleBlur("puesto")}
                value={values.puesto}
                keyboardType="number-pad"
              />

              {errors.puesto && (
                <Text style={styles.errorText}>{errors.puesto}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    minWidth: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  container2: {
    position: "relative",
    flex: 1,
    minWidth: "90%",
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#EAEAEA",
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  dropdown: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  dropdownButton: {
    backgroundColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  dropdownButtonText: {
    color: "black",
    fontSize: 18,
    flex: 1,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  dropdownItemText: {
    color: "#444",
    fontSize: 18,
  },
  search: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
  },
  searchText: {
    fontSize: 18,
  },
  button: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#001f7e",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default QRInput;
