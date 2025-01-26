import { v4 as uuidv4 } from "uuid";
import { Form, FormField } from "../entities/form";

export type FieldTypes = "text" | "select" | "multipleChoice" | "checkbox";

export function convertFieldType(
  field: FormField,
  newType: FieldTypes
): FormField {
  const baseFieldProperties = {
    id: field.id,
    question: field.question,
    required: field.required,
  };

  // Mapping of type-specific transformations
  const typeConversions = {
    text: () => ({
      ...baseFieldProperties,
      type: "text" as const,
    }),
    select: () => ({
      ...baseFieldProperties,
      type: "select" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
    multipleChoice: () => ({
      ...baseFieldProperties,
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
    checkbox: () => ({
      ...baseFieldProperties,
      type: "checkbox" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
  };

  return typeConversions[newType]();
}
