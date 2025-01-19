"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface formField {
  id: string | number;
  question: string;
  type?: string;
}

interface form {
  title: string;
  formFields: formField[];
}

const initialState = {
  title: "",
  formFields: [{ id: uuidv4(), question: "" }],
};

const allowedAnswerTypes = ["text", "number"];

const Page = () => {
  const [form, setForm] = useState<form>(initialState);
  function handleAddNewField() {
    const newId = uuidv4();
    const newField = {
      id: newId,
    };
  }
  return (
    <div>
      {/* actions */}
      <button onClick={handleAddNewField}>add new field</button>

      {/* render info asking form */}
      <div>
        <label htmlFor="form-title">Form Title</label>
        <input
          name="form-title"
          id="form-title"
          type="text"
          defaultValue={form.title}
        />
      </div>
      {form.formFields.map((field) => (
        <div key={field.id} className="p-10 bg-red-500">
          <div>
            <label htmlFor="field-question">Questiion</label>
            <input
              type="text"
              id="field-question"
              name="field-question"
              defaultValue={field.question}
            />
          </div>
          <div>
            <label htmlFor="field-answer-type">Answer type</label>
            <select name="field-answer-type" id="field-answer-type">
              {allowedAnswerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
