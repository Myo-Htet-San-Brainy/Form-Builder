"use client";

import {
  Form,
  FormField,
  isFillInBlankField,
  isMatchField,
  isSelectField,
  isTextField,
  FieldType,
  MatchField,
  MatchAnswerPair,
  TextField,
} from "../entities/form";
import TextFieldComponent from "../components/TextField";
import SelectFieldComponent from "../components/SelectField";
import MatchFieldComponent from "../components/MatchField";

export const renderField: (
  field: FormField,
  attributes: any,
  listeners: any
) => React.ReactNode = (field, attributes, listeners) => {
  if (isTextField(field)) {
    return (
      <TextFieldComponent
        field={field}
        listeners={listeners}
        attributes={attributes}
      />
    );
  } else if (isSelectField(field)) {
    return (
      <SelectFieldComponent
        field={field}
        listeners={listeners}
        attributes={attributes}
      />
    );
  } else if (isFillInBlankField(field)) {
    return (
      <TextFieldComponent
        field={field}
        listeners={listeners}
        attributes={attributes}
      />
    );
  } else if (isMatchField(field)) {
    return (
      <MatchFieldComponent
        field={field}
        listeners={listeners}
        attributes={attributes}
      />
    );
  }
};
