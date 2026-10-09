import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Target } from '../domain/models';
import { buildEditableKpiRows, getChangedKpiRows, parseNumericInput } from '../pages/KPIEntryPage/entryRows';

const kpis: KpiDefinition[] = [
  { id: 'kpi-2', name: 'Production', category: 'Production', unit: 'kt', displayOrder: 2 },
  { id: 'kpi-1', name: 'LTI', category: 'EHS', unit: '#', displayOrder: 1 },
];
const targets: Target[] = [
  { id: 'target-1', targetYear: 2026, plantId: '{PLANT-1}', kpiId: '{KPI-1}', pyActual: 8, cyTarget: 10 },
  { id: 'target-blank', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: null },
  { id: 'target-other-plant', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-1', pyActual: 90, cyTarget: 100 },
];
const results: MonthlyKpiResult[] = [{
  id: 'result-1', year: 2026, month: 9, plantId: '{PLANT-1}', kpiId: '{KPI-1}',
  monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green,
}];

describe('KPI entry rows', () => {
  it('sorts KPI rows and preserves zero values', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    expect(rows.map((row) => row.kpi.id)).toEqual(['kpi-1']);
    expect(rows[0].monthlyActual).toBe(0);
    expect(rows[0].target?.id).toBe('target-1');
    expect(rows[0].target?.pyActual).toBe(8);
    expect(rows[0].target?.cyTarget).toBe(10);
  });

  it('omits KPIs without a CY Target but keeps zero targets', () => {
    const rows = buildEditableKpiRows(kpis, [
      { id: 'zero-target', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', cyTarget: 0 },
      { id: 'blank-target', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: null },
    ], [], 'plant-1');
    expect(rows.map((row) => row.kpi.id)).toEqual(['kpi-1']);
    expect(rows[0].target?.cyTarget).toBe(0);
  });

  it('parses numeric inputs without converting empty to zero', () => {
    expect(parseNumericInput('0')).toBe(0);
    expect(parseNumericInput('12.5')).toBe(12.5);
    expect(parseNumericInput('')).toBeNull();
    expect(parseNumericInput('invalid')).toBeNull();
  });

  it('returns no rows when KPI values are unchanged', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    expect(getChangedKpiRows(rows, rows)).toEqual([]);
  });

  it('returns only KPI rows with edited values', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    const changedRows = rows.map((row) => row.kpi.id === 'kpi-1' ? { ...row, monthlyActual: 12 } : row);
    expect(getChangedKpiRows(rows, changedRows).map((row) => row.kpi.id)).toEqual(['kpi-1']);
  });
});
