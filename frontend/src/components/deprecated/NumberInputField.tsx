import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './NumberInputField.module.css';

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
    div: styles.numberFieldContainer,
    label: styles.numberFieldLabel,
    input: styles.numberFieldInput,
  },
  focused: {
    div: styles.numberFieldContainerFocused,
    label: styles.numberFieldLabelFocused,
    input: styles.numberFieldInputFocused,
  },
};

function incrementValue(value: string): string {
  const res = Number(value) + 1;
  return res.toString();
}

function decrementValue(value: string): string {
  const res = Number(value) - 1;
  return res.toString();
}

const FieldButton = ({
  label,
  inputValue,
  inputFocused,
  operation,
  focusInput,
  onMouseDown,
}: {
  label: string;
  inputValue: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  inputFocused: boolean;
  operation: Function;
  focusInput: Function;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  function handleButtonClick(value: string) {
    if (!inputFocused) {
      focusInput(true);
    }
    inputValue.setValue(operation(value));
  }

  return (
    <button
      className={clsx(
        styles.numberButton,
        inputFocused ? styles.numberButtonFocused : null,
      )}
      onClick={() => handleButtonClick(inputValue.value)}
      onMouseDown={onMouseDown}
    >
      {label}
    </button>
  );
};

const NumberInputField = ({ fieldData }: { fieldData: IFieldData }) => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const inputProps = getInputStyles(isFocused);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getInputStyles(isFocused: boolean): IFieldStyles {
    return isFocused ? fieldTypeProps.focused : fieldTypeProps.unfocused;
  }

  function handleInputFocus(): void {
    inputRef.current?.focus();
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
          ref={inputRef}
          type={fieldData.properties?.type}
          value={value}
          name={fieldData.label}
          onChange={(e) => handleValueChange(e.target.value)}
          onFocus={() => handleFocusChange(true)}
          onBlur={() => handleFocusChange(false)}
          className={inputProps.input}
        />
        <div
          className={clsx(
            styles.numberButtonsContainer,
            isFocused ? styles.numberButtonsFocused : null,
          )}
        >
          <FieldButton
            label={'-1'}
            inputValue={{ value: value, setValue: setValue }}
            inputFocused={isFocused}
            operation={decrementValue}
            focusInput={handleInputFocus}
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
              e.preventDefault()
            }
          />
          <FieldButton
            label={'+1'}
            inputValue={{ value: value, setValue: setValue }}
            inputFocused={isFocused}
            operation={incrementValue}
            focusInput={handleInputFocus}
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
              e.preventDefault()
            }
          />
        </div>
      </label>
    </div>
  );
};

export default NumberInputField;
