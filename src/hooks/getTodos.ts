import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todos";

const useGetTodos = () => {
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  console.log({ query });

  return query;
};

export default useGetTodos;
