import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // refetch todos
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return result;
};

export default useUpdateTodo;
