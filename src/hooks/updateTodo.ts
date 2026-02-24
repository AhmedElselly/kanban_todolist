import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";

const useUpdateTodo = () => {
  const result = useMutation({
    mutationFn: updateTodo,
  });

  return result;
};

export default useUpdateTodo;
