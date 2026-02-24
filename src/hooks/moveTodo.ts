import { useMutation } from "@tanstack/react-query";
import { moveTodo } from "../api/todos";

const useMoveTodo = () => {
  const result = useMutation({
    mutationFn: moveTodo,
  });

  return result;
};
export default useMoveTodo;
