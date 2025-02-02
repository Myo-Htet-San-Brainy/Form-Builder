import React from "react";
import { useFormStore } from "../lib/formStore";

interface FieldActionsProps {
  fieldId: string;
}

const FieldActions: React.FC<FieldActionsProps> = ({ fieldId }) => {
  const { formFields, toggleFieldRequired, deleteField, duplicateField } =
    useFormStore();
  const formField = formFields.find((field) => field.id === fieldId);

  if (!formField) return null; // Handle case where field is not found

  return (
    <div className="flex gap-2">
      <div className="flex gap-1">
        <label htmlFor={`field-required-${fieldId}`}>Required</label>
        <input
          id={`field-required-${fieldId}`}
          type="checkbox"
          checked={formField.required || false}
          onChange={(e) => toggleFieldRequired(fieldId, e)}
        />
      </div>
      <button onClick={() => deleteField(fieldId)}>Delete</button>
      <button onClick={() => duplicateField(fieldId)}>Duplicate</button>
    </div>
  );
};

export default FieldActions;
