import React from 'react';
import { Dropdown, Label, makeStyles, Option, tokens } from '@fluentui/react-components';
import { useAllTargets } from '../../hooks/queries';
import { getPreviousPeriod } from '../../domain/services/period';

export interface VolumePacFilterState {
  year: number;
  month: number;
  plantIds: string[];
  productionLineIds: string[];
}

interface OptionItem {
  id: string;
  name: string;
  displayOrder: number;
}

interface VolumePacFiltersProps {
  value: VolumePacFilterState;
  plants: OptionItem[];
  productionLines: OptionItem[];
  onChange: (value: VolumePacFilterState) => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: '150px' },
  multi: { minWidth: '230px' },
});

const selectedLabel = (ids: string[], options: OptionItem[], allLabel: string) => {
  if (ids.length === 0) return allLabel;
  if (ids.length === 1) return options.find((option) => option.id === ids[0])?.name ?? '1 selected';
  return `${ids.length} selected`;
};

export const VolumePacFilters: React.FC<VolumePacFiltersProps> = ({ value, plants, productionLines, onChange }) => {
  const styles = useStyles();
  const targetsQuery = useAllTargets();
  const previousPeriod = getPreviousPeriod();
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(previousPeriod.year, new Date().getFullYear()))].sort((left, right) => left - right);
  const orderedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const orderedProductionLines = [...productionLines].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  return <div className={styles.root}>
    <div className={styles.field}><Label>Year</Label><Dropdown value={String(value.year)} selectedOptions={[String(value.year)]} onOptionSelect={(_event, data) => data.optionValue && onChange({ ...value, year: Number(data.optionValue) })}>{years.map((year) => <Option key={year} value={String(year)} text={String(year)}>{year}</Option>)}</Dropdown></div>
    <div className={styles.field}><Label>Month <span aria-hidden="true">(AE only)</span></Label><Dropdown value={MONTHS[value.month - 1]} selectedOptions={[String(value.month)]} onOptionSelect={(_event, data) => data.optionValue && onChange({ ...value, month: Number(data.optionValue) })}>{MONTHS.map((month, index) => <Option key={month} value={String(index + 1)}>{month}</Option>)}</Dropdown></div>
    <div className={`${styles.field} ${styles.multi}`}><Label>Plant</Label><Dropdown multiselect value={selectedLabel(value.plantIds, orderedPlants, 'All Plants')} selectedOptions={value.plantIds} onOptionSelect={(_event, data) => onChange({ ...value, plantIds: data.selectedOptions })}>{orderedPlants.map((plant) => <Option key={plant.id} value={plant.id}>{plant.name}</Option>)}</Dropdown></div>
    <div className={`${styles.field} ${styles.multi}`}><Label>Production Line</Label><Dropdown multiselect value={selectedLabel(value.productionLineIds, orderedProductionLines, 'All Production Lines')} selectedOptions={value.productionLineIds} onOptionSelect={(_event, data) => onChange({ ...value, productionLineIds: data.selectedOptions })}>{orderedProductionLines.map((line) => <Option key={line.id} value={line.id}>{line.name}</Option>)}</Dropdown></div>
  </div>;
};
