import React from "react";
import { useFormStore } from "../lib/formStore";

const allowedAnswerTypes = [
  "text",
  "number",
  "date",
  "time",
  "email",
  "url",
  "tel",
  "multipleChoice",
];

const FieldChooseAnsType: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formFields, changeFieldAnswerType } = useFormStore();
  const formField = formFields.find((field) => field.id === fieldId);

  if (!formField) return null; // Handle case where field is not found

  return (
    <select
      name={`field-answer-type-${fieldId}`}
      id={`field-answer-type-${fieldId}`}
      value={formField.type}
      onChange={(e) => changeFieldAnswerType(fieldId, e)}
      className="w-44 px-3 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
    >
      {allowedAnswerTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default FieldChooseAnsType;
