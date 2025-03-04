import React, { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useFormStore } from "../lib/formStore";
import Image from "next/image";
import { FormField } from "../entities/form";

const FieldAddImage: React.FC<{ field: FormField }> = ({ field }) => {
  const [err, setErr] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const {
    changeFieldInlineImg,
    removeFieldInlineImg,
    changeCurrentSelectedField,
  } = useFormStore();

  useEffect(() => {
    if (field?.inlineImg) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(field?.inlineImg);
    } else {
      setPreviewUrl(undefined);
    }
  }, [field?.inlineImg]);

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
    changeFieldInlineImg(field.id, file);

    // const reader = new FileReader();
    // reader.onload = () => setPreviewUrl(reader.result as string);
    // reader.readAsDataURL(file);
  }

  function handleRemoveImg() {
    removeFieldInlineImg(field.id);
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
            onClick={() => changeCurrentSelectedField(field.id)}
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
