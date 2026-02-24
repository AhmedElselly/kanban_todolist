import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Fragment, useState } from "react";
import AddTodoDialog from "../DialogFormAddTodo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <AppBar position="static" style={{ background: "teal" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Kanban Board
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Add Todo
          </Button>
        </Toolbar>
      </AppBar>

      <AddTodoDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
}
