import React, { useEffect } from "react";
import { MatchField as MatchFieldType } from "../entities/form";
import FieldQuestion from "./FieldQuestion";
import FieldChooseAnsType from "./FieldChooseAnsType";
import FieldAddImage from "./FieldAddImage";
import FieldActions from "./FieldActions";
import { FiPlusSquare } from "react-icons/fi";
import { useFormStore } from "../lib/formStore";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { RxDragHandleDots1 } from "react-icons/rx";

const ansPairLimit = 5;

const MatchField: React.FC<{
  field: MatchFieldType;
  listeners: any;
  attributes: any;
}> = ({ field, listeners, attributes }): React.ReactNode => {
  const { changeCorrectAnswer } = useFormStore();

  useEffect(() => {
    if (field.correctAnswer.length >= ansPairLimit) {
      toast(`Match Quiz Answer Pair Limit is ${ansPairLimit}.`);
    }
  }, [field.correctAnswer]);

  function handleAddNewAnsPair() {
    if (field.correctAnswer.length >= ansPairLimit) {
      return;
    }
    const newVal = [
      ...field.correctAnswer,
      {
        id: uuidv4(),
        prompt: "",
        description: "",
      },
    ];
    changeCorrectAnswer(field.id, newVal);
  }

  function handleChangeContent(
    e: React.ChangeEvent<HTMLInputElement>,
    ansPairId: string,
    isPrompt: boolean
  ) {
    const newContent = e.currentTarget.value;
    const newVal = field.correctAnswer.map((item) => {
      if (item.id === ansPairId) {
        if (isPrompt) {
          item.prompt = newContent;
        } else {
          item.description = newContent;
        }
        return item;
      }
      return item;
    });
    changeCorrectAnswer(field.id, newVal);
  }

  function handleDeleteAnsPair(ansPairId: string) {
    const newVal = field.correctAnswer.filter((item) => item.id !== ansPairId);
    changeCorrectAnswer(field.id, newVal);
  }
  return (
    <div
      className={"flex gap-3 px-5 py-5 border border-slate-300 rounded-md "}
      // id={fieldId}

      // onDragLeave={(e) => setIsFileDragging(false)}
    >
      <div className="grow flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FieldQuestion field={field} />
          <FieldChooseAnsType field={field} />
        </div>
        <FieldAddImage field={field} />
        <div className="flex gap-4">
          {field.correctAnswer.map((item) => (
            <div className="grow flex flex-col gap-4" key={item.id}>
              {/* I want 2 square boxes here that can accept user input. Cursor will be in the middle of square. */}
              <input
                type="text"
                className="grow h-80 border border-gray-400 rounded-md text-center p-4"
                placeholder="Enter your prompt"
                value={item.prompt}
                onChange={(e) => handleChangeContent(e, item.id, true)}
              />
              <input
                type="text"
                className="grow h-80 border border-gray-400 rounded-md text-center p-4"
                placeholder="Enter description for prompt right above"
                value={item.description}
                onChange={(e) => handleChangeContent(e, item.id, false)}
              />
              <button
                className="self-center w-32 btn bg-black text-white"
                onClick={() => handleDeleteAnsPair(item.id)}
              >
                delete
              </button>
            </div>
          ))}
          {field.correctAnswer.length < ansPairLimit && (
            <button
              className="w-20  h-20 self-start"
              onClick={handleAddNewAnsPair}
            >
              <FiPlusSquare className="w-full h-full" />
            </button>
          )}
        </div>
        <FieldActions field={field} />
      </div>
      <div
        className="self-center w-8 h-20 cursor-grab flex items-center  bg-gray-200 rounded-md"
        {...listeners}
        {...attributes}
      >
        <RxDragHandleDots1 className="text-black w-full h-7" />
      </div>
    </div>
  );
};

export default MatchField;
