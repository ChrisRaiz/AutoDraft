import {
  IFixedFormSection,
  IDynamicFormSection,
  ISectionFilters,
  IFixedFieldData,
  IDynamicFieldData,
} from '../../types/editor.types';
import { useState, useRef, HTMLInputTypeAttribute } from 'react';
import FilterModal from '../filterModal/FilterModal';
import SectionActions from './SectionActions';
import FieldList from './FieldList';
import styles from './EditorSection.module.css';

const sectionFilters: ISectionFilters = {
  contact: {
    fieldTypes: [
      { filter: 'Text Fields', set: 'type', type: 'text' },
      { filter: 'Number Fields', set: 'type', type: 'number' },
      { filter: 'Phone Fields', set: 'type', type: 'tel' },
    ],
    fieldData: [
      { filter: 'Filled Fields', set: 'data', type: true },
      { filter: 'Empty Fields', set: 'data', type: false },
    ],
  },
  preForm: {
    fieldTypes: [
      { filter: 'Text Fields', set: 'type', type: 'text' },
      { filter: 'Number Fields', set: 'type', type: 'number' },
      { filter: 'Select Fields', set: 'type', type: 'select' },
    ],
    fieldData: [
      { filter: 'Filled Fields', set: 'data', type: true },
      { filter: 'Empty Fields', set: 'data', type: false },
    ],
  },
  will: {
    fieldTypes: [
      { filter: 'Text Fields', set: 'type', type: 'text' },
      { filter: 'Number Fields', set: 'type', type: 'number' },
      { filter: 'Select Fields', set: 'type', type: 'select' },
      { filter: 'Phone Fields', set: 'type', type: 'tel' },
      { filter: 'Date Fields', set: 'type', type: 'date' },
    ],
    fieldData: [
      { filter: 'Filled Fields', set: 'data', type: true },
      { filter: 'Empty Fields', set: 'data', type: false },
    ],
    subsections: [
      { filter: 'Testator', set: 'subsections', type: false },
      { filter: 'Spouse', set: 'subsections', type: false },
      { filter: 'Witnesses', set: 'subsections', type: false },
      { filter: 'Admin', set: 'subsections', type: false },
      { filter: 'Healthcare Agents', set: 'subsections', type: false },
      { filter: 'Property Agents', set: 'subsections', type: false },
      { filter: 'HIPAA Agents', set: 'subsections', type: false },
      { filter: 'Parents', set: 'subsections', type: false },
      { filter: 'Children', set: 'subsections', type: false },
      { filter: 'Executors', set: 'subsections', type: false },
      { filter: 'Guardians', set: 'subsections', type: false },
    ],
  },
};

function checkActiveTypeFilters(
  activeTypeFilters: Set<string>,
  inputType: HTMLInputTypeAttribute | 'select',
): boolean {
  if (activeTypeFilters.has(inputType)) return true;
  return false;
}

// * W.I.P - checkActiveDataFilters()
// function checkActiveDataFilters(
//   activeDataFilters: Set<string>,
//   inputData: string | null,
// ) {
//   if (activeDataFilters.has('filled') && inputData) return true;
//   if (activeDataFilters.has('empty') && !inputData) return true;
//   return false;
// }

// * W.I.P - checkActiveSubsectionFilters()
// function checkActiveSubsectionFilters(
//   activeSubsectionFilters: Set<string>,
//   subsection: string,
// ) {
//   if (activeSubsectionFilters.has(subsection)) return true;
//   return false;
// }

const EditorSection = ({
  sectionData,
}: {
  sectionData: IFixedFormSection | IDynamicFormSection;
}) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [filters, setFilters] = useState<ISectionFilters>(sectionFilters);
  const [activeFilters, setActiveFilters] = useState({
    type: new Set<string>(),
    data: new Set<string>(),
    subsections: new Set<string>(),
  });
  const dynamicData = useRef({ ...sectionData });
  const dynamicFieldData = useRef({ ...sectionData.fieldData });
  const [renderData, setRenderData] = useState<
    IFixedFormSection | IDynamicFormSection
  >({ ...sectionData });
  const updater: Function = checkDataType();

  // ? Filter data based on the selected filters
  // ? -----------------------------------------
  // Type Fields
  // -------------------
  // 1. While mapping data, check the data's (e).properties.type == "(type)"
  // 2a. If true, rendering the field
  // 2b. If false, do not render the field

  // * Data Fields
  // * -------------------
  // 1. W.I.P until data fetching is implemented

  // * Subsections
  // * -------------------
  // 1. Check sectionData?.subsections
  // 2a. If true, skip matching property keys in the dataset while rendering the subsections
  // 2b. If false, ignore any subsection related executions

  function filterFixedData(data: IFixedFieldData[]): void {
    //@ts-ignore
    const filteredSectionData: IFixedFormSection = {
      ...sectionData,
    };
    let filteredList = [];

    if (activeFilters.type.size == 0) {
      setRenderData(filteredSectionData);
      return;
    }

    for (const field of data) {
      if (checkActiveTypeFilters(activeFilters.type, field.properties.type)) {
        filteredList.push(field);
      }
    }
    filteredSectionData.fieldData = filteredList;

    setRenderData(filteredSectionData);
  }

  function filterDynamicData(data: IFixedFieldData[]): void {
    dynamicData.current.fieldData = { ...dynamicFieldData.current };

    //@ts-ignore
    const filteredSectionData: IDynamicFormSection = {
      ...sectionData,
    };

    if (activeFilters.type.size == 0) {
      setRenderData({
        ...sectionData,
        fieldData: dynamicFieldData.current,
      });
      return;
    }

    for (const subsection in data) {
      const filteredSubsectionData: IDynamicFieldData =
        dynamicFieldData.current[subsection];

      let filteredList = [];
      for (const field of filteredSubsectionData) {
        if (checkActiveTypeFilters(activeFilters.type, field.properties.type)) {
          filteredList.push(field);
        }
      }
      filteredSectionData.fieldData[subsection] = filteredList;
    }

    setRenderData(filteredSectionData);
  }

  const [isFilterModalVisible, setFilterModalVisible] =
    useState<boolean>(false);

  function toggleCollapsed(): void {
    setCollapsed(!isCollapsed);
  }

  function toggleFilterModalVisible(): void {
    setFilterModalVisible(!isFilterModalVisible);
  }

  function handleFilterChange(
    set: 'type' | 'data' | 'subsections',
    filter: string,
  ): void {
    const filteredSet = activeFilters[set];
    let testFieldData = sectionData.fieldData;

    if (!filteredSet) {
      console.log('filteredSet is false, returning early');
      return;
    }
    if (filteredSet?.has(filter)) {
      console.log('Deleting filter');
      filteredSet.delete(filter);
      filteredSet.has(filter);
    } else {
      console.log('Adding filter');
      filteredSet.add(filter);
    }

    setActiveFilters({ ...activeFilters, type: filteredSet });
  }

  function clearFilters() {
    console.log('CLEAR FILTERS EXECUTING');
    const type = new Set<string>();
    const data = new Set<string>();
    const subsections = new Set<string>();

    setActiveFilters({
      ...activeFilters,
      type: type,
      data: data,
      subsections: subsections,
    });
  }

  function checkDataType(): Function {
    if (renderData?.subsections) {
      return filterDynamicData;
    }
    return filterFixedData;
  }

  return (
    <div className={styles.fieldEditorContainer}>
      <FilterModal
        isVisible={isFilterModalVisible}
        closeModal={toggleFilterModalVisible}
        filters={filters[sectionData.filterKey]}
        activeFilters={{
          value: activeFilters,
          setter: handleFilterChange,
          clear: clearFilters,
        }}
        updater={updater}
        updateParams={{
          data: sectionData.fieldData,
          filteredSet: activeFilters,
        }}
      />
      <div
        className={styles.editorHeader}
        style={
          sectionData?.subsections
            ? {
                borderBottom: 'none',
              }
            : isCollapsed
              ? {
                  borderBottom: 'none',
                }
              : {}
        }
      >
        <h3 className={styles.editorTitle}>
          {sectionData.section}
          <span className={styles.submissionEditorTitle}>
            &nbsp;&nbsp;|&nbsp;&nbsp;Jennifer Raiz - 12/02/2024
          </span>
        </h3>
        <SectionActions
          collapsed={{ value: isCollapsed, toggle: toggleCollapsed }}
          filterModal={{
            value: isFilterModalVisible,
            toggle: toggleFilterModalVisible,
          }}
        />
      </div>
      <div className={isCollapsed ? styles.collapsedListContainer : ''}>
        {/* <Suspense fallback={<p>Loading {sectionData.section} Fields...</p>}> */}
        <FieldList sectionData={renderData} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default EditorSection;
