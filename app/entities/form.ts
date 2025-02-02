export interface BaseField {
  id: string;
  question?: string;
  type: string;
  required?: boolean;
}

interface TextField extends BaseField {
  type: "text" | "number" | "date" | "time" | "email" | "url" | "tel";
}

export function isTextField(field: BaseField): field is TextField {
  return (
    field.type === "text" ||
    field.type === "number" ||
    field.type === "date" ||
    field.type === "time" ||
    field.type === "email" ||
    field.type === "url" ||
    field.type === "tel"
  );
}

export interface SelectField extends BaseField {
  type: "select" | "radio" | "checkbox" | "multipleChoice";
  options: option[]; // Options to choose from
  allowMultiple?: boolean; // For checkbox fields
}

export function isSelectField(field: BaseField): field is SelectField {
  return (
    field.type === "select" ||
    field.type === "radio" ||
    field.type === "checkbox" ||
    field.type === "multipleChoice"
  );
}

interface option {
  id: string;
  value: string;
}

export type FormField = TextField | SelectField;

export interface Form {
  title?: string;
  formFields: FormField[];
}

export type FieldTypes = TextField["type"] | SelectField["type"];
