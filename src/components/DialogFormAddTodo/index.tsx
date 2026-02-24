import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addTodo, type Todo, type TodoStatus } from "../../store/todoSlice";
import { useDispatch } from "react-redux";
import useCreateTodo from "../../hooks/addTodo";
import useUpdateTodo from "../../hooks/updateTodo";

interface Props {
  open: boolean;
  item?: Todo | null;
  onClose: () => void;
}

const statuses: TodoStatus[] = ["backlog", "inProgress", "review", "done"];

export default function AddTodoDialog({ open, item, onClose }: Props) {
  const dispatch = useDispatch();
  // create a todo item (card)
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("backlog");

  useEffect(() => {
    if (item) {
      setId(item.id);
      setTitle(item.title);
      if (item.description) {
        setDescription(item.description);
      }
      setStatus(item.status);
    }
  }, [item]);

  // creates a todo
  const createTodo = useCreateTodo();
  // update a todo in case if the item wasn't null
  const updateTodo = useUpdateTodo();

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: id ? id : crypto.randomUUID(),
      title,
      description,
      status,
    };
    // if there is an item passed as prop update that item and return
    if (item) {
      updateTodo.mutate({
        id: newTodo.id,
        updates: {
          ...newTodo,
        },
      });
      onClose();
      return;
    }
    // otherwise create a todo card and dispatch on success to redux
    createTodo.mutate(
      { ...newTodo },
      {
        onSuccess: () => {
          dispatch(addTodo({ newTodo }));

          setTitle("");
          setDescription("");
          setStatus("backlog");
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      style={{ overflow: "hidden" }}
    >
      <DialogTitle>Add New Todo</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, mt: 4 }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          rows={4}
          multiline
        />

        {!item ? (
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatus)}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
