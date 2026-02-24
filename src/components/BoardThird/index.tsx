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
import { Box, Typography } from "@mui/material";
import useMoveTodo from "../../hooks/moveTodo";
import AddTodoDialog from "../DialogFormAddTodo";
import useDeleteTodo from "../../hooks/deleteTodo";
import RemoveDialogue from "../RemoveDialogue";

export default function BoardThird() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [activeDrag, setActiveDrag] = useState<any>(null);

  const todos = useSelector(
    (state: RootState) => state.todos.todos,
  ) as TodosColumns;

  const resultCreate = useGetTodos();
  const todosUnstructred = resultCreate?.data;

  const modifyTodo = useMoveTodo();
  const deleteTodo = useDeleteTodo();

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
    setActiveDrag(source);
    dispatch(moveTodo(movedTodos));
  };

  const onDragEndHandler = () => {
    if (!activeDrag) return;

    modifyTodo.mutate({
      id: activeDrag.id,
      status: activeDrag.sortable.group,
    });

    setActiveDrag(null);
  };

  const handleSelectItem = (item: Todo) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleDeleteItemShow = (item: Todo) => {
    setOpenRemove(true);
    setSelectedItem(item);
  };

  const handleDeleteItem = () => {
    if (selectedItem) {
      deleteTodo.mutate(selectedItem.id);
    }
  };

  return (
    <DragDropProvider onDragOver={onDragHandler} onDragEnd={onDragEndHandler}>
      <div className="Root">
        {Object.entries(todos).map(([column, items], index) => {
          return (
            <Column key={column} id={column} index={index}>
              {/* Column Header */}
              <Typography
                sx={{
                  color: "#000",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {column}
              </Typography>

              {/* ⭐ Scrollable Area */}
              <Box className="ColumnContent">
                {items?.map((item: any, index: number) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    column={column}
                    handleSelectItem={handleSelectItem}
                    handleDeleteItemShow={handleDeleteItemShow}
                  />
                ))}
              </Box>
            </Column>
          );
        })}
      </div>
      <AddTodoDialog
        open={open}
        item={selectedItem}
        onClose={() => setOpen(false)}
      />

      <RemoveDialogue
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        fn={handleDeleteItem}
      />
    </DragDropProvider>
  );
}
