import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../domain/models';
import { buildKpiMonthlyMatrixRows, buildOverviewMatrix, buildPlantOverviewMetrics } from '../pages/KPIOverviewPage/overviewMetrics';

const plants: Plant[] = [
  { id: 'plant-1', name: 'Plant 1', displayOrder: 1 },
  { id: 'plant-2', name: 'Plant 2', displayOrder: 2 },
];
const kpis: KpiDefinition[] = [
  { id: 'kpi-1', name: 'LTI', category: 'EHS', unit: '#', kpiLogic: 'Less', displayOrder: 1 },
  { id: 'kpi-2', name: 'Production Volume', category: 'Production', unit: 'kt', kpiLogic: 'Over', displayOrder: 2 },
];
const targets: Target[] = [
  { id: 'target-1', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', cyTarget: 0 },
  { id: 'target-2', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: 10 },
  { id: 'target-plant-2-kpi-1', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-1', cyTarget: 5 },
  { id: 'target-blank', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-2', cyTarget: null },
];

const results: MonthlyKpiResult[] = [
  {
    id: 'result-1',
    year: 2026,
    month: 7,
    plantId: 'plant-1',
    kpiId: 'kpi-1',
    monthlyActual: 0,
    ytdActual: 0,
    status: KpiStatus.Green,
  },
  {
    id: 'result-2',
    year: 2026,
    month: 7,
    plantId: 'plant-1',
    kpiId: 'kpi-2',
    monthlyActual: null,
    ytdActual: null,
    status: KpiStatus.Missing,
  },
];

describe('KPI overview metrics', () => {
  it('counts zero as entered and null as missing', () => {
    const [plantMetrics] = buildPlantOverviewMetrics(plants, kpis, targets, results, 2026);

    expect(plantMetrics.expectedCount).toBe(2);
    expect(plantMetrics.enteredCount).toBe(1);
    expect(plantMetrics.completionRate).toBe(50);
    expect(plantMetrics.statusCounts[KpiStatus.Green]).toBe(1);
    expect(plantMetrics.statusCounts[KpiStatus.Missing]).toBe(1);
  });

  it('shows missing status for a plant without a result', () => {
    const matrix = buildOverviewMatrix(plants, kpis, targets, results);

    expect(matrix[0].statuses['plant-2']).toBe(KpiStatus.Missing);
    expect(matrix[1].statuses['plant-2']).toBeNull();
  });

  it('does not count blank-target KPIs as expected for plant completion', () => {
    const plantTwoMetrics = buildPlantOverviewMetrics(plants, kpis, targets, results, 2026)[1];
    expect(plantTwoMetrics.expectedCount).toBe(1);
    expect(plantTwoMetrics.statusCounts[KpiStatus.Missing]).toBe(1);
  });

  it('calculates matrix status from YTD actual and target instead of stored status', () => {
    const staleResults = [{ ...results[1], ytdActual: 11, status: KpiStatus.Missing }];
    const matrix = buildOverviewMatrix(plants, kpis, targets, staleResults);

    expect(matrix[1].statuses['plant-1']).toBe(KpiStatus.Green);
  });

  it('builds monthly matrix values and takes YTD actual from the selected month', () => {
    const monthlyResults = [
      ...results,
      { ...results[0], id: 'june', month: 6, monthlyActual: 4, ytdActual: 20 },
      { ...results[0], id: 'july', month: 7, monthlyActual: 0, ytdActual: 25 },
      { ...results[0], id: 'august', month: 8, monthlyActual: 7, ytdActual: 32 },
    ];
    const rows = buildKpiMonthlyMatrixRows([...plants].reverse(), [...kpis].reverse(), targets, monthlyResults, 8);
    const row = rows.find((item) => item.plant.id === 'plant-1' && item.kpi.id === 'kpi-1')!;
    expect(rows.some((item) => item.plant.id === 'plant-2' && item.kpi.id === 'kpi-2')).toBe(false);
    expect(rows[0]).toMatchObject({ plant: { id: 'plant-1' }, kpi: { id: 'kpi-1' } });
    expect(row.monthlyActuals[5]).toBe(4);
    expect(row.monthlyActuals[6]).toBe(0);
    expect(row.monthlyActuals[7]).toBe(7);
    expect(row.monthlyActuals[8]).toBeUndefined();
    expect(row.ytdActual).toBe(32);
  });
});
