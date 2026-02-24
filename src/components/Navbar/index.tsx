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
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
            gap: 2,
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Kanban Board
          </Typography>

          {/* Search (Desktop Only) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              minWidth: 260,
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              value={title}
              onChange={handleChange}
            />
          </Box>

          {/* Add Button */}
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
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
