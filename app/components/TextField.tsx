import React from "react";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldQuestion from "./FieldQuestion";
import FieldActions from "./FieldActions";

const TextField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  return (
    <div className="bg-sky-300">
      <FieldChooseAnsType fieldId={fieldId} />
      <FieldQuestion fieldId={fieldId} />
      <input placeholder={`answer goes here`} disabled />;
      <FieldActions fieldId={fieldId} />
    </div>
  );
};

export default TextField;
