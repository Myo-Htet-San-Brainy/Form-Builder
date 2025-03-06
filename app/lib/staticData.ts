import { v4 as uuidv4 } from "uuid";

export const defaultQuizBuilderState = {
  formFields: [
    {
      id: uuidv4(), // Add an `id` for each field
      type: "fillInBlank" as const,
      question: "Default Question",
      correctAnswer: "",
    },
  ],

  title: "Default Title",
  errors: [],
};
