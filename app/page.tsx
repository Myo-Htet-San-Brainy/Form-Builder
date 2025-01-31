"use client";
import React, { useState } from "react";
import { FormField, isSelectField, isTextField } from "./entities/form";
import { useFormStore } from "./lib/formStore";
import PreviewForm from "./components/PreviewForm";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField";

const Page = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setShowPreview(!showPreview)}>
        show/stop preview
      </button>
      <div>{showPreview ? <PreviewForm /> : <FormBuilder />}</div>
    </div>
  );
};

const renderField = (fieldId: string, field: FormField) => {
  if (isTextField(field)) {
    return <TextField fieldId={fieldId} />;
  } else if (isSelectField(field)) {
    return <SelectField fieldId={fieldId} />;
  }
};

const FormBuilder = () => {
  const { title, formFields, addNewField, changeFormTitle } = useFormStore();
  // console.log(useFormStore.getState());
  return (
    <div>
      {/* actions */}
      <button onClick={addNewField}>add new field</button>

      {/* FORM TITLE */}
      <div>
        <label htmlFor="form-title">Form Title</label>
        <input
          name="form-title"
          id="form-title"
          type="text"
          value={title}
          onChange={changeFormTitle}
          placeholder="enter form title"
        />
      </div>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}

      {Object.entries(formFields).map(([id, field]) => renderField(id, field))}

      {/*END OF FORM FIELDS */}
    </div>
  );
};
// interface FormBuilderProps {
//   form: Form;
//   handleAddNewField: () => void;
//   handleFormTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleFieldQuestionChange: (
//     id: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   handleFieldAnswerTypeChange: (
//     id: string,
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => void;
//   handleFieldDelete: (
//     id: string,
//     e: React.MouseEvent<HTMLButtonElement>
//   ) => void;
//   handleFieldDuplicate: (id: string) => void;
//   handleFieldRequired: (
//     id: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   handleMultipleChoiceOptionChange: (
//     fieldId: string,
//     optionId: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
// }

export default Page;
