import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { status, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      // query function
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

export default useUsers;
