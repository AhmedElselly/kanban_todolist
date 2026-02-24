import type { Todo } from "../store/todoSlice";
import { api } from "./";

export const getTodos = async () => {
  const { data } = await api.get("/todos");
  return data;
};

export const createTodo = async (todo: Todo) => {
  const { data } = await api.post("/todos", todo);
  return data;
};

export const moveTodo = async ({ status, id }: Pick<Todo, "id" | "status">) => {
  const { data } = await api.patch(`/todos/${id}`, { status });
  return data;
};

export const updateTodo = async ({ id, updates }: any) => {
  const { data } = await api.patch(`/todos/${id}`, updates);
  return data;
};

export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`);
};
