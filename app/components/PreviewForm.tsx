import { useFormStore } from "../lib/formStore";
import { FormField, isTextField, isSelectField } from "../entities/form";
import { useForm, UseFormRegister } from "react-hook-form";

function renderAnswer(
  field: FormField,
  fieldId: string,
  register: UseFormRegister<any>
) {
  const validationRules: any = {};
  if (field.required) {
    validationRules["required"] = "This value is required";
  }
  if (isTextField(field)) {
    return (
      <input
        type={field.type}
        id={fieldId}
        {...register(fieldId, validationRules)}
      />
    );
  } else if (isSelectField(field)) {
    return (
      <select {...register(fieldId, validationRules)} id={fieldId}>
        {field.options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  }
  return null;
}

const PreviewForm = () => {
  const { title, formFields } = useFormStore();
  const { register, handleSubmit } = useForm();
  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* FORM TITLE */}
      <h1>{title}</h1>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}
      {Object.entries(formFields).map(([fieldId, field]) => {
        return (
          <div key={fieldId}>
            <label htmlFor={fieldId}>{field.question}</label>
            {renderAnswer(field, fieldId, register)}
          </div>
        );
      })}
      {/*END OF FORM FIELDS */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PreviewForm;
