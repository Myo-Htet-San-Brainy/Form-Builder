"use client";
import React, { useState } from "react";
import { FormField, isSelectField, isTextField } from "./entities/form";
import { useFormStore } from "./lib/formStore";
import PreviewForm from "./components/PreviewForm";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./components/SortableItem";

const Page = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  return (
    <div>
      <div className="px-5 py-5 flex justify-between gap-4">
        <h1 className="font-bold text-xl">Form Builder</h1>
        <button
          className=" btn bg-black text-white "
          onClick={() => setShowPreview(!showPreview)}
        >
          show/stop preview
        </button>
      </div>
      <div>{showPreview ? <PreviewForm /> : <FormBuilder />}</div>
    </div>
  );
};

const renderField = (field: FormField) => {
  if (isTextField(field)) {
    return <TextField fieldId={field.id} />;
  } else if (isSelectField(field)) {
    return <SelectField fieldId={field.id} />;
  }
};

const FormBuilder = () => {
  const { title, formFields, addNewField, changeFormTitle, changeFieldsOrder } =
    useFormStore();
  // console.log(useFormStore.getState());
  // console.log(formFieldsArray);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(e: any) {
    // console.log(e);
    const activeId = e.active.id;
    const overId = e.over.id;
    if (activeId !== overId) {
      changeFieldsOrder(activeId, overId, arrayMove);
    }
    // changeSmth(activeId, overId);
  }

  return (
    <div className="px-10 md:px-20 flex flex-col gap-4">
      {/* FORM TITLE */}
      <div className="px-5 py-5 flex flex-col gap-4 border border-slate-300 rounded-md">
        <label htmlFor="form-title" className="font-medium text-2xl">
          Enter Form Title
        </label>
        <input
          name="form-title"
          id="form-title"
          type="text"
          value={title}
          onChange={changeFormTitle}
          placeholder="enter form title"
          className="border-b-2 border-slate-400 focus:border-black focus:border-b-[3px] outline-none transition-all duration-200 caret-black"
        />
      </div>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formFields}
          strategy={verticalListSortingStrategy}
        >
          {formFields.map((field) => (
            <SortableItem
              key={field.id}
              id={field.id}
              render={(
                attributes: any,
                listeners: any,
                setNodeRef: any,
                style: any
              ) => {
                return (
                  <button
                    style={style}
                    {...attributes}
                    {...listeners}
                    ref={setNodeRef}
                  >
                    {renderField(field)}
                  </button>
                );
              }}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/*END OF FORM FIELDS */}
      {/* actions */}
      <button onClick={addNewField} className="w-32 btn bg-black text-white">
        add new field
      </button>
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
