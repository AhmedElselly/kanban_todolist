import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";

const useDeleteTodo = () => {
  const result = useMutation({
    mutationFn: deleteTodo,
  });
  return result;
};

export default useDeleteTodo;
