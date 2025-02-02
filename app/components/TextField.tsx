import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";

const TextField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  return (
    <div className="px-5 py-5 flex flex-col gap-4 border border-slate-300 rounded-md">
      <div className="flex flex-col md:flex-row gap-4">
        <FieldQuestion fieldId={fieldId} />
        <FieldChooseAnsType fieldId={fieldId} />
      </div>
      <input className="py-5 px-3" placeholder={`answer goes here`} disabled />
      <FieldActions fieldId={fieldId} />
    </div>
  );
};

export default TextField;
