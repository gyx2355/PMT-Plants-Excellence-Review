import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  LabelList,
  Line,
  ResponsiveContainer,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardHeader, Caption1, makeStyles, Text, tokens } from '@fluentui/react-components';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { VolumePacFilters, type VolumePacFilterState } from '../../components/filters/VolumePacFilters';
import { useAe, useAeCategories, useKpiDefinitions, usePlants, useProductionLines, useTargets, useVolumePac } from '../../hooks/queries';
import { aggregateVolumePac, buildAeStacks } from './chartMetrics';
import type { MonthlyVolumePacPoint } from './chartMetrics';
import type { AeCategory } from '../../domain/models/charts';
import { getPreviousPeriod } from '../../domain/services/period';

const AE_COLORS = ['#0F6CBD', '#D13438', '#F2C811', '#107C10', '#8764B8', '#00B7C3', '#8E562E', '#69797E'];
const AE_CATEGORY_COLORS: Record<string, string> = {
  oae: '#0070C0',
  uliac: '#FF0000',
  sloac: '#C6E0B4',
  sliac: '#FFC000',
  bo: '#00B050',
};

const getAeCategoryColor = (name: string | undefined, index: number) => {
  const key = name?.replace(/[^a-z]/gi, '').toLowerCase() ?? '';
  return AE_CATEGORY_COLORS[key] ?? AE_COLORS[index % AE_COLORS.length];
};

type VolumeBarShapeProps = React.ComponentProps<typeof Rectangle> & { payload?: { month?: number } };

function VolumeBarShape(props: VolumeBarShapeProps): React.ReactElement {
  const barWidth = Number(props.width ?? 0);
  const horizontalOffset = props.payload?.month === 0 ? barWidth / 2 + 4 : 0;
  return <Rectangle {...props} x={Number(props.x ?? 0) - horizontalOffset} />;
}

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  cards: { display: 'grid', gap: tokens.spacingVerticalL },
  plantCard: { padding: tokens.spacingHorizontalL, minWidth: 0 },
  plantName: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  chartLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 0.8fr) minmax(560px, 2.2fr)',
    gap: tokens.spacingHorizontalL,
    alignItems: 'stretch',
    '@media (max-width: 1100px)': { gridTemplateColumns: '1fr' },
  },
  aeGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: tokens.spacingHorizontalM },
  aeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, minWidth: 0 },
  aeLegend: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: tokens.spacingHorizontalXXS, fontSize: tokens.fontSizeBase200 },
  swatch: { width: '10px', height: '10px', flexShrink: 0 },
  chartPanel: { minWidth: 0, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall, padding: tokens.spacingHorizontalS, backgroundColor: tokens.colorNeutralBackground1 },
  chartTitle: { display: 'block', textAlign: 'center', fontWeight: tokens.fontWeightSemibold, marginTop: tokens.spacingVerticalXS },
  chartHeight: { width: '100%', height: '310px' },
  aeHeight: { width: '100%', height: '275px' },
  note: { color: tokens.colorNeutralForeground3 },
});

export const AeLineChart: React.FC<{
  plantId: string;
  productionLineId: string;
  productionLineName: string;
  values: Record<string, number>;
  categories: AeCategory[];
  showLabels?: boolean;
  exportSize?: { width: number; height: number };
}> = ({ productionLineName, values, categories, showLabels = false, exportSize }) => {
  const styles = useStyles();
  const data = [{ name: 'AE', ...values }];
  return <div className={styles.chartPanel}><div className={styles.aeHeight}><ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}><BarChart data={data} margin={{ top: 18, right: 12, left: -12, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" hide /><YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} /><Tooltip formatter={(value, name) => [`${Number(value).toFixed(1)}%`, categories.find((category) => category.id === name)?.name ?? name]} />{showLabels ? <Legend /> : null}{categories.map((category, index) => <Bar key={category.id} dataKey={category.id} stackId="ae" fill={getAeCategoryColor(category.name, index)} name={category.name} isAnimationActive={!showLabels}>{showLabels ? <LabelList dataKey={category.id} position="center" formatter={(value) => Number(value) > 0 ? `${Number(value).toFixed(1)}%` : ''} fill={['#C6E0B4', '#FFC000', '#F2C811'].includes(getAeCategoryColor(category.name, index)) ? '#111111' : '#FFFFFF'} style={{ fontSize: 11 }} /> : null}</Bar>)}</BarChart></ResponsiveContainer></div><Text className={styles.chartTitle}>{productionLineName}</Text></div>;
};

export function VolumePacChart({ data, exportSize }: { data: MonthlyVolumePacPoint[]; exportSize?: { width: number; height: number } }) {
  return <ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}><ComposedChart data={data} barGap={0} margin={{ top: 18, right: 20, left: 0, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" /><YAxis unit=" kt" /><Tooltip formatter={(value, name) => [`${Number(value).toFixed(2)} t`, name]} /><Legend /><Bar dataKey="forecast" name="Forecast" fill="#F07A2B" radius={[2, 2, 0, 0]} isAnimationActive={false} /><Bar dataKey="volume" name="Volume" fill="#092B62" radius={[2, 2, 0, 0]} shape={VolumeBarShape} isAnimationActive={false} /><Line dataKey="pac" name="PAC" type="monotone" stroke="#00A651" strokeWidth={3} dot={{ r: 3 }} isAnimationActive={false} /></ComposedChart></ResponsiveContainer>;
}

export const KpiComparisonPage: React.FC = () => {
  const styles = useStyles();
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<VolumePacFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantIds: [],
    productionLineIds: [],
  });
  const plantsQuery = usePlants();
  const linesQuery = useProductionLines();
  const categoriesQuery = useAeCategories();
  const volumeQuery = useVolumePac(filters.year);
  const aeQuery = useAe(filters.year, filters.month);
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year);

  const plants = useMemo(() => [...(plantsQuery.data ?? [])].filter((plant) => filters.plantIds.length === 0 || filters.plantIds.includes(plant.id)).sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name)), [filters.plantIds, plantsQuery.data]);
  const lines = linesQuery.data ?? [];
  const categories = useMemo(() => categoriesQuery.data ?? [], [categoriesQuery.data]);
  const aeStacks = useMemo(() => buildAeStacks(aeQuery.data ?? [], categories, filters.plantIds, filters.productionLineIds), [aeQuery.data, categories, filters.plantIds, filters.productionLineIds]);
  const productionVolumeKpiId = kpisQuery.data?.find((kpi) => kpi.name.trim().toLowerCase() === 'production volume')?.id;
  const isLoading = plantsQuery.isLoading || linesQuery.isLoading || categoriesQuery.isLoading || volumeQuery.isLoading || aeQuery.isLoading || kpisQuery.isLoading || targetsQuery.isLoading;
  const error = plantsQuery.error || linesQuery.error || categoriesQuery.error || volumeQuery.error || aeQuery.error || kpisQuery.error || targetsQuery.error;

  return <div className={styles.page}>
    <PageHeader title="Volume & PAC" subtitle="Monthly production volume, forecast, PAC and production-line AE performance" />
    <VolumePacFilters value={filters} plants={plantsQuery.data ?? []} productionLines={lines} onChange={setFilters} />
    <div className={styles.dataArea}>
    {error ? <ErrorState message="Volume, PAC or AE data could not be loaded from Dataverse." /> : null}
    {isLoading ? <LoadingSkeleton rows={6} /> : null}
    {!isLoading && !error && plants.length === 0 ? <EmptyState title="No plants selected" /> : null}
    {!isLoading && !error && plants.length > 0 ? <div className={styles.cards}>{plants.map((plant) => {
      const operatingPlan = targetsQuery.data?.find((target) => target.plantId === plant.id && target.kpiId === productionVolumeKpiId)?.cyTarget ?? null;
      const monthlyData = aggregateVolumePac(volumeQuery.data ?? [], [plant.id], filters.productionLineIds, operatingPlan);
      const plantAeStacks = aeStacks.filter((stack) => stack.plantId === plant.id);
      return <Card className={styles.plantCard} key={plant.id}><CardHeader header={<Text className={styles.plantName}>{plant.name}</Text>} description={<Caption1 className={styles.note}>{filters.year} Volume & PAC; Month {filters.month} AE</Caption1>} /><div className={styles.chartLayout}><div className={styles.aeSection}><div className={styles.aeLegend}>{categories.map((category, index) => <span className={styles.legendItem} key={category.id}><span className={styles.swatch} style={{ backgroundColor: getAeCategoryColor(category.name, index) }} />{category.name}</span>)}</div><div className={styles.aeGrid}>{plantAeStacks.length > 0 ? plantAeStacks.map((stack) => <AeLineChart key={stack.productionLineId} plantId={stack.plantId} productionLineId={stack.productionLineId} productionLineName={lines.find((line) => line.id === stack.productionLineId)?.name ?? 'Production Line'} values={stack.values} categories={categories} />) : <EmptyState title="No AE data" message="No AE records match this plant, month and production-line selection." />}</div></div><div className={styles.chartPanel}><div className={styles.chartHeight}><VolumePacChart data={monthlyData} /></div></div></div></Card>;
    })}</div> : null}
    </div>
  </div>;
};
