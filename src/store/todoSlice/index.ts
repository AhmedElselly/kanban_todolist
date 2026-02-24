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

// type TodosColumns = {
//   backlog: Todo[];
//   inProgress: Todo[];
//   review: Todo[];
//   done: Todo[];
// };

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
      console.log({ payload: action.payload, state: state });
      const newTodo = {
        ...action.payload.newTodo,
      };
      const newArr = [...state.todos.backlog, newTodo];
      state.todos.backlog = newArr;
    },

    // remove todo
    removeTodo: (state: any, action: PayloadAction<string>) => {
      const newArr = state.todos.filter(
        (todo: Todo) => todo.id !== action.payload,
      );
      state.todos = [...newArr];
    },

    // update single todo
    updateTodo: (state: any, action: PayloadAction<Partial<Todo>>) => {
      if (action.payload.id) {
        const foundTodo = state.todos.find(
          (todo: Todo) => todo.id === action.payload.id,
        );

        if (foundTodo) {
          if (action.payload.title) {
            foundTodo.title = action.payload.title;
          }

          if (action.payload.description) {
            foundTodo.description = action.payload.description;
          }
        }
      }
    },

    moveTodo: (state: any, action: PayloadAction<TodosColumns>) => {
      console.log({ payload: action.payload });
      state.todos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, moveTodo, removeTodo, updateTodo } = todosSlice.actions;

const todosReducer = todosSlice.reducer;

export default todosReducer;
