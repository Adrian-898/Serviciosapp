import { useQuery, useQueryClient } from "@tanstack/react-query";

const useUsers = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // query function
      const response = await fetch("");
      return response.json();
    },
  });

  return { isPending, error, data, isFetching };
};

export default useUsers;
