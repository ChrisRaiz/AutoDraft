import {
  IFixedFormSection,
  IDynamicFormSection,
} from '../../types/editor.types';
import DynamicFieldList from './DynamicFieldList';
import FixedFieldList from './FixedFieldList';

const FieldList = ({
  sectionData,
}: {
  sectionData: IFixedFormSection | IDynamicFormSection;
}) => {
  if (!sectionData)
    throw new Error(
      'An error occurred while rendering the FieldList component. sectionData argument is null!',
    );
  if (sectionData?.subsections) {
    return <DynamicFieldList sectionData={sectionData} />;
  } else {
    return <FixedFieldList sectionData={sectionData} />;
  }
};

export default FieldList;
