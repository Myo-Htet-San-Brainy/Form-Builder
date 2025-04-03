import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Form, FieldType, isSelectField, FormField } from "../entities/form";
import { convertFieldType } from "../utils/index";
import { defaultQuizBuilderState } from "./staticData";
import { retrieveQuizLinks } from "../utils/browserUtils";

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
  // changeSmth: (activeId: number, overId: number) => void;
  changeFieldsOrder: (activeId: string, overId: string, arrayMove: any) => void;
  changeFieldInlineImg: (fieldId: string, imgFile: File) => void;
  removeFieldInlineImg: (fieldId: string) => void;
  changeCurrentSelectedField: (fieldId: string) => void;
  changeCorrectAnswer: (fieldId: string, newCorrectAnsVal: any) => void;
  removeOption: (fieldId: string, optionId: string) => void;
  updateCurrentQuizId: (quizId: string) => void;
  handleError: (key: any, errorMsg: string) => void;
  removeAllErrors: () => void;
  setDefault: () => void;
  createdQuizzes: { id: string; title: string }[];
  pushQuiz: (quiz: { id: string; title: string }) => void;
  deleteQuiz: (quidId: string) => void;
}
const isClient = typeof window === "object";
export const useFormStore = create<FormStore>((set) => ({
  // Initial state
  ...defaultQuizBuilderState,
  createdQuizzes: isClient ? retrieveQuizLinks() : [],
  pushQuiz(quiz) {
    set((state) => {
      return {
        ...state,
        createdQuizzes: [...state.createdQuizzes, quiz],
      };
    });
  },
  deleteQuiz(quidId) {
    set((state) => {
      return {
        ...state,
        createdQuizzes: state.createdQuizzes.filter(
          (quiz) => quiz.id !== quidId
        ),
      };
    });
  },
  updateCurrentQuizId(quizId) {
    set((state) => {
      return {
        ...state,
        currentQuizId: quizId,
      };
    });
  },
  setDefault() {
    set((state) => {
      return {
        ...state,
        ...defaultQuizBuilderState,
      };
    });
  },
  removeAllErrors() {
    set((state) => {
      return {
        ...state,
        errors: [],
      };
    });
  },
  handleError(key, errorMsg) {
    set((state) => {
      const isErrorAlreadyExisted = Boolean(
        state.errors.find((error) => error.key === key)
      );
      if (isErrorAlreadyExisted) {
        return {
          ...state,
          errors: state.errors.map((error) => {
            if (error.key === key) {
              return {
                ...error,
                errors: [...error.errors, errorMsg],
              };
            }
            return error;
          }),
        };
      } else {
        return {
          ...state,
          errors: [...state.errors, { key: key, errors: [errorMsg] }],
        };
      }
    });
  },

  // addFormError(error) {
  //   set((state) => {
  //     return {
  //       ...state,
  //       formErrors: [...state.formErrors, error],
  //     };
  //   });
  // },
  // addFieldError(fieldId, error) {
  //   set((state) => ({
  //     ...state,
  //     formFields: state.formFields.map((field) => {
  //       if (field.id === fieldId) {
  //         return { ...field, errors: [...field.errors, error] };
  //       } else {
  //         return field;
  //       }
  //     }),
  //   }));
  // },
  changeCorrectAnswer(fieldId, newCorrectAnsVal) {
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, correctAnswer: newCorrectAnsVal };
        } else {
          return field;
        }
      }),
    }));
  },
  removeFieldInlineImg(fieldId) {
    console.log(fieldId);
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, inlineImg: undefined };
        } else {
          return field;
        }
      }),
    }));
  },

  changeCurrentSelectedField(fieldId) {
    set((state) => ({
      ...state,
      currentSelectedField: fieldId,
    }));
  },

  changeFieldInlineImg(fieldId, imgFile) {
    console.log("inside change");
    console.log("inside change, file", imgFile);
    console.log("inside change, fieldId", fieldId);

    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === fieldId) {
          console.log("equal");
          return { ...field, inlineImg: imgFile };
        } else {
          return field;
        }
      }),
    }));
  },

  changeFieldsOrder(activeId, overId, arrayMove) {
    set((prev) => {
      const ids = prev.formFields.map((formField) => formField.id);
      const oldIndex = ids.indexOf(activeId);
      const newIndex = ids.indexOf(overId);
      // console.log(arrayMove(prev.formFields, oldIndex, newIndex));
      return {
        ...prev,
        formFields: arrayMove(prev.formFields, oldIndex, newIndex),
      };
    });
  },

  // Method to add a new field

  addNewField: () =>
    set((state) => {
      const newField: FormField = {
        id: uuidv4(), // Add a unique ID for the new field
        question: "", // Default question
        type: "text", // Default type
        correctAnswer: "",
      };

      return {
        ...state,
        formFields: [...state.formFields, newField], // Add the new field to the array
      };
    }),

  // Method to change form title
  changeFormTitle: (e) =>
    set((state) => ({
      ...state,
      title: e.target.value,
    })),

  changeFieldQuestion: (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      ...state,
      formFields: state.formFields.map(
        (field) =>
          field.id === id
            ? { ...field, question: e.target.value } // Update the question for the matching field
            : field // Leave other fields unchanged
      ),
    }));
  },

  // Method to change field answer type
  changeFieldAnswerType: (
    id: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id
          ? convertFieldType(field, e.target.value as FieldType)
          : field
      ),
    })),
  // Method to delete a field
  deleteField: (id: string) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    })),

  // Method to duplicate a field
  duplicateField: (id: string) =>
    set((state) => {
      const fieldToDuplicate = state.formFields.find(
        (field) => field.id === id
      );
      if (!fieldToDuplicate) return state; // If field doesn't exist, return state as is

      const newField = { ...fieldToDuplicate, id: uuidv4() };

      return {
        ...state,
        formFields: [...state.formFields, newField],
      };
    }),

  // Method to toggle field required status
  toggleFieldRequired: (id: string, e: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, required: e.target.checked } : field
      ),
    })),

  //
  removeOption: (fieldId, optionId) => {
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === fieldId && isSelectField(field)
          ? {
              ...field,
              options: field.options.filter((option) => option.id !== optionId),
            }
          : field
      ),
    }));
  },

  // Method to change multiple choice option
  changeOption: (
    fieldId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === fieldId && isSelectField(field)
          ? {
              ...field,
              options: field.options.map((option) =>
                option.id === optionId
                  ? { ...option, value: e.target.value }
                  : option
              ),
            }
          : field
      ),
    })),

  // Method to add new option
  addOption: (fieldId: string) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === fieldId && isSelectField(field)
          ? {
              ...field,
              options: [...field.options, { id: uuidv4(), value: "" }],
            }
          : field
      ),
    })),
}));
