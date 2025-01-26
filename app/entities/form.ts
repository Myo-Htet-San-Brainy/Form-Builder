export interface BaseField {
  id: string;
  question?: string;
  type: string;
  required?: boolean;
}

interface TextField extends BaseField {
  type: "text" | "number" | "date" | "time" | "email" | "url" | "tel";
}

export interface SelectField extends BaseField {
  type: "select" | "radio" | "checkbox" | "multipleChoice";
  options: option[]; // Options to choose from
  allowMultiple?: boolean; // For checkbox fields
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
