export interface BaseField {
  id: string;
  question?: string;
  type: string;
  required?: boolean;
}

interface TextField extends BaseField {
  type: "text" | "";
}

type FormField = BaseField;

export interface Form {
  title?: string;
  formFields: FormField[];
}
