import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormField,
  isFillInBlankField,
  isMatchField,
  isSelectField,
  isTextField,
  FieldType,
  MatchField,
  MatchAnswerPair,
  TextField,
} from "../entities/form";

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

export function refineData({
  title,
  quizFields,
}: {
  title: string;
  quizFields: FormField[];
}) {
  let updatedQuizFields;
  updatedQuizFields = quizFields.map((quizField) => {
    if (isMatchField(quizField)) {
      return refineMatch(quizField);
    }
    return quizField;
  });
  return {
    title,
    quizFields: updatedQuizFields,
  };
}

export function refineMatch(matchField: MatchField) {
  return {
    ...matchField,
    correctAnswer: matchField.correctAnswer.map((answer: MatchAnswerPair) => [
      answer.prompt,
      answer.description,
    ]),
  };
}

// localstorage
export function addQuizLink({ id, title }: { id: string; title: string }) {
  // Get existing IDs (or initialize empty array if none exist)
  const existingILinks = JSON.parse(localStorage.getItem("quizLinks") || "[]");

  // Add new ID (if it doesn't already exist)
  if (!existingILinks.includes(id)) {
    existingILinks.push({ id, title });
    // Save back to localStorage
    localStorage.setItem("quizLinks", JSON.stringify(existingILinks));
  }
}

export function retrieveQuizLinks(): { id: string; title: string }[] {
  return JSON.parse(localStorage.getItem("quizLinks") ?? "[]");
}

export function removeQuizById(quizId: string) {
  let quizLinks = retrieveQuizLinks();
  quizLinks = quizLinks.filter((quizLink) => quizLink.id !== quizId);
  localStorage.setItem("quizLinks", JSON.stringify(quizLinks));
}
