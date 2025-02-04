"use client";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { FormField } from "../entities/form";

const Droppable: React.FC<{
  fieldId: string;
  field: FormField;
  render: (
    field: FormField,
    fieldId: string,
    isOver: boolean,
    setNodeRef: (element: HTMLElement | null) => void
  ) => React.ReactNode;
}> = ({ render, field, fieldId }) => {
  const { setNodeRef, isOver } = useDroppable({ id: fieldId });
  return render(field, fieldId, isOver, setNodeRef);
};

export default Droppable;
