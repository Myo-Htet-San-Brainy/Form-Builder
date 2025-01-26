import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../entities/form";
import { convertFieldType, FieldTypes } from "../utils/index";

interface FormStore extends Form {
  addNewField: () => void;
  changeFormTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFieldQuestion: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  changeFieldAnswerType: (
    id: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  deleteField: (id: string) => void;
  duplicateField: (id: string) => void;
  toggleFieldRequired: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  changeMultipleChoiceOption: (
    fieldId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addOption: (fieldId: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  // Initial state
  formFields: [
    {
      id: uuidv4(),
      type: "text" as const,
      question: "default question",
      required: false,
    },
    {
      id: uuidv4(),
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "some option" }],
      question: "default question",
      required: false,
    },
  ],
  title: "default title",

  // Method to add a new field
  addNewField: () =>
    set((state) => {
      const newId = uuidv4();
      const newField = {
        id: newId,
        question: "",
        type: "text" as const,
      };
      return {
        ...state,
        formFields: [...state.formFields, newField],
      };
    }),

  // Method to change form title
  changeFormTitle: (e) =>
    set((state) => ({
      ...state,
      title: e.target.value,
    })),

  // Method to change field question
  changeFieldQuestion: (id, e) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, question: e.target.value } : field
      ),
    })),

  // Method to change field answer type
  changeFieldAnswerType: (id, e) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id
          ? convertFieldType(field, e.target.value as FieldTypes)
          : field
      ),
    })),

  // Method to delete a field
  deleteField: (id) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    })),

  // Method to duplicate a field
  duplicateField: (id) =>
    set((state) => {
      const itemToDuplicate = state.formFields.find((field) => field.id === id);
      if (!itemToDuplicate) return state;

      const newId = uuidv4();
      const newField = {
        ...itemToDuplicate,
        id: newId,
      };

      return {
        ...state,
        formFields: [...state.formFields, newField],
      };
    }),

  // Method to toggle field required status
  toggleFieldRequired: (id, e) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, required: e.target.checked } : field
      ),
    })),

  // Method to change multiple choice option
  changeMultipleChoiceOption: (fieldId, optionId, e) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === fieldId && field.type === "multipleChoice") {
          return {
            ...field,
            options: field.options.map((option) =>
              option.id === optionId
                ? { ...option, value: e.target.value }
                : option
            ),
          };
        }
        return field;
      }),
    })),

  //Method to add new option
  addOption: (fieldId) =>
    set((state) => {
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === fieldId && field.type === "multipleChoice") {
            return {
              ...field,
              options: [...field.options, { id: uuidv4(), value: "" }],
            };
          }
          return field;
        }),
      };
    }),
}));
