import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { DataTable } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
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
  // Configuracion del componente DataTable
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 5, 10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  // hook para acceder al estado enviado desde el componente padre (Multas.tsx)
  const params = useLocalSearchParams();

  // guarda los datos consultados a la API
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    // activa el modo Landscape al entrar en la pantalla para ver la tabla con los datos
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Al desmontar el componente regresa al modo Portrait
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  useEffect(() => {
    // GET a la API para obtener los datos...
    const listUsers = async () => {
      try {
        // consulta de prueba
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
      } catch (error) {
        console.error("Ha ocurrido un error: ", getErrorMessage(error));
      }
    };
    listUsers();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (!data) return;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <ThemedView style={styles.container}>
      <DataTable>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.header}>
            <ThemedText type="defaultSemiBold">
              Multas de: {params.cedula}
            </ThemedText>
          </ThemedView>

          <DataTable.Header>
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Teléfono</DataTable.Title>
          </DataTable.Header>

          {data.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell>{item.phone}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${data.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Filas por página"}
            selectPageDropdownRippleColor={"#001f7e"}
            paginationControlRippleColor={"#001f7e"}
            dropdownItemRippleColor={"#001f7e"}
            collapsable={false}
            style={styles.pagination}
          />
        </ScrollView>
      </DataTable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    alignSelf: "center",
    padding: 5,
  },
  pagination: { alignSelf: "center" },
});

export default PagarMultas;
