import { v4 as uuidv4 } from "uuid";
import { Form, FormField, FieldType } from "../entities/form";

export function convertFieldType(
  field: FormField,
  newType: FieldType
): FormField {
  const baseFieldProperties = {
    id: field.id,
    question: field.question,
    inlineImg: field.inlineImg,
  };

  // Mapping of type-specific transformations
  const typeConversions = {
    text: () => ({
      ...baseFieldProperties,
      type: "text" as const,
      correctAnswer: "",
    }),
    multipleChoice: () => ({
      ...baseFieldProperties,
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "" }],
      correctAnswer: "",
    }),
    fillInBlank: () => ({
      ...baseFieldProperties,
      type: "fillInBlank" as const,
      correctAnswer: "",
    }),
    match: () => ({
      ...baseFieldProperties,
      type: "match" as const,
      correctAnswer: [
        {
          id: uuidv4(),
          prompt: "",
          description: "",
        },
        {
          id: uuidv4(),
          prompt: "",
          description: "",
        },
        {
          id: uuidv4(),
          prompt: "",
          description: "",
        },
      ],
    }),
  };

  return typeConversions[newType]();
}

const quizPreviewAppBaseUrl = "http://localhost:3001/play";
export function idToLink(id: string) {
  return `${quizPreviewAppBaseUrl}/${id}`;
}
