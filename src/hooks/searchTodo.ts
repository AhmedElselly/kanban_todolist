import { useQuery } from "@tanstack/react-query";
import { searchTodos } from "../api/todos";

const useSearchTodos = (search: string) => {
  const query = useQuery({
    queryKey: ["todos", search],
    queryFn: ({ queryKey }) => {
      const [_, query] = queryKey;
      return searchTodos(query as string);
    },
    enabled: !!search, // only run if search exists
  });

  return query;
};

export default useSearchTodos;
