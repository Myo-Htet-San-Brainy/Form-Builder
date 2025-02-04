import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";
import { useFormStore } from "../lib/formStore";
import { Circle } from "lucide-react";
import { SelectField as SelectFieldType } from "../entities/form";
import FieldAddImage from "./FieldAddImage";

const SelectField: React.FC<{
  fieldId: string;
  listeners: any;
  attributes: any;
}> = ({ fieldId, listeners, attributes }) => {
  const { formFields, changeOption, addOption } = useFormStore();
  const formField = formFields.find(
    (field) => field.id === fieldId
  ) as SelectFieldType;

  if (!formField) return null; // Handle case where field is not found

  return (
    <div className="flex gap-2 px-5 py-5 border border-slate-300 rounded-md">
      <div className="grow flex flex-col gap-6 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FieldQuestion fieldId={fieldId} />
          <FieldChooseAnsType fieldId={fieldId} />
        </div>
        <FieldAddImage fieldId={fieldId} />

        <div className="flex flex-col gap-3 items-start">
          {formField.options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <Circle size={20} />
              <input
                className=" font-medium text-sm border-b-2 border-slate-400 focus:border-black focus:border-b-[3px] outline-none transition-all duration-200 caret-black"
                type="text"
                placeholder="option"
                value={option.value}
                onChange={(e) => changeOption(fieldId, option.id, e)}
              />
            </div>
          ))}
          <button onClick={() => addOption(fieldId)}>Add Option</button>
        </div>
        <FieldActions fieldId={fieldId} />
      </div>
      <div
        className="self-center flex items-center cursor-grab p-2 bg-gray-200 rounded-md"
        {...listeners}
        {...attributes}
      >
        ⠿
      </div>
    </div>
  );
};

export default SelectField;
