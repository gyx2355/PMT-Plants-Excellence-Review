import { useState } from 'react';
import { Button, Caption1, Card, Dropdown, Label, Option, Subtitle2, Text, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowReset24Regular } from '@fluentui/react-icons';
import { Bar, CartesianGrid, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAllTargets, usePlants, useProductionKpiMatrices, useProductionKpiRecords } from '../../hooks/queries';
import { Apma_pmtproductionkpisapma_type } from '../../generated/models/Apma_pmtproductionkpisModel';
import { buildProductionQualityAxisDomains, buildProductionQualityMetrics, MONTH_LABELS } from './chartMetrics';
import type { ProductionQualityMetrics, ProductionQualityPoint } from './chartMetrics';

const CATEGORY_COLORS: Record<string, string> = { liquid: '#111111', melt: '#C80046', recycle: '#F39200', fg: '#0066B3' };
const PALETTE = ['#0066B3', '#D13438', '#F39200', '#107C10', '#00A6A6', '#8764B8', '#69797E'];
const LINE_COLOR = '#0066B3';
const percent = (value: number | null) => value === null ? '' : `${value.toFixed(2)}%`;

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  filters: { display: 'flex', flexWrap: 'wrap', flexShrink: 0, alignItems: 'flex-end', gap: tokens.spacingHorizontalM, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: 0, flex: '1 1 170px', maxWidth: '240px' },
  filterControl: { width: '100%', minWidth: 0 },
  monthControl: { width: '100%', minWidth: 0, height: '32px', minHeight: '32px', maxHeight: '32px' },
  monthButton: { display: 'flex', minWidth: 0, alignItems: 'center' },
  monthText: { flex: 1, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  reset: { marginLeft: 'auto' },
  dataArea: { flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  plant: { flexShrink: 0, minWidth: 0, padding: tokens.spacingHorizontalL, gap: tokens.spacingVerticalL },
  plantName: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  typeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, minWidth: 0 },
  charts: { display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)', gap: tokens.spacingHorizontalL, '@media (max-width: 1100px)': { gridTemplateColumns: 'minmax(0, 1fr)' } },
  chartPanel: { minWidth: 0, overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall, padding: tokens.spacingHorizontalS, backgroundColor: tokens.colorNeutralBackground1 },
  monthlyChart: { height: '330px', minWidth: '560px', width: '100%' },
  comparisonChart: { height: '330px', minWidth: '260px', width: '100%' },
  legend: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, fontSize: tokens.fontSizeBase200 },
  swatch: { width: '12px', height: '12px', flexShrink: 0 },
  lineSwatch: { width: '24px', height: '3px', flexShrink: 0, backgroundColor: LINE_COLOR },
  tableScroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
  table: { width: '100%', minWidth: '1120px', borderCollapse: 'separate', borderSpacing: 0, fontVariantNumeric: 'tabular-nums' },
  cell: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`, textAlign: 'right', whiteSpace: 'nowrap', borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  heading: { backgroundColor: tokens.colorNeutralBackground3, fontWeight: tokens.fontWeightSemibold },
  rowHeading: { textAlign: 'left', position: 'sticky', left: 0, backgroundColor: tokens.colorNeutralBackground1 },
  ratioRow: { fontWeight: tokens.fontWeightSemibold },
});

export function MetricChart({ metrics, points, colors, comparison = false, exportSize }: {
  metrics: ProductionQualityMetrics;
  points: ProductionQualityPoint[];
  colors: Record<string, string>;
  comparison?: boolean;
  exportSize?: { width: number; height: number };
}) {
  const styles = useStyles();
  const data = points.map((point) => ({ label: point.label, ratio: point.ratio, ...point.quantities }));
  const domains = buildProductionQualityAxisDomains(points);
  return <div className={styles.chartPanel}>
    <div className={comparison ? styles.comparisonChart : styles.monthlyChart}>
      <ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}>
        <ComposedChart data={data} margin={{ top: 28, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" interval={0} tick={{ fontSize: 11 }} />
          <YAxis yAxisId="quantity" width={64} domain={domains.quantity} allowDataOverflow allowDecimals={false} tickFormatter={(value) => Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })} label={{ value: 'Quantity (t)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="ratio" orientation="right" width={60} domain={domains.ratio} allowDataOverflow allowDecimals={false} tickFormatter={(value) => `${Number(value).toFixed(0)}%`} />
          <Tooltip formatter={(value, name, item) => [item.dataKey === 'ratio' ? `${Number(value).toFixed(2)}%` : `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })} t`, name]} />
          {[...metrics.series].reverse().map((series) => <Bar key={series.key} yAxisId="quantity" dataKey={series.key} name={series.name} stackId="quantity" fill={colors[series.name]} maxBarSize={comparison ? 56 : 36} isAnimationActive={false} />)}
          {metrics.lineName ? <>
            <Line yAxisId="ratio" dataKey="ratio" type="linear" stroke="#FFFFFF" strokeWidth={6} dot={false} activeDot={false} tooltipType="none" legendType="none" zIndex={500} connectNulls={false} isAnimationActive={false} />
            <Line yAxisId="ratio" dataKey="ratio" name={metrics.lineName} type="linear" stroke={LINE_COLOR} strokeWidth={3} dot={{ r: 4, fill: '#FFFFFF', stroke: LINE_COLOR }} activeDot={{ r: 5 }} zIndex={501} connectNulls={false} isAnimationActive={false}>
              <LabelList dataKey="ratio" position="top" formatter={(value) => value == null ? '' : `${Number(value).toFixed(2)}%`} fill={LINE_COLOR} style={{ fontSize: '11px', stroke: '#FFFFFF', strokeWidth: 3, paintOrder: 'stroke' }} />
            </Line>
          </> : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>;
}

function MetricsSection({ type, metrics, colors }: { type: string; metrics: ProductionQualityMetrics; colors: Record<string, string> }) {
  const styles = useStyles();
  const columns = [...metrics.comparison, ...metrics.months];
  return <section className={styles.typeSection}>
    <Subtitle2>{type}</Subtitle2>
    {metrics.rmCategory === null ? <Caption1>RM configuration is missing or ambiguous.</Caption1> : null}
    <div className={styles.charts}>
      <MetricChart metrics={metrics} points={metrics.months} colors={colors} />
      <MetricChart metrics={metrics} points={metrics.comparison} colors={colors} comparison />
    </div>
    <div className={styles.legend}>
      {metrics.series.map((series) => <span className={styles.legendItem} key={series.key}><span className={styles.swatch} style={{ backgroundColor: colors[series.name] }} />{series.name}</span>)}
      {metrics.lineName ? <span className={styles.legendItem}><span className={styles.lineSwatch} />{metrics.lineName}</span> : null}
    </div>
    <div className={styles.tableScroll}><table className={styles.table} aria-label={`${type} percentages`}>
      <thead><tr><th className={`${styles.cell} ${styles.heading} ${styles.rowHeading}`}>Categories</th>{columns.map((column) => <th className={`${styles.cell} ${styles.heading}`} key={column.label}>{column.label}</th>)}</tr></thead>
      <tbody>
        {metrics.series.map((series) => <tr key={series.key}><th scope="row" className={`${styles.cell} ${styles.rowHeading}`}>{series.name}</th>{columns.map((column) => <td className={styles.cell} key={column.label}>{percent(column.percentages[series.key])}</td>)}</tr>)}
        {metrics.lineName ? <tr className={styles.ratioRow}><th scope="row" className={`${styles.cell} ${styles.rowHeading}`}>{metrics.lineName}</th>{columns.map((column) => <td className={styles.cell} key={column.label}>{percent(column.ratio)}</td>)}</tr> : null}
      </tbody>
    </table></div>
  </section>;
}

export function ProductionQualityPage() {
  const styles = useStyles();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [months, setMonths] = useState<number[]>(() => Array.from({ length: new Date().getMonth() }, (_value, index) => index + 1));
  const [plantIds, setPlantIds] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const plantsQuery = usePlants();
  const targetsQuery = useAllTargets();
  const matricesQuery = useProductionKpiMatrices();
  const recordsQuery = useProductionKpiRecords();
  const loading = plantsQuery.isLoading || targetsQuery.isLoading || matricesQuery.isLoading || recordsQuery.isLoading;
  const error = plantsQuery.error || targetsQuery.error || matricesQuery.error || recordsQuery.error;
  const records = recordsQuery.data ?? [];
  const matrices = matricesQuery.data ?? [];
  const plants = [...(plantsQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(new Date().getFullYear()))].sort((left, right) => left - right);
  const availableTypes = [...new Set([...Object.values(Apma_pmtproductionkpisapma_type), ...matrices.map((matrix) => matrix.type), ...records.map((record) => record.type)].filter((type): type is string => Boolean(type)))];
  const categoryNames = [...new Set([...matrices.map((matrix) => matrix.categories), ...records.map((record) => record.categories)])];
  const colors = Object.fromEntries(categoryNames.map((name, index) => [name.trim(), CATEGORY_COLORS[name.trim().toLowerCase()] ?? PALETTE[index % PALETTE.length]]));
  const selectedPlants = plants.filter((plant) => plantIds.length === 0 || plantIds.includes(plant.id));
  const label = (values: string[], all: string) => values.length === 0 ? all : values.join(', ');
  const reset = () => { setYear(new Date().getFullYear()); setMonths(Array.from({ length: new Date().getMonth() }, (_value, index) => index + 1)); setPlantIds([]); setTypes([]); };

  return <div className={styles.page}>
    <PageHeader title="Production & Quality" />
    <div className={styles.filters}>
      <div className={styles.filter}><Label>Year</Label><Dropdown className={styles.filterControl} aria-label="Year" value={String(year)} selectedOptions={[String(year)]} onOptionSelect={(_event, data) => data.optionValue && setYear(Number(data.optionValue))}>{years.map((value) => <Option key={value} value={String(value)} text={String(value)}>{String(value)}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Month</Label><Dropdown className={styles.monthControl} button={{ className: styles.monthButton, title: label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months'), children: <span className={styles.monthText}>{label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months')}</span> }} expandIcon={{ style: { flexShrink: 0 } }} aria-label="Month" multiselect value={label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months')} selectedOptions={months.map(String)} onOptionSelect={(_event, data) => setMonths(data.selectedOptions.map(Number))}>{MONTH_LABELS.map((month, index) => <Option key={month} value={String(index + 1)}>{month}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Plant Name</Label><Dropdown className={styles.filterControl} aria-label="Plant Name" multiselect value={label(plants.filter((plant) => plantIds.includes(plant.id)).map((plant) => plant.name), 'All Plants')} selectedOptions={plantIds} onOptionSelect={(_event, data) => setPlantIds(data.selectedOptions)}>{plants.map((plant) => <Option key={plant.id} value={plant.id} text={plant.name}>{plant.name}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Type</Label><Dropdown className={styles.filterControl} aria-label="Type" multiselect value={label(types, 'All Types')} selectedOptions={types} onOptionSelect={(_event, data) => setTypes(data.selectedOptions)}>{availableTypes.map((type) => <Option key={type} value={type}>{type}</Option>)}</Dropdown></div>
      <Button className={styles.reset} appearance="subtle" icon={<ArrowReset24Regular />} onClick={reset}>Reset</Button>
    </div>
    <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Production and Quality data could not be loaded.'} /> : null}
      {loading ? <LoadingSkeleton rows={6} /> : null}
      {!loading && !error && selectedPlants.length === 0 ? <EmptyState title="No plants available" /> : null}
      {!loading && !error ? selectedPlants.map((plant) => {
        const plantTypes = availableTypes.filter((type) => (types.length === 0 || types.includes(type)) && (matrices.some((matrix) => matrix.plantId.toLowerCase() === plant.id.toLowerCase() && matrix.type === type) || records.some((record) => record.plantId.toLowerCase() === plant.id.toLowerCase() && record.type === type && (record.year === year || record.year === year - 1))));
        return <Card className={styles.plant} key={plant.id}>
          <Text className={styles.plantName}>{plant.name}</Text>
          {plantTypes.length === 0 ? <EmptyState title="No production or quality data" /> : plantTypes.map((type) => <MetricsSection key={type} type={type} metrics={buildProductionQualityMetrics(records, matrices, plant.id, type, year, months)} colors={colors} />)}
        </Card>;
      }) : null}
    </div>
  </div>;
}