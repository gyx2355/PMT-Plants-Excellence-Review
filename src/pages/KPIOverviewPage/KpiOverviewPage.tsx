import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import type { GlobalFilterState } from '../../types/filters';
import { useKpiDefinitions, useMonthlyKpiResults, useMonthlyKpiResultsByYear, usePlants, useTargets } from '../../hooks/queries';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { KpiStatus } from '../../domain/enums';
import { buildKpiMonthlyMatrixRows, buildOverviewMatrix, buildPlantOverviewMetrics } from './overviewMetrics';
import { buildComparisonRows } from '../KPIComparisonPage/comparisonMetrics';
import { getPreviousPeriod } from '../../domain/services/period';
import { KpiDetailTable } from '../../components/kpi/KpiDetailTable';
import { KpiMonthlyMatrixTable } from '../../components/kpi/KpiMonthlyMatrixTable';
import {
  Caption1,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  ProgressBar,
  Subtitle2,
  Tab,
  TabList,
  Text,
  tokens,
} from '@fluentui/react-components';


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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: tokens.spacingHorizontalM,
  },
  summaryCard: {
    minWidth: 0,
  },
  cardHeader: {
    alignItems: 'flex-start',
  },
  plantName: {
    fontWeight: tokens.fontWeightSemibold,
  },
  completion: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalM,
  },
  completionValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
  },
  statusCounts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalM,
  },
  count: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  sectionQualifier: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    marginLeft: tokens.spacingHorizontalXS,
  },
  matrixScroll: {
    overflowX: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  matrix: {
    width: '100%',
    minWidth: '720px',
    borderCollapse: 'collapse',
  },
  matrixCell: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  matrixHeader: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
  },
  centered: {
    textAlign: 'center',
  },
});

export const KpiOverviewPage: React.FC = () => {

  const styles = useStyles();
  const previousPeriod = getPreviousPeriod();
  const [activeView, setActiveView] = useState<'matrix' | 'detail' | 'monthly'>('matrix');
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<GlobalFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantId: 'all',
    kpiCategory: 'all',
    kpiId: 'all',
    status: 'all',
  });

  const plantsQuery = usePlants();
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year);
  const resultsQuery = useMonthlyKpiResults(filters.year, filters.month);
  const monthlyResultsQuery = useMonthlyKpiResultsByYear(filters.year, activeView === 'monthly');

  const plantMetrics = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !resultsQuery.data) return [];
    return buildPlantOverviewMetrics(
      plantsQuery.data,
      kpisQuery.data,
      targetsQuery.data,
      resultsQuery.data,
      filters.year,
    );
  }, [filters.year, kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const matrixRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !resultsQuery.data) return [];
    return buildOverviewMatrix(plantsQuery.data, kpisQuery.data, targetsQuery.data ?? [], resultsQuery.data);
  }, [kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const detailRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !resultsQuery.data) return [];
    return buildComparisonRows(plantsQuery.data, kpisQuery.data, targetsQuery.data, resultsQuery.data, 'all')
      .filter((row) => row.target?.cyTarget !== null && row.target?.cyTarget !== undefined);
  }, [kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const monthlyMatrixRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !monthlyResultsQuery.data) return [];
    return buildKpiMonthlyMatrixRows(plantsQuery.data, kpisQuery.data, targetsQuery.data, monthlyResultsQuery.data, filters.month);
  }, [filters.month, kpisQuery.data, monthlyResultsQuery.data, plantsQuery.data, targetsQuery.data]);

  const tablePlants = (plantsQuery.data ?? []).filter((plant) => selectedPlantIds.length === 0 || selectedPlantIds.includes(plant.id));
  const tablePlantIds = new Set(tablePlants.map((plant) => plant.id));
  const tableMatrixRows = matrixRows.filter((row) => tablePlants.some((plant) => row.statuses[plant.id] !== null));
  const tableDetailRows = detailRows.filter((row) => tablePlantIds.has(row.plant.id));
  const tableMonthlyMatrixRows = monthlyMatrixRows.filter((row) => tablePlantIds.has(row.plant.id));

  const isLoading = plantsQuery.isLoading || kpisQuery.isLoading || targetsQuery.isLoading || resultsQuery.isLoading || (activeView === 'monthly' && monthlyResultsQuery.isLoading);
  const error = plantsQuery.error || kpisQuery.error || targetsQuery.error || resultsQuery.error || (activeView === 'monthly' ? monthlyResultsQuery.error : null);

  if (error) {
    return <ErrorState message="The KPI Overview could not load the selected Dataverse period." />;
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="KPI Overview"
        subtitle="Compare completion status and traffic light metrics across four TPU plants"
      />
      <GlobalFilters
        value={filters}
        onChange={setFilters}
        showPlant={false}
        showPlantMultiSelect
        plantsList={(plantsQuery.data ?? []).map((plant) => ({ id: plant.id, name: plant.name }))}
        selectedPlantIds={selectedPlantIds}
        onPlantIdsChange={setSelectedPlantIds}
        showCategory={false}
      />
      <div className={styles.dataArea}>
      {isLoading ? <LoadingSkeleton rows={4} /> : null}

      {!isLoading && plantMetrics.length === 0 ? (
        <EmptyState title="No plants available" message="No plant records were returned from Dataverse." />
      ) : null}

      {!isLoading && plantMetrics.length > 0 ? (
        <>
          <section className={styles.section} aria-labelledby="plant-summary-heading">
            <div className={styles.sectionHeader}>
              <div>
                <Subtitle2 id="plant-summary-heading">
                  Plant completion summary
                  <Caption1 className={styles.sectionQualifier}>({filters.year} / {filters.month} YTD)</Caption1>
                </Subtitle2>
              </div>
              <Caption1>Missing results are excluded from entered counts</Caption1>
            </div>
            <div className={styles.summaryGrid}>
              {plantMetrics.map((metrics) => (
                <Card className={styles.summaryCard} key={metrics.plant.id}>
                  <CardHeader
                    className={styles.cardHeader}
                    header={<Text className={styles.plantName}>{metrics.plant.name}</Text>}
                    description={<Caption1>{metrics.enteredCount} of {metrics.expectedCount} KPI results entered</Caption1>}
                  />
                  <div className={styles.completion}>
                    <div>
                      <Text className={styles.completionValue}>{metrics.completionRate}%</Text>
                      <Caption1>Completion</Caption1>
                    </div>
                    <ProgressBar value={metrics.completionRate / 100} aria-label={`${metrics.plant.name} completion`} />
                  </div>
                  <div className={styles.statusCounts} aria-label={`${metrics.plant.name} status counts`}>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Green} showText={false} /> {metrics.statusCounts[KpiStatus.Green]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Amber} showText={false} /> {metrics.statusCounts[KpiStatus.Amber]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Red} showText={false} /> {metrics.statusCounts[KpiStatus.Red]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Missing} showText={false} /> {metrics.statusCounts[KpiStatus.Missing]}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          <TabList
            selectedValue={activeView}
            onTabSelect={(_event, data) => setActiveView(data.value as 'matrix' | 'detail' | 'monthly')}
            aria-label="KPI overview data view"
          >
            <Tab value="matrix">KPI status matrix</Tab>
            <Tab value="detail">KPI detail table</Tab>
            <Tab value="monthly">KPI Monthly Matrix</Tab>
          </TabList>

          {activeView === 'matrix' ? <section className={styles.section} aria-labelledby="status-matrix-heading">
            <div className={styles.sectionHeader}>
              <div>
                <Subtitle2 id="status-matrix-heading">
                  KPI status matrix
                  <Caption1 className={styles.sectionQualifier}>(Review status across all available plants for the selected period.)</Caption1>
                </Subtitle2>
              </div>
            </div>
            <div className={styles.matrixScroll}>
              <table className={styles.matrix}>
                <thead>
                  <tr>
                    <th className={`${styles.matrixCell} ${styles.matrixHeader}`}>KPI</th>
                    <th className={`${styles.matrixCell} ${styles.matrixHeader}`}>Category</th>
                    {tablePlants.map((plant) => (
                      <th className={`${styles.matrixCell} ${styles.matrixHeader} ${styles.centered}`} key={plant.id}>{plant.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableMatrixRows.map((row) => (
                    <tr key={row.kpi.id}>
                      <td className={styles.matrixCell}>{row.kpi.name}</td>
                      <td className={styles.matrixCell}>{row.kpi.category}</td>
                      {tablePlants.map((plant) => (
                        <td className={`${styles.matrixCell} ${styles.centered}`} key={plant.id}>
                          {row.statuses[plant.id] === null ? null : <StatusBadge status={row.statuses[plant.id]!} />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> : null}

          {activeView === 'detail' ? <section className={styles.section} aria-labelledby="detail-table-heading">
            <Subtitle2 id="detail-table-heading">
              KPI detail table
              <Caption1 className={styles.sectionQualifier}>(Target, actual, YTD and achievement by plant.)</Caption1>
            </Subtitle2>
            <KpiDetailTable rows={tableDetailRows} />
          </section> : null}
          {activeView === 'monthly' ? <section className={styles.section} aria-labelledby="monthly-matrix-heading">
            <Subtitle2 id="monthly-matrix-heading">KPI Monthly Matrix</Subtitle2>
            <KpiMonthlyMatrixTable rows={tableMonthlyMatrixRows} />
          </section> : null}
        </>
      ) : null}
      </div>
    </div>
  );
};
