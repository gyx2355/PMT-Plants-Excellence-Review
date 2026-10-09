import React, { useMemo, useState } from 'react';
import { Button, Card, Checkbox, Combobox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Input, Label, Option, Select, Textarea, makeStyles, Tab, TabList, tokens } from '@fluentui/react-components';
import { Add24Regular, Delete24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAeCategories, useAllAe, useAllMonthlyReports, useAllTargets, useAllVolumePac, useChartAdminMutations, useKpiDefinitionMutations, useKpiDefinitions, useMonthlyReportMutations, usePlantMutations, usePlants, useProductionKpiMatrices, useProductionLineMatrices, useProductionLines, useReportCategoryMutations, useReportCategories, useTargetMutations, useTargets } from '../../hooks/queries';
import type { KpiDefinition, MonthlyReport, Plant, ReportCategory, Target } from '../../domain/models';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, VolumePacRecord } from '../../domain/models/charts';
import { ReportType } from '../../domain/enums';
import { getPreviousPeriod } from '../../domain/services/period';
import { Apma_pmtkpidefinitionsesapma_kpilogic } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import { Apma_pmtproductionkpimatrixesapma_type, Apma_pmtproductionkpimatrixesapma_productionclass } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';

type AdminTab = 'plants' | 'kpis' | 'reportCategories' | 'aeCategories' | 'productionLines' | 'productionLineMatrices' | 'productionKpiMatrices' | 'targets' | 'ae' | 'volumePac' | 'monthlyReports';
type AdminItem = Plant | KpiDefinition | ReportCategory | Target | AeCategory | ProductionLine | ProductionLineMatrix | ProductionKpiMatrix | AeRecord | VolumePacRecord | MonthlyReport;

const columns: Record<AdminTab, string[]> = {
    productionKpiMatrices: ['mainName', 'plantName', 'type', 'categories', 'productionClass', 'displayOrder'],
    plants: ['name', 'displayOrder'], kpis: ['name', 'category', 'unit', 'kpiLogic', 'displayOrder'], reportCategories: ['name', 'displayOrder'], aeCategories: ['name', 'displayOrder'], productionLines: ['name', 'displayOrder'], productionLineMatrices: ['mainName', 'plantName', 'productionLineName', 'displayOrder'], targets: ['targetYear', 'plantName', 'kpiName', 'kpiUnit', 'pyActual', 'cyTarget'], ae: ['mainName', 'year', 'month', 'plantName', 'productionLineName', 'categoryName', 'value'], volumePac: ['mainName', 'year', 'month', 'plantName', 'productionLineName', 'volume', 'forecast', 'pac'], monthlyReports: ['mainName', 'year', 'month', 'plantName', 'categoryName', 'type', 'content'],
};
const labels: Record<string, string> = { name: 'Name', displayOrder: 'Display Order', category: 'Category', categories: 'Categories', productionClass: 'Production Class', unit: 'Unit', kpiUnit: 'Unit', kpiLogic: 'KPI Logic', targetYear: 'Target Year', plantName: 'Plant Name', kpiName: 'KPI Name', pyActual: 'PY Actual', cyTarget: 'CY Target', mainName: 'Main Name', year: 'Year', month: 'Month', productionLineName: 'Production Line', categoryName: 'Category', value: 'Value (%)', volume: 'Volume (t)', forecast: 'Forecast (t)', pac: 'PAC (t)', type: 'Type', content: 'Content' };

const styles = makeStyles({
    page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
    tabs: { overflowX: 'auto', flexShrink: 0 },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
    toolbarActions: { display: 'flex', gap: tokens.spacingHorizontalS },
    filters: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM, flexShrink: 0, position: 'relative', zIndex: 5 },
    filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, minWidth: '190px', maxWidth: '260px', position: 'relative' },
    filterOptions: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: tokens.spacingVerticalXXS, position: 'absolute', zIndex: 1, top: '100%', left: 0, right: 0, maxHeight: '180px', overflowY: 'auto', padding: tokens.spacingVerticalXS, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusSmall, boxShadow: tokens.shadow8 },
    filterOption: { padding: tokens.spacingVerticalXS },
    scroll: { display: 'block', flex: 1, minHeight: 0, overflow: 'auto', padding: 0, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
    table: { width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: 0 },
    tableHead: { position: 'sticky', top: 0, zIndex: 3, backgroundColor: '#F3F2F1' },
    cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
    header: { position: 'sticky', top: 0, zIndex: 4, backgroundColor: '#F3F2F1', backgroundClip: 'padding-box', boxShadow: `0 1px 0 ${tokens.colorNeutralStroke2}`, fontWeight: tokens.fontWeightSemibold },
    field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, marginBottom: tokens.spacingVerticalM },
});

const lookupName = (items: Array<{ id: string; name: string }>, id: unknown) => items.find((item) => item.id === id)?.name ?? String(id ?? 'N/A');
const lookupField = (field: string) => ({ plantName: 'plantId', kpiName: 'kpiId', productionLineName: 'productionLineId', categoryName: 'categoryId' }[field] ?? field);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => ({ value: String(index + 1), label }));

type FilterOption = { value: string; label: string };
type TableFilter = { key: string; label: string; recordField: string; options: FilterOption[] };

const SearchMultiSelect: React.FC<{ label: string; options: FilterOption[]; selected: string[]; onChange: (selected: string[]) => void; disabled?: boolean }> = ({ label, options, selected, onChange, disabled = false }) => {
    const css = styles();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const matches = options.filter((option) => option.label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
    const toggle = (value: string) => onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    return <div className={css.filter}><Label>{label}{selected.length ? ` (${selected.length})` : ''}</Label><Input placeholder="Search and select" value={search} disabled={disabled} onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onBlur={() => setOpen(false)} onChange={(_event, data) => { setSearch(data.value); setOpen(true); }} />{open && !disabled ? <div className={css.filterOptions}>{matches.map((option) => <Checkbox className={css.filterOption} key={option.value} label={option.label} checked={selected.includes(option.value)} onMouseDown={(event) => event.preventDefault()} onChange={() => toggle(option.value)} />)}</div> : null}</div>;
};

const BatchTargetDialog: React.FC<{ onClose: () => void; onConfirm: (year: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [saving, setSaving] = useState(false);
    const numericYear = Number(year);
    const validYear = Number.isInteger(numericYear) && numericYear > 0;
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(numericYear);
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add PMT Targets</DialogTitle><DialogContent><div className={css.field}><Label htmlFor="batch-target-year">Target Year</Label><Input id="batch-target-year" type="number" value={year} onChange={(_event, data) => setYear(data.value)} /></div><p>Missing Plant and KPI combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={!validYear || saving}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const BatchAeDialog: React.FC<{ onClose: () => void; onConfirm: (year: number, month: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const targetsQuery = useAllTargets();
    const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear))].sort((left, right) => left - right);
    const [year, setYear] = useState(new Date().getFullYear());
    const validYear = years.includes(year);
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [saving, setSaving] = useState(false);
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(year, Number(month));
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add AE</DialogTitle><DialogContent><div className={css.field}><Label>Year</Label><Select aria-label="Year" value={validYear ? String(year) : ''} disabled={saving || targetsQuery.isLoading} onChange={(_event, data) => setYear(Number(data.value))}><option value="">Select year</option>{years.map((option) => <option key={option} value={String(option)}>{option}</option>)}</Select></div><div className={css.field}><Label>Month</Label><Select value={month} onChange={(_event, data) => setMonth(data.value)}>{months.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select></div><p>Missing Plant, Production Line and AE Category combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={saving || !validYear || targetsQuery.isLoading || targetsQuery.isError}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const BatchVolumePacDialog: React.FC<{ onClose: () => void; onConfirm: (year: number, month: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const targetsQuery = useAllTargets();
    const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear))].sort((left, right) => left - right);
    const [year, setYear] = useState(new Date().getFullYear());
    const validYear = years.includes(year);
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [saving, setSaving] = useState(false);
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(year, Number(month));
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add Volume & PAC</DialogTitle><DialogContent><div className={css.field}><Label>Year</Label><Select aria-label="Year" value={validYear ? String(year) : ''} disabled={saving || targetsQuery.isLoading} onChange={(_event, data) => setYear(Number(data.value))}><option value="">Select year</option>{years.map((option) => <option key={option} value={String(option)}>{option}</option>)}</Select></div><div className={css.field}><Label>Month</Label><Select value={month} onChange={(_event, data) => setMonth(data.value)}>{months.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select></div><p>Missing Plant and Production Line combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={saving || !validYear || targetsQuery.isLoading || targetsQuery.isError}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const BatchMonthlyReportDialog: React.FC<{ onClose: () => void; onConfirm: (year: number, month: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const targetsQuery = useAllTargets();
    const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear))].sort((left, right) => left - right);
    const [year, setYear] = useState(new Date().getFullYear());
    const validYear = years.includes(year);
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [saving, setSaving] = useState(false);
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(year, Number(month));
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add Monthly Reports</DialogTitle><DialogContent><div className={css.field}><Label>Year</Label><Select aria-label="Year" value={validYear ? String(year) : ''} disabled={saving || targetsQuery.isLoading} onChange={(_event, data) => setYear(Number(data.value))}><option value="">Select year</option>{years.map((option) => <option key={option} value={String(option)}>{option}</option>)}</Select></div><div className={css.field}><Label>Month</Label><Select value={month} onChange={(_event, data) => setMonth(data.value)}>{months.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select></div><p>Missing Plant, Report Category, Highlights and Lowlights combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={saving || !validYear || targetsQuery.isLoading || targetsQuery.isError}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const DialogForm: React.FC<{ tab: AdminTab; item?: AdminItem; onClose: () => void; onSave: (item: AdminItem) => Promise<void>; plants: Plant[]; kpis: KpiDefinition[]; lines: ProductionLine[]; aeCategories: AeCategory[]; reportCategories: ReportCategory[] }> = ({ tab, item, onClose, onSave, plants, kpis, lines, aeCategories, reportCategories }) => {
  const css = styles();
    const [values, setValues] = useState<Record<string, string>>(() => {
        const currentDate = new Date();
        const record = item as unknown as Record<string, unknown> | undefined;
        return Object.fromEntries(columns[tab].map((field) => {
            const sourceField = lookupField(field);
            const defaultValue = !item && sourceField === 'year'
                ? currentDate.getFullYear()
                : !item && sourceField === 'month'
                    ? currentDate.getMonth() + 1
                    : '';
            return [sourceField, String(record?.[sourceField] ?? defaultValue)];
        }));
    });
  const [lookupQueries, setLookupQueries] = useState<Record<string, string>>({});
  const update = (field: string, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const optionsFor = (field: string) => field === 'plantName' ? plants : field === 'kpiName' ? kpis : field === 'productionLineName' ? lines : tab === 'ae' ? aeCategories : reportCategories;
  const save = async () => {
    const parsed: Record<string, unknown> = { ...(item as unknown as Record<string, unknown> | undefined), ...values };
        ['displayOrder', 'targetYear', 'month', 'year', 'pyActual', 'cyTarget', 'value', 'volume', 'forecast', 'pac'].forEach((field) => {
            if (!(field in parsed)) return;
            parsed[field] = parsed[field] === '' && ['pyActual', 'cyTarget', 'value', 'volume', 'forecast', 'pac'].includes(field)
                ? null
                : Number(parsed[field]);
        });
    await onSave(parsed as unknown as AdminItem); onClose();
  };
    return (
    <Dialog
        open
        onOpenChange={(_event, data) => {
        if (!data.open) {
            onClose();
        }
        }}
    >
        <DialogSurface>
        <DialogBody>
            <DialogTitle>
            {item ? 'Edit' : 'Add'} record
            </DialogTitle>

            <DialogContent>
            {columns[tab]
                .filter(
                (field) =>
                    field !== 'id' &&
                    field !== 'mainName' &&
                    field !== 'kpiUnit',
                )
                .map((field) => {
                const sourceField = lookupField(field);
                const isLookup = sourceField !== field;

                if (isLookup) {
                    const options = optionsFor(field);

                    const selectedName = lookupName(
                    options,
                    values[sourceField],
                    );

                    const query =
                    lookupQueries[field] ??
                    (selectedName === 'N/A'
                        ? ''
                        : selectedName);

                    const normalizedQuery = query
                    .trim()
                    .toLocaleLowerCase();

                    const matchingOptions = options.filter(
                    (option) =>
                        option.name
                        .toLocaleLowerCase()
                        .includes(normalizedQuery),
                    );

                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field] ?? field}
                        </Label>

                        <Combobox
                        placeholder="Search and select"
                        value={query}
                        selectedOptions={
                            values[sourceField]
                            ? [values[sourceField]]
                            : []
                        }
                        onChange={(event) => {
                            const nextQuery =
                            event.currentTarget?.value ?? '';

                            setLookupQueries((current) => ({
                            ...current,
                            [field]: nextQuery,

                            }));
                        }}
                        onOptionSelect={(_event, data) => {
                            const selectedId =
                            data.optionValue ?? '';

                            const selectedOption =
                            options.find(
                                (entry) =>
                                entry.id === selectedId,
                            );

                            update(
                            sourceField,
                            selectedId,
                            );

                            setLookupQueries(
                            (current) => ({
                                ...current,
                                [field]:

                                selectedOption?.name ?? '',
                            }),
                            );
                        }}
                        >
                        {matchingOptions.map((option) => (
                            <Option
                            key={option.id}
                            value={option.id}
                            text={option.name}
                            >
                            {option.name}
                            </Option>
                        ))}
                        </Combobox>
                    </div>
                    );
                }

                if (field === 'type') {
                    const typeOptions = tab === 'productionKpiMatrices'
                        ? Object.values(Apma_pmtproductionkpimatrixesapma_type)
                        : Object.values(ReportType);
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.type ?? ''}
                        onChange={(_event, data) => {
                            update('type', data.value);
                        }}
                        >
                        <option value="">
                            Select type
                        </option>
                        {typeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </Select>
                    </div>
                    );
                }

                if (field === 'productionClass') {
                    return <div className={css.field} key={field}>
                        <Label htmlFor="production-class">{labels[field]}</Label>
                        <Select id="production-class" value={values.productionClass ?? ''} onChange={(_event, data) => update('productionClass', data.value)}>
                            <option value="">Select Production Class</option>
                            {Object.values(Apma_pmtproductionkpimatrixesapma_productionclass).map((option) => <option key={option} value={option}>{option === 'FPYFG' ? 'FPY FG' : option}</option>)}
                        </Select>
                    </div>;
                }

                if (field === 'kpiLogic') {
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.kpiLogic ?? ''}
                        onChange={(_event, data) => {
                            update('kpiLogic', data.value);
                        }}
                        >
                        <option value="">
                            Select KPI Logic
                        </option>
                        {Object.values(Apma_pmtkpidefinitionsesapma_kpilogic).map((logic) => (
                            <option key={logic} value={logic}>
                            {logic}
                            </option>
                        ))}
                        </Select>
                    </div>
                    );
                }

                if (field === 'month') {
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.month ?? ''}
                        onChange={(_event, data) => {
                            update('month', data.value);
                        }}
                        >
                        <option value="">
                            Select month
                        </option>

                        {months.map((month) => (
                            <option
                            key={month.value}
                            value={month.value}
                            >
                            {month.label}
                            </option>
                        ))}
                        </Select>
                    </div>
                    );
                }

                return (
                    <div
                    className={css.field}
                    key={field}
                    >
                    <Label>
                        {labels[field] ?? field}
                    </Label>

                    <Input
                        value={values[sourceField] ?? ''}
                        onChange={(_event, data) => {
                        update(
                            sourceField,
                            data.value,
                        );
                        }}
                    />
                    </div>
                );
                })}
            </DialogContent>

            <DialogActions>
            <Button onClick={onClose}>
                Cancel
            </Button>

            <Button
                appearance="primary"
                icon={<Save24Regular />}
                onClick={() => void save()}
            >
                Save
            </Button>
            </DialogActions>
        </DialogBody>
        </DialogSurface>
    </Dialog>
    );
//   return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>{item ? 'Edit' : 'Add'} record</DialogTitle><DialogContent>{columns[tab].filter((field) => field !== 'id' && field !== 'mainName').map((field) => { const sourceField = lookupField(field); const isLookup = sourceField !== field; if (isLookup) { const options = optionsFor(field); const selectedName = lookupName(options, values[sourceField]); const query = lookupQueries[field] ?? (selectedName === 'N/A' ? '' : selectedName); const matchingOptions = options.filter((option) => option.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())); return <div className={css.field} key={field}><Label>{labels[field] ?? field}</Label><Combobox placeholder="Search and select" value={query} onChange={(event) => setLookupQueries((current) => ({ ...current, [field]: event.currentTarget.value }))} onOptionSelect={(_event, data) => { const option = options.find((entry) => entry.id === data.optionValue); update(sourceField, data.optionValue ?? ''); setLookupQueries((current) => ({ ...current, [field]: option?.name ?? '' })); }}>{matchingOptions.map((option) => <Option key={option.id} value={option.id} text={option.name}>{option.name}</Option>)}</Combobox></div>; } if (field === 'month') return <div className={css.field} key={field}><Label>{labels[field]}</Label><Select value={values.month ?? ''} onChange={(_event, data) => update('month', data.value)}><option value="">Select month</option>{months.map((month) => <option key={month.value} value={month.value}>{month.label}</option>)}</Select></div>; return <div className={css.field} key={field}><Label>{labels[field] ?? field}</Label><Input value={values[sourceField] ?? ''} onChange={(_event, data) => update(sourceField, data.value)} /></div>; })}</DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button appearance="primary" icon={<Save24Regular />} onClick={() => void save()}>Save</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

export const AdministrationPage: React.FC<{ mode?: 'configuration' | 'basic' }> = ({ mode = 'configuration' }) => {
    const css = styles(); const currentYear = new Date().getFullYear(); const previousPeriod = getPreviousPeriod(); const [tab, setTab] = useState<AdminTab>(mode === 'configuration' ? 'plants' : 'targets'); const [dialog, setDialog] = useState<{ item?: AdminItem } | null>(null); const [batchTargetDialog, setBatchTargetDialog] = useState(false); const [batchAeDialog, setBatchAeDialog] = useState(false); const [batchVolumePacDialog, setBatchVolumePacDialog] = useState(false); const [targetEditing, setTargetEditing] = useState(false); const [targetEditingIds, setTargetEditingIds] = useState<string[]>([]); const [targetDrafts, setTargetDrafts] = useState<Record<string, { pyActual: string; cyTarget: string }>>({}); const [aeEditing, setAeEditing] = useState(false); const [aeEditingIds, setAeEditingIds] = useState<string[]>([]); const [aeDrafts, setAeDrafts] = useState<Record<string, string>>({}); const [volumePacEditing, setVolumePacEditing] = useState(false); const [volumePacEditingIds, setVolumePacEditingIds] = useState<string[]>([]); const [volumePacDrafts, setVolumePacDrafts] = useState<Record<string, { volume: string; forecast: string; pac: string }>>({}); const [tableFilters, setTableFilters] = useState<Record<string, string[]>>({ 'targets:targetYear': [String(currentYear)], 'ae:year': [String(previousPeriod.year)], 'ae:month': [String(previousPeriod.month)], 'volumePac:year': [String(previousPeriod.year)], 'volumePac:month': [String(previousPeriod.month)], 'monthlyReports:year': [String(previousPeriod.year)], 'monthlyReports:month': [String(previousPeriod.month)] });
    const [batchMonthlyReportDialog, setBatchMonthlyReportDialog] = useState(false);
    const [monthlyReportEditing, setMonthlyReportEditing] = useState(false);
    const [monthlyReportEditingIds, setMonthlyReportEditingIds] = useState<string[]>([]);
    const [monthlyReportDrafts, setMonthlyReportDrafts] = useState<Record<string, string>>({});
    const kpiMatricesQ = useProductionKpiMatrices(tab === 'productionKpiMatrices');
    const plantsQ = usePlants(); const kpisQ = useKpiDefinitions(); const categoriesQ = useReportCategories(); const aeCategoriesQ = useAeCategories(); const linesQ = useProductionLines(); const matricesQ = useProductionLineMatrices(); const targetsQ = useTargets(currentYear); const allTargetsQ = useAllTargets(); const aeQ = useAllAe(); const volumeQ = useAllVolumePac(); const reportsQ = useAllMonthlyReports();
  const plantM = usePlantMutations(); const kpiM = useKpiDefinitionMutations(); const categoryM = useReportCategoryMutations(); const targetM = useTargetMutations(); const chartM = useChartAdminMutations(); const reportM = useMonthlyReportMutations();
  const plants = useMemo(() => plantsQ.data ?? [], [plantsQ.data]); const kpis = useMemo(() => kpisQ.data ?? [], [kpisQ.data]); const categories = useMemo(() => aeCategoriesQ.data ?? [], [aeCategoriesQ.data]); const lines = useMemo(() => linesQ.data ?? [], [linesQ.data]); const reportCategories = useMemo(() => categoriesQ.data ?? [], [categoriesQ.data]);
    const data: Record<AdminTab, AdminItem[]> = { plants, kpis, reportCategories, aeCategories: categories, productionLines: lines, productionLineMatrices: matricesQ.data ?? [], productionKpiMatrices: kpiMatricesQ.data ?? [], targets: allTargetsQ.data ?? [], ae: aeQ.data ?? [], volumePac: volumeQ.data ?? [], monthlyReports: reportsQ.data ?? [] };
    const valuesAsOptions = (items: AdminItem[], field: string) => { const sourceItems = field === 'year' ? (allTargetsQ.data ?? []) : items; const sourceField = field === 'year' ? 'targetYear' : field; const values = sourceItems.map((item) => String((item as unknown as Record<string, unknown>)[sourceField] ?? '')).filter(Boolean); if (field === 'year') values.push(String(currentYear), String(previousPeriod.year)); return [...new Set(values)].sort((left, right) => left.localeCompare(right, undefined, { numeric: true })).map((value) => ({ value, label: field === 'month' ? months.find((month) => month.value === value)?.label ?? value : value })); };
    const tableFilterDefinitions: TableFilter[] = tab === 'targets' ? [{ key: 'targetYear', label: 'Target Year', recordField: 'targetYear', options: valuesAsOptions(data.targets, 'targetYear') }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }] : tab === 'ae' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.ae, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'productionLineId', label: 'Production Line', recordField: 'productionLineId', options: lines.map((line) => ({ value: line.id, label: line.name })) }] : tab === 'volumePac' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.volumePac, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'productionLineId', label: 'Production Line', recordField: 'productionLineId', options: lines.map((line) => ({ value: line.id, label: line.name })) }] : tab === 'monthlyReports' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.monthlyReports, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'categoryId', label: 'Category', recordField: 'categoryId', options: reportCategories.map((category) => ({ value: category.id, label: category.name })) }, { key: 'type', label: 'Type', recordField: 'type', options: valuesAsOptions(data.monthlyReports, 'type') }] : [];
        const filteredRows = data[tab].filter((item) => tableFilterDefinitions.every((filter) => { const selected = tableFilters[`${tab}:${filter.key}`] ?? []; return selected.length === 0 || selected.includes(String((item as unknown as Record<string, unknown>)[filter.recordField] ?? '')); }));
        const displayOrderOf = (items: Array<{ id: string; displayOrder: number }>, id: unknown) => items.find((entry) => entry.id === id)?.displayOrder ?? Number.MAX_SAFE_INTEGER;
        const compareAscending = (left: unknown, right: unknown) => Number(left ?? Number.MAX_SAFE_INTEGER) - Number(right ?? Number.MAX_SAFE_INTEGER);
        const sortedRows = [...filteredRows].sort((left, right) => {
            const first = left as unknown as Record<string, unknown>;
            const second = right as unknown as Record<string, unknown>;
            if (tab === 'productionKpiMatrices') {
                const normalizeId = (id: unknown) => String(id ?? '').replace(/[{}]/g, '').trim().toLowerCase();
                const plantOrder = (id: unknown) => plants.find((plant) => normalizeId(plant.id) === normalizeId(id))?.displayOrder ?? Number.MAX_SAFE_INTEGER;
                return compareAscending(plantOrder(first.plantId), plantOrder(second.plantId))
                    || compareAscending(first.displayOrder, second.displayOrder)
                    || String(first.mainName ?? '').localeCompare(String(second.mainName ?? ''));
            }
            const comparisons = tab === 'targets'
                ? [compareAscending(first.targetYear, second.targetYear), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(kpis, first.kpiId), displayOrderOf(kpis, second.kpiId))]
                : tab === 'ae'
                    ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(lines, first.productionLineId), displayOrderOf(lines, second.productionLineId)), compareAscending(displayOrderOf(categories, first.categoryId), displayOrderOf(categories, second.categoryId))]
                    : tab === 'volumePac'
                        ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(lines, first.productionLineId), displayOrderOf(lines, second.productionLineId))]
                        : tab === 'monthlyReports'
                            ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(reportCategories, first.categoryId), displayOrderOf(reportCategories, second.categoryId)), (first.type === 'Highlights' ? 0 : 1) - (second.type === 'Highlights' ? 0 : 1)]
                            : [];
            return comparisons.find((comparison) => comparison !== 0) ?? 0;
        });
    const queries = [plantsQ, kpisQ, categoriesQ, aeCategoriesQ, linesQ, matricesQ, ...(tab === 'productionKpiMatrices' ? [kpiMatricesQ] : []), targetsQ, allTargetsQ, aeQ, volumeQ, reportsQ]; const error = queries.find((query) => query.error)?.error; const loading = queries.some((query) => query.isLoading);
    const display = (item: AdminItem, field: string) => { const record = item as unknown as Record<string, unknown>; if (field === 'plantName') return lookupName(plants, record.plantId); if (field === 'kpiName') return lookupName(kpis, record.kpiId); if (field === 'kpiUnit') return kpis.find((kpi) => kpi.id === record.kpiId)?.unit ?? ''; if (field === 'productionLineName') return lookupName(lines, record.productionLineId); if (field === 'categoryName') return lookupName(tab === 'ae' ? categories : reportCategories, record.categoryId); const value = record[field]; if (tab === 'volumePac' && ['volume', 'forecast', 'pac'].includes(field) && typeof value === 'number') return value.toFixed(2); return String(value ?? ''); };
    const save = async (item: AdminItem) => {
        if (tab === 'plants') {
            const value = item as Plant;
            await (value.id ? plantM.update.mutateAsync({ id: value.id, changes: value }) : plantM.create.mutateAsync(value));
        } else if (tab === 'kpis') {
            const value = item as KpiDefinition;
            await (value.id ? kpiM.update.mutateAsync({ id: value.id, changes: value }) : kpiM.create.mutateAsync(value));
        } else if (tab === 'reportCategories') {
            const value = item as ReportCategory;
            await (value.id ? categoryM.update.mutateAsync({ id: value.id, changes: value }) : categoryM.create.mutateAsync(value));
        } else if (tab === 'targets') {
            const value = item as Target;
            if (value.id) {
                await targetM.update.mutateAsync({ id: value.id, changes: value });
            } else {
                await targetM.create.mutateAsync({ targetYear: value.targetYear, plantId: value.plantId, kpiId: value.kpiId, pyActual: value.pyActual, cyTarget: value.cyTarget });
                setTableFilters((current) => ({ ...current, 'targets:targetYear': [String(value.targetYear)] }));
            }
        } else if (tab === 'aeCategories') {
            const value = item as AeCategory;
            await (value.id ? chartM.updateCategory.mutateAsync({ id: value.id, value }) : chartM.createCategory.mutateAsync(value));
        } else if (tab === 'productionLines') {
            const value = item as ProductionLine;
            await (value.id ? chartM.updateLine.mutateAsync({ id: value.id, value }) : chartM.createLine.mutateAsync(value));
        } else if (tab === 'productionLineMatrices') {
            const value = item as ProductionLineMatrix;
            const payload = { plantId: value.plantId, productionLineId: value.productionLineId, displayOrder: value.displayOrder };
            await (value.id ? chartM.updateMatrix.mutateAsync({ id: value.id, value: payload }) : chartM.createMatrix.mutateAsync(payload));
        } else if (tab === 'productionKpiMatrices') {
            const value = item as ProductionKpiMatrix;
            const payload = { plantId: value.plantId, type: value.type, categories: value.categories, productionClass: value.productionClass, displayOrder: value.displayOrder };
            await (value.id ? chartM.updateKpiMatrix.mutateAsync({ id: value.id, value: payload }) : chartM.createKpiMatrix.mutateAsync(payload));
        } else if (tab === 'ae') {
            const value = item as AeRecord;
            if (value.id) {
                await chartM.updateAe.mutateAsync({ id: value.id, value });
            } else {
                await chartM.createAe.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, productionLineId: value.productionLineId, categoryId: value.categoryId, value: value.value });
                setTableFilters((current) => ({ ...current, 'ae:year': [String(value.year)] }));
            }
        } else if (tab === 'volumePac') {
            const value = item as VolumePacRecord;
            if (value.id) {
                await chartM.updateVolumePac.mutateAsync({ id: value.id, value });
            } else {
                await chartM.createVolumePac.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, productionLineId: value.productionLineId, volume: value.volume, forecast: value.forecast, pac: value.pac });
                setTableFilters((current) => ({ ...current, 'volumePac:year': [String(value.year)] }));
            }
        } else {
            const value = item as MonthlyReport;
            if (value.id) {
                await reportM.update.mutateAsync({ id: value.id, changes: value });
            } else {
                await reportM.create.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, categoryId: value.categoryId, type: value.type, content: value.content, displayOrder: value.displayOrder ?? 1 });
                setTableFilters((current) => ({ ...current, 'monthlyReports:year': [String(value.year)] }));
            }
        }
    };
    const remove = async (item: AdminItem) => { if (tab === 'plants') await plantM.remove.mutateAsync(item.id); else if (tab === 'kpis') await kpiM.remove.mutateAsync(item.id); else if (tab === 'reportCategories') await categoryM.remove.mutateAsync(item.id); else if (tab === 'targets') await targetM.remove.mutateAsync(item.id); else if (tab === 'aeCategories') await chartM.deleteCategory.mutateAsync(item.id); else if (tab === 'productionLines') await chartM.deleteLine.mutateAsync(item.id); else if (tab === 'productionLineMatrices') await chartM.deleteMatrix.mutateAsync(item.id); else if (tab === 'productionKpiMatrices') await chartM.deleteKpiMatrix.mutateAsync(item.id); else if (tab === 'ae') await chartM.deleteAe.mutateAsync(item.id); else if (tab === 'volumePac') await chartM.deleteVolumePac.mutateAsync(item.id); else await reportM.remove.mutateAsync(item.id); };
    const createMissingTargets = async (year: number) => {
        await targetM.createMissing.mutateAsync({ year, plants, kpis, existing: allTargetsQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'targets:targetYear': [String(year)] }));
    };
    const startTargetEditing = () => {
        setTargetEditingIds(sortedRows.map((item) => item.id));
        setTargetDrafts(Object.fromEntries(sortedRows.map((item) => {
            const target = item as Target;
            return [target.id, { pyActual: target.pyActual == null ? '' : String(target.pyActual), cyTarget: target.cyTarget == null ? '' : String(target.cyTarget) }];
        })));
        setTargetEditing(true);
    };
    const updateTargetDraft = (id: string, field: 'pyActual' | 'cyTarget', value: string) => setTargetDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    const saveTargetDrafts = async () => {
        const parse = (value: string) => value.trim() === '' ? null : Number(value);
        const targetsById = new Map((allTargetsQ.data ?? []).map((target) => [target.id, target]));
        const updates = targetEditingIds.flatMap((id) => {
            const target = targetsById.get(id);
            if (!target) return [];
            const draft = targetDrafts[target.id] ?? { pyActual: '', cyTarget: '' };
            const pyActual = parse(draft.pyActual);
            const cyTarget = parse(draft.cyTarget);
            if (pyActual === (target.pyActual ?? null) && cyTarget === (target.cyTarget ?? null)) return [];
            return [{ id: target.id, pyActual, cyTarget }];
        });
        if (updates.length > 0) await targetM.updateValues.mutateAsync(updates);
        setTargetEditing(false);
        setTargetEditingIds([]);
        setTargetDrafts({});
    };
    const createMissingAe = async (year: number, month: number) => {
        await chartM.createMissingAe.mutateAsync({ year, month, plants, matrices: matricesQ.data ?? [], categories, existing: aeQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'ae:year': [String(year)], 'ae:month': [String(month)] }));
    };
    const startAeEditing = () => {
        setAeEditingIds(sortedRows.map((item) => item.id));
        setAeDrafts(Object.fromEntries(sortedRows.map((item) => {
            const record = item as AeRecord;
            return [record.id, record.value == null ? '' : String(record.value)];
        })));
        setAeEditing(true);
    };
    const saveAeDrafts = async () => {
        const recordsById = new Map((aeQ.data ?? []).map((record) => [record.id, record]));
        const updates = aeEditingIds.flatMap((id) => {
            const record = recordsById.get(id);
            if (!record) return [];
            const draft = aeDrafts[id] ?? '';
            const value = draft.trim() === '' ? null : Number(draft);
            return value === record.value ? [] : [{ record, value }];
        });
        if (updates.length > 0) await chartM.updateAeValues.mutateAsync(updates);
        setAeEditing(false);
        setAeEditingIds([]);
        setAeDrafts({});
    };
    const createMissingVolumePac = async (year: number, month: number) => {
        await chartM.createMissingVolumePac.mutateAsync({ year, month, plants, matrices: matricesQ.data ?? [], existing: volumeQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'volumePac:year': [String(year)], 'volumePac:month': [String(month)] }));
    };
    const startVolumePacEditing = () => {
        setVolumePacEditingIds(sortedRows.map((item) => item.id));
        setVolumePacDrafts(Object.fromEntries(sortedRows.map((item) => {
            const record = item as VolumePacRecord;
            return [record.id, { volume: record.volume == null ? '' : String(record.volume), forecast: record.forecast == null ? '' : String(record.forecast), pac: record.pac == null ? '' : String(record.pac) }];
        })));
        setVolumePacEditing(true);
    };
    const updateVolumePacDraft = (id: string, field: 'volume' | 'forecast' | 'pac', value: string) => setVolumePacDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    const saveVolumePacDrafts = async () => {
        const parse = (value: string) => value.trim() === '' ? null : Number(value);
        const recordsById = new Map((volumeQ.data ?? []).map((record) => [record.id, record]));
        const updates = volumePacEditingIds.flatMap((id) => {
            const record = recordsById.get(id);
            if (!record) return [];
            const draft = volumePacDrafts[id] ?? { volume: '', forecast: '', pac: '' };
            const volume = parse(draft.volume);
            const forecast = parse(draft.forecast);
            const pac = parse(draft.pac);
            if (volume === record.volume && forecast === record.forecast && pac === record.pac) return [];
            return [{ record, volume, forecast, pac }];
        });
        if (updates.length > 0) await chartM.updateVolumePacValues.mutateAsync(updates);
        setVolumePacEditing(false);
        setVolumePacEditingIds([]);
        setVolumePacDrafts({});
    };
    const createMissingMonthlyReports = async (year: number, month: number) => {
        await reportM.createMissing.mutateAsync({ year, month, plants, categories: reportCategories, existing: reportsQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'monthlyReports:year': [String(year)], 'monthlyReports:month': [String(month)] }));
    };
    const startMonthlyReportEditing = () => {
        setMonthlyReportEditingIds(sortedRows.map((item) => item.id));
        setMonthlyReportDrafts(Object.fromEntries(sortedRows.map((item) => {
            const report = item as MonthlyReport;
            return [report.id, report.content ?? ''];
        })));
        setMonthlyReportEditing(true);
    };
    const saveMonthlyReportDrafts = async () => {
        const reportsById = new Map((reportsQ.data ?? []).map((report) => [report.id, report]));
        const updates = monthlyReportEditingIds.flatMap((id) => {
            const report = reportsById.get(id);
            if (!report) return [];
            const content = monthlyReportDrafts[id] ?? '';
            return content === report.content ? [] : [{ id, content }];
        });
        if (updates.length > 0) await reportM.updateContents.mutateAsync(updates);
        setMonthlyReportEditing(false);
        setMonthlyReportEditingIds([]);
        setMonthlyReportDrafts({});
    };
    const renderCell = (item: AdminItem, field: string) => {
        if (tab === 'targets' && targetEditing && targetEditingIds.includes(item.id) && (field === 'pyActual' || field === 'cyTarget')) {
            const target = item as Target;
            return <Input type="number" value={targetDrafts[target.id]?.[field] ?? ''} onChange={(_event, data) => updateTargetDraft(target.id, field, data.value)} />;
        }
        if (tab === 'ae' && aeEditing && aeEditingIds.includes(item.id) && field === 'value') {
            return <Input type="number" value={aeDrafts[item.id] ?? ''} onChange={(_event, data) => setAeDrafts((current) => ({ ...current, [item.id]: data.value }))} />;
        }
        if (tab === 'volumePac' && volumePacEditing && volumePacEditingIds.includes(item.id) && (field === 'volume' || field === 'forecast' || field === 'pac')) {
            return <Input type="number" step="0.01" value={volumePacDrafts[item.id]?.[field] ?? ''} onChange={(_event, data) => updateVolumePacDraft(item.id, field, data.value)} />;
        }
        if (tab === 'monthlyReports' && monthlyReportEditing && monthlyReportEditingIds.includes(item.id) && field === 'content') {
            return <Textarea resize="vertical" value={monthlyReportDrafts[item.id] ?? ''} onChange={(_event, data) => setMonthlyReportDrafts((current) => ({ ...current, [item.id]: data.value }))} />;
        }
        return display(item, field);
    };
    const tabList = mode === 'configuration' ? [['plants', 'PMT Plants'], ['kpis', 'KPI Definitions'], ['reportCategories', 'Report Categories'], ['aeCategories', 'AE Categories'], ['productionLines', 'Production Lines'], ['productionLineMatrices', 'Production Line Matrix'], ['productionKpiMatrices', 'Production KPI Matrix']] : [['targets', 'Targets'], ['ae', 'AE'], ['volumePac', 'Volume & PAC'], ['monthlyReports', 'Monthly Reports']];
    const inlineEditing = targetEditing || aeEditing || volumePacEditing || monthlyReportEditing;
    return <div className={css.page}>
        <PageHeader title={mode === 'configuration' ? 'Configuration' : 'Basic Data Management'} subtitle="Add, edit and delete Dataverse records" />
        <TabList className={css.tabs} selectedValue={tab} onTabSelect={(_event, selected) => setTab(selected.value as AdminTab)}>{tabList.map(([value, label]) => <Tab key={value} value={value}>{label}</Tab>)}</TabList>
        {mode === 'basic' && tableFilterDefinitions.length > 0 ? <div className={css.filters}>{tableFilterDefinitions.map((filter) => <SearchMultiSelect key={`${tab}:${filter.key}`} label={filter.label} options={filter.options} selected={tableFilters[`${tab}:${filter.key}`] ?? []} onChange={(selected) => setTableFilters((current) => ({ ...current, [`${tab}:${filter.key}`]: selected }))} disabled={inlineEditing} />)}</div> : null}
        {error ? <ErrorState message={error instanceof Error ? error.message : 'Administration data could not be loaded.'} /> : null}
        {loading ? <LoadingSkeleton rows={4} /> : null}
        {!loading && !error ? <>
            <div className={css.toolbar}><span /><div className={css.toolbarActions}>
                {tab === 'targets' ? <><Button onClick={() => setBatchTargetDialog(true)} disabled={targetEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startTargetEditing} disabled={targetEditing || targetM.updateValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveTargetDrafts()} disabled={!targetEditing || targetM.updateValues.isPending}>{targetM.updateValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'ae' ? <><Button onClick={() => setBatchAeDialog(true)} disabled={aeEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startAeEditing} disabled={aeEditing || chartM.updateAeValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveAeDrafts()} disabled={!aeEditing || chartM.updateAeValues.isPending}>{chartM.updateAeValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'volumePac' ? <><Button onClick={() => setBatchVolumePacDialog(true)} disabled={volumePacEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startVolumePacEditing} disabled={volumePacEditing || chartM.updateVolumePacValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveVolumePacDrafts()} disabled={!volumePacEditing || chartM.updateVolumePacValues.isPending}>{chartM.updateVolumePacValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'monthlyReports' ? <><Button onClick={() => setBatchMonthlyReportDialog(true)} disabled={monthlyReportEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startMonthlyReportEditing} disabled={monthlyReportEditing || reportM.updateContents.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveMonthlyReportDrafts()} disabled={!monthlyReportEditing || reportM.updateContents.isPending}>{reportM.updateContents.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                <Button appearance="primary" icon={<Add24Regular />} onClick={() => setDialog({})} disabled={inlineEditing}>Add</Button>
            </div></div>
            <Card className={css.scroll}><table className={css.table}><thead className={css.tableHead}><tr>{columns[tab].map((field) => <th className={`${css.cell} ${css.header}`} key={field}>{labels[field] ?? field}</th>)}<th className={`${css.cell} ${css.header}`}>Actions</th></tr></thead><tbody>{sortedRows.map((item) => <tr key={item.id}>{columns[tab].map((field) => <td className={css.cell} key={field}>{renderCell(item, field)}</td>)}<td className={css.cell}><Button icon={<Edit24Regular />} onClick={() => setDialog({ item })} aria-label="Edit" disabled={inlineEditing} /><Button icon={<Delete24Regular />} onClick={() => void remove(item)} aria-label="Delete" disabled={inlineEditing} /></td></tr>)}</tbody></table></Card>
        </> : null}
        {dialog ? <DialogForm tab={tab} item={dialog.item} onClose={() => setDialog(null)} onSave={save} plants={plants} kpis={kpis} lines={lines} aeCategories={categories} reportCategories={reportCategories} /> : null}
        {batchTargetDialog ? <BatchTargetDialog onClose={() => setBatchTargetDialog(false)} onConfirm={createMissingTargets} /> : null}
        {batchAeDialog ? <BatchAeDialog onClose={() => setBatchAeDialog(false)} onConfirm={createMissingAe} /> : null}
        {batchVolumePacDialog ? <BatchVolumePacDialog onClose={() => setBatchVolumePacDialog(false)} onConfirm={createMissingVolumePac} /> : null}
        {batchMonthlyReportDialog ? <BatchMonthlyReportDialog onClose={() => setBatchMonthlyReportDialog(false)} onConfirm={createMissingMonthlyReports} /> : null}
    </div>;
};
