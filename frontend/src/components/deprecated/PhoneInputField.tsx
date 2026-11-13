import { useState, useRef } from 'react';
import formatPhoneNumber from '../../functions/formatPhoneNumber';
import styles from './PhoneInputField.module.css';

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
    div: styles.phoneFieldContainer,
    label: styles.phoneFieldLabel,
    input: styles.phoneFieldInput,
  },
  focused: {
    div: styles.phoneFieldContainerFocused,
    label: styles.phoneFieldLabelFocused,
    input: styles.phoneFieldInputFocused,
  },
  format: formatPhoneNumber,
};

const PhoneInputField = ({ fieldData }: { fieldData: IFieldData }) => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const inputProps: IFieldStyles = getInputStyles(isFocused);

  function getInputStyles(isFocused: boolean): IFieldStyles {
    return isFocused ? fieldTypeProps.focused : fieldTypeProps.unfocused;
  }

  function handleValueChange(value: string): void {
    if (fieldTypeProps?.format) {
      setValue(fieldTypeProps.format(value));
    } else {
      throw new Error(
        'Error: PhoneInputField is missing a formatting function at "fieldTypeProps.format".',
      );
    }
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

export default PhoneInputField;
