export interface BaseField {
  id: string;
  question: string;
  inlineImg?: File;
}

export interface FormError {
  key: string;
  errors: string[];
}

export interface TextField extends BaseField {
  type: "text";
  correctAnswer: string;
}

export function isTextField(field: FormField): field is TextField {
  return field.type === "text";
}

export interface SelectField extends BaseField {
  type: "multipleChoice";
  correctAnswer: string;
  options: Option[]; // Options to choose from
  allowMultiple?: boolean; // For checkbox fields
}

export function isSelectField(field: FormField): field is SelectField {
  return field.type === "multipleChoice";
}

interface Option {
  id: string;
  value: string;
}

export interface FillInBlankField extends BaseField {
  type: "fillInBlank";
  correctAnswer: string;
}

export function isFillInBlankField(
  field: FormField
): field is FillInBlankField {
  return field.type === "fillInBlank";
}

export interface MatchField extends BaseField {
  type: "match";
  correctAnswer: MatchAnswerPair[];
}
export interface MatchAnswerPair {
  id: string;
  prompt: string;
  description: string;
}

export function isMatchField(field: FormField): field is MatchField {
  return field.type === "match";
}

export type FormField = TextField | SelectField | FillInBlankField | MatchField;

export interface Form {
  title?: string;
  formFields: FormField[];
  currentSelectedField?: string;
  errors: FormError[];
}

export type FieldType =
  | TextField["type"]
  | SelectField["type"]
  | FillInBlankField["type"]
  | MatchField["type"];
