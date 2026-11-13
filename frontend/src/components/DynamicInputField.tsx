import { SetStateAction, useState, useRef, memo } from 'react';
import { ReactComponent as DropdownIcon } from './../data/assets/dropdown-13x7.svg';
import { ReactComponent as DateIcon } from './../data/assets/date-icon-14x14.svg';
import formatPhoneNumber from '../../functions/formatPhoneNumber';
import clsx from 'clsx';
import styles from './DynamicInputField.module.css';

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

interface IFieldProps {
  [inputType: string]: {
    unfocused: {
      div: string;
      label: string;
      input: string;
    };
    focused: {
      div: string;
      label: string;
      input: string;
    };
    format: Function | null;
  };
}

const fieldTypeProps: IFieldProps = {
  text: {
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
    format: null,
  },
  phone: {
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
  },
  number: {
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
    format: null,
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

export const SelectField = ({
  fieldData,
  width = '31.3%',
}: {
  fieldData: IFieldData;
  width?: string;
}) => {
  if (!fieldData.properties?.type) {
    fieldData.properties.type = 'text';
  }
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const inputProps = getInputProps(isFocused);
  const format = getFieldFormatting();
  const inputRef = useRef<HTMLElement | null>(null);

  function getInputProps(isFocused: boolean) {
    return isFocused
      ? {
          div: clsx(styles.fieldSelectContainer, styles.fieldContainerFocused),
          label: clsx(styles.fieldLabel, styles.fieldLabelFocused),
          input: clsx(styles.fieldSelect, styles.fieldInputFocused),
        }
      : {
          div: styles.fieldSelectContainer,
          label: styles.fieldLabel,
          input: styles.fieldSelect,
        };
  }

  function getFieldFormatting(): Function | null {
    return fieldData.format ? fieldTypeProps[fieldData.format].format : null;
  }

  function updateValue(value: string): void {
    format ? setValue(format(value)) : setValue(value);
  }

  function handleInputFocus(value: string): void {
    inputRef.current?.focus();
  }

  function updateFocused(value: boolean): void {
    setFocused(value);
  }

  function updateOpen(value: boolean): void {
    setOpen(!value);
  }

  return (
    <div className={styles.selectComponentContainer}>
      <div className={inputProps.div}>
        <label className={inputProps.label}>
          {fieldData.label}
          <input
            id={fieldData.fieldId}
            //@ts-ignore
            ref={inputRef}
            disabled={true}
            type={fieldData.properties?.type || 'text'}
            value={value}
            name={fieldData.label}
            onChange={(e) => updateValue(e.target.value)}
            onFocus={() => updateFocused(true)}
            onBlur={() => updateFocused(false)}
            className={inputProps.input}
          />
          <div
            className={clsx(
              styles.numberButtonsContainer,
              isFocused ? styles.numberButtonsFocused : null,
            )}
          >
            <DropdownFieldButton
              label={'Icon'}
              inputValue={{ value: value, setValue: setValue }}
              inputFocused={isFocused}
              isOpen={{ value: isOpen, setValue: setOpen }}
              operation={updateOpen}
              onClick={handleInputFocus}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
            />
          </div>
        </label>
      </div>
      <div
        className={styles.dropdownContainer}
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
      >
        <button className={styles.dropdownOption} value="Married">
          <p className={styles.optionText}>Married</p>
        </button>
        <button className={styles.dropdownOption} value="Single">
          <p className={styles.optionText}>Single</p>
        </button>
        <button className={styles.dropdownOption} value="Widowed">
          <p className={styles.optionText}>Widowed</p>
        </button>
      </div>
    </div>
  );
};

const DropdownFieldButton = ({
  label,
  inputValue,
  inputFocused,
  isOpen,
  operation,
  onClick,
  onMouseDown,
}: {
  label: string;
  inputValue: {
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
  };
  inputFocused: boolean;
  isOpen: {
    value: boolean;
    setValue: React.Dispatch<SetStateAction<boolean>>;
  };
  operation: Function;
  onClick: Function;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  function updateStates(value: boolean) {
    if (!inputFocused) {
      onClick(true);
    }
    isOpen.setValue(!value);
    console.log('Executed updateStates via DropdownFieldButton!');
  }

  return (
    <button
      className={clsx(
        styles.numberButton,
        inputFocused ? styles.numberButtonFocused : null,
      )}
      onClick={() => updateStates(isOpen.value)}
      onMouseDown={onMouseDown}
    >
      {label}
    </button>
  );
};

const NumberFieldButton = ({
  label,
  inputValue,
  inputFocused,
  operation,
  onClick,
  onMouseDown,
}: {
  label: string;
  inputValue: {
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
  };
  inputFocused: boolean;
  operation: Function;
  onClick: Function;
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  function updateStates(value: string) {
    if (!inputFocused) {
      onClick(true);
    }
    inputValue.setValue(operation(value));
  }

  return (
    <button
      className={clsx(
        styles.numberButton,
        inputFocused ? styles.numberButtonFocused : null,
      )}
      onClick={() => updateStates(inputValue.value)}
      onMouseDown={onMouseDown}
    >
      {label}
    </button>
  );
};

export const DateField = ({
  fieldData,
  width,
}: {
  fieldData: IFieldData;
  width?: string;
}) => {
  if (!fieldData.properties?.type) {
    fieldData.properties.type = 'text';
  }
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const inputProps = getInputProps(isFocused);
  const format = getFieldFormatting();
  const inputRef = useRef<HTMLElement | null>(null);

  // function getInputProps(type: string): {
  //   div: string;
  //   label: string;
  //   input: string;
  // } {
  //   if (fieldTypeProps[type]) {
  //     return isFocused
  //       ? fieldTypeProps[type].focused
  //       : fieldTypeProps[type].unfocused;
  //   } else {
  //     return isFocused
  //       ? fieldTypeProps.text.focused
  //       : fieldTypeProps.text.unfocused;
  //   }
  // }

  function getInputProps(isFocused: boolean) {
    return isFocused
      ? {
          div: clsx(styles.fieldContainer, styles.fieldContainerFocused),
          label: clsx(styles.fieldLabel, styles.fieldLabelFocused),
          input: clsx(styles.fieldInput, styles.fieldInputFocused),
        }
      : {
          div: styles.fieldContainer,
          label: styles.fieldLabel,
          input: styles.fieldInput,
        };
  }

  function getFieldFormatting(): Function | null {
    return fieldData.format ? fieldTypeProps[fieldData.format].format : null;
  }

  function updateValue(value: string): void {
    format ? setValue(format(value)) : setValue(value);
  }

  function handleInputFocus(value: string): void {
    inputRef.current?.focus();
  }

  function updateFocused(value: boolean): void {
    setFocused(value);
  }

  function getMinDate(dateFn: Date): string {
    return `${dateFn.getFullYear() - 100}-${dateFn.getMonth()}-${dateFn.getDate()}`;
  }

  function getMaxDate(dateFn: Date): string {
    return `${dateFn.getFullYear()}-${dateFn.getMonth()}-${dateFn.getDate()}`;
  }

  // console.log('getMinDate(new Date()):', getMinDate(new Date()));
  // console.log('getMaxDate(new Date()):', getMaxDate(new Date()));

  return (
    <div className={inputProps.div} style={{ width: width }}>
      <label className={inputProps.label}>
        {fieldData.label}
        <input
          id={fieldData.fieldId}
          //@ts-ignore
          ref={inputRef}
          type={fieldData.properties?.type || 'text'}
          value={value}
          min={getMinDate(new Date())}
          max={getMaxDate(new Date())}
          name={fieldData.label}
          onChange={(e) => updateValue(e.target.value)}
          onFocus={() => updateFocused(true)}
          onBlur={() => updateFocused(false)}
          className={inputProps.input}
        />
        <div
          className={clsx(
            styles.iconContainer,
            isFocused ? styles.iconContainerFocused : null,
          )}
        >
          <DateIcon
            className={clsx(
              styles.dateIcon,
              isFocused ? styles.dateIconFocused : null,
            )}
          />
        </div>
      </label>
    </div>
  );
};

const DynamicInputField = ({
  fieldData,
  width = '31.3%',
}: {
  fieldData: IFieldData;
  width?: string;
}) => {
  if (!fieldData.properties?.type) {
    fieldData.properties.type = 'text';
  }
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);
  const inputProps = getInputProps(isFocused);
  const format = getFieldFormatting();
  const inputRef = useRef<HTMLElement | null>(null);

  // function getInputProps(type: string): {
  //   div: string;
  //   label: string;
  //   input: string;
  // } {
  //   if (fieldTypeProps[type]) {
  //     return isFocused
  //       ? fieldTypeProps[type].focused
  //       : fieldTypeProps[type].unfocused;
  //   } else {
  //     return isFocused
  //       ? fieldTypeProps.text.focused
  //       : fieldTypeProps.text.unfocused;
  //   }
  // }

  function getInputProps(isFocused: boolean) {
    return isFocused
      ? {
          div: clsx(styles.fieldContainer, styles.fieldContainerFocused),
          label: clsx(styles.fieldLabel, styles.fieldLabelFocused),
          input: clsx(styles.fieldInput, styles.fieldInputFocused),
        }
      : {
          div: styles.fieldContainer,
          label: styles.fieldLabel,
          input: styles.fieldInput,
        };
  }

  function getFieldFormatting(): Function | null {
    return fieldData.format ? fieldTypeProps[fieldData.format].format : null;
  }

  function updateValue(value: string): void {
    format ? setValue(format(value)) : setValue(value);
  }

  function handleInputFocus(value: string): void {
    inputRef.current?.focus();
  }

  function updateFocused(value: boolean): void {
    setFocused(value);
  }

  return (
    <div className={inputProps.div} style={{ width: width }}>
      <label className={inputProps.label}>
        {fieldData.label}
        <input
          id={fieldData.fieldId}
          //@ts-ignore
          ref={inputRef}
          type={fieldData.properties?.type || 'text'}
          value={value}
          name={fieldData.label}
          onChange={(e) => updateValue(e.target.value)}
          onFocus={() => updateFocused(true)}
          onBlur={() => updateFocused(false)}
          className={inputProps.input}
        />
        {fieldData.properties.type == 'number' ? (
          <div
            className={clsx(
              styles.numberButtonsContainer,
              isFocused ? styles.numberButtonsFocused : null,
            )}
          >
            <NumberFieldButton
              label={'-1'}
              inputValue={{ value: value, setValue: setValue }}
              inputFocused={isFocused}
              operation={decrementValue}
              onClick={handleInputFocus}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
            />
            <NumberFieldButton
              label={'+1'}
              inputValue={{ value: value, setValue: setValue }}
              inputFocused={isFocused}
              operation={incrementValue}
              onClick={handleInputFocus}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
            />
          </div>
        ) : null}
      </label>
    </div>
  );
};

export default DynamicInputField;
