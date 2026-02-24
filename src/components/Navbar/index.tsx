import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddTodoDialog from "../DialogFormAddTodo";
import useSearchTodos from "../../hooks/searchTodo";
import { groupTodos } from "../../helpers/rearrangeTodos";
import { useDispatch } from "react-redux";
import { moveTodo } from "../../store/todoSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const { data } = useSearchTodos(title);
  console.log({ data });

  useEffect(() => {
    if (data) {
      const grouped = groupTodos(data);
      dispatch(moveTodo(grouped));
    }
  }, [data, dispatch]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setTitle(value);
  };

  return (
    <Fragment>
      <AppBar position="static" style={{ background: "#fff" }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#000" }}>
            Kanban Board
          </Typography>

          <Box style={{ marginInlineEnd: 250 }}>
            <TextField
              id="search"
              label="Search"
              variant="standard"
              sx={{
                borderRadius: 2,
              }}
              onChange={handleChange}
              value={title}
              name="title"
            />
          </Box>

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpen(true)}
            style={{
              color: "#000",
            }}
          >
            Add Todo
          </Button>
        </Toolbar>
      </AppBar>

      <AddTodoDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
}
