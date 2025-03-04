"use client";
import React, { useEffect, useState } from "react";
import {
  FormField,
  isFillInBlankField,
  isMatchField,
  isSelectField,
  isTextField,
} from "./entities/form";
import { useFormStore } from "./lib/formStore";
import PreviewForm from "./components/PreviewForm";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField";
import { clsx } from "clsx";
import { isEqual } from "lodash";
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
import MatchField from "./components/MatchField";
import { z } from "zod";
import { mainSchema } from "./schema/formBuilderSchema";

const Page = () => {
  const { formFields, title, errors, handleError, removeAllErrors } =
    useFormStore();

  useEffect(() => {
    //remove current errors
    removeAllErrors();
    //validation > stop the whole process & show errors at the right place and un-show on fix
    const result = mainSchema.safeParse({ title, quizFields: formFields });
    // console.log(result.error?.issues);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (
          issue.path[0] === "quizFields" &&
          typeof issue.path[1] === "number"
        ) {
          handleError(issue.path[1], issue.message);
        } else {
          // isMsgAlreadyExisted(issue.message, formErrors) ||
          handleError(issue.path[0], issue.message);
        }
      });
    }
  }, [formFields, title]);
  function handlePublish() {
    //sent to serer and generate link etc.
  }

  return (
    <div>
      <div className="px-5 py-5 flex justify-between gap-4">
        <h1 className="font-bold text-xl">Quiz Builder</h1>
        <button className=" btn bg-black text-white " onClick={handlePublish}>
          Publish
        </button>
      </div>
      <FormBuilder />
    </div>
  );
};

const renderField = (field: FormField, attributes: any, listeners: any) => {
  if (isTextField(field)) {
    return (
      <TextField field={field} listeners={listeners} attributes={attributes} />
    );
  } else if (isSelectField(field)) {
    return (
      <SelectField
        field={field}
        listeners={listeners}
        attributes={attributes}
      />
    );
  } else if (isFillInBlankField(field)) {
    return (
      <TextField field={field} listeners={listeners} attributes={attributes} />
    );
  } else if (isMatchField(field)) {
    return (
      <MatchField field={field} listeners={listeners} attributes={attributes} />
    );
  }
};

const FormBuilder = () => {
  const [isFileDragging, setIsFileDragging] = useState(false);
  const {
    title,
    formFields,
    errors,
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
      {/* FORM ERRORS */}
      <ul className="text-red-500 list-disc">
        {errors.map((error) => {
          if (typeof error.key !== "number") {
            return error.errors.map((msg, index) => <li key={index}>{msg}</li>);
          }
        })}
      </ul>
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
          {formFields.map((field, index) => (
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
                    <ul className="text-red-500 list-disc">
                      {errors.map((error) => {
                        if (
                          typeof error.key === "number" &&
                          error.key === index
                        ) {
                          return error.errors.map((msg, index) => (
                            <li key={index}>{msg}</li>
                          ));
                        }
                      })}
                    </ul>
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
