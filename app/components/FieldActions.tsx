import React from "react";
import { useFormStore } from "../lib/formStore";

interface FieldActionsProps {
  fieldId: string;
}

const FieldActions: React.FC<FieldActionsProps> = ({ fieldId }) => {
  const { formFields, toggleFieldRequired, deleteField, duplicateField } =
    useFormStore();
  const formField = formFields[fieldId];

  return (
    <div>
      <div>
        <label htmlFor={`field-required-${fieldId}`}>Required</label>
        <input
          id={`field-required-${fieldId}`}
          type="checkbox"
          checked={formField?.required}
          onChange={(e) => toggleFieldRequired(fieldId, e)}
        />
      </div>
      <button onClick={() => deleteField(fieldId)}>Delete</button>
      <button onClick={() => duplicateField(fieldId)}>Duplicate</button>
    </div>
  );
};

export default FieldActions;
