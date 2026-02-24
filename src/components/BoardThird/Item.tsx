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
        backgroundColor: "#1E1E1E",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" color="#fff">
          {item.title}
        </Typography>
        {item.description && (
          <Typography variant="body2" color="#fff">
            {item.description}
          </Typography>
        )}
      </CardContent>
      <Box>
        <Button onClick={() => handleSelectItem(item)}>
          <EditIcon sx={{ color: "#fff" }} />
        </Button>
        <Button onClick={() => handleDeleteItemShow(item)}>
          <DeleteIcon sx={{ color: "#fff" }} />
        </Button>
      </Box>
    </Card>
  );
}
