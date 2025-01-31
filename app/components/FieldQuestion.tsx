import React from "react";
import { useFormStore } from "../lib/formStore";

const FieldQuestion: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formFields, changeFieldQuestion } = useFormStore();
  const formField = formFields[fieldId];

  return (
    <div>
      <label htmlFor={`field-question-${fieldId}`}>Question</label>
      <input
        type="text"
        id={`field-question-${fieldId}`}
        name={`field-question-${fieldId}`}
        value={formField?.question}
        onChange={(e) => changeFieldQuestion(fieldId, e)}
        placeholder="Enter question"
      />
    </div>
  );
};

export default FieldQuestion;
