import React from "react";
import { useFormStore } from "../lib/formStore";
import { FormField } from "../entities/form";

const FieldQuestion: React.FC<{ field: FormField }> = ({ field }) => {
  const { changeFieldQuestion } = useFormStore();

  return (
    <input
      type="text"
      id={`field-question-${field.id}`}
      name={`field-question-${field.id}`}
      value={field.question || ""}
      onChange={(e) => changeFieldQuestion(field.id, e)}
      placeholder="Enter question"
      className=" grow font-medium text-xl md:text-2xl border-b-2 border-slate-400 focus:border-black focus:border-b-[3px] outline-none transition-all duration-200 caret-black"
    />
  );
};

export default FieldQuestion;
