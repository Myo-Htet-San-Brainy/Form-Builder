import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Form, FieldTypes, isSelectField } from "../entities/form";
import { convertFieldType } from "../utils/index";

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
  changeOption: (
    fieldId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addOption: (fieldId: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  // Initial state
  formFields: {
    [uuidv4()]: {
      type: "text" as const,
      question: "default question",
      required: false,
    },
    [uuidv4()]: {
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "some option" }],
      question: "default question",
      required: false,
    },
  },

  title: "default title",

  // Method to add a new field
  addNewField: () =>
    set((state) => {
      const newId = uuidv4();
      const newField = {
        question: "",
        type: "text" as const,
      };
      return {
        ...state,
        formFields: { ...state.formFields, [newId]: newField },
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
      formFields: {
        ...state.formFields,
        [id]: {
          ...state.formFields[id],
          question: e.target.value,
        },
      },
    })),

  // Method to change field answer type
  changeFieldAnswerType: (id, e) =>
    set((state) => ({
      ...state,
      formFields: {
        ...state.formFields,
        [id]: convertFieldType(
          state.formFields[id],
          e.target.value as FieldTypes
        ),
      },
    })),

  // Method to delete a field
  deleteField: (id) =>
    set((state) => {
      const { [id]: deletedField, ...rest } = state.formFields;
      return {
        ...state,
        formFields: rest,
      };
    }),

  // Method to duplicate a field
  duplicateField: (id) =>
    set((state) => {
      const newId = uuidv4();
      return {
        ...state,
        formFields: { ...state.formFields, [newId]: state.formFields[id] },
      };
    }),

  // Method to toggle field required status
  toggleFieldRequired: (id, e) =>
    set((state) => {
      const field = state.formFields[id];
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [id]: { ...field, required: e.target.checked },
        },
      };
    }),

  // Method to change multiple choice option
  changeOption: (fieldId, optionId, e) =>
    set((state) => {
      const field = state.formFields[fieldId];
      return isSelectField(field)
        ? {
            ...state,
            formFields: {
              ...state.formFields,
              [fieldId]: {
                ...field,
                options: field.options.map((option) =>
                  option.id === optionId
                    ? { ...option, value: e.target.value }
                    : option
                ),
              },
            },
          }
        : state;
    }),

  //Method to add new option
  addOption: (fieldId) =>
    set((state) => {
      const field = state.formFields[fieldId];
      return isSelectField(field)
        ? {
            ...state,
            formFields: {
              ...state.formFields,
              [fieldId]: {
                ...field,
                options: [...field.options, { id: uuidv4(), value: "" }],
              },
            },
          }
        : state;
    }),
}));
