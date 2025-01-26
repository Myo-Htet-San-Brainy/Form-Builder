"use client";
import React, { useState } from "react";
import { FormField } from "./entities/form";
import { Circle } from "lucide-react";
import { useFormStore } from "./lib/formStore";

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
      <FormBuilder />
    </div>
  );
};

const renderAnswer = (
  field: FormField,
  changeMultipleChoiceOption: (
    fieldId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void,
  addOption: (fieldId: string) => void
) => {
  if (
    field.type === "text" ||
    field.type === "number" ||
    field.type === "date" ||
    field.type === "time" ||
    field.type === "email" ||
    field.type === "url" ||
    field.type === "tel"
  ) {
    return (
      <input type={field.type} placeholder={`${field.type} answer`} disabled />
    );
  } else if (field.type === "multipleChoice") {
    return (
      <div>
        {field.options.map((option) => {
          return (
            <div key={option.id} className="flex">
              <Circle size={20} />
              <input
                type="text"
                value={option.value}
                onChange={(e) =>
                  changeMultipleChoiceOption(field.id, option.id, e)
                }
              />
            </div>
          );
        })}
        <button onClick={() => addOption(field.id)}>add option</button>
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
    changeMultipleChoiceOption,
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

      {formFields.map((field) => (
        <div key={field.id} className="p-10 bg-red-500">
          {/* CHOOSE ANS TYPE */}
          <div>
            <label htmlFor="field-answer-type">Answer type</label>
            <select
              name="field-answer-type"
              id="field-answer-type"
              value={field.type}
              onChange={(e) => changeFieldAnswerType(field.id, e)}
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
            <label htmlFor="field-question">Question</label>
            <input
              type="text"
              id="field-question"
              name="field-question"
              value={field.question}
              onChange={(e) => changeFieldQuestion(field.id, e)}
              placeholder="enter question"
            />
          </div>
          {/* END OF QUESTION */}
          {/* ANSWER */}
          <div>
            {renderAnswer(field, changeMultipleChoiceOption, addOption)}
          </div>
          {/* END OF ANSWER */}
          {/* actions */}
          <div>
            <div>
              <label htmlFor="field-required">Required</label>
              <input
                id="field-required"
                type="checkbox"
                checked={field.required}
                onChange={(e) => toggleFieldRequired(field.id, e)}
              />
            </div>
            <button onClick={() => deleteField(field.id)}>delete</button>
            <button onClick={() => duplicateField(field.id)}>duplicate</button>
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
// interface PreviewFormProps {
//   form: Form;
// }

// const PreviewForm: React.FC<PreviewFormProps> = ({ form }) => {
//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         console.log(Object.fromEntries(formData));
//       }}
//     >
//       {/* FORM TITLE */}
//       <h1>{form.title}</h1>
//       {/* END OF FORM TITLE */}
//       {/* FORM FIELDS */}
//       {form.formFields.map((field) => {
//         return (
//           <div key={field.id}>
//             <label htmlFor={field.id}>{field.question}</label>
//             <input type={field.type} id={field.id} name={field.id} />
//           </div>
//         );
//       })}
//       {/*END OF FORM FIELDS */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

export default Page;
