import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";

const TextField: React.FC<{
  fieldId: string;
  listeners: any;
  attributes: any;
}> = ({ fieldId, listeners, attributes }) => {
  return (
    <div className="flex gap-3 px-5 py-5 border border-slate-300 rounded-md">
      <div className="grow flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FieldQuestion fieldId={fieldId} />
          <FieldChooseAnsType fieldId={fieldId} />
        </div>

        <input
          className="py-5 px-3"
          placeholder={`answer goes here`}
          disabled
        />
        <FieldActions fieldId={fieldId} />
      </div>
      <div
        className="flex items-center cursor-grab p-2 bg-gray-200 rounded-md"
        {...listeners}
        {...attributes}
      >
        ⠿
      </div>
    </div>
  );
};

export default TextField;
