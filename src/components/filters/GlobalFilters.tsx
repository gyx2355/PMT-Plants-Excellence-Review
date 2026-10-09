import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Dropdown,
  Option,
  Button,
  Tag,
  TagGroup,
  Label,
} from '@fluentui/react-components';
import {
  ArrowReset24Regular,
  Filter24Regular,
} from '@fluentui/react-icons';
import type { GlobalFilterState } from '../../types/filters';
import { useAllTargets } from '../../hooks/queries';
import { getPreviousPeriod } from '../../domain/services/period';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FFFFFF',
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalL,
    boxShadow: tokens.shadow2,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
    alignItems: 'flex-end',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minWidth: '140px',
  },
  actionsGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  tagsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXXS,
  },
});

interface GlobalFiltersProps {
  value: GlobalFilterState;
  onChange: (newValue: GlobalFilterState) => void;
  showPlant?: boolean;
  showPlantMultiSelect?: boolean;
  selectedPlantIds?: string[];
  onPlantIdsChange?: (plantIds: string[]) => void;
  showCategory?: boolean;
  showKpi?: boolean;
  showStatus?: boolean;
  showApplyButton?: boolean;
  plantsList?: Array<{ id: string; name: string }>;
  kpiList?: Array<{ id: string; name: string }>;
  categoryList?: string[];
}

const MONTHS = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

const CATEGORIES = ['all', 'EHS', 'Production', 'Quality'];
const STATUSES = ['all', 'Green', 'Amber', 'Red', 'Grey', 'Missing'];

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  value,
  onChange,
  showPlant = true,
  showPlantMultiSelect = false,
  selectedPlantIds = [],
  onPlantIdsChange,
  showCategory = true,
  showKpi = false,
  showStatus = false,
  showApplyButton = false,
  plantsList = [
    { id: 'all', name: 'All Plants' },
    { id: 'pudong', name: 'Pudong-TPU' },
    { id: 'zhanjiang', name: 'Zhanjiang-TPU' },
    { id: 'changhua', name: 'Changhua-TPU' },
    { id: 'yokkaichi', name: 'Yokkaichi-TPU' },
  ],
  kpiList = [],
  categoryList,
}) => {
  const styles = useStyles();
  const targetsQuery = useAllTargets();
  const previousPeriod = getPreviousPeriod();
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(previousPeriod.year, new Date().getFullYear()))].sort((left, right) => left - right);
  const [tempState, setTempState] = useState<GlobalFilterState>(value);

  const updateField = (field: keyof GlobalFilterState, val: string | number) => {
    const updated = { ...tempState, [field]: val };
    setTempState(updated);
    if (!showApplyButton) {
      onChange(updated);
    }
  };

  const handleApply = () => {
    onChange(tempState);
  };

  const handleReset = () => {
    const previousPeriod = getPreviousPeriod();
    const defaultState: GlobalFilterState = {
      year: previousPeriod.year,
      month: previousPeriod.month,
      plantId: 'all',
      kpiCategory: 'all',
      kpiId: 'all',
      status: 'all',
    };
    setTempState(defaultState);
    onChange(defaultState);
    onPlantIdsChange?.([]);
  };

  const activePlantLabel =
    plantsList.find((p) => p.id === value.plantId)?.name || 'All Plants';
  const selectedPlantLabels = plantsList.filter((plant) => selectedPlantIds.includes(plant.id)).map((plant) => plant.name);
  const activeMonthLabel = MONTHS.find((m) => m.value === value.month)?.label || '';
  const availableCategories = categoryList ? ['all', ...categoryList] : CATEGORIES;
  const selectedCategory = availableCategories.includes(tempState.kpiCategory)
    ? tempState.kpiCategory
    : 'all';
  const activeCategory = availableCategories.includes(value.kpiCategory)
    ? value.kpiCategory
    : 'all';

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        {/* Year Filter */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="year-select" size="small">
            Year
          </Label>
          <Dropdown
            id="year-select"
            size="medium"
            value={tempState.year.toString()}
            selectedOptions={[tempState.year.toString()]}
            onOptionSelect={(_e, data) =>
              data.optionValue && updateField('year', parseInt(data.optionValue, 10))
            }
          >
            {years.map((y) => (
              <Option key={y} value={y.toString()}>
                {y.toString()}
              </Option>
            ))}
          </Dropdown>
        </div>

        {/* Month Filter */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="month-select" size="small">
            Month
          </Label>
          <Dropdown
            id="month-select"
            size="medium"
            value={MONTHS.find((m) => m.value === tempState.month)?.label || ''}
            selectedOptions={[tempState.month.toString()]}
            onOptionSelect={(_e, data) =>
              data.optionValue && updateField('month', parseInt(data.optionValue, 10))
            }
          >
            {MONTHS.map((m) => (
              <Option key={m.value} value={m.value.toString()}>
                {m.label}
              </Option>
            ))}
          </Dropdown>
        </div>

        {/* Plant Filter */}
        {showPlant && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="plant-select" size="small">
              Plant
            </Label>
            <Dropdown
              id="plant-select"
              size="medium"
              value={plantsList.find((p) => p.id === tempState.plantId)?.name || 'All Plants'}
              selectedOptions={[tempState.plantId]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('plantId', data.optionValue)
              }
            >
              {plantsList.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {showPlantMultiSelect && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="plant-multi-select" size="small">Plant</Label>
            <Dropdown
              id="plant-multi-select"
              size="medium"
              multiselect
              value={selectedPlantLabels.length > 0 ? selectedPlantLabels.join(', ') : 'All Plants'}
              selectedOptions={selectedPlantIds}
              onOptionSelect={(_e, data) => onPlantIdsChange?.(data.selectedOptions)}
            >
              {plantsList.map((plant) => <Option key={plant.id} value={plant.id}>{plant.name}</Option>)}
            </Dropdown>
          </div>
        )}

        {/* Category Filter */}
        {showCategory && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="category-select" size="small">
              Category
            </Label>
            <Dropdown
              id="category-select"
              size="medium"
              value={selectedCategory === 'all' ? 'All Categories' : selectedCategory}
              selectedOptions={[selectedCategory]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('kpiCategory', data.optionValue)
              }
            >
              {availableCategories.map((c) => (
                <Option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* KPI Filter */}
        {showKpi && kpiList.length > 0 && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="kpi-select" size="small">
              KPI
            </Label>
            <Dropdown
              id="kpi-select"
              size="medium"
              value={kpiList.find((k) => k.id === tempState.kpiId)?.name || 'All KPIs'}
              selectedOptions={[tempState.kpiId]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('kpiId', data.optionValue)
              }
            >
              <Option key="all" value="all">
                All KPIs
              </Option>
              {kpiList.map((k) => (
                <Option key={k.id} value={k.id}>
                  {k.name}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* Status Filter */}
        {showStatus && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="status-select" size="small">
              Status
            </Label>
            <Dropdown
              id="status-select"
              size="medium"
              value={tempState.status === 'all' ? 'All Statuses' : tempState.status}
              selectedOptions={[tempState.status]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('status', data.optionValue)
              }
            >
              {STATUSES.map((s) => (
                <Option key={s} value={s}>
                  {s === 'all' ? 'All Statuses' : s}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* Filter Actions */}
        <div className={styles.actionsGroup}>
          {showApplyButton && (
            <Button appearance="primary" icon={<Filter24Regular />} onClick={handleApply}>
              Apply Filters
            </Button>
          )}
          <Button appearance="subtle" icon={<ArrowReset24Regular />} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Active Filter Tags */}
      <div className={styles.tagsRow}>
        <Label size="small" style={{ color: tokens.colorNeutralForeground3 }}>
          Active:
        </Label>
        <TagGroup aria-label="Active filters">
          <Tag size="small" appearance="outline">
            Year: {value.year}
          </Tag>
          <Tag size="small" appearance="outline">
            Month: {activeMonthLabel}
          </Tag>
          {showPlant && value.plantId !== 'all' && (
            <Tag size="small" appearance="outline">
              Plant: {activePlantLabel}
            </Tag>
          )}
          {showPlantMultiSelect && selectedPlantLabels.map((plant) => (
            <Tag key={plant} size="small" appearance="outline">Plant: {plant}</Tag>
          ))}
          {showCategory && activeCategory !== 'all' && (
            <Tag size="small" appearance="outline">
              Category: {activeCategory}
            </Tag>
          )}
          {showStatus && value.status !== 'all' && (
            <Tag size="small" appearance="outline">
              Status: {value.status}
            </Tag>
          )}
        </TagGroup>
      </div>
    </div>
  );
};
