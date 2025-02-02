"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, render }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return render(attributes, listeners, setNodeRef, style);
};

export default SortableItem;
