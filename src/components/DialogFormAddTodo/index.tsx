import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { addTodo, type TodoStatus } from "../../store/todoSlice";
import { useDispatch } from "react-redux";
import useCreateTodo from "../../hooks/addTodo";

interface Props {
  open: boolean;
  onClose: () => void;
}

const statuses: TodoStatus[] = ["backlog", "inProgress", "review", "done"];

export default function AddTodoDialog({ open, onClose }: Props) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("backlog");

  const createTodo = useCreateTodo();

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
    };

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
