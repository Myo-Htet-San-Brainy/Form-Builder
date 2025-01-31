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
  const formField = formFields[fieldId];
  return (
    <div>
      <label htmlFor={`field-answer-type-${fieldId}`}>Answer type</label>
      <select
        name={`field-answer-type-${fieldId}`}
        id={`field-answer-type-${fieldId}`}
        value={formField?.type}
        onChange={(e) => changeFieldAnswerType(fieldId, e)}
      >
        {allowedAnswerTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FieldChooseAnsType;
