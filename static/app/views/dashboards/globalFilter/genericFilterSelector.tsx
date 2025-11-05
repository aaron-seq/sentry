import {FieldValueType} from 'sentry/utils/fields';
import type {SearchBarData} from 'sentry/views/dashboards/datasetConfig/base';
import FilterSelector from 'sentry/views/dashboards/globalFilter/filterSelector';
import NumericFilterSelector from 'sentry/views/dashboards/globalFilter/numericFilterSelector';
import {getFieldDefinitionForDataset} from 'sentry/views/dashboards/globalFilter/utils';
import type {GlobalFilter} from 'sentry/views/dashboards/types';

export type GenericFilterSelectorProps = {
  globalFilter: GlobalFilter;
  onRemoveFilter: (filter: GlobalFilter) => void;
  onUpdateFilter: (filter: GlobalFilter) => void;
  searchBarData: SearchBarData;
} & FilterConfigProps;

type FilterConfigProps = {
  isBoolean?: boolean;
};

type FilterSelectorConfig = {
  component: React.ComponentType<GenericFilterSelectorProps>;
  configProps?: FilterConfigProps;
};

function getFilterSelector(globalFilter: GlobalFilter): FilterSelectorConfig {
  const fieldDefinition = getFieldDefinitionForDataset(
    globalFilter.tag,
    globalFilter.dataset
  );
  switch (fieldDefinition?.valueType) {
    case FieldValueType.NUMBER:
    case FieldValueType.DURATION:
      return {
        component: NumericFilterSelector,
      };
    case FieldValueType.BOOLEAN:
      return {
        component: FilterSelector,
        configProps: {
          isBoolean: true,
        },
      };
    case FieldValueType.STRING:
    default:
      return {
        component: FilterSelector,
      };
  }
}

function GenericFilterSelector({globalFilter, ...props}: GenericFilterSelectorProps) {
  const {component: FilterSelectorForType, configProps} = getFilterSelector(globalFilter);
  return (
    <FilterSelectorForType globalFilter={globalFilter} {...props} {...configProps} />
  );
}

export default GenericFilterSelector;
