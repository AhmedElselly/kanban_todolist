import type { Todo } from "../store/todoSlice";

export function groupTodos(todos: Todo[]) {
  return {
    backlog: todos.filter((t) => t.status === "backlog"),
    inProgress: todos.filter((t) => t.status === "inProgress"),
    review: todos.filter((t) => t.status === "review"),
    done: todos.filter((t) => t.status === "done"),
  };
}
