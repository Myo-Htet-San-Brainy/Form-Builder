import { v4 as uuidv4 } from "uuid";
import { Form, FormField, FieldTypes } from "../entities/form";

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
    number: () => ({
      ...baseFieldProperties,
      type: "number" as const,
    }),
    date: () => ({
      ...baseFieldProperties,
      type: "date" as const,
    }),
    time: () => ({
      ...baseFieldProperties,
      type: "time" as const,
    }),
    email: () => ({
      ...baseFieldProperties,
      type: "email" as const,
    }),
    url: () => ({
      ...baseFieldProperties,
      type: "url" as const,
    }),
    tel: () => ({
      ...baseFieldProperties,
      type: "tel" as const,
    }),
    select: () => ({
      ...baseFieldProperties,
      type: "select" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
    radio: () => ({
      ...baseFieldProperties,
      type: "radio" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
    checkbox: () => ({
      ...baseFieldProperties,
      type: "checkbox" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
    multipleChoice: () => ({
      ...baseFieldProperties,
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "" }],
    }),
  };

  return typeConversions[newType]();
}
