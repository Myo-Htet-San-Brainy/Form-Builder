import { useFormStore } from "../lib/formStore";
import { FormField, isTextField, isSelectField } from "../entities/form";

function renderAnswer(field: FormField, fieldId: string) {
  if (isTextField(field)) {
    return (
      <input
        type={field.type}
        name={fieldId}
        id={fieldId}
        required={field.required}
      />
    );
  } else if (isSelectField(field)) {
    return (
      <select name={fieldId} id={fieldId} required={field.required}>
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));
      }}
    >
      {/* FORM TITLE */}
      <h1>{title}</h1>
      {/* END OF FORM TITLE */}
      {/* FORM FIELDS */}
      {Object.entries(formFields).map(([fieldId, field]) => {
        return (
          <div key={fieldId}>
            <label htmlFor={fieldId}>{field.question}</label>
            {renderAnswer(field, fieldId)}
          </div>
        );
      })}
      {/*END OF FORM FIELDS */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PreviewForm;
