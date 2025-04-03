import React, { useState } from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";
import FieldAddImage from "./FieldAddImage";
import { clsx } from "clsx";
import { useFormStore } from "../lib/formStore";
import { TextField as TextFieldType, FillInBlankField } from "../entities/form";
import { RxDragHandleDots1 } from "react-icons/rx";

const TextField: React.FC<{
  field: TextFieldType | FillInBlankField;
  listeners: any;
  attributes: any;
}> = ({ field, listeners, attributes }): React.ReactNode => {
  const { changeCorrectAnswer } = useFormStore();

  function handleTextFieldCorrectAnsChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newVal = e.currentTarget.value;
    changeCorrectAnswer(field.id, newVal);
  }
  return (
    <div
      className={"flex gap-3 px-5 py-5 border border-slate-300 rounded-md "}
      // id={fieldId}

      // onDragLeave={(e) => setIsFileDragging(false)}
    >
      <div className="grow flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FieldQuestion field={field} />
          <FieldChooseAnsType field={field} />
        </div>
        <FieldAddImage field={field} />
        <input
          className="py-5 px-3"
          placeholder={`correct answer`}
          value={field.correctAnswer}
          onChange={handleTextFieldCorrectAnsChange}
        />
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

export default TextField;
