import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Todo status
export type TodoStatus = "backlog" | "inProgress" | "review" | "done";

// Single Todo
export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  // order: number;
}

interface TodosState {
  todos: {
    backlog: Todo[];
    inProgress: Todo[];
    review: Todo[];
    done: Todo[];
  };
}

const initialState: TodosState = {
  todos: {
    backlog: [],
    inProgress: [],
    review: [],
    done: [],
  },
};

export type CreateTodoPayload = Omit<Todo, "order">;

// grouping by key (status) - it creates an object where each TodoStatus key contains an array of todos belonging to that status
export type TodosColumns = Record<TodoStatus, Todo[]>;

interface AddTodoPayload {
  newTodo: CreateTodoPayload;
  // columnId: TodoStatus;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // add todo
    addTodo: (state: any, action: PayloadAction<AddTodoPayload>) => {
      const newTodo = {
        ...action.payload.newTodo,
      };
      const newArr = [...state.todos.backlog, newTodo];
      state.todos.backlog = newArr;
    },
    // move todo from list to another
    moveTodo: (state: any, action: PayloadAction<TodosColumns>) => {
      state.todos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, moveTodo } = todosSlice.actions;

const todosReducer = todosSlice.reducer;

export default todosReducer;
