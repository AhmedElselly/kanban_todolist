import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Column from "./Column";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { moveTodo, type Todo, type TodosColumns } from "../../store/todoSlice";
import useGetTodos from "../../hooks/getTodos";
import { useEffect, useState } from "react";
import { groupTodos } from "../../helpers/rearrangeTodos";
import type { RootState } from "../../store";
import { Typography } from "@mui/material";
import useMoveTodo from "../../hooks/moveTodo";
import AddTodoDialog from "../DialogFormAddTodo";

export default function BoardThird() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  const todos = useSelector(
    (state: RootState) => state.todos.todos,
  ) as TodosColumns;

  const resultCreate = useGetTodos();
  const todosUnstructred = resultCreate?.data;

  const modifyMove = useMoveTodo();

  useEffect(() => {
    if (resultCreate.data) {
      const grouped = groupTodos(todosUnstructred);
      dispatch(moveTodo(grouped));
    }
  }, [resultCreate.data, dispatch]);

  const onDragHandler = (event: any) => {
    const { source } = event.operation;
    // console.log({ eventData: source });
    // console.log({
    //   activeId: source.id,
    //   status: source.sortable.group,
    // });
    if (source?.type === "column") return;
    const movedTodos = move(todos, event);

    modifyMove.mutate({ id: source.id, status: source.sortable.group });
    dispatch(moveTodo(movedTodos));
  };

  const handleSelectItem = (item: Todo) => {
    setOpen(true);
    setSelectedItem(item);
  };

  return (
    <DragDropProvider onDragOver={onDragHandler}>
      <div className="Root">
        {Object.entries(todos).map(([column, items], index) => {
          return (
            <Column key={column} id={column} index={index}>
              <Typography
                sx={{
                  color: "#000",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                {column}
              </Typography>
              {items?.map((item: any, index: number) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    column={column}
                    handleSelectItem={handleSelectItem}
                  />
                );
              })}
            </Column>
          );
        })}
      </div>
      <AddTodoDialog
        open={open}
        item={selectedItem}
        onClose={() => setOpen(false)}
      />
    </DragDropProvider>
  );
}
