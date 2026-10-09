import React from 'react';
import { Dropdown, Label, makeStyles, Option, tokens } from '@fluentui/react-components';
import type { Plant, ReportCategory } from '../../domain/models';
import { ReportType } from '../../domain/enums';

export interface ReportFilterState {
  plantIds: string[];
  categoryIds: string[];
  types: string[];
}

interface ReportFiltersProps {
  value: ReportFilterState;
  plants: Plant[];
  categories: ReportCategory[];
  onChange: (value: ReportFilterState) => void;
  actions?: React.ReactNode;
}

const useStyles = makeStyles({
  root: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM, alignItems: 'flex-end' },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: '210px' },
  actions: { marginLeft: 'auto', flexShrink: 0 },
});

const selectionLabel = (count: number, allLabel: string, singular: string) => {
  if (count === 0) return allLabel;
  return count === 1 ? singular : `${count} selected`;
};

const normalizeSelection = (values: string[]) => [...new Set(values.filter((value) => value.trim().length > 0))];

export const ReportFilters: React.FC<ReportFiltersProps> = ({ value, plants, categories, onChange, actions }) => {
  const styles = useStyles();
  const orderedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const orderedCategories = [...categories].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  return <div className={styles.root}>
    <div className={styles.field}>
      <Label>Plant</Label>
      <Dropdown multiselect value={selectionLabel(value.plantIds.length, 'All Plants', '1 plant selected')} selectedOptions={normalizeSelection(value.plantIds)} onOptionSelect={(_event, data) => onChange({ ...value, plantIds: normalizeSelection(data.selectedOptions) })}>
        {orderedPlants.map((plant) => <Option key={plant.id} value={plant.id} text={plant.name}>{plant.name}</Option>)}
      </Dropdown>
    </div>
    <div className={styles.field}>
      <Label>Report Category</Label>
      <Dropdown multiselect value={selectionLabel(value.categoryIds.length, 'All Report Categories', '1 category selected')} selectedOptions={normalizeSelection(value.categoryIds)} onOptionSelect={(_event, data) => onChange({ ...value, categoryIds: normalizeSelection(data.selectedOptions) })}>
        {orderedCategories.map((category) => <Option key={category.id} value={category.id} text={category.name}>{category.name}</Option>)}
      </Dropdown>
    </div>
    <div className={styles.field}>
      <Label>Type</Label>
      <Dropdown multiselect value={selectionLabel(value.types.length, 'All Types', '1 type selected')} selectedOptions={normalizeSelection(value.types)} onOptionSelect={(_event, data) => onChange({ ...value, types: normalizeSelection(data.selectedOptions) })}>
        <Option value={ReportType.Highlights} text={ReportType.Highlights}>Highlights</Option>
        <Option value={ReportType.Lowlights} text={ReportType.Lowlights}>Lowlights</Option>
      </Dropdown>
    </div>
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </div>;
};
