"use client";
import React, { useState } from "react";
import { FormField, isSelectField, isTextField } from "./entities/form";
import { Circle } from "lucide-react";
import { useFormStore } from "./lib/formStore";
import PreviewForm from "./components/PreviewForm";

const allowedAnswerTypes = [
  "text",
  "number",
  "date",
  "time",
  "email",
  "url",
  "tel",
  "multipleChoice",
];

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

const renderAnswer = (
  fieldId: string,
  field: FormField,
  changeOption: (
    fieldId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void,
  addOption: (fieldId: string) => void
) => {
  if (isTextField(field)) {
    return (
      <input type={field.type} placeholder={`${field.type} answer`} disabled />
    );
  } else if (isSelectField(field)) {
    return (
      <div>
        {field.options.map((option) => {
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
    );
  }
};

const FormBuilder = () => {
  const {
    title,
    formFields,
    addNewField,
    changeFieldAnswerType,
    changeFieldQuestion,
    changeFormTitle,
    deleteField,
    duplicateField,
    toggleFieldRequired,
    changeOption,
    addOption,
  } = useFormStore();
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

      {Object.entries(formFields).map(([id, field]) => (
        <div key={id} className="p-10 bg-red-500">
          {/* CHOOSE ANS TYPE */}
          <div>
            <label htmlFor={`field-answer-type-${id}`}>Answer type</label>
            <select
              name={`field-answer-type-${id}`}
              id={`field-answer-type-${id}`}
              value={field.type}
              onChange={(e) => changeFieldAnswerType(id, e)}
            >
              {allowedAnswerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* END OF CHOOSE ANS TYPE */}

          {/* QUESTION */}
          <div>
            <label htmlFor={`field-question-${id}`}>Question</label>
            <input
              type="text"
              id={`field-question-${id}`}
              name={`field-question-${id}`}
              value={field.question}
              onChange={(e) => changeFieldQuestion(id, e)}
              placeholder="Enter question"
            />
          </div>
          {/* END OF QUESTION */}

          {/* ANSWER */}
          <div>{renderAnswer(id, field, changeOption, addOption)}</div>
          {/* END OF ANSWER */}

          {/* Actions */}
          <div>
            <div>
              <label htmlFor={`field-required-${id}`}>Required</label>
              <input
                id={`field-required-${id}`}
                type="checkbox"
                checked={field.required}
                onChange={(e) => toggleFieldRequired(id, e)}
              />
            </div>
            <button onClick={() => deleteField(id)}>Delete</button>
            <button onClick={() => duplicateField(id)}>Duplicate</button>
          </div>
        </div>
      ))}

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
