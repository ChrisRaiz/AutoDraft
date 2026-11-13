import { IDynamicFormSection } from '../../types/editor.types';
import CollapsibleDivider from '../CollapsibleDivider';
import DynamicInputField from '../DynamicInputField';
import { DateField, SelectField } from '../DynamicInputField';

const DynamicFieldList = ({
  sectionData,
}: {
  sectionData: IDynamicFormSection;
}) => {
  return sectionData.subsections.map((subsection: string) => {
    if (sectionData.fieldData[subsection].length == 0) return;

    return (
      <CollapsibleDivider
        section={subsection}
        subsections={false}
        children={sectionData.fieldData[subsection].map((field) => {
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
      />
    );
  });
};

export default DynamicFieldList;
