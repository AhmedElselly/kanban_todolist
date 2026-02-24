import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

const useCreateTodo = () => {
  const result = useMutation({
    mutationFn: createTodo,
  });

  return result;
};
export default useCreateTodo;
