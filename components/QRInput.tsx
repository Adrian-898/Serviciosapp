import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Linking,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import useParquimetro from "@/hooks/api/useParquimetro";
import Icon from "@expo/vector-icons/FontAwesome";

// parametros del componente
interface QRInputProps {
  visible: boolean;
  onClose: () => void;
}

// componente que retorna una vista de tipo input para que el usuario ingrese los datos de parquimetro y puesto
const QRInput: React.FC<QRInputProps> = ({ visible, onClose }) => {
  // const { status, error, data, isFetching } = useParquimetro();
  const [parquimetro, setParquimetro] = useState<string>("");
  const [puesto, setPuesto] = useState<string>("");

  // prueba
  const park = [
    "",
    "parquimetro 1",
    "parquimetro 2",
    "parquimetro 3",
    "parquimetro A4",
    "parquimetro B5",
    "parquimetro C6",
  ];

  const handleParquimetroChange = (newParquimetro: string) => {
    setParquimetro(newParquimetro);
  };

  const handlePuestoChange = (newPuesto: string) => {
    setPuesto(newPuesto);
  };

  const handleLoadInput = async () => {
    const URL = `https://${parquimetro}/${puesto}`;

    try {
      const canOpen = await Linking.canOpenURL(URL);
      if (canOpen) {
        await Linking.openURL(URL);
      }
    } catch (error) {
      console.log(error);
    }

    setPuesto("");
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
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <Icon
        name="close"
        color={"#d00b27"}
        size={50}
        onPress={onClose}
        style={styles.closeButton}
      />

      <SafeAreaView style={styles.container2}>
        <Text style={styles.label}>Parquímetro</Text>
        <SelectDropdown
          data={park}
          statusBarTranslucent={true}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            handleParquimetroChange(selectedItem);
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpen) => {
            return (
              <View style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                  {selectedItem || "Ingresa tu parquímetro"}
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
          searchPlaceHolder="Ingresa tu parquímetro"
          searchPlaceHolderColor="black"
          searchInputStyle={styles.search}
          searchInputTxtColor="#151E26"
          searchInputTxtStyle={styles.searchText}
          renderSearchInputLeftIcon={() => {
            return <Icon name="search" color={"#72808D"} size={18} />;
          }}
        />

        <Text style={styles.label}>Puesto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu puesto"
          value={puesto}
          onChangeText={handlePuestoChange}
          placeholderTextColor={"black"}
        ></TextInput>

        <TouchableOpacity onPress={handleLoadInput} style={styles.button}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 20,
    minWidth: "90%",
  },
  container2: {
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
});

export default QRInput;
