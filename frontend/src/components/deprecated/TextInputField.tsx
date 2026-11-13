import { useState } from 'react';
import styles from './TextInputField.css';

interface IFieldData {
  id: number;
  fieldId: string;
  label: string;
  element: string;
  properties: {
    type: string;
  };
  format?: string;
}

interface IFieldStyles {
  div: string;
  label: string;
  input: string;
}

interface IFieldProps {
  unfocused: IFieldStyles;
  focused: IFieldStyles;
  format?: Function;
}

const fieldTypeProps: IFieldProps = {
  unfocused: {
    div: styles.defaultFieldContainer,
    label: styles.defaultFieldLabel,
    input: styles.defaultFieldInput,
  },
  focused: {
    div: styles.defaultFieldContainerFocused,
    label: styles.defaultFieldLabelFocused,
    input: styles.defaultFieldInputFocused,
  },
};

const TextInputField = ({ fieldData }: { fieldData: IFieldData }) => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const inputProps = getInputStyles(isFocused);

  function getInputStyles(isFocused: boolean): IFieldStyles {
    return isFocused ? fieldTypeProps.focused : fieldTypeProps.unfocused;
  }

  function handleValueChange(value: string): void {
    setValue(value);
  }

  function handleFocusChange(value: boolean): void {
    if (isFocused !== value) setFocused(value);
  }

  return (
    <div className={inputProps.div}>
      <label className={inputProps.label}>
        {fieldData.label}
        <input
          id={fieldData.fieldId}
          type={fieldData.properties?.type}
          value={value}
          name={fieldData.label}
          onChange={(e) => handleValueChange(e.target.value)}
          onFocus={() => handleFocusChange(true)}
          onBlur={() => handleFocusChange(false)}
          className={inputProps.input}
        />
      </label>
    </div>
  );
};

export default TextInputField;
