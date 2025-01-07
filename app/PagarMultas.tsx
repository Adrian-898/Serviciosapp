import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";

// tipo de dato User de prueba
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const PagarMultas = () => {
  // hook para acceder al estado enviado desde el componente padre (Multas.tsx)
  const params = useLocalSearchParams();

  const [data, setData] = useState<User | null>(null);

  // Estado de los datos de la tabla
  // const [table, setTable] = useState<User[]>();

  useEffect(() => {
    // GET a la API para obtener los datos de la tabla...
    const listUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users/4"
        );
        setData(response.data);
      } catch (error) {
        console.error("Ha ocurrido un error: ", getErrorMessage(error));
      }
    };

    listUsers();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Multas de: {data?.name} </Text>
      <Text>
        Cédula: {params.cedula}, Teléfono: {data?.phone}
      </Text>
    </View>
  );
};

export default PagarMultas;
