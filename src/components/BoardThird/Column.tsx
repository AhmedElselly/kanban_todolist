import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";

export default function Column({ children, id, index }: any) {
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div className="Column" ref={ref}>
      {children}
    </div>
  );
}
