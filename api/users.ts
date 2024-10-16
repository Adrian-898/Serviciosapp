import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { status, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      // query function
      const response = await fetch(
        "https://api.github.com/repos/TanStack/query"
      );
      return await response.json();
    },
  });

  return { status, error, data, isFetching };
};

export default useUsers;
