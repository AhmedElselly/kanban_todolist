import { useSortable } from "@dnd-kit/react/sortable";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Item({
  item,
  index,
  column,
  handleSelectItem,
  handleDeleteItemShow,
}: any) {
  const { ref, isDragging } = useSortable({
    id: item?.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <Card
      ref={ref}
      data-dragging={isDragging}
      sx={{
        cursor: "grab",
        "&:active": { cursor: "grabbing" },
        width: 200,
        marginTop: 2,
        backgroundColor: "#b0bec5",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1">{item.title}</Typography>
        {item.description && (
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        )}
      </CardContent>
      <Box>
        <Button onClick={() => handleSelectItem(item)}>
          <EditIcon sx={{ color: "#009688" }} />
        </Button>
        <Button onClick={() => handleDeleteItemShow(item)}>
          <DeleteIcon sx={{ color: "#651fff" }} />
        </Button>
      </Box>
    </Card>
  );
}
