import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Form, FieldTypes, isSelectField, FormField } from "../entities/form";
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
  // changeSmth: (activeId: number, overId: number) => void;
  changeFieldsOrder: (activeId: string, overId: string, arrayMove: any) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  // Initial state
  formFields: [
    {
      id: uuidv4(), // Add an `id` for each field
      type: "multipleChoice" as const,
      options: [{ id: uuidv4(), value: "Default Option" }],
      question: "Default Question",
      required: false,
    },
  ],

  title: "Default Title",

  // changeSmth(activeId, overId) {
  //   if (activeId !== overId) {
  //     set((state) => {
  //       if (activeId > overId) {
  //         const copy: Record<string, FormField> = JSON.parse(
  //           JSON.stringify(state.formFields)
  //         );
  //         const arrayCopy = Object.entries(copy);
  //         const elementWithActiveId = arrayCopy.find(
  //           (array) => array[1].order === activeId
  //         );
  //         const arrayWithoutActive = arrayCopy.filter(
  //           (array) => array[1].order !== activeId
  //         );
  //         if (elementWithActiveId) {
  //           elementWithActiveId[1].order = overId;
  //         }
  //         const updatedArray = arrayWithoutActive.map((element) => {
  //           if (element[1].order >= overId && element[1].order < activeId) {
  //             element[1].order -= 1;
  //           }
  //           return element;
  //         });
  //         if (elementWithActiveId) {
  //           updatedArray.push(elementWithActiveId);
  //         }
  //         return {
  //           ...state,
  //           formFields: Object.fromEntries(updatedArray),
  //         };
  //       } else {
  //         const copy: Record<string, FormField> = JSON.parse(
  //           JSON.stringify(state.formFields)
  //         );
  //         const arrayCopy = Object.entries(copy);
  //         const elementWithActiveId = arrayCopy.find(
  //           (array) => array[1].order === activeId
  //         );
  //         const arrayWithoutActive = arrayCopy.filter(
  //           (array) => array[1].order !== activeId
  //         );
  //         if (elementWithActiveId) {
  //           elementWithActiveId[1].order = overId;
  //         }
  //         const updatedArray = arrayWithoutActive.map((element) => {
  //           if (element[1].order <= overId && element[1].order > activeId) {
  //             element[1].order -= 1;
  //           }
  //           return element;
  //         });
  //         if (elementWithActiveId) {
  //           updatedArray.push(elementWithActiveId);
  //         }
  //         return {
  //           ...state,
  //           formFields: Object.fromEntries(updatedArray),
  //         };
  //       }
  //     });
  //   }
  // },

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
        required: false, // Default required status
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

  changeFieldQuestion: (id: string, e: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map(
        (field) =>
          field.id === id
            ? { ...field, question: e.target.value } // Update the question for the matching field
            : field // Leave other fields unchanged
      ),
    })),

  // Method to change field answer type
  changeFieldAnswerType: (
    id: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
    set((state) => ({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id
          ? convertFieldType(field, e.target.value as FieldTypes)
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
