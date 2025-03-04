import React from "react";
import { useFormStore } from "../lib/formStore";
import { FieldType, FormField } from "../entities/form";

const allowedAnswerTypes: FieldType[] = [
  "text" as const,
  "multipleChoice" as const,
  "fillInBlank" as const,
  "match" as const,
];

const FieldChooseAnsType: React.FC<{ field: FormField }> = ({ field }) => {
  const { changeFieldAnswerType } = useFormStore();

  return (
    <select
      name={`field-answer-type-${field.id}`}
      id={`field-answer-type-${field.id}`}
      value={field.type}
      onChange={(e) => changeFieldAnswerType(field.id, e)}
      className="w-44 px-3 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
    >
      {allowedAnswerTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default FieldChooseAnsType;
