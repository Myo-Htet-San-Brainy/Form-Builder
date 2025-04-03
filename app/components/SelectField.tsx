import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";
import { useFormStore } from "../lib/formStore";
import { Circle } from "lucide-react";
import { SelectField as SelectFieldType } from "../entities/form";
import FieldAddImage from "./FieldAddImage";
import clsx from "clsx";
import { MdDeleteForever } from "react-icons/md";
import { RxDragHandleDots1 } from "react-icons/rx";

const SelectField: React.FC<{
  field: SelectFieldType;
  listeners: any;
  attributes: any;
}> = ({ field, listeners, attributes }): React.ReactNode => {
  const { changeOption, addOption, changeCorrectAnswer, removeOption } =
    useFormStore();
  function handleChangeCorrectAnswer(newVal: string) {
    if (newVal === field.correctAnswer) {
      changeCorrectAnswer(field.id, "");
    } else {
      changeCorrectAnswer(field.id, newVal);
    }
  }

  return (
    <div className="flex gap-2 px-5 py-5 border border-slate-300 rounded-md">
      <div className="grow flex flex-col gap-6 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FieldQuestion field={field} />
          <FieldChooseAnsType field={field} />
        </div>
        <FieldAddImage field={field} />

        <div className="flex flex-col gap-3 items-start">
          {field.options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <button
                className="border-4 border-slate-300 rounded-full w-4 h-4 flex items-center justify-center"
                onClick={() => handleChangeCorrectAnswer(option.id)}
              >
                <div
                  className={clsx("rounded-full w-2 h-2 ", {
                    "bg-white": option.id !== field.correctAnswer,
                    "bg-blue-500": option.id === field.correctAnswer,
                  })}
                />
              </button>
              <input
                className=" font-medium text-sm border-b-2 border-slate-400 focus:border-black focus:border-b-[3px] outline-none transition-all duration-200 caret-black"
                type="text"
                placeholder="option"
                value={option.value}
                onChange={(e) => changeOption(field.id, option.id, e)}
              />
              <MdDeleteForever
                className="w-8 h-8"
                onClick={() => removeOption(field.id, option.id)}
              />
            </div>
          ))}
          <button onClick={() => addOption(field.id)}>Add Option</button>
        </div>
        <FieldActions field={field} />
      </div>
      <div
        className="self-center w-8 h-20 cursor-grab flex items-center  bg-gray-200 rounded-md"
        {...listeners}
        {...attributes}
      >
        <RxDragHandleDots1 className="text-black w-full h-7" />
      </div>
    </div>
  );
};

export default SelectField;
