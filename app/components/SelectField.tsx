import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";
import { useFormStore } from "../lib/formStore";
import { Circle } from "lucide-react";
import { SelectField as SelectFieldType } from "../entities/form";

const SelectField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formFields, changeOption, addOption } = useFormStore();
  const formField = formFields.find(
    (field) => field.id === fieldId
  ) as SelectFieldType;

  if (!formField) return null; // Handle case where field is not found

  return (
    <div className="px-5 py-5 flex flex-col gap-4 border border-slate-300 rounded-md">
      <div className="flex flex-col md:flex-row gap-4">
        <FieldQuestion fieldId={fieldId} />
        <FieldChooseAnsType fieldId={fieldId} />
      </div>
      <div className="flex flex-col gap-2 items-start">
        {formField.options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Circle size={20} />
            <input
              type="text"
              value={option.value}
              onChange={(e) => changeOption(fieldId, option.id, e)}
            />
          </div>
        ))}
        <button onClick={() => addOption(fieldId)}>Add Option</button>
      </div>
      <FieldActions fieldId={fieldId} />
    </div>
  );
};

export default SelectField;
