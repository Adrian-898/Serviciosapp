import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
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
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  // hook para acceder al estado enviado desde el componente padre (Multas.tsx)
  const params = useLocalSearchParams();

  // guarda los datos consultados a la API
  const [data, setData] = useState<User[] | null>(null);

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
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ThemedText> Multas de: {params.cedula} </ThemedText>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Teléfono</DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.email}</DataTable.Cell>
            <DataTable.Cell numeric>{item.phone}</DataTable.Cell>
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
        />
      </DataTable>
    </ThemedView>
  );
};

export default PagarMultas;
