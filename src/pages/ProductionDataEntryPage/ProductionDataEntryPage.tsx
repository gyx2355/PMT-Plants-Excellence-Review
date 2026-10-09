import { useState } from 'react';
import { Button, Card, Combobox, Input, Label, Option, Subtitle2, Tag, TagGroup, Text, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowReset24Regular, Dismiss24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAllTargets, usePlants, useProductionKpiMatrices, useProductionKpiRecords, useSaveProductionKpis } from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { getPreviousPeriod } from '../../domain/services/period';
import { buildProductionRows, buildProductionSavePayload, calculateProductionRatios, calculateProductionSummary, isCalculatedProductionQuantity } from './productionRows';
import type { ProductionFilters } from './productionRows';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
type FilterOption = { value: string; label: string };

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  filters: { display: 'flex', flexDirection: 'column', flexShrink: 0, gap: tokens.spacingVerticalS, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium, boxShadow: tokens.shadow2 },
  filterRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', columnGap: tokens.spacingHorizontalM, rowGap: tokens.spacingVerticalM },
  filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, flex: '1 1 180px', minWidth: 0, maxWidth: '220px' },
  filterControl: { width: '100%', minWidth: 0, boxSizing: 'border-box' },
  reset: { marginLeft: 'auto', flexShrink: 0 },
  activeFilters: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalS },
  activeTags: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS, minWidth: 0 },
  toolbar: { display: 'flex', justifyContent: 'flex-end', gap: tokens.spacingHorizontalS, flexShrink: 0 },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'auto', gap: tokens.spacingVerticalL },
  plantSection: { display: 'flex', flexDirection: 'column', flexShrink: 0, gap: tokens.spacingVerticalM },
  typeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  plantHeading: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  tableScroll: { display: 'block', padding: 0, overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '800px', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, textAlign: 'left', borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, overflowWrap: 'anywhere' },
  header: { backgroundColor: tokens.colorNeutralBackground3, fontWeight: tokens.fontWeightSemibold },
  input: { width: '100%', minWidth: 0, boxSizing: 'border-box' },
});

function MultiSelectFilter({ label, options, selected, placeholder, disabled, multiSelect = true, onChange }: {
  label: string;
  options: FilterOption[];
  selected: string[];
  placeholder: string;
  disabled: boolean;
  multiSelect?: boolean;
  onChange: (selected: string[]) => void;
}) {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const selectedLabel = selected.length === 0 ? placeholder : options.filter((option) => selected.includes(option.value)).map((option) => option.label).join(', ');
  const matching = options.filter((option) => option.label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  return <div className={styles.filter}>
    <Label size="small">{label}</Label>
    <Combobox
      className={styles.filterControl}
      aria-label={label}
      multiselect={multiSelect}
      disabled={disabled}
      placeholder={selectedLabel}
      value={search}
      selectedOptions={selected}
      onChange={(event) => { const value = event.currentTarget.value; setSearch(value); }}
      onOptionSelect={(_event, data) => { onChange(multiSelect ? data.selectedOptions : data.selectedOptions.slice(-1)); setSearch(''); }}
      onBlur={() => setSearch('')}
    >
      {matching.map((option) => <Option key={option.value} value={option.value} text={option.label}>{option.label}</Option>)}
      {matching.length === 0 ? <Option disabled>No matches</Option> : null}
    </Combobox>
  </div>;
}

export function ProductionDataEntryPage() {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [filters, setFilters] = useState<ProductionFilters>(() => {
    const period = getPreviousPeriod();
    return { years: [period.year], months: [period.month], plantIds: [], categories: [] };
  });
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const plantsQuery = usePlants();
  const targetsQuery = useAllTargets();
  const matricesQuery = useProductionKpiMatrices();
  const recordsQuery = useProductionKpiRecords(filters.plantIds.length > 0);
  const saveMutation = useSaveProductionKpis();

  const plants = [...(plantsQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const matrices = [...(matricesQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(new Date().getFullYear(), getPreviousPeriod().year))].sort((left, right) => left - right);
  const categoryNames = [...new Set(matrices.map((matrix) => matrix.categories).filter(Boolean))];
  const referenceRows = buildProductionRows(plants, matrices, recordsQuery.data ?? [], { ...filters, categories: [] });
  const rows = calculateProductionRatios(referenceRows, drafts, matrices)
    .filter((row) => filters.categories.length === 0 || filters.categories.includes(row.categories));
  const loading = plantsQuery.isLoading || targetsQuery.isLoading || matricesQuery.isLoading || (filters.plantIds.length > 0 && recordsQuery.isLoading);
  const error = plantsQuery.error || targetsQuery.error || matricesQuery.error || (filters.plantIds.length > 0 ? recordsQuery.error : null);
  const locked = editing || saveMutation.isPending;

  const changeFilter = (next: ProductionFilters) => { setFilters(next); setDrafts({}); };
  const resetFilters = () => {
    const period = getPreviousPeriod();
    changeFilter({ years: [period.year], months: [period.month], plantIds: [], categories: [] });
  };
  const activeFilters = [
    ...filters.years.map((year) => `Year: ${year}`),
    ...filters.months.map((month) => `Month: ${months[month - 1]}`),
    ...plants.filter((plant) => filters.plantIds.includes(plant.id)).map((plant) => `Plant: ${plant.name}`),
    ...filters.categories.map((category) => `Categories: ${category}`),
  ];
  const save = async () => {
    if (!editing || saveMutation.isPending) return;
    try {
      const payload = buildProductionSavePayload(rows, drafts, referenceRows, matrices);
      await saveMutation.mutateAsync(payload);
      setEditing(false);
      setDrafts({});
      notifySuccess('Production data saved', `${payload.length} record(s) saved.`);
    } catch (failure) {
      notifyError('Save failed', failure instanceof Error ? failure.message : 'Production data could not be saved.');
    }
  };

  return <div className={styles.page}>
    <PageHeader title="Production Data Entry" />
    <div className={styles.filters}>
      <div className={styles.filterRow}>
      <MultiSelectFilter label="Year" placeholder="Select Year" options={years.map((year) => ({ value: String(year), label: String(year) }))} selected={filters.years.map(String)} disabled={locked} onChange={(selected) => changeFilter({ ...filters, years: selected.map(Number) })} />
      <MultiSelectFilter label="Month" placeholder="Select Month" options={months.map((month, index) => ({ value: String(index + 1), label: month }))} selected={filters.months.map(String)} disabled={locked} onChange={(selected) => changeFilter({ ...filters, months: selected.map(Number) })} />
      <MultiSelectFilter label="Plant" placeholder="Select Plant" options={plants.map((plant) => ({ value: plant.id, label: plant.name }))} selected={filters.plantIds} disabled={locked} multiSelect={false} onChange={(selected) => changeFilter({ ...filters, plantIds: selected })} />
      <MultiSelectFilter label="Categories" placeholder="All Categories" options={categoryNames.map((category) => ({ value: category, label: category }))} selected={filters.categories} disabled={locked} onChange={(selected) => changeFilter({ ...filters, categories: selected })} />
      <Button className={styles.reset} appearance="subtle" icon={<ArrowReset24Regular />} disabled={locked} onClick={resetFilters}>Reset</Button>
      </div>
      <div className={styles.activeFilters}>
        <Text size={200}>Active:</Text>
        <TagGroup className={styles.activeTags} aria-label="Active filters">
          {activeFilters.map((label) => <Tag key={label} size="small">{label}</Tag>)}
        </TagGroup>
      </div>
    </div>
    <div className={styles.toolbar}>
      {editing ? <Button icon={<Dismiss24Regular />} disabled={saveMutation.isPending} onClick={() => { setEditing(false); setDrafts({}); }}>Cancel</Button> : null}
      <Button icon={<Edit24Regular />} disabled={locked || loading || Boolean(error) || rows.length === 0} onClick={() => { setDrafts({}); setEditing(true); }}>Edit</Button>
      <Button appearance="primary" icon={<Save24Regular />} disabled={!editing || saveMutation.isPending || loading || Boolean(error)} onClick={() => void save()}>{saveMutation.isPending ? 'Saving...' : 'Save'}</Button>
    </div>
    <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Production data could not be loaded.'} /> : null}
      {loading ? <LoadingSkeleton rows={6} /> : null}
      {!loading && !error && filters.plantIds.length === 0 ? <EmptyState title="Select a plant" message="Choose a plant to load its production entry rows." /> : null}
      {!loading && !error && filters.plantIds.length > 0 && (filters.years.length === 0 || filters.months.length === 0) ? <EmptyState title="Select a year and month" /> : null}
      {!loading && !error && filters.plantIds.length > 0 && filters.years.length > 0 && filters.months.length > 0 && rows.length === 0 ? <EmptyState title="No production rows available" /> : null}
      {!loading && !error ? plants.filter((plant) => rows.some((row) => row.plantId === plant.id)).map((plant) => <section className={styles.plantSection} key={plant.id}>
        <Subtitle2 className={styles.plantHeading}>{plant.name}</Subtitle2>
        {(['Production', 'Quality'] as const).map((type) => {
          const typeRows = rows.filter((row) => row.plantId === plant.id && row.type === type);
          if (typeRows.length === 0) return null;
          const summary = calculateProductionSummary(plant.id, type, referenceRows, matrices, drafts);
          return <section className={styles.typeSection} key={type}>
            <Subtitle2>{type}</Subtitle2>
            <Card className={styles.tableScroll}><table className={styles.table}>
              <colgroup><col style={{ width: '40%' }} /><col style={{ width: '25%' }} /><col style={{ width: '20%' }} /><col style={{ width: '15%' }} /></colgroup>
              <thead><tr>{['Main Name', 'Categories', 'Quantity (t)', 'Ratio (%)'].map((label) => <th className={`${styles.cell} ${styles.header}`} key={label}>{label}</th>)}</tr></thead>
              <tbody>{typeRows.map((row) => <tr key={row.key}>
                <td className={styles.cell}>{row.mainName}</td>
                <td className={styles.cell}>{row.categories}</td>
                <td className={styles.cell}><Input className={styles.input} type="number" step="any" aria-label={`Quantity for ${plant.name} ${row.mainName}`} disabled={!editing || saveMutation.isPending || isCalculatedProductionQuantity(row, matrices)} value={drafts[row.key] ?? (row.quantity === null ? '' : String(row.quantity))} onChange={(_event, data) => setDrafts((current) => ({ ...current, [row.key]: data.value }))} /></td>
                <td className={styles.cell}>{row.ratio == null ? '' : row.ratio.toFixed(2)}</td>
              </tr>)}
                <tr><th className={styles.cell} scope="row"></th><th className={styles.cell}>{summary.label}</th><td className={styles.cell}>{summary.quantity == null ? '' : summary.quantity.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td><td className={styles.cell}>{summary.ratio == null ? '' : summary.ratio.toFixed(2)}</td></tr>
              </tbody>
            </table></Card>
          </section>;
        })}
      </section>) : null}
    </div>
  </div>;
}