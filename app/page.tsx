"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface FormField {
  id: string;
  question: string;
  type?: string;
}

interface Form {
  title: string;
  formFields: FormField[];
}

const initialState = {
  title: "",
  formFields: [{ id: uuidv4(), question: "" }],
};

const allowedAnswerTypes = ["text", "number"];

const Page = () => {
  const [form, setForm] = useState<Form>(initialState);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  // HANDLERS
  function handleAddNewField() {
    const newId = uuidv4();
    const newField = {
      id: newId,
      question: "",
    };
    setForm((prevState) => {
      return {
        title: prevState.title,
        formFields: [...prevState.formFields, newField],
      };
    });
  }
  function handleFormTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevState) => {
      return {
        title: e.target.value,
        formFields: prevState.formFields,
      };
    });
  }
  function handleFieldQuestionChange(
    id: string | number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prevState) => {
      const updatedFields = prevState.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, question: e.target.value };
        }
        return field;
      });
      return {
        title: prevState.title,
        formFields: updatedFields,
      };
    });
  }
  function handleFieldAnswerTypeChange(
    id: string | number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setForm((prevState) => {
      const updatedFields = prevState.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, type: e.target.value };
        }
        return field;
      });
      return {
        title: prevState.title,
        formFields: updatedFields,
      };
    });
  }
  function handleFieldDelete(
    id: string | number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    setForm((prevState) => {
      const updatedFields = prevState.formFields.filter((field) => {
        if (field.id === id) {
          return false;
        }
        return true;
      });
      return {
        title: prevState.title,
        formFields: updatedFields,
      };
    });
  }
  return (
    <div>
      {/* actions */}
      <button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? "Edit" : "Preview form"}
      </button>
      {showPreview ? (
        <PreviewForm form={form} />
      ) : (
        <FormBuilder
          form={form}
          handleAddNewField={handleAddNewField}
          handleFormTitleChange={handleFormTitleChange}
          handleFieldAnswerTypeChange={handleFieldAnswerTypeChange}
          handleFieldQuestionChange={handleFieldQuestionChange}
          handleFieldDelete={handleFieldDelete}
        />
      )}
    </div>
  );
};

interface FormBuilderProps {
  form: Form;
  handleAddNewField: () => void;
  handleFormTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFieldQuestionChange: (
    id: string | number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFieldAnswerTypeChange: (
    id: string | number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleFieldDelete: (
    id: string | number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}
const FormBuilder: React.FC<FormBuilderProps> = ({
  form,
  handleAddNewField,
  handleFormTitleChange,
  handleFieldQuestionChange,
  handleFieldAnswerTypeChange,
  handleFieldDelete,
}) => {
  return (
    <div>
      {/* actions */}
      <button onClick={handleAddNewField}>add new field</button>

      {/* FORM TITLE */}
      <div>
        <label htmlFor="form-title">Form Title</label>
        <input
          name="form-title"
          id="form-title"
          type="text"
          value={form.title}
          onChange={handleFormTitleChange}
          placeholder="enter form title"
        />
      </div>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}

      {form.formFields.map((field) => (
        <div key={field.id} className="p-10 bg-red-500">
          <div>
            <label htmlFor="field-question">Question</label>
            <input
              type="text"
              id="field-question"
              name="field-question"
              value={field.question}
              onChange={(e) => handleFieldQuestionChange(field.id, e)}
              placeholder="enter question"
            />
          </div>
          <div>
            <label htmlFor="field-answer-type">Answer type</label>
            <select
              name="field-answer-type"
              id="field-answer-type"
              onChange={(e) => handleFieldAnswerTypeChange(field.id, e)}
            >
              <option value={"text"}>select a type</option>
              {allowedAnswerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* actions */}
          <div>
            <button onClick={(e) => handleFieldDelete(field.id, e)}>
              delete
            </button>
          </div>
        </div>
      ))}
      {/*END OF FORM FIELDS */}
    </div>
  );
};

interface PreviewFormProps {
  form: Form;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ form }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));
      }}
    >
      {/* FORM TITLE */}
      <h1>{form.title}</h1>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}
      {form.formFields.map((field) => {
        return (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.question}</label>
            <input type={field.type} id={field.id} name={field.id} />
          </div>
        );
      })}
      {/*END OF FORM FIELDS */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;
