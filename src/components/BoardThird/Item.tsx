import { useSortable } from "@dnd-kit/react/sortable";
import { Card, CardContent, Typography } from "@mui/material";

export default function Item({ item, index, column }: any) {
  console.log({ itemId: item?.id });

  const { ref, isDragging } = useSortable({
    id: item?.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  // return (
  //   <button className="Item" ref={ref} data-dragging={isDragging}>
  //     {item.title}
  //   </button>
  // );

  return (
    <Card
      ref={ref}
      data-dragging={isDragging}
      sx={{
        cursor: "grab",
        "&:active": { cursor: "grabbing" },
        width: 200,
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
    </Card>
  );
}
