import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import type { GlobalFilterState } from '../../types/filters';
import {
  useKpiDefinitions,
  useMonthlyKpiResults,
  usePlants,
  useSaveMonthlyKpiResults,
  useTargets,
} from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { getPreviousPeriod } from '../../domain/services/period';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { MonthlyKpiResult } from '../../domain/models';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import { buildEditableKpiRows, getChangedKpiRows, parseNumericInput, type EditableKpiRow } from './entryRows';
import {
  Button,
  Card,
  Caption1,
  Input,
  Label,
  makeStyles,
  Subtitle2,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    gap: tokens.spacingVerticalL,
  },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  categorySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  categoryTitle: {
    fontWeight: tokens.fontWeightSemibold,
  },
  tableScroll: {
    overflowX: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  table: {
    width: '100%',
    minWidth: '1000px',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  cell: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
  },
  numeric: {
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
  },
  input: {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },
  missing: {
    color: tokens.colorNeutralForeground3,
  },
});

export const KpiDataEntryPage: React.FC = () => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [isEditing, setIsEditing] = useState(false);
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<GlobalFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantId: 'all',
    kpiCategory: 'all',
    kpiId: 'all',
    status: 'all',
  });
  const [draftState, setDraftState] = useState<{
    key: string;
    values: Record<string, Partial<Record<'monthlyActual' | 'ytdActual', string>>>;
  }>({ key: '', values: {} });

  const plantsQuery = usePlants();
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year, filters.plantId);
  const resultsQuery = useMonthlyKpiResults(filters.year, filters.month, filters.plantId);
  const saveMutation = useSaveMonthlyKpiResults();

  const categoryList = useMemo(() => Array.from(new Set((kpisQuery.data ?? []).map((kpi) => kpi.category).filter(Boolean))), [kpisQuery.data]);
  const selectedCategory = categoryList.includes(filters.kpiCategory) ? filters.kpiCategory : 'all';
  const visibleKpis = useMemo(() => (kpisQuery.data ?? []).filter((kpi) =>
    selectedCategory === 'all' || kpi.category === selectedCategory,
  ).filter((kpi) => filters.kpiId === 'all' || kpi.id === filters.kpiId), [filters.kpiId, kpisQuery.data, selectedCategory]);

  const draftKey = `${filters.year}:${filters.month}:${filters.plantId}:${filters.kpiCategory}:${filters.kpiId}`;
  const baseRows = useMemo(() => {
    if (filters.plantId === 'all' || !targetsQuery.data || !resultsQuery.data) return [];
    return buildEditableKpiRows(visibleKpis, targetsQuery.data, resultsQuery.data, filters.plantId);
  }, [filters.plantId, resultsQuery.data, targetsQuery.data, visibleKpis]);
  const rows = useMemo(() => baseRows.map((row) => ({
    ...row,
    monthlyActual: draftState.key === draftKey && draftState.values[row.kpi.id]?.monthlyActual !== undefined
      ? parseNumericInput(draftState.values[row.kpi.id].monthlyActual!)
      : row.monthlyActual,
    ytdActual: draftState.key === draftKey && draftState.values[row.kpi.id]?.ytdActual !== undefined
      ? parseNumericInput(draftState.values[row.kpi.id].ytdActual!)
      : row.ytdActual,
  })), [baseRows, draftKey, draftState.key, draftState.values]);

  const isLoading = kpisQuery.isLoading || targetsQuery.isLoading || resultsQuery.isLoading || plantsQuery.isLoading;
  const error = kpisQuery.error || targetsQuery.error || resultsQuery.error || plantsQuery.error;
  const groupedRows = useMemo(() => {
    return rows.reduce<Record<string, EditableKpiRow[]>>((groups, row) => {
      const category = row.kpi.category || 'Other';
      groups[category] = groups[category] ? [...groups[category], row] : [row];
      return groups;
    }, {});
  }, [rows]);

  const updateRow = (kpiId: string, field: 'monthlyActual' | 'ytdActual', value: string) => {
    setDraftState((currentState) => ({
      key: draftKey,
      values: {
        ...(currentState.key === draftKey ? currentState.values : {}),
        [kpiId]: {
          ...(currentState.key === draftKey ? currentState.values[kpiId] : {}),
          [field]: value,
        },
      },
    }));
  };

  const getRowStatus = (row: EditableKpiRow) => calculateKpiStatus(row.kpi.kpiLogic, row.ytdActual, row.target?.cyTarget);

  const save = async () => {
    if (!isEditing) return;
    const hasInvalidInput = draftState.key === draftKey && Object.values(draftState.values).some((values) =>
      Object.values(values).some((value) => value !== undefined && value.trim() !== '' && parseNumericInput(value) === null),
    );
    if (hasInvalidInput) {
      notifyError('Invalid value', 'Enter a valid number in Monthly Actual and YTD Actual.');
      return;
    }
    const changedRows = getChangedKpiRows(baseRows, rows);
    if (changedRows.length === 0) {
      setIsEditing(false);
      setDraftState({ key: '', values: {} });
      return;
    }
    if (filters.plantId === 'all') {
      notifyError('Plant is required', 'Select one plant before saving KPI results.');
      return;
    }
    const missingTargets = changedRows.filter((row) => !row.target);
    if (missingTargets.length > 0) {
      notifyError('Target is missing', `${missingTargets.length} KPI row(s) have no target for the selected plant and year.`);
      return;
    }
    const invalidRows = changedRows.filter((row) => row.monthlyActual === null && row.ytdActual === null && row.result);
    if (invalidRows.length > 0) {
      notifyError('Incomplete values', 'Existing KPI results cannot be cleared by leaving both values empty.');
      return;
    }

    const payload: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }> = changedRows.map((row) => ({
      id: row.result?.id,
      year: filters.year,
      month: filters.month,
      plantId: filters.plantId,
      kpiId: row.kpi.id,
      targetId: row.target?.id,
      monthlyActual: row.monthlyActual,
      ytdActual: row.ytdActual,
      status: getRowStatus(row),
    }));

    try {
      await saveMutation.mutateAsync(payload);
      setIsEditing(false);
      setDraftState({ key: '', values: {} });
      notifySuccess('KPI results saved', 'Dataverse values were saved and the grid will refresh.');
    } catch {
      notifyError('Save failed', 'The KPI results could not be saved to Dataverse.');
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="KPI Data Entry"
        subtitle="Enter and validate monthly actual KPI results for the selected plant and period"
      />
      <GlobalFilters
        value={filters}
        onChange={(nextFilters) => {
          setIsEditing(false);
          setDraftState({ key: '', values: {} });
          setFilters(nextFilters);
        }}
        showPlant
        showCategory
        plantsList={[
          { id: 'all', name: 'Select Plant' },
          ...(plantsQuery.data ?? []).map((plant) => ({ id: plant.id, name: plant.name })),
        ]}
        kpiList={kpisQuery.data?.map((kpi) => ({ id: kpi.id, name: kpi.name })) ?? []}
        categoryList={categoryList}
        showKpi
      />

      <div className={styles.dataArea}>
      {error ? <ErrorState message="The KPI entry grid could not load the selected Dataverse period." /> : null}
      {isLoading ? <LoadingSkeleton rows={6} /> : null}
      {!isLoading && !error && filters.plantId === 'all' ? <EmptyState title="Select a plant" message="Choose a plant to load its KPI entry rows." /> : null}
      {!isLoading && !error && filters.plantId !== 'all' && rows.length === 0 ? <EmptyState title="No KPI rows available" message="No KPI definitions or targets were returned for this selection." /> : null}

      {!isLoading && !error && filters.plantId !== 'all' && rows.length > 0 ? (
        <>
          <div className={styles.toolbar}>
            <div>
              <Subtitle2>Monthly KPI results</Subtitle2>
              <Caption1> (Zero is a valid value. Leave a field empty only when the value is missing.)</Caption1>
            </div>
            <div>
              {isEditing ? <Button
                appearance="secondary"
                icon={<Dismiss24Regular />}
                onClick={() => { setIsEditing(false); setDraftState({ key: '', values: {} }); }}
                disabled={saveMutation.isPending}
              >Cancel</Button> : null}
              {!isEditing ? <Button
                appearance="secondary"
                icon={<Edit24Regular />}
                onClick={() => setIsEditing(true)}
                disabled={saveMutation.isPending}
              >Edit</Button> : null}
              <Button
                appearance="primary"
                icon={<Save24Regular />}
                onClick={save}
                disabled={!isEditing || saveMutation.isPending}
                style={{ marginLeft: '8px' }}
              >
              {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
          {Object.entries(groupedRows).map(([category, categoryRows]) => (
            <section className={styles.categorySection} key={category}>
              <Subtitle2 className={styles.categoryTitle}>{category}</Subtitle2>
              <Card className={styles.tableScroll}>
                <table className={styles.table}>
                  <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '9%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '14%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className={`${styles.cell} ${styles.header}`}>KPI</th>
                      <th className={`${styles.cell} ${styles.header}`}>Unit</th>
                      <th className={`${styles.cell} ${styles.header} ${styles.numeric}`}>PY Actual</th>
                      <th className={`${styles.cell} ${styles.header} ${styles.numeric}`}>Target</th>
                      <th className={`${styles.cell} ${styles.header}`}>Monthly Actual</th>
                      <th className={`${styles.cell} ${styles.header}`}>YTD Actual</th>
                      <th className={`${styles.cell} ${styles.header}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryRows.map((row) => (
                      <tr key={row.kpi.id}>
                        <td className={styles.cell}>{row.kpi.name}</td>
                        <td className={styles.cell}>{row.kpi.unit}</td>
                        <td className={`${styles.cell} ${styles.numeric}`}>{row.target?.pyActual ?? 'N/A'}</td>
                        <td className={`${styles.cell} ${styles.numeric}`}>{row.target?.cyTarget ?? 'N/A'}</td>
                        <td className={styles.cell}>
                          <Label htmlFor={`${row.kpi.id}-monthly`} hidden>Monthly Actual for {row.kpi.name}</Label>
                          <Input
                            className={styles.input}
                            id={`${row.kpi.id}-monthly`}
                            type="text"
                            inputMode="decimal"
                            disabled={!isEditing}
                            value={draftState.key === draftKey && draftState.values[row.kpi.id]?.monthlyActual !== undefined
                              ? draftState.values[row.kpi.id].monthlyActual
                              : row.monthlyActual === null ? '' : String(row.monthlyActual)}
                            onChange={(_event, data) => updateRow(row.kpi.id, 'monthlyActual', data.value)}
                            aria-label={`Monthly Actual for ${row.kpi.name}`}
                          />
                        </td>
                        <td className={styles.cell}>
                          <Label htmlFor={`${row.kpi.id}-ytd`} hidden>YTD Actual for {row.kpi.name}</Label>
                          <Input
                            className={styles.input}
                            id={`${row.kpi.id}-ytd`}
                            type="text"
                            inputMode="decimal"
                            disabled={!isEditing}
                            value={draftState.key === draftKey && draftState.values[row.kpi.id]?.ytdActual !== undefined
                              ? draftState.values[row.kpi.id].ytdActual
                              : row.ytdActual === null ? '' : String(row.ytdActual)}
                            onChange={(_event, data) => updateRow(row.kpi.id, 'ytdActual', data.value)}
                            aria-label={`YTD Actual for ${row.kpi.name}`}
                          />
                        </td>
                        <td className={styles.cell}>
                          <StatusBadge status={getRowStatus(row)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          ))}
        </>
      ) : null}
      </div>
    </div>
  );
};
