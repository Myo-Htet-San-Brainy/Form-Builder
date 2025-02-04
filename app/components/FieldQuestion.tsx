import React from "react";
import { useFormStore } from "../lib/formStore";

const FieldQuestion: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formFields, changeFieldQuestion } = useFormStore();
  const formField = formFields.find((field) => field.id === fieldId);

  if (!formField) return null; // Handle case where field is not found

  return (
    <input
      type="text"
      id={`field-question-${fieldId}`}
      name={`field-question-${fieldId}`}
      value={formField.question || ""}
      onChange={(e) => changeFieldQuestion(fieldId, e)}
      placeholder="Enter question"
      className=" grow font-medium text-xl md:text-2xl border-b-2 border-slate-400 focus:border-black focus:border-b-[3px] outline-none transition-all duration-200 caret-black"
    />
  );
};

export default FieldQuestion;
