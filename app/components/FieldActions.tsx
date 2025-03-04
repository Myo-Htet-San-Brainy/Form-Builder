import React from "react";
import { useFormStore } from "../lib/formStore";
import { FormField } from "../entities/form";

interface FieldActionsProps {
  field: FormField;
}

const FieldActions: React.FC<FieldActionsProps> = ({ field }) => {
  const { toggleFieldRequired, deleteField, duplicateField } = useFormStore();

  return (
    <div className="flex gap-2">
      {/* <div className="flex gap-1">
        <label htmlFor={`field-required-${fieldId}`}>Required</label>
        <input
          id={`field-required-${fieldId}`}
          type="checkbox"
          checked={formField.required || false}
          onChange={(e) => toggleFieldRequired(fieldId, e)}
        />
      </div> */}
      <button onClick={() => deleteField(field.id)}>Delete</button>
      <button onClick={() => duplicateField(field.id)}>Duplicate</button>
    </div>
  );
};

export default FieldActions;
