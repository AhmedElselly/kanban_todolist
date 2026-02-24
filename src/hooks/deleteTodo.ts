import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  return result;
};

export default useDeleteTodo;
