import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  const { status, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/TanStack/query"
        );

        // desestructurar propiedades del response
        const { ok, status: responseStatus, statusText } = response;

        // chequear que no haya errores
        if (!ok) {
          throw new Error(`Error en el fetch: ${responseStatus} ${statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  return { status, error, data, isFetching };
};

async function getUser() {
  try {
    const response = await axios.get("/user", {
      params: {
        ID: 12345,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export { useUsers, getUser };
