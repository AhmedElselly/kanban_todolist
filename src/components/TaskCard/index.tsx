import { Card, CardContent, Typography } from "@mui/material";
import type { Todo } from "../../store/todoSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
// import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
  todo: Todo;
  index: number;
}

export default function TaskCard({ todo, index }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  // const { ref } = useSortable({
  //   id: todo.id,
  //   index,
  // });

  console.log({
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      drag
      // ref={ref}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      dragMomentum={false}
      dragDirectionLock
      animate={{
        scale: isDragging ? 1.05 : 1,
      }}
    >
      <Card
        sx={{
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          width: 200,
        }}
      >
        <CardContent>
          <Typography variant="subtitle1">{todo.title}</Typography>

          {todo.description && (
            <Typography variant="body2" color="text.secondary">
              {todo.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
