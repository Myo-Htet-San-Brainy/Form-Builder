"use client";
import React, { useState } from "react";
import { FormField, isSelectField, isTextField } from "./entities/form";
import { useFormStore } from "./lib/formStore";
import PreviewForm from "./components/PreviewForm";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField";
import { clsx } from "clsx";
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
import Droppable from "./components/Droppable";

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

const renderField = (field: FormField, attributes: any, listeners: any) => {
  if (isTextField(field)) {
    return (
      <TextField
        fieldId={field.id}
        listeners={listeners}
        attributes={attributes}
      />
    );
  } else if (isSelectField(field)) {
    return (
      <SelectField
        fieldId={field.id}
        listeners={listeners}
        attributes={attributes}
      />
    );
  }
};

const FormBuilder = () => {
  const [isFileDragging, setIsFileDragging] = useState(false);
  const {
    title,
    formFields,
    addNewField,
    changeFormTitle,
    changeFieldsOrder,
    changeFieldInlineImg,
    currentSelectedField,
  } = useFormStore();
  console.log(useFormStore.getState());
  // console.log(formFieldsArray);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(e: any) {
    console.log(e);
    // e.stopPropagation();
    const activeId = e.active.id;
    const overId = e.over.id;
    if (activeId !== overId) {
      changeFieldsOrder(activeId, overId, arrayMove);
    }
  }

  return (
    <div
      className={"px-10 md:px-20 flex flex-col gap-4"}
      onDragOver={(e) => setIsFileDragging(true)}
    >
      {/* Image File Drop Overlay */}
      <div
        className={clsx(
          "fixed z-10 inset-0 bg-sky-300 bg-opacity-50 backdrop-blur-md transition-opacity duration-200 items-center justify-center text-2xl text-white",
          {
            hidden: !isFileDragging,
            flex: isFileDragging,
          }
        )}
        onDragLeave={(e) => setIsFileDragging(false)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log("drop e", e);
          const file = e.dataTransfer.files[0];
          setIsFileDragging(false);
          changeFieldInlineImg(currentSelectedField!, file);
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <p>Drop your image here.</p>
          <p>Image File</p>
          <p>Less than 5MB</p>
        </div>
      </div>
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
        // sensors={sensors}
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
                  <div style={style} ref={setNodeRef}>
                    {renderField(field, attributes, listeners)}
                  </div>
                );
              }}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/*END OF FORM FIELDS */}
      {/* actions */}
      <div className="flex justify-end">
        <button onClick={addNewField} className="w-32 btn bg-black text-white">
          add new field
        </button>
      </div>
    </div>
  );
};

// function droppableRender(
//   field: FormField,
//   fieldId: string,
//   isOver: boolean,
//   setNodeRef: (element: HTMLElement | null) => void
// ): React.ReactNode {
//   return (
//     <div
//       ref={setNodeRef}
//       className={clsx({ "bg-sky-300": isOver })}
//       onDragOver={() => console.log("drag over")}
//     ></div>
//   );
// }
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
