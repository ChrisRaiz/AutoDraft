import { IFixedFormSection } from '../../types/editor.types';
import DynamicInputField from '../DynamicInputField';
import { DateField, SelectField } from '../DynamicInputField';
import styles from './FixedFieldList.module.css';

const FixedFieldList = ({
  sectionData,
}: {
  sectionData: IFixedFormSection;
}) => {
  return (
    <div className={styles.fixedFieldsContainer}>
      {sectionData.fieldData.map((field) => {
        if (field.element == 'input') {
          if (field.properties.type == 'date') {
            return <DateField fieldData={field} />;
          } else {
            return <DynamicInputField fieldData={field} />;
          }
        } else {
          return <SelectField fieldData={field} />;
        }
      })}
    </div>
  );
};

export default FixedFieldList;
