import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";
import { useFormStore } from "../lib/formStore";
import { Circle } from "lucide-react";
import { SelectField as SelectFieldType } from "../entities/form";

const SelectField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formFields, changeOption, addOption } = useFormStore();
  const formField = formFields[fieldId] as SelectFieldType;

  return (
    <div className="bg-amber-100">
      <FieldChooseAnsType fieldId={fieldId} />
      <FieldQuestion fieldId={fieldId} />
      <div>
        {formField.options.map((option) => {
          return (
            <div key={option.id} className="flex">
              <Circle size={20} />
              <input
                type="text"
                value={option.value}
                onChange={(e) => changeOption(fieldId, option.id, e)}
              />
            </div>
          );
        })}
        <button onClick={() => addOption(fieldId)}>add option</button>
      </div>
      <FieldActions fieldId={fieldId} />
    </div>
  );
};

export default SelectField;
