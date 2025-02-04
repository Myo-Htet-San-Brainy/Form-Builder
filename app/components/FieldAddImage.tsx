import React, { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useFormStore } from "../lib/formStore";
import Image from "next/image";

const FieldAddImage: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const [err, setErr] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const {
    changeFieldInlineImg,
    formFields,
    removeFieldInlineImg,
    changeCurrentSelectedField,
  } = useFormStore();

  const formField = formFields.find((field) => field.id === fieldId);
  useEffect(() => {
    if (formField?.inlineImg) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(formField?.inlineImg);
    } else {
      setPreviewUrl(undefined);
    }
  }, [formField?.inlineImg]);

  // if (formField.inlineImg) {
  //   const reader = new FileReader();
  //   reader.onload = () => setPreviewUrl(reader.result as string);
  //   reader.readAsDataURL(formField.inlineImg);
  // }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    // setErr(null);

    //set formStore state
    changeFieldInlineImg(fieldId, file);

    // const reader = new FileReader();
    // reader.onload = () => setPreviewUrl(reader.result as string);
    // reader.readAsDataURL(file);
  }

  function handleRemoveImg() {
    removeFieldInlineImg(fieldId);
  }
  return (
    <div>
      <div className="flex items-end gap-2">
        <label className="">
          <p className="btn bg-black text-white btn-sm">
            {previewUrl ? "Change Image" : "Add Image"}
          </p>
          <input
            type="file"
            accept="image/*"
            hidden
            onClick={() => changeCurrentSelectedField(fieldId)}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {previewUrl && (
          <button
            className="btn bg-black text-white btn-sm"
            onClick={handleRemoveImg}
          >
            Remove Image
          </button>
        )}
      </div>
      {err && <p>{err}</p>}
      {previewUrl && (
        <div className="relative w-[50%] h-60">
          <Image
            src={previewUrl}
            alt="Preview"
            className="mt-2 object-contain "
            fill
          />
        </div>
      )}
    </div>
  );
};

export default FieldAddImage;
